from django.urls import path
from django.views.generic import TemplateView
from .views import (
    ProductListView, ProductDetailView,
    CartView, CartAPIView, CheckoutView,
    CreateCheckoutSessionView, success, cancelled,
)

app_name = 'store'

urlpatterns = [
    # ––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
    # Landing page (index.html)
    path('', TemplateView.as_view(template_name='index.html'), name='home'),

    # Product catalog
    path('products/', ProductListView.as_view(), name='product_list'),
    path('products/<slug:slug>/', ProductDetailView.as_view(), name='product_detail'),

    # Cart page + API
    path('cart/', CartView.as_view(), name='cart'),
    path('api/cart/', CartAPIView.as_view(), name='cart_api'),

    # Checkout
    path('checkout/', CheckoutView.as_view(), name='checkout'),
    path('checkout/create-session/', CreateCheckoutSessionView.as_view(), name='create_checkout_session'),

    # Success / Cancel
    path('checkout/success/', success, name='success'),
    path('checkout/cancelled/', cancelled, name='cancelled'),
]