from django.contrib import admin
from .models import Product, Category
from import_export import resources
from import_export.admin import ExportMixin

# Tạo resource cho Product
class ProductResource(resources.ModelResource):
    class Meta:
        model = Product

class ProductAdmin(ExportMixin, admin.ModelAdmin):
    resource_class = ProductResource

admin.site.register(Product, ProductAdmin)
admin.site.register(Category)

