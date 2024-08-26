from django.contrib import admin


from .models import UserModel, UserProfile, Product, Order


admin.site.register(UserModel)
admin.site.register(UserProfile)
admin.site.register(Product)
admin.site.register(Order)
