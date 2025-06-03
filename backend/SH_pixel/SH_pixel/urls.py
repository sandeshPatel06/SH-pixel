from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static

# photogallery_backend/urls.py
from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('photos_api.urls')),
    path('api/auth/', include('rest_framework.urls')),
    path('api/auth/', include('users_auth.urls')), # This line includes your OTP app's URLs
]
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)