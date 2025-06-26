from rest_framework import serializers
from .models_Ha_Noi import HANOI_CLIENT_CATEGORIES
from .models_Ha_Noi import HANOI_SUPPLIER_CATEGORIES
from .models_Ha_Noi import HANOI_INVENTORY_CATEGORIES
from .models_Ha_Noi import HANOI_INVENTORY_STOCK_RECEIVED_ISSSUED_RETURNED

class HANOIClientCategoriesSerializer(serializers.ModelSerializer):
    class Meta:
        model = HANOI_CLIENT_CATEGORIES
        fields = '__all__'

class HANOISupplierCategoriesSerializer(serializers.ModelSerializer):
    class Meta:
        model = HANOI_SUPPLIER_CATEGORIES
        fields = '__all__'

class HANOIInventoryCategoriesSerializer(serializers.ModelSerializer):
    class Meta:
        model = HANOI_INVENTORY_CATEGORIES
        fields = ['ma_hang', 'ten_hang', 'dvt']

class HANOI_InventoryStockReceivedIssuedReturnedSerializer(serializers.ModelSerializer):
    class Meta:
        model = HANOI_INVENTORY_STOCK_RECEIVED_ISSSUED_RETURNED
        fields = '__all__'  # Lấy tất cả các trường trong model

