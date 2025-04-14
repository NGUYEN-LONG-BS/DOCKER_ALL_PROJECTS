from django.db import models
import uuid

class InventoryCategory(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    date = models.DateTimeField(auto_now_add=True)
    id_nhan_vien = models.CharField(max_length=10, null=True, blank=True)
    xoa_sua = models.CharField(max_length=10, null=True, blank=True)
    ma_hang = models.CharField(max_length=50, null=True, blank=True)
    ten_hang = models.TextField(null=True, blank=True)
    dvt = models.CharField(max_length=50, null=True, blank=True)
    sl_ton_dau_ky = models.DecimalField(max_digits=15, decimal_places=2, null=True, blank=True)
    don_gia_ton_dau_ky = models.DecimalField(max_digits=15, decimal_places=2, null=True, blank=True)
    ma_kho_luu_tru = models.CharField(max_length=50, null=True, blank=True)

    class Meta:
        # Đặt tên bảng vào schema 'inventory'
        # db_table = 'inventory.inventory_category'
        db_table = 'tb_inventory_categories'
    
    def __str__(self):
        return self.ma_hang
