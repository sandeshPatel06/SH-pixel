# users_auth/views.py

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.core.mail import send_mail
from django.conf import settings
from django.utils import timezone

from .serializers import RequestOtpSerializer, VerifyOtpSerializer # Ensure both are imported
from .models import OneTimePassword

class RequestOtpView(APIView):
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
    def post(self, request):
        serializer = VerifyOtpSerializer(data=request.data)
        if serializer.is_valid():
            email = serializer.validated_data['email']
            otp_code = serializer.validated_data['otp'] 

            try:
                otp_obj = OneTimePassword.objects.get(email=email)
            except OneTimePassword.DoesNotExist:
                return Response({'error': 'Invalid email or OTP.'}, status=status.HTTP_400_BAD_REQUEST)

            # Check if OTP matches and is still valid
            if otp_obj.otp_code == otp_code and otp_obj.is_valid():
                otp_obj.delete() # Or set a 'used' flag
                return Response({'message': 'OTP verified successfully.'}, status=status.HTTP_200_OK)
            else:
                if not otp_obj.is_valid():
                    return Response({'error': 'OTP has expired.'}, status=status.HTTP_400_BAD_REQUEST)
                else:
                    return Response({'error': 'Invalid OTP.'}, status=status.HTTP_400_BAD_REQUEST)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)