from django.urls import path
from .views import home, music_management, delete_music, delete_file
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path("", home, name="home"),  # Maps the root URL to the home view
    path("music_management/", music_management, name="music_management"),
    path("delete_music/", delete_music, name="delete_music"),
    path("delete-file/<int:file_id>/", delete_file, name="delete_file"),
] + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)

urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
