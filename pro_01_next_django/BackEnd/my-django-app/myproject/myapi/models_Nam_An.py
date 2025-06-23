from django.db import models
import uuid

class NAMAN_INVENTORY_CATEGORIES(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    date = models.DateTimeField(auto_now_add=True)
    id_nhan_vien = models.CharField(max_length=10, null=False, blank=False)
    xoa_sua = models.CharField(max_length=10, null=False, blank=False)
    ma_hang = models.CharField(max_length=50, null=False, blank=False)
    ten_hang = models.TextField(null=False, blank=False)
    dvt = models.CharField(max_length=50, null=False, blank=False)
    sl_ton_dau_ky = models.DecimalField(max_digits=15, decimal_places=2, null=True, blank=True)
    don_gia_ton_dau_ky = models.DecimalField(max_digits=15, decimal_places=2, null=True, blank=True)
    ma_kho_luu_tru = models.CharField(max_length=50, null=True, blank=True)

    class Meta:
        db_table = 'inventory"."NAMAN_INVENTORY_CATEGORIES'  # Chỉ định schema, tạo bảng trước, sau đó đổi lại tên
        # managed = False  # Django sẽ không quản lý bảng này (không tạo, xóa, sửa)
        managed = True  # Django sẽ quản lý bảng này hoàn toàn (tạo, xóa, sửa theo model).
        
class NAMAN_CLIENT_CATEGORIES(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    date = models.DateTimeField(auto_now_add=True)
    id_nhan_vien = models.CharField(max_length=10, default="")
    xoa_sua = models.CharField(max_length=10, default="")
    ma_khach_hang = models.CharField(max_length=50, default="")
    ten_khach_hang = models.TextField(default="")
    ma_phan_loai_01 = models.CharField(max_length=50, default="")
    ma_phan_loai_02 = models.CharField(max_length=50, default="")
    ma_phan_loai_03 = models.CharField(max_length=50, default="")
    ma_phan_loai_04 = models.CharField(max_length=50, default="")
    ma_phan_loai_05 = models.CharField(max_length=50, default="")
    ma_phan_loai_06 = models.CharField(max_length=50, default="")
    ma_phan_loai_07 = models.CharField(max_length=50, default="")
    ma_phan_loai_08 = models.CharField(max_length=50, default="")
    mst = models.CharField(max_length=20, default="")
    dia_chi = models.TextField(default="")

    class Meta:
        db_table = 'inventory"."NAMAN_CLIENT_CATEGORIES'
        # managed = False  # Django sẽ không quản lý bảng này (không tạo, xóa, sửa)
        managed = True  # Django sẽ quản lý bảng này hoàn toàn (tạo, xóa, sửa theo model).
    
    @staticmethod
    def is_duplicate(ma_khach_hang):
        return NAMAN_CLIENT_CATEGORIES.objects.filter(ma_khach_hang=ma_khach_hang, xoa_sua="new").exists()