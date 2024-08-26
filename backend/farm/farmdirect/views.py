import random
from datetime import timedelta
from rest_framework import generics, status, viewsets, permissions
from rest_framework.decorators import action
from rest_framework.response import Response
from django.utils import timezone
from django.conf import settings
from rest_framework_simplejwt.tokens import RefreshToken
from farmdirect.utils import send_otp
from .models import UserModel, Product, Order
from .serializers import UserSerializer, ProductSerializer, OrderSerializer, LoginSerializer
from .permissions import IsFarmer, IsBuyer

class UserRegistrationView(generics.CreateAPIView):
    queryset = UserModel.objects.all()
    serializer_class = UserSerializer

class UserViewSet(viewsets.ModelViewSet):
    queryset = UserModel.objects.all()
    serializer_class = UserSerializer

    @action(detail=True, methods=["PATCH"])
    def verify_otp(self, request, pk=None):
        instance = self.get_object()
        otp = request.data.get("otp")
        if (
            not instance.is_active
            and instance.otp == otp
            and instance.otp_expiry
            and timezone.now() < instance.otp_expiry
        ):
            instance.is_active = True
            instance.otp_expiry = None
            instance.max_otp_try = settings.MAX_OTP_TRY
            instance.otp_max_out = None
            instance.save()
            return Response(
                "Successfully verified the user.", status=status.HTTP_200_OK
            )

        return Response(
            "User is already active or the OTP is incorrect.",
            status=status.HTTP_400_BAD_REQUEST,
        )

    @action(detail=True, methods=["PATCH"])
    def regenerate_otp(self, request, pk=None):
        instance = self.get_object()
        if int(instance.max_otp_try) == 0 and timezone.now() < instance.otp_max_out:
            return Response(
                "Max OTP tries reached. Please try again after an hour.",
                status=status.HTTP_400_BAD_REQUEST,
            )

        otp = random.randint(1000, 9999)
        otp_expiry = timezone.now() + timedelta(minutes=10)
        max_otp_try = int(instance.max_otp_try) - 1

        instance.otp = otp
        instance.otp_expiry = otp_expiry
        instance.max_otp_try = max_otp_try
        if max_otp_try == 0:
            # Set cool-down time
            otp_max_out = timezone.now() + timedelta(hours=1)
            instance.otp_max_out = otp_max_out
        else:
            instance.otp_max_out = None
        
        instance.save()
        send_otp(instance.phone_number, otp)
        return Response("Successfully generated a new OTP.", status=status.HTTP_200_OK)
    
class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    permission_classes = [IsFarmer]

    def perform_create(self, serializer):
        serializer.save(farmer=self.request.user.profile)

class OrderViewSet(viewsets.ModelViewSet):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer
    permission_classes = [IsBuyer]

    def perform_create(self, serializer):
        serializer.save(buyer=self.request.user.profile)
        
        
class LoginView(generics.GenericAPIView):
    serializer_class = LoginSerializer
    permission_classes = [permissions.AllowAny]

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data
        
        # Generate JWT token
        refresh = RefreshToken.for_user(user)
        return Response({
            'refresh': str(refresh),
            'access': str(refresh.access_token),
        }, status=status.HTTP_200_OK)