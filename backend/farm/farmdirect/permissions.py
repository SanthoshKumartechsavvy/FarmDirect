from rest_framework.permissions import BasePermission

class IsFarmer(BasePermission):
    def has_permission(self, request, view):
        # Check if the user is authenticated and their role is 'farmer'
        return request.user.is_authenticated and request.user.profile.role == 'farmer'

class IsBuyer(BasePermission):
    def has_permission(self, request, view):
        # Check if the user is authenticated and their role is 'buyer'
        return request.user.is_authenticated and request.user.profile.role == 'buyer'