from django.db import models

class Blog(models.Model):
    title = models.CharField(max_length=200)
    image_url = models.URLField()  # Để lưu URL của hình ảnh
    short_description = models.TextField()
    content = models.TextField()

    def __str__(self):
        return self.title