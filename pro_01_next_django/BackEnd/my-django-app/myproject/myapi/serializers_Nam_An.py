from rest_framework import serializers
from .models_Nam_An import NAMAN_CLIENT_CATEGORIES
from .models_Nam_An import NAMAN_SUPPLIER_CATEGORIES
from .models_Nam_An import NAMAN_INVENTORY_CATEGORIES
from .models_Nam_An import NAMAN_INVENTORY_STOCK_RECEIVED_ISSSUED_RETURNED

class NAMANClientCategoriesSerializer(serializers.ModelSerializer):
    class Meta:
        model = NAMAN_CLIENT_CATEGORIES
        fields = '__all__'

class NAMANSupplierCategoriesSerializer(serializers.ModelSerializer):
    class Meta:
        model = NAMAN_SUPPLIER_CATEGORIES
        fields = '__all__'

class NAMANInventoryCategoriesSerializer(serializers.ModelSerializer):
    class Meta:
        model = NAMAN_INVENTORY_CATEGORIES
        fields = ['ma_hang', 'ten_hang', 'dvt']

class NAMAN_InventoryStockReceivedIssuedReturnedSerializer(serializers.ModelSerializer):
    class Meta:
        model = NAMAN_INVENTORY_STOCK_RECEIVED_ISSSUED_RETURNED
        fields = '__all__'  # Lấy tất cả các trường trong model

