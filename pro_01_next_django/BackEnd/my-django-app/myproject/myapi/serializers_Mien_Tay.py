from rest_framework import serializers
from .models_Mien_Tay import MIENTAY_CLIENT_CATEGORIES
from .models_Mien_Tay import MIENTAY_SUPPLIER_CATEGORIES
from .models_Mien_Tay import MIENTAY_INVENTORY_CATEGORIES
from .models_Mien_Tay import MIENTAY_INVENTORY_STOCK_RECEIVED_ISSSUED_RETURNED

class MIENTAYClientCategoriesSerializer(serializers.ModelSerializer):
    class Meta:
        model = MIENTAY_CLIENT_CATEGORIES
        fields = '__all__'

class MIENTAYSupplierCategoriesSerializer(serializers.ModelSerializer):
    class Meta:
        model = MIENTAY_SUPPLIER_CATEGORIES
        fields = '__all__'

class MIENTAYInventoryCategoriesSerializer(serializers.ModelSerializer):
    class Meta:
        model = MIENTAY_INVENTORY_CATEGORIES
        fields = ['ma_hang', 'ten_hang', 'dvt']

class MIENTAY_InventoryStockReceivedIssuedReturnedSerializer(serializers.ModelSerializer):
    class Meta:
        model = MIENTAY_INVENTORY_STOCK_RECEIVED_ISSSUED_RETURNED
        fields = '__all__'  # Lấy tất cả các trường trong model

