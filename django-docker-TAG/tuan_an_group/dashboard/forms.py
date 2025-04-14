from django import forms
from .models import InventoryCategory

class InventoryCategoryForm(forms.ModelForm):
    class Meta:
        model = InventoryCategory
        fields = ['id_nhan_vien', 'xoa_sua', 'ma_hang', 'ten_hang', 'dvt', 
                  'sl_ton_dau_ky', 'don_gia_ton_dau_ky', 'ma_kho_luu_tru']