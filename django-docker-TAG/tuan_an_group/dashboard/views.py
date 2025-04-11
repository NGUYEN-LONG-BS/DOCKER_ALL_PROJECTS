from django.conf import settings
from django.shortcuts import render

def index(request):
    # Pass MEDIA_URL to the context
    context = {
        'MEDIA_URL': settings.MEDIA_URL
    }
    return render(request, 'dashboard/index.html', context)

def bp_kho(request):
    # Render a template or return a response for BP KHO
    return render(request, 'dashboard/bp_kho.html')  # Replace 'bp_kho.html' with the actual template you want to render

def DashboardBPKinhDoanh(request):
    # Render a template or return a response for BP KHO
    return render(request, 'dashboard/DashboardBPKinhDoanh.html')  # Replace 'bp_kho.html' with the actual template you want to render

def template_01(request):
    # Render a template or return a response for BP KHO
    return render(request, './template_01.html')

def home(request):
    return render(request, 'home.html')