from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from django.db.models import Q
from .models import Photo, Album
from .serializers import PhotoSerializer, AlbumSerializer
from rest_framework.permissions import IsAuthenticatedOrReadOnly, IsAuthenticated

class PhotoViewSet(viewsets.ModelViewSet):
    queryset = Photo.objects.all().order_by('-uploaded_at')
    serializer_class = PhotoSerializer
    permission_classes = [IsAuthenticatedOrReadOnly] # Allow read for anyone, write for authenticated

    def get_queryset(self):
        if self.request.user.is_authenticated:
            return Photo.objects.filter(owner=self.request.user).order_by('-uploaded_at')
        return Photo.objects.none() # Or filter by public status if you have one

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)

    @action(detail=False, methods=['get'])
    def favorites(self, request):
        if request.user.is_authenticated:
            favorite_photos = self.get_queryset().filter(is_favorite=True)
            serializer = self.get_serializer(favorite_photos, many=True)
            return Response(serializer.data)
        return Response({"detail": "Authentication credentials were not provided."}, status=status.HTTP_401_UNAUTHORIZED)

    @action(detail=True, methods=['post'])
    def toggle_favorite(self, request, pk=None):
        photo = self.get_object()
        photo.is_favorite = not photo.is_favorite
        photo.save()
        return Response({'is_favorite': photo.is_favorite})

    @action(detail=False, methods=['get'])
    def search(self, request):
        query = request.query_params.get('q', '')
        if not query:
            return Response({"detail": "Please provide a search query."}, status=status.HTTP_400_BAD_REQUEST)

        # Search by title, description, and tags
        search_results = self.get_queryset().filter(
            Q(title__icontains=query) |
            Q(description__icontains=query) |
            Q(tags__icontains=query)
        ).distinct()
        
        serializer = self.get_serializer(search_results, many=True)
        return Response(serializer.data)

class AlbumViewSet(viewsets.ModelViewSet):
    queryset = Album.objects.all().order_by('-date_created')
    serializer_class = AlbumSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]

    def get_queryset(self):
        if self.request.user.is_authenticated:
            return Album.objects.filter(owner=self.request.user).order_by('-date_created')
        return Album.objects.none()

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)

    @action(detail=True, methods=['post'])
    def add_photo(self, request, pk=None):
        album = self.get_object()
        photo_id = request.data.get('photo_id')
        if not photo_id:
            return Response({'detail': 'photo_id is required'}, status=status.HTTP_400_BAD_REQUEST)
        
        try:
            photo = Photo.objects.get(id=photo_id, owner=request.user)
            album.photos.add(photo)
            return Response({'detail': 'Photo added to album'}, status=status.HTTP_200_OK)
        except Photo.DoesNotExist:
            return Response({'detail': 'Photo not found or does not belong to user'}, status=status.HTTP_404_NOT_FOUND)

    @action(detail=True, methods=['post'])
    def remove_photo(self, request, pk=None):
        album = self.get_object()
        photo_id = request.data.get('photo_id')
        if not photo_id:
            return Response({'detail': 'photo_id is required'}, status=status.HTTP_400_BAD_REQUEST)
        
        try:
            photo = Photo.objects.get(id=photo_id, owner=request.user)
            album.photos.remove(photo)
            return Response({'detail': 'Photo removed from album'}, status=status.HTTP_200_OK)
        except Photo.DoesNotExist:
            return Response({'detail': 'Photo not found or does not belong to user'}, status=status.HTTP_404_NOT_FOUND)