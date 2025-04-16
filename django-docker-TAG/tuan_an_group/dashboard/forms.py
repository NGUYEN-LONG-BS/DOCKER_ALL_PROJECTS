from django import forms
from .models import TB_INVENTORY_CATEGORIES

class InventoryCategoryForm(forms.ModelForm):
    class Meta:
        model = TB_INVENTORY_CATEGORIES
        fields = ['ma_hang', 'ten_hang', 'dvt', 
                  'sl_ton_dau_ky', 'don_gia_ton_dau_ky', 'ma_kho_luu_tru']