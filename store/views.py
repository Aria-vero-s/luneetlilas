from django.views.generic import ListView, DetailView, TemplateView
from django.views import View
from django.shortcuts import get_object_or_404, redirect, render
from django.contrib.auth.mixins import LoginRequiredMixin
from django.http import JsonResponse
from django.conf import settings

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


class CartView(LoginRequiredMixin, TemplateView):
    template_name = 'cart.html'

    def get(self, request, *args, **kwargs):
        order, _ = Order.objects.get_or_create(user=request.user, ordered=False)
        return self.render_to_response({'order': order})


class CheckoutView(LoginRequiredMixin, TemplateView):
    template_name = 'checkout.html'


def add_to_cart(request, slug):
    product = get_object_or_404(Product, slug=slug)
    order_item, _ = OrderItem.objects.get_or_create(
        user=request.user, product=product, ordered=False
    )
    order, created = Order.objects.get_or_create(user=request.user, ordered=False)
    if not order.items.filter(product__slug=slug).exists():
        order.items.add(order_item)
    return redirect('store:cart')


def remove_from_cart(request, slug):
    product = get_object_or_404(Product, slug=slug)
    order_qs = Order.objects.filter(user=request.user, ordered=False)
    if order_qs.exists():
        order = order_qs.first()
        order_item = OrderItem.objects.get(
            user=request.user, product=product, ordered=False
        )
        order.items.remove(order_item)
    return redirect('store:cart')


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
            success_url=request.build_absolute_uri('/success/'),
            cancel_url=request.build_absolute_uri('/cancelled/'),
        )
        return JsonResponse({'id': session.id})


def success(request):
    order = Order.objects.get(user=request.user, ordered=False)
    order.ordered = True
    order.save()
    return render(request, 'success.html')


def cancelled(request):
    return render(request, 'cancelled.html')
