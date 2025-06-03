# photogallery_backend/urls.py

from django.contrib import admin
from django.urls import path, include
from django.conf import settings # <--- Add this
from django.conf.urls.static import static # <--- Add this

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/auth/', include('users_auth.urls')),
    path('api/', include('photos_api.urls')),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)