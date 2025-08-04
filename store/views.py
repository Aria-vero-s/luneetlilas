# store/views.py
from django.views.generic import ListView, DetailView, TemplateView
from django.views import View
from django.shortcuts import get_object_or_404, redirect, render
from django.contrib.auth.mixins import LoginRequiredMixin
from django.http import JsonResponse, HttpResponseBadRequest
from django.conf import settings
from django.urls import reverse

import stripe
from .models import Product, Order, OrderItem

stripe.api_key = settings.STRIPE_SECRET_KEY


class ProductListView(ListView):
    model = Product
    template_name = 'product_list.html'
    context_object_name = 'products'


class ProductDetailView(DetailView):
    model = Product
    template_name = 'product_detail.html'
    context_object_name = 'product'

    def get_context_data(self, **kwargs):
        ctx = super().get_context_data(**kwargs)
        ctx['related_products'] = (
            Product.objects
                   .filter(category=self.object.category)
                   .exclude(pk=self.object.pk)[:4]
        )
        return ctx


class CartView(TemplateView):
    template_name = 'store/cart.html'

    def get(self, request, *args, **kwargs):
        # If JS wants JSON instead of HTML
        if request.headers.get('x-requested-with') == 'XMLHttpRequest':
            order, _ = Order.objects.get_or_create(user=request.user, ordered=False)
            items = []
            for item in order.items.select_related('product').all():
                items.append({
                    'id': item.product.id,
                    'slug': item.product.slug,
                    'name': item.product.name,
                    'price': float(item.product.price),
                    'image': item.product.image.url if item.product.image else '',
                    'quantity': item.quantity,
                })
            return JsonResponse({
                'items': items,
                'subtotal': sum(i['price'] * i['quantity'] for i in items),
            })
        # Otherwise render the template
        return super().get(request, *args, **kwargs)


class CartAPIView(LoginRequiredMixin, View):
    """
    /api/cart/      GET   → list items
                    POST  → add one (pass {'slug':..., 'quantity':...})
                    PATCH → update quantity (pass {'slug':..., 'quantity':...})
                    DELETE→ remove item (pass {'slug':...})
    """
    def dispatch(self, request, *args, **kwargs):
        # Ensure JSON
        if request.content_type != 'application/json' and request.method != 'GET':
            return HttpResponseBadRequest("Expected application/json")
        return super().dispatch(request, *args, **kwargs)

    def get(self, request):
        order, _ = Order.objects.get_or_create(user=request.user, ordered=False)
        items = [{
            'slug': oi.product.slug,
            'name': oi.product.name,
            'price': float(oi.product.price),
            'image': oi.product.image.url if oi.product.image else '',
            'quantity': oi.quantity,
        } for oi in order.items.select_related('product')]
        return JsonResponse({'items': items})

    def post(self, request):
        data = json.loads(request.body)
        slug = data.get('slug')
        qty = data.get('quantity', 1)
        product = get_object_or_404(Product, slug=slug)
        order, _ = Order.objects.get_or_create(user=request.user, ordered=False)
        oi, created = OrderItem.objects.get_or_create(
            user=request.user, product=product, ordered=False
        )
        oi.quantity = oi.quantity + qty if not created else qty
        oi.save()
        order.items.add(oi)
        return JsonResponse({'status': 'ok', 'slug': slug, 'quantity': oi.quantity})

    def patch(self, request):
        data = json.loads(request.body)
        slug = data.get('slug')
        qty = data.get('quantity')
        if qty is None or qty < 0:
            return HttpResponseBadRequest("Invalid quantity")
        product = get_object_or_404(Product, slug=slug)
        oi = get_object_or_404(OrderItem, user=request.user, product=product, ordered=False)
        if qty == 0:
            oi.delete()
            return JsonResponse({'status': 'removed', 'slug': slug})
        oi.quantity = qty
        oi.save()
        return JsonResponse({'status': 'ok', 'slug': slug, 'quantity': oi.quantity})

    def delete(self, request):
        data = json.loads(request.body)
        slug = data.get('slug')
        product = get_object_or_404(Product, slug=slug)
        oi = get_object_or_404(OrderItem, user=request.user, product=product, ordered=False)
        oi.delete()
        return JsonResponse({'status': 'removed', 'slug': slug})


class CheckoutView(LoginRequiredMixin, TemplateView):
    template_name = 'checkout.html'


class CreateCheckoutSessionView(LoginRequiredMixin, View):
    def post(self, request, *args, **kwargs):
        order = Order.objects.get(user=request.user, ordered=False)
        line_items = [{
            'price_data': {
                'currency': 'eur',
                'unit_amount': int(item.product.price * 100),
                'product_data': {'name': item.product.name},
            },
            'quantity': item.quantity,
        } for item in order.items.all()]
        session = stripe.checkout.Session.create(
            payment_method_types=['card'],
            line_items=line_items,
            mode='payment',
            success_url=request.build_absolute_uri(reverse('store:success')),
            cancel_url=request.build_absolute_uri(reverse('store:cancelled')),
        )
        return JsonResponse({'id': session.id})


def success(request):
    order = Order.objects.get(user=request.user, ordered=False)
    order.ordered = True
    order.save()
    return render(request, 'success.html')


def cancelled(request):
    return render(request, 'cancelled.html')
