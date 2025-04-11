from django.conf import settings
from django.shortcuts import render

def index(request):
    return render(request, 'home.html')

def DashboardBPVatTu(request):
    # Pass MEDIA_URL to the context
    context = {
        'MEDIA_URL': settings.MEDIA_URL
    }
    # Render a template or return a response
    return render(request, 'dashboard/DashboardBPVatTu.html', context)

def DashboardBPKinhDoanh(request):
    # Pass MEDIA_URL to the context
    context = {
        'MEDIA_URL': settings.MEDIA_URL
    }
    # Render a template or return a response
    return render(request, 'dashboard/DashboardBPKinhDoanh.html', context)

def template_01(request):
    # Render a template or return a response
    return render(request, './template_01.html')

def home(request):
    # Pass MEDIA_URL to the context
    context = {
        'MEDIA_URL': settings.MEDIA_URL
    }
    return render(request, 'home.html', context)

def DashboardAllDepartment(request):
    # Pass MEDIA_URL to the context
    context = {
        'MEDIA_URL': settings.MEDIA_URL
    }
    return render(request, 'dashboard/DashboardAllDepartment.html', context)
