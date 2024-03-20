from django.db import models
from django.conf import settings


class MusicFile(models.Model):
    title = models.CharField(max_length=100, default="")
    file = models.FileField(upload_to=settings.MEDIA_ROOT)

    class Meta:
        constraints = [
            models.CheckConstraint(
                check=models.Q(title__isnull=False) & models.Q(title__gt=""),
                name="title_not_empty",
            )
        ]
