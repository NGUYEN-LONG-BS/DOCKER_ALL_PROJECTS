from rest_framework import serializers
from .models import FormSubmission, LoginInfo, TB_INVENTORY_CATEGORIES, TB_INVENTORY_STOCK_RECEIVED_ISSSUED_RETURNED, UserPermission

class FormSubmissionSerializer(serializers.ModelSerializer):
    class Meta:
        model = FormSubmission
        fields = ['id', 'name', 'email']

class LoginInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = LoginInfo
        fields = ['login_id', 'pass_field']

class InventoryCategoriesSerializer(serializers.ModelSerializer):
    class Meta:
        model = TB_INVENTORY_CATEGORIES
        fields = ['id_nhan_vien', 'xoa_sua', 'ma_hang', 'ten_hang', 'dvt', 'sl_ton_dau_ky', 'don_gia_ton_dau_ky', 'ma_kho_luu_tru']
        
class TBInventoryCategoriesSerializer(serializers.ModelSerializer):
    class Meta:
        model = TB_INVENTORY_CATEGORIES
        fields = ['ma_hang', 'ten_hang', 'dvt']
        
# ==============================================================================
# Save inventory
# ==============================================================================

class InventoryStockReceivedIssuedReturnedSerializer(serializers.ModelSerializer):
    class Meta:
        model = TB_INVENTORY_STOCK_RECEIVED_ISSSUED_RETURNED
        fields = '__all__'  # Lấy tất cả các trường trong model

# ==============================================================================
# log of inventory stock
# ==============================================================================

# your_app/serializers.py
from rest_framework import serializers
from .models import TB_INVENTORY_STOCK_RECEIVED_ISSSUED_RETURNED, TB_INVENTORY_CATEGORIES

class InventoryStockSerializer(serializers.ModelSerializer):
    STT = serializers.SerializerMethodField()
    ten_hang = serializers.SerializerMethodField()

    def get_STT(self, obj):
        # Lấy index từ context và cộng 1 để bắt đầu từ 1
        return self.context['index'] + 1
    
    def get_ten_hang(self, obj):
        # Fetch ten_hang from TB_INVENTORY_CATEGORIES based on ma_hang
        category = TB_INVENTORY_CATEGORIES.objects.filter(ma_hang=obj.ma_hang).first()
        return category.ten_hang if category else 'N/A'

    class Meta:
        model = TB_INVENTORY_STOCK_RECEIVED_ISSSUED_RETURNED
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

class UserPermissionSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserPermission
        fields = '__all__'