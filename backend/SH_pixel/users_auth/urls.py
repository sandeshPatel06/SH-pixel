# users_auth/urls.py

from django.urls import path
from .views import RequestOtpView, VerifyOtpView, ProfileSetupView # <--- Import ProfileSetupView

urlpatterns = [
    path('request-otp/', RequestOtpView.as_view(), name='request-otp'),
    path('verify-otp/', VerifyOtpView.as_view(), name='verify-otp'),
    path('setup-profile/', ProfileSetupView.as_view(), name='setup-profile'), # <--- New URL
]