from django.db import models
from django.contrib.auth.models import User

class Product(models.Model):
    name        = models.CharField(max_length=200)
    slug        = models.SlugField(unique=True)
    description = models.TextField()
    price       = models.DecimalField(max_digits=8, decimal_places=2)
    image       = models.ImageField(upload_to='products/')
    available   = models.BooleanField(default=True)

    def __str__(self):
        return self.name

class OrderItem(models.Model):
    user     = models.ForeignKey(User, on_delete=models.CASCADE)
    product  = models.ForeignKey(Product, on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField(default=1)
    ordered  = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.quantity} x {self.product.name}"

class Order(models.Model):
    user         = models.ForeignKey(User, on_delete=models.CASCADE)
    items        = models.ManyToManyField(OrderItem)
    ordered_date = models.DateTimeField(auto_now_add=True)
    ordered      = models.BooleanField(default=False)

    def get_total(self):
        return sum(item.quantity * item.product.price for item in self.items.all())

    def __str__(self):
        return f"Order {self.id} by {self.user.username}"
