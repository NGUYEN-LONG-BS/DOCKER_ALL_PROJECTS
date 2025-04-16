from django.db import models
import uuid
    
class TB_INVENTORY_CATEGORIES(models.Model):
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
        db_table = 'TB_INVENTORY_CATEGORIES'  # Chỉ định schema, tạo bảng trước, sau đó đổi lại tên
        managed = True  # Django sẽ quản lý bảng này trong migration

class TB_INVENTORY_STOCK_RECEIVED_ISSSUED_RETURNED(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    date = models.DateTimeField(auto_now_add=True)
    id_nhan_vien = models.CharField(max_length=10, null=False, blank=False)
    xoa_sua = models.CharField(max_length=10, null=False, blank=False)
    so_phieu = models.CharField(max_length=50, null=False, blank=False)
    phan_loai_nhap_xuat_hoan = models.CharField(max_length=50, null=False, blank=False)
    ma_doi_tuong = models.CharField(max_length=50, null=False, blank=False)
    ngay_tren_phieu = models.DateTimeField(null=False, blank=False)
    so_phieu_de_nghi = models.CharField(max_length=50, null=False, blank=False)
    thong_tin_them = models.TextField(null=True, blank=True)
    stt_dong = models.IntegerField(null=True, blank=True)
    ma_hang = models.CharField(max_length=50, null=False, blank=False)
    so_luong = models.DecimalField(max_digits=15, decimal_places=2, null=False, blank=False)
    don_gia = models.DecimalField(max_digits=15, decimal_places=2, null=False, blank=False)
    thanh_tien = models.DecimalField(max_digits=15, decimal_places=2, null=False, blank=False)
    ghi_chu_sp = models.TextField(null=True, blank=True)
    ma_kho_nhan = models.CharField(max_length=50, null=False, blank=False)
    ma_kho_xuat = models.CharField(max_length=50, null=False, blank=False)

    class Meta:
        db_table = 'TB_INVENTORY_STOCK_RECEIVED_ISSSUED_RETURNED'  # Chỉ định schema, tạo bảng trước, sau đó đổi lại tên
        managed = True  # Django sẽ quản lý bảng này trong migration

class VIEW_INVENTORY_REPORT_QUANTITY(models.Model):
    ma_hang = models.CharField(max_length=50)
    ten_hang = models.TextField()
    dvt = models.CharField(max_length=50)
    sl_dau_ky = models.DecimalField(max_digits=15, decimal_places=2)
    tong_sl_nhap = models.DecimalField(max_digits=15, decimal_places=2)
    tong_sl_xuat = models.DecimalField(max_digits=15, decimal_places=2)
    tong_sl_ton = models.DecimalField(max_digits=15, decimal_places=2)

    class Meta:
        managed = False  # Django sẽ không quản lý view này trong migrations
        db_table = 'inventory."VIEW_INVENTORY_REPORT_QUANTITY"'  # Tên view trong PostgreSQL
