import re
import uuid
from django.db import models

class LoginInfo(models.Model):
    login_id = models.CharField(max_length=100, unique=True)
    pass_field = models.CharField(max_length=254)

    class Meta:
        db_table = 'myconfiguration"."login_info'  # Đúng chuẩn schema.table
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

class UserPermission(models.Model):
    id = models.AutoField(primary_key=True)
    user_id = models.CharField(max_length=10, null=False)
    subsidiary = models.CharField(max_length=10, null=False)
    department = models.CharField(max_length=100, null=False)

    class Meta:
        db_table = 'myconfiguration"."user_permissions'  # Đúng chuẩn schema.table
        managed = True  # Django sẽ quản lý bảng này hoàn toàn (tạo, xóa, sửa theo model).


class TM_DANH_SACH_MA_KHO(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    date = models.DateTimeField()
    id_nhan_vien = models.CharField(max_length=10)
    xoa_sua = models.CharField(max_length=10)
    ma_kho = models.CharField(max_length=50)
    ten_kho = models.TextField()

    class Meta:
        db_table = 'myconfiguration"."TM_DANH_SACH_MA_KHO'
        managed = True  # Django sẽ quản lý bảng này (tạo, xóa, sửa theo model)


class SX_DANH_SACH_MA_KHO(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    date = models.DateTimeField()
    id_nhan_vien = models.CharField(max_length=10)
    xoa_sua = models.CharField(max_length=10)
    ma_kho = models.CharField(max_length=50)
    ten_kho = models.TextField()

    class Meta:
        db_table = 'myconfiguration"."SX_DANH_SACH_MA_KHO'
        managed = True  # Django sẽ quản lý bảng này (tạo, xóa, sửa theo model)