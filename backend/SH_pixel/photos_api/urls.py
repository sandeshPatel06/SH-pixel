from rest_framework.routers import DefaultRouter
from .views import PhotoViewSet, AlbumViewSet

router = DefaultRouter()
router.register(r'photos', PhotoViewSet)
router.register(r'albums', AlbumViewSet)

urlpatterns = router.urls