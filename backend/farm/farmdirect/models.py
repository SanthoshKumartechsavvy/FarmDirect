from django.conf import settings
from django.contrib.auth.models import (
    AbstractBaseUser,
    BaseUserManager,
    PermissionsMixin,
)
from django.core.validators import RegexValidator
from django.db import models

phone_regex = RegexValidator(
    regex=r"^\d{10}$", message="Phone number must be 10 digits only."
)

class UserManager(BaseUserManager):
    def create_user(self, phone_number):
        if not phone_number:
            raise ValueError("Users must have a phone number")
        user = self.model(phone_number=phone_number)
        user.set_unusable_password()  # No password required
        user.save(using=self._db)
        return user

    def create_superuser(self, phone_number, password=None):
        user = self.create_user(phone_number=phone_number)
        user.is_active = True
        user.is_staff = True
        user.is_superuser = True
        # Optionally, set a password for superusers
        if password:
            user.set_password(password)
        user.save(using=self._db)
        return user

class UserModel(AbstractBaseUser, PermissionsMixin):
    phone_number = models.CharField(
        unique=True, max_length=10, null=False, blank=False, validators=[phone_regex]
    )
    otp = models.CharField(max_length=6)
    otp_expiry = models.DateTimeField(blank=True, null=True)
    max_otp_try = models.IntegerField(default=settings.MAX_OTP_TRY)
    otp_max_out = models.DateTimeField(blank=True, null=True)

    is_active = models.BooleanField(default=False)
    is_staff = models.BooleanField(default=False)
    user_registered_at = models.DateTimeField(auto_now_add=True)

    USERNAME_FIELD = "phone_number"

    objects = UserManager()

    def __str__(self):
        return self.phone_number

class UserProfile(models.Model):
    USER_ROLES = (
        ('farmer', 'Farmer'),
        ('buyer', 'Buyer'),
    )
    
    user = models.OneToOneField(
        UserModel,
        related_name="profile",
        on_delete=models.CASCADE,
        primary_key=True, 
    )
    username = models.CharField(max_length=50, unique=True, null = True, default="default_username")
    role = models.CharField(
        max_length=10,
        choices=USER_ROLES,
        default='farmer',
        null=False,
        blank=False
    )
    
    def __str__(self):
        return f"{self.user.phone_number} - {self.role}"
    
class Product(models.Model):
    CATEGORY_CHOICES = (
        ('vegetables', 'Vegetables'),
        ('fruits', 'Fruits'),
        ('dairy', 'Dairy'),
        ('grains', 'Grains'),
        # Add more categories as needed
    )
    
    name = models.CharField(max_length=100)
    description = models.TextField()
    price = models.DecimalField(max_digits=10, decimal_places=2)
    quantity = models.PositiveIntegerField()
    category = models.CharField(max_length=20, choices=CATEGORY_CHOICES)
    farmer = models.ForeignKey(UserProfile, on_delete=models.CASCADE, related_name='products')

    def __str__(self):
        return f"{self.name} by {self.farmer.username}"

class Order(models.Model):
    STATUS_CHOICES = (
        ('pending', 'Pending'),
        ('shipped', 'Shipped'),
        ('delivered', 'Delivered'),
        ('cancelled', 'Cancelled'),
    )
    
    buyer = models.ForeignKey(UserProfile, on_delete=models.CASCADE, related_name='orders')
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField()
    total_price = models.DecimalField(max_digits=10, decimal_places=2)
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default='pending')
    order_date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Order #{self.id} by {self.buyer.username}"