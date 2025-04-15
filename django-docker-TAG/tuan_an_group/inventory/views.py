from django.conf import settings
from django.shortcuts import render, redirect
from django.contrib import messages

def index(request):
    return render(request, 'inventory_dashboard.html')