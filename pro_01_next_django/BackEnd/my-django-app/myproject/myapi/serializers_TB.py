from rest_framework import serializers
from .models_TB import TB_CLIENT_CATEGORIES
from .models_TB import TB_SUPPLIER_CATEGORIES
from .models_TB import TB_INVENTORY_CATEGORIES
from .models_TB import TB_INVENTORY_STOCK_RECEIVED_ISSSUED_RETURNED

DB_NAME_TB = 'tb'

class TBInventoryCategoriesSerializer(serializers.ModelSerializer):
    class Meta:
        model = TB_INVENTORY_CATEGORIES
        fields = ['ma_hang', 'ten_hang', 'dvt']

class TB_InventoryStockReceivedIssuedReturnedSerializer(serializers.ModelSerializer):
    class Meta:
        model = TB_INVENTORY_STOCK_RECEIVED_ISSSUED_RETURNED
        fields = '__all__'  # Lấy tất cả các trường trong model

class TBClientCategoriesSerializer(serializers.ModelSerializer):
    class Meta:
        model = TB_CLIENT_CATEGORIES
        fields = '__all__'

class TBSupplierCategoriesSerializer(serializers.ModelSerializer):
    class Meta:
        model = TB_SUPPLIER_CATEGORIES
        fields = '__all__'
        
class TB_InventoryStockSerializer(serializers.ModelSerializer):
    STT = serializers.SerializerMethodField()
    ten_hang = serializers.SerializerMethodField()
    ten_doi_tuong = serializers.SerializerMethodField()  # Thêm dòng này để khai báo field động

    def get_STT(self, obj):
        # Lấy index từ context và cộng 1 để bắt đầu từ 1
        return self.context['index'] + 1
    
    def get_ten_hang(self, obj):
        category = TB_INVENTORY_CATEGORIES.objects.using(DB_NAME_TB).filter(ma_hang=obj.ma_hang).first()
        return category.ten_hang if category else 'N/A'
    
    def get_ten_doi_tuong(self, obj):
        category = TB_SUPPLIER_CATEGORIES.objects.using(DB_NAME_TB).filter(ma_nha_cung_cap=obj.ma_doi_tuong).first()
        return category.ten_nha_cung_cap if category else 'N/A'

    class Meta:
        model = TB_INVENTORY_STOCK_RECEIVED_ISSSUED_RETURNED
        fields = [
            'STT',
            'so_phieu',
            'ngay_tren_phieu',
            'so_phieu_de_nghi',
            'ma_doi_tuong',
            'ten_doi_tuong',
            'ma_hang',
            'ten_hang',
            'so_luong',
            'ma_kho_nhan',
        ]
