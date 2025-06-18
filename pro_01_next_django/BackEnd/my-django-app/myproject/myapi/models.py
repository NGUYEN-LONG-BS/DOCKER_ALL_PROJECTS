from django.db import models
import uuid
import re

class FormSubmission(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField()

    class Meta:
        db_table = 'FormSubmission'  # Chỉ định schema, tạo bảng trước, sau đó đổi lại tên
        managed = True  # Django sẽ quản lý bảng này trong migration

    def __str__(self):
        return f"{self.name} - {self.email}"
    
class LoginInfo(models.Model):
    login_id = models.CharField(max_length=100, unique=True)
    pass_field = models.CharField(max_length=254)

    class Meta:
        db_table = 'login_info'  # Đặt tên bảng
        managed = True  # Django sẽ quản lý bảng này trong migration

    def save(self, *args, **kwargs):
        # Kiểm tra login_id không chứa ký tự đặc biệt (chỉ chữ và số)
        if not re.match('^[a-zA-Z0-9]+$', self.login_id):
            raise ValueError("Login ID chỉ được phép chứa chữ cái và số, không chứa ký tự đặc biệt.")
        
        # Kiểm tra password không chứa tiếng Việt có dấu
        vietnamese_accents = '[àáảãạăắằẳẵặâấầẩẫậbôốồổỗộơớờởỡợêếềểễệîíìỉĩịôốồổỗộơớờởỡợêếềểễệîíìỉĩị]'
        if re.search(vietnamese_accents, self.pass_field):
            raise ValueError("Mật khẩu không được chứa tiếng Việt có dấu.")

        super(LoginInfo, self).save(*args, **kwargs)

    def __str__(self):
        return f"{self.login_id} - {self.pass_field}"
    
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
        managed = True  # Django sẽ quản lý bảng này hoàn toàn (tạo, xóa, sửa theo model).

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
        managed = True  # Django sẽ quản lý bảng này hoàn toàn (tạo, xóa, sửa theo model).

class VIEW_INVENTORY_REPORT_QUANTITY(models.Model):
    ma_hang = models.CharField(max_length=50)
    ten_hang = models.TextField()
    dvt = models.CharField(max_length=50)
    sl_dau_ky = models.DecimalField(max_digits=15, decimal_places=2)
    tong_sl_nhap = models.DecimalField(max_digits=15, decimal_places=2)
    tong_sl_xuat = models.DecimalField(max_digits=15, decimal_places=2)
    tong_sl_ton = models.DecimalField(max_digits=15, decimal_places=2)

    class Meta:
        managed = False  # Django chỉ dùng để truy vấn, không can thiệp tạo/xóa/sửa bảng đó.
        db_table = 'inventory."VIEW_INVENTORY_REPORT_QUANTITY"'  # Tên view trong PostgreSQL

class UserPermission(models.Model):
    id = models.AutoField(primary_key=True)
    user_id = models.CharField(max_length=10, null=False)
    subsidiary = models.CharField(max_length=10, null=False)
    department = models.CharField(max_length=100, null=False)

    class Meta:
        db_table = 'inventory"."user_permissions'  # Đúng tên bảng trong PostgreSQL
        managed = True  # Django sẽ quản lý bảng này hoàn toàn (tạo, xóa, sửa theo model).

class TB_CLIENT_CATEGORIES(models.Model):
    id = models.UUIDField(primary_key=True)
    date = models.DateTimeField()
    id_nhan_vien = models.CharField(max_length=10)
    xoa_sua = models.CharField(max_length=10)
    ma_khach_hang = models.CharField(max_length=50)
    ten_khach_hang = models.TextField()
    ma_phan_loai_01 = models.CharField(max_length=50)
    ma_phan_loai_02 = models.CharField(max_length=50)
    ma_phan_loai_03 = models.CharField(max_length=50)
    ma_phan_loai_04 = models.CharField(max_length=50)
    ma_phan_loai_05 = models.CharField(max_length=50)
    ma_phan_loai_06 = models.CharField(max_length=50)
    ma_phan_loai_07 = models.CharField(max_length=50)
    ma_phan_loai_08 = models.CharField(max_length=50)
    mst = models.CharField(max_length=20)
    dia_chi = models.TextField()

    class Meta:
        db_table = 'inventory.TB_CLIENT_CATEGORIES'
        # managed = False  # Django sẽ không quản lý bảng này (không tạo, xóa, sửa)
        managed = True  # Django sẽ quản lý bảng này hoàn toàn (tạo, xóa, sửa theo model).
    
class TB_SUPPLIER_CATEGORIES(models.Model):
    id = models.UUIDField(primary_key=True)
    date = models.DateTimeField()
    id_nhan_vien = models.CharField(max_length=10)
    xoa_sua = models.CharField(max_length=10)
    ma_nha_cung_cap = models.CharField(max_length=50)
    ten_nha_cung_cap = models.TextField()
    ma_phan_loai_01 = models.CharField(max_length=50)
    ma_phan_loai_02 = models.CharField(max_length=50)
    ma_phan_loai_03 = models.CharField(max_length=50)
    ma_phan_loai_04 = models.CharField(max_length=50)
    ma_phan_loai_05 = models.CharField(max_length=50)
    ma_phan_loai_06 = models.CharField(max_length=50)
    ma_phan_loai_07 = models.CharField(max_length=50)
    ma_phan_loai_08 = models.CharField(max_length=50)
    mst = models.CharField(max_length=20)
    dia_chi = models.TextField()

    class Meta:
        db_table = 'inventory.TB_SUPPLIER_CATEGORIES'
        # managed = False  # Django sẽ không quản lý bảng này (không tạo, xóa, sửa)
        managed = True  # Django sẽ quản lý bảng này hoàn toàn (tạo, xóa, sửa theo model).