from django.db import models
import uuid

class LA_INVENTORY_CATEGORIES(models.Model):
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
        db_table = 'LA_INVENTORY_CATEGORIES'  # Chỉ định schema, tạo bảng trước, sau đó đổi lại tên
        managed = False  # Django sẽ không quản lý bảng này (không tạo, xóa, sửa)
        # managed = True  # Django sẽ quản lý bảng này hoàn toàn (tạo, xóa, sửa theo model).

def some_function():
    from myapi.models_LA import LA_INVENTORY_CATEGORIES
    print(LA_INVENTORY_CATEGORIES.objects.using('tala').all())

