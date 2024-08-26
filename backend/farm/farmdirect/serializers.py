from datetime import datetime, timedelta
import random
from django.conf import settings
from rest_framework import serializers
from farmdirect.utils import send_otp
from .models import UserModel, UserProfile, Product, Order
from django.contrib.auth import authenticate

class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProfile
        fields = ('username', 'role')

class UserSerializer(serializers.ModelSerializer):
    profile = UserProfileSerializer()
    
    class Meta:
        model = UserModel
        fields = (
            "id",
            "phone_number",
            "profile",
        )
        read_only_fields = ("id",)

    def create(self, validated_data):
        profile_data = validated_data.pop('profile')
        otp = random.randint(1000, 9999)
        otp_expiry = datetime.now() + timedelta(minutes=10)

        user = UserModel(
            phone_number=validated_data["phone_number"],
            otp=otp,
            otp_expiry=otp_expiry,
            max_otp_try=settings.MAX_OTP_TRY
        )
        user.save()
        
        UserProfile.objects.create(user=user, **profile_data)
        
        send_otp(validated_data["phone_number"], otp)
        return user
    
class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = '__all__'

class OrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = '__all__'
        
        
        
class LoginSerializer(serializers.Serializer):
    phone_number = serializers.CharField()
    otp = serializers.CharField(write_only=True)

    def validate(self, data):
        phone_number = data.get('phone_number')
        otp = data.get('otp')

        # Authenticate the user
        user = UserModel.objects.filter(phone_number=phone_number, otp=otp).first()

        if user and user.is_active:
            return user
        else:
            raise serializers.ValidationError("Invalid credentials or user not active.")