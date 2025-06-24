from rest_framework import serializers
from .models_LA import LA_CLIENT_CATEGORIES
from .models_LA import LA_SUPPLIER_CATEGORIES
from .models_LA import LA_INVENTORY_STOCK_RECEIVED_ISSSUED_RETURNED

class LAClientCategoriesSerializer(serializers.ModelSerializer):
    class Meta:
        model = LA_CLIENT_CATEGORIES
        fields = '__all__'

class LASupplierCategoriesSerializer(serializers.ModelSerializer):
    class Meta:
        model = LA_SUPPLIER_CATEGORIES
        fields = '__all__'
# ==============================================================================
# INVENTORY_STOCK_RECEIVED_ISSSUED_RETURNED
# ==============================================================================

class LA_InventoryStockReceivedIssuedReturnedSerializer(serializers.ModelSerializer):
    class Meta:
        model = LA_INVENTORY_STOCK_RECEIVED_ISSSUED_RETURNED
        fields = '__all__'  # Lấy tất cả các trường trong model