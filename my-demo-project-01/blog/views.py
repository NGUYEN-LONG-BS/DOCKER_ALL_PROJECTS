from django.conf import settings
from django.shortcuts import render, redirect
from django.http import HttpResponse


def index(request):
    # return HttpResponse("Hello, world. This is Django with Docker.")
    # return render(request, 'start_django_with_docker.html')
    return render(request, 'home.html')

def django_guidance(request):
    return render(request, 'start_django_with_docker.html')