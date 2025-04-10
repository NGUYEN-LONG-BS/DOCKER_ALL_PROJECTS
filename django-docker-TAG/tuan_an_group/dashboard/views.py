from django.conf import settings
from django.shortcuts import render

def index(request):
    # Pass MEDIA_URL to the context
    context = {
        'MEDIA_URL': settings.MEDIA_URL
    }
    return render(request, 'dashboard/index.html', context)
