from django.contrib import admin
from .models import LoginInfo, UserPermission

admin.site.register(LoginInfo)
admin.site.register(UserPermission)