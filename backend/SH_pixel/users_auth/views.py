# users_auth/views.py

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.core.mail import send_mail
from django.conf import settings
from django.utils import timezone
from rest_framework.permissions import IsAuthenticated # <--- Import IsAuthenticated
from rest_framework.parsers import MultiPartParser, FormParser # <--- For file uploads

from .serializers import RequestOtpSerializer, VerifyOtpSerializer, UserSerializer, UserProfileSerializer # <--- Update this import
from .models import OneTimePassword, UserProfile

from django.contrib.auth import get_user_model
from rest_framework.authtoken.models import Token

User = get_user_model()

class RequestOtpView(APIView):
    # ... (existing code for RequestOtpView) ...
    def post(self, request):
        serializer = RequestOtpSerializer(data=request.data)
        if serializer.is_valid():
            email = serializer.validated_data['email']

            otp_obj, created = OneTimePassword.objects.get_or_create(email=email)
            otp_obj.generate_otp()

            subject = 'Your Photo Gallery OTP'
            message = f'Your One-Time Password (OTP) is: {otp_obj.otp_code}\nIt is valid for 5 minutes.'
            from_email = settings.DEFAULT_FROM_EMAIL
            recipient_list = [email]

            try:
                send_mail(subject, message, from_email, recipient_list, fail_silently=False)
                return Response({'message': 'OTP sent successfully to your email.'}, status=status.HTTP_200_OK)
            except Exception as e:
                print(f"Error sending email: {e}")
                return Response({'error': 'Failed to send OTP. Please try again later.'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class VerifyOtpView(APIView):
    # ... (existing code for VerifyOtpView) ...
    def post(self, request):
        serializer = VerifyOtpSerializer(data=request.data)
        if serializer.is_valid():
            email = serializer.validated_data['email']
            otp_code = serializer.validated_data['otp']

            try:
                otp_obj = OneTimePassword.objects.get(email=email)
            except OneTimePassword.DoesNotExist:
                return Response({'error': 'Invalid email or OTP.'}, status=status.HTTP_400_BAD_REQUEST)

            if otp_obj.otp_code == otp_code and otp_obj.is_valid():
                user, created = User.objects.get_or_create(
                    email=email,
                    defaults={'username': email.split('@')[0]}
                )
                token, created = Token.objects.get_or_create(user=user)
                otp_obj.delete()

                user_serializer = UserSerializer(user)

                return Response({
                    'message': 'OTP verified successfully. Login granted.',
                    'user': user_serializer.data,
                    'token': token.key
                }, status=status.HTTP_200_OK)
            else:
                if not otp_obj.is_valid():
                    return Response({'error': 'OTP has expired.'}, status=status.HTTP_400_BAD_REQUEST)
                else:
                    return Response({'error': 'Invalid OTP.'}, status=status.HTTP_400_BAD_REQUEST)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# New ProfileSetupView
class ProfileSetupView(APIView):
    permission_classes = [IsAuthenticated] # User must be logged in to access this
    parser_classes = [MultiPartParser, FormParser] # Required for file uploads (avatar)

    def post(self, request, *args, **kwargs):
        user = request.user # The authenticated user

        # Access the user's profile
        try:
            profile = user.profile
        except UserProfile.DoesNotExist:
            # This case should ideally not happen due to the post_save signal
            profile = UserProfile.objects.create(user=user)

        # Use UserProfileSerializer to validate and save data
        # partial=True allows for PATCH-like updates if not all fields are sent
        # (though frontend sends all, it's good practice)
        serializer = UserProfileSerializer(profile, data=request.data, partial=True)

        if serializer.is_valid():
            serializer.save()

            # Set is_profile_complete to True after successful setup
            profile.is_profile_complete = True
            profile.save()

            # Re-serialize the user to include the updated profile status
            user_serializer = UserSerializer(user)
            # Retrieve the token
            token = Token.objects.get(user=user)

            return Response({
                'message': 'Profile setup successfully.',
                'user': user_serializer.data,
                'token': token.key # Return the existing token
            }, status=status.HTTP_200_OK)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)