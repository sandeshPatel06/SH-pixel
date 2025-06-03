# users_auth/urls.py

from django.urls import path
from .views import RequestOtpView, VerifyOtpView # <--- Update this import

urlpatterns = [
    path('request-otp/', RequestOtpView.as_view(), name='request-otp'),
    path('verify-otp/', VerifyOtpView.as_view(), name='verify-otp'), # <--- Add this line
]