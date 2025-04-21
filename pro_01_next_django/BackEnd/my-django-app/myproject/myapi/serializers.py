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
        
class TBInventoryCategoriesSerializer(serializers.ModelSerializer):
    class Meta:
        model = TB_INVENTORY_CATEGORIES
        fields = ['ma_hang', 'ten_hang', 'dvt', 'sl_ton_dau_ky', 'don_gia_ton_dau_ky', 'ma_kho_luu_tru']