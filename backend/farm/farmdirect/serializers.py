from datetime import datetime, timedelta
import random
from django.conf import settings
from rest_framework import serializers
from farmdirect.utils import send_otp
from .models import UserModel, UserProfile

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
