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

class PA_InventoryStockSerializer(serializers.ModelSerializer):
    STT = serializers.SerializerMethodField()
    ten_hang = serializers.SerializerMethodField()

    def get_STT(self, obj):
        # Lấy index từ context và cộng 1 để bắt đầu từ 1
        return self.context['index'] + 1
    
    def get_ten_hang(self, obj):
        # Fetch ten_hang from TB_INVENTORY_CATEGORIES based on ma_hang
        category = PA_INVENTORY_CATEGORIES.objects.filter(ma_hang=obj.ma_hang).first()
        return category.ten_hang if category else 'N/A'

    class Meta:
        model = PA_INVENTORY_STOCK_RECEIVED_ISSSUED_RETURNED
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