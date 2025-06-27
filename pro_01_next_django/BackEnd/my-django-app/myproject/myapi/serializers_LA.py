from rest_framework import serializers
from .models_LA import LA_CLIENT_CATEGORIES
from .models_LA import LA_SUPPLIER_CATEGORIES
from .models_LA import LA_INVENTORY_CATEGORIES
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

class LAInventoryCategoriesSerializer(serializers.ModelSerializer):
    class Meta:
        model = LA_INVENTORY_CATEGORIES
        fields = ['ma_hang', 'ten_hang', 'dvt']

class LA_InventoryStockReceivedIssuedReturnedSerializer(serializers.ModelSerializer):
    class Meta:
        model = LA_INVENTORY_STOCK_RECEIVED_ISSSUED_RETURNED
        fields = '__all__'  # Lấy tất cả các trường trong model

class LA_InventoryStockSerializer(serializers.ModelSerializer):
    STT = serializers.SerializerMethodField()
    ten_hang = serializers.SerializerMethodField()

    def get_STT(self, obj):
        # Lấy index từ context và cộng 1 để bắt đầu từ 1
        return self.context['index'] + 1
    
    def get_ten_hang(self, obj):
        # Fetch ten_hang from TB_INVENTORY_CATEGORIES based on ma_hang
        category = LA_INVENTORY_CATEGORIES.objects.filter(ma_hang=obj.ma_hang).first()
        return category.ten_hang if category else 'N/A'

    class Meta:
        model = LA_INVENTORY_STOCK_RECEIVED_ISSSUED_RETURNED
        fields = [
            'STT',
            'so_phieu',
            'ngay_tren_phieu',
            'so_phieu_de_nghi',
            'ma_doi_tuong',
            'ma_hang',
            'ten_hang',
            'so_luong',
            'ma_kho_nhan',
        ]