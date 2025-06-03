# users_auth/models.py

from django.db import models
from django.conf import settings
from django.utils import timezone
import random
import string

class OneTimePassword(models.Model):
    email = models.EmailField(unique=True)
    otp_code = models.CharField(max_length=6, blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    expires_at = models.DateTimeField(blank=True, null=True)

    def generate_otp(self):
        # Generate a 6-digit OTP
        self.otp_code = ''.join(random.choices(string.digits, k=6))
        # Set expiry time (e.g., 5 minutes from now)
        self.expires_at = timezone.now() + timezone.timedelta(minutes=5)
        self.save()

    def is_valid(self):
        return self.expires_at > timezone.now()

    def __str__(self):
        return f"OTP for {self.email}"