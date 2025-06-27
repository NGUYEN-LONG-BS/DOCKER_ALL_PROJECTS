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

class MIENTAY_InventoryStockSerializer(serializers.ModelSerializer):
    STT = serializers.SerializerMethodField()
    ten_hang = serializers.SerializerMethodField()

    def get_STT(self, obj):
        # Lấy index từ context và cộng 1 để bắt đầu từ 1
        return self.context['index'] + 1
    
    def get_ten_hang(self, obj):
        # Fetch ten_hang from TB_INVENTORY_CATEGORIES based on ma_hang
        category = MIENTAY_INVENTORY_CATEGORIES.objects.filter(ma_hang=obj.ma_hang).first()
        return category.ten_hang if category else 'N/A'

    class Meta:
        model = MIENTAY_INVENTORY_STOCK_RECEIVED_ISSSUED_RETURNED
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