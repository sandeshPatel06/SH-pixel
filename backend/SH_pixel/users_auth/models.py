# users_auth/models.py

from django.db import models
from django.conf import settings
from django.utils import timezone
import random
import string

from django.contrib.auth import get_user_model
from django.db.models.signals import post_save
from django.dispatch import receiver

# Get the active user model
User = get_user_model()

class OneTimePassword(models.Model):
    email = models.EmailField(unique=True)
    otp_code = models.CharField(max_length=6, blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    expires_at = models.DateTimeField(blank=True, null=True)

    def generate_otp(self):
        self.otp_code = ''.join(random.choices(string.digits, k=6))
        self.expires_at = timezone.now() + timezone.timedelta(minutes=5)
        self.save()

    def is_valid(self):
        return self.expires_at > timezone.now()

    def __str__(self):
        return f"OTP for {self.email}"


class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='profile')
    name = models.CharField(max_length=255, blank=True, null=True)     # <--- New field
    phone = models.CharField(max_length=20, blank=True, null=True)    # <--- New field
    GENDER_CHOICES = [                                                # <--- New field
        ('male', 'Male'),
        ('female', 'Female'),
        ('other', 'Other'),
    ]
    gender = models.CharField(max_length=10, choices=GENDER_CHOICES, default='other') # <--- New field
    avatar = models.ImageField(upload_to='avatars/', blank=True, null=True) # <--- New field
    is_profile_complete = models.BooleanField(default=False)

    def __str__(self):
        return f"Profile for {self.user.email}"

@receiver(post_save, sender=User)
def create_or_update_user_profile(sender, instance, created, **kwargs):
    if created:
        UserProfile.objects.create(user=instance)
    # The profile might need to be updated in case the user model itself changes,
    # but for simplicity, we focus on creation here.