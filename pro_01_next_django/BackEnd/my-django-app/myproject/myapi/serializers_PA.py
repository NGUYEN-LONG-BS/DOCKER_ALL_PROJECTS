from rest_framework import serializers
from .models_PA import PA_CLIENT_CATEGORIES
from .models_PA import PA_SUPPLIER_CATEGORIES
from .models_PA import PA_INVENTORY_CATEGORIES
from .models_PA import PA_INVENTORY_STOCK_RECEIVED_ISSSUED_RETURNED

class PAClientCategoriesSerializer(serializers.ModelSerializer):
    class Meta:
        model = PA_CLIENT_CATEGORIES
        fields = '__all__'

class PASupplierCategoriesSerializer(serializers.ModelSerializer):
    class Meta:
        model = PA_SUPPLIER_CATEGORIES
        fields = '__all__'

class PAInventoryCategoriesSerializer(serializers.ModelSerializer):
    class Meta:
        model = PA_INVENTORY_CATEGORIES
        fields = ['ma_hang', 'ten_hang', 'dvt']

class PA_InventoryStockReceivedIssuedReturnedSerializer(serializers.ModelSerializer):
    class Meta:
        model = PA_INVENTORY_STOCK_RECEIVED_ISSSUED_RETURNED
        fields = '__all__'  # Lấy tất cả các trường trong model

