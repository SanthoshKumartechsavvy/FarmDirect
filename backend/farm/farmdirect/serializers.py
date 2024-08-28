from datetime import datetime, timedelta
import random
from django.conf import settings
from rest_framework import serializers
from farmdirect.utils import send_otp
from .models import UserModel, UserProfile, Product, Order
from django.contrib.auth import authenticate
from django.contrib.auth.hashers import make_password

class UserProfileSerializer(serializers.ModelSerializer):
    profile_picture = serializers.ImageField(required=False)
    class Meta:
        model = UserProfile
        fields = ('username', 'role', 'profile_picture')
    def update(self, instance, validated_data):
        # Handle updates here
        instance.profile_pic = validated_data.get('profile_pic', instance.profile_pic)
        instance.save()
        return instance
class UserSerializer(serializers.ModelSerializer):
    profile = UserProfileSerializer()
    password = serializers.CharField(write_only=True, required=True)
    class Meta:
        model = UserModel
        fields = (
            "id",
            "phone_number",
            "password",
            "profile",
        )
        read_only_fields = ("id",)

    

    def create(self, validated_data):
        profile_data = validated_data.pop('profile')
        phone_number = validated_data.get("phone_number")
        password = make_password(validated_data.pop('password'))  # Ensure password is hashed

        # Create user
        user, created = UserModel.objects.get_or_create(
            phone_number=phone_number,
            defaults={
                'password': password,
                'otp': random.randint(1000, 9999),
                'otp_expiry': datetime.now() + timedelta(minutes=10),
                'max_otp_try': settings.MAX_OTP_TRY
            }
        )

        if created:
            send_otp(phone_number, user.otp)

        # Update or create the profile
        UserProfile.objects.update_or_create(
            user=user,
            defaults=profile_data
        )

        return user  

    def update(self, instance, validated_data):
        profile_data = validated_data.pop('profile', None)
        password = validated_data.pop('password', None)
        # Update the user instance
        if password:
            instance.password = make_password(password)  # Hash the new password
        instance.phone_number = validated_data.get('phone_number', instance.phone_number)
        instance.save()

        # Update the nested profile data
        if profile_data:
            profile, created = UserProfile.objects.get_or_create(user=instance)
            profile.username = profile_data.get('username', profile.username)
            profile.role = profile_data.get('role', profile.role)
            profile.save()

        return instance

class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = '__all__'

class OrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = '__all__'
        
from django.contrib.auth import authenticate

class LoginSerializer(serializers.Serializer):
    phone_number = serializers.CharField()
    password = serializers.CharField(write_only=True)

    def validate(self, data):
        phone_number = data.get('phone_number')
        password = data.get('password')

        # Authenticate the user
        print(f"Attempting to authenticate user with phone_number: {phone_number} and password: {password}")
        user = authenticate(username=phone_number, password=password)
        
        if user:
            print("User authenticated successfully.")
            if user.is_active:
                return user
            else:
                print("User is not active.")
        else:
            print("Invalid credentials provided.")

        raise serializers.ValidationError("Invalid credentials or user not active.")
