from rest_framework import serializers
from .models import FormSubmission, LoginInfo, TB_INVENTORY_CATEGORIES

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

class InventoryItemSerializer(serializers.Serializer):
    id = serializers.IntegerField()
    code = serializers.CharField()
    name = serializers.CharField()
    unit = serializers.CharField()
    quantity = serializers.IntegerField()
    price = serializers.FloatField()
    notes = serializers.CharField()

class SlipNoteSerializer(serializers.Serializer):
    selectedWarehouse = serializers.CharField()
    notesOfSlip = serializers.CharField()

class InventoryFormSerializer(serializers.Serializer):
    date = serializers.DateField()
    documentNumber = serializers.CharField()
    supplier = serializers.CharField()
    slipNote = SlipNoteSerializer()
    inventoryTable = InventoryItemSerializer(many=True)