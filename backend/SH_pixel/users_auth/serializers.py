# users_auth/serializers.py

from rest_framework import serializers
from django.contrib.auth import get_user_model
from .models import OneTimePassword, UserProfile

User = get_user_model()

class RequestOtpSerializer(serializers.Serializer):
    email = serializers.EmailField()

class VerifyOtpSerializer(serializers.Serializer):
    email = serializers.EmailField()
    otp = serializers.CharField(max_length=6)

# Updated UserProfileSerializer
# class UserProfileSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = UserProfile
#         fields = ['name', 'phone', 'gender', 'avatar', 'is_profile_complete'] # <--- Updated fields
#         read_only_fields = ['is_profile_complete'] # This field will be set by the backend

# # UserSerializer (already includes isProfileComplete from UserProfile)
# class UserSerializer(serializers.ModelSerializer):
#     isProfileComplete = serializers.BooleanField(source='profile.is_profile_complete', read_only=True)
#     # If you want to include other profile details in the user object during login:
#     # profile_details = UserProfileSerializer(source='profile', read_only=True)

#     class Meta:
#         model = User
#         fields = ['id', 'email', 'isProfileComplete']
#         # If including profile_details: fields = ['id', 'email', 'isProfileComplete', 'profile_details']
#         read_only_fields = ['email']
class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProfile
        fields = ['name', 'phone', 'gender', 'avatar', 'is_profile_complete']
        read_only_fields = ['is_profile_complete']

# --- Make sure your UserSerializer includes profile_details ---
class UserSerializer(serializers.ModelSerializer):
    isProfileComplete = serializers.BooleanField(source='profile.is_profile_complete', read_only=True)
    # This nests the profile details directly into the user object
    profile_details = UserProfileSerializer(source='profile', read_only=True) # <--- IMPORTANT: ADD THIS LINE

    class Meta:
        model = User
        fields = ['id', 'email', 'isProfileComplete', 'profile_details'] # <--- IMPORTANT: ADD 'profile_details'
        read_only_fields = ['email']