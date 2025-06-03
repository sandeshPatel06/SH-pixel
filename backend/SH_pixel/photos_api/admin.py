from django.contrib import admin
from .models import Photo, Album

@admin.register(Photo)
class PhotoAdmin(admin.ModelAdmin):
    list_display = ('title', 'owner', 'is_favorite', 'uploaded_at')
    list_filter = ('is_favorite', 'uploaded_at', 'owner')
    search_fields = ('title', 'description', 'tags__icontains')

@admin.register(Album)
class AlbumAdmin(admin.ModelAdmin):
    list_display = ('name', 'owner', 'date_created')
    list_filter = ('date_created', 'owner')
    search_fields = ('name', 'description')
    filter_horizontal = ('photos',) # For many-to-many relationship