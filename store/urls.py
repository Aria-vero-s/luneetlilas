from django.urls import path
from django.views.generic import TemplateView
from .views import (
    ProductListView, ProductDetailView, CartView, CheckoutView,
    add_to_cart, remove_from_cart,
    CreateCheckoutSessionView, success, cancelled
)

urlpatterns = [
    # 1) Homepage
    path('', TemplateView.as_view(template_name='index.html'), name='home'),

    # 2) Products listing
    path('products/', ProductListView.as_view(), name='product_list'),
    path('products/product/<slug:slug>/', ProductDetailView.as_view(), name='product_detail'),

    # cart & checkout
    path('products/cart/', CartView.as_view(), name='cart'),
    path('products/checkout/', CheckoutView.as_view(), name='checkout'),

    # stripe
    path('products/create-checkout-session/', CreateCheckoutSessionView.as_view(), name='create_checkout_session'),
    path('products/success/', success, name='success'),
    path('products/cancelled/', cancelled, name='cancelled'),

    # add/remove
    path('products/add-to-cart/<slug:slug>/', add_to_cart, name='add_to_cart'),
    path('products/remove-from-cart/<slug:slug>/', remove_from_cart, name='remove_from_cart'),
]
