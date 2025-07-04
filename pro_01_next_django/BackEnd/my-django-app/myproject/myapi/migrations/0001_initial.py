# Generated by Django 5.2 on 2025-07-01 01:27

import uuid
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='HANOI_INVENTORY_CATEGORIES',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('date', models.DateTimeField(auto_now_add=True)),
                ('id_nhan_vien', models.CharField(max_length=10)),
                ('xoa_sua', models.CharField(max_length=10)),
                ('ma_hang', models.CharField(max_length=50)),
                ('ten_hang', models.TextField()),
                ('dvt', models.CharField(max_length=50)),
                ('sl_ton_dau_ky', models.DecimalField(blank=True, decimal_places=2, max_digits=15, null=True)),
                ('don_gia_ton_dau_ky', models.DecimalField(blank=True, decimal_places=2, max_digits=15, null=True)),
                ('ma_kho_luu_tru', models.CharField(blank=True, max_length=50, null=True)),
            ],
            options={
                'db_table': 'inventory"."HANOI_INVENTORY_CATEGORIES',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='HANOI_CLIENT_CATEGORIES',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('date', models.DateTimeField(auto_now_add=True)),
                ('id_nhan_vien', models.CharField(default='', max_length=10)),
                ('xoa_sua', models.CharField(default='', max_length=10)),
                ('ma_khach_hang', models.CharField(default='', max_length=50)),
                ('ten_khach_hang', models.TextField(default='')),
                ('ma_phan_loai_01', models.CharField(default='', max_length=50)),
                ('ma_phan_loai_02', models.CharField(default='', max_length=50)),
                ('ma_phan_loai_03', models.CharField(default='', max_length=50)),
                ('ma_phan_loai_04', models.CharField(default='', max_length=50)),
                ('ma_phan_loai_05', models.CharField(default='', max_length=50)),
                ('ma_phan_loai_06', models.CharField(default='', max_length=50)),
                ('ma_phan_loai_07', models.CharField(default='', max_length=50)),
                ('ma_phan_loai_08', models.CharField(default='', max_length=50)),
                ('mst', models.CharField(default='', max_length=20)),
                ('dia_chi', models.TextField(default='')),
            ],
            options={
                'db_table': 'inventory"."HANOI_CLIENT_CATEGORIES',
                'managed': True,
            },
        ),
        migrations.CreateModel(
            name='HANOI_INVENTORY_STOCK_RECEIVED_ISSSUED_RETURNED',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('date', models.DateTimeField(auto_now_add=True)),
                ('id_nhan_vien', models.CharField(max_length=10)),
                ('xoa_sua', models.CharField(max_length=10)),
                ('so_phieu', models.CharField(max_length=50)),
                ('phan_loai_nhap_xuat_hoan', models.CharField(max_length=50)),
                ('ma_doi_tuong', models.CharField(max_length=50)),
                ('ngay_tren_phieu', models.DateTimeField()),
                ('so_phieu_de_nghi', models.CharField(max_length=50)),
                ('thong_tin_them', models.TextField(blank=True, null=True)),
                ('stt_dong', models.IntegerField(blank=True, null=True)),
                ('ma_hang', models.CharField(max_length=50)),
                ('so_luong', models.DecimalField(decimal_places=2, max_digits=15)),
                ('don_gia', models.DecimalField(decimal_places=2, max_digits=15)),
                ('thanh_tien', models.DecimalField(decimal_places=2, max_digits=15)),
                ('ghi_chu_sp', models.TextField(blank=True, null=True)),
                ('ma_kho_nhan', models.CharField(max_length=50)),
                ('ma_kho_xuat', models.CharField(max_length=50)),
            ],
            options={
                'db_table': 'inventory"."HANOI_INVENTORY_STOCK_RECEIVED_ISSSUED_RETURNED',
                'managed': True,
            },
        ),
        migrations.CreateModel(
            name='HANOI_SUPPLIER_CATEGORIES',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('date', models.DateTimeField(auto_now_add=True)),
                ('id_nhan_vien', models.CharField(default='', max_length=10)),
                ('xoa_sua', models.CharField(default='', max_length=10)),
                ('ma_nha_cung_cap', models.CharField(default='', max_length=50)),
                ('ten_nha_cung_cap', models.TextField(default='')),
                ('ma_phan_loai_01', models.CharField(default='', max_length=50)),
                ('ma_phan_loai_02', models.CharField(default='', max_length=50)),
                ('ma_phan_loai_03', models.CharField(default='', max_length=50)),
                ('ma_phan_loai_04', models.CharField(default='', max_length=50)),
                ('ma_phan_loai_05', models.CharField(default='', max_length=50)),
                ('ma_phan_loai_06', models.CharField(default='', max_length=50)),
                ('ma_phan_loai_07', models.CharField(default='', max_length=50)),
                ('ma_phan_loai_08', models.CharField(default='', max_length=50)),
                ('mst', models.CharField(default='', max_length=20)),
                ('dia_chi', models.TextField(default='')),
            ],
            options={
                'db_table': 'inventory"."HANOI_SUPPLIER_CATEGORIES',
                'managed': True,
            },
        ),
        migrations.CreateModel(
            name='LA_CLIENT_CATEGORIES',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('date', models.DateTimeField(auto_now_add=True)),
                ('id_nhan_vien', models.CharField(default='', max_length=10)),
                ('xoa_sua', models.CharField(default='', max_length=10)),
                ('ma_khach_hang', models.CharField(default='', max_length=50)),
                ('ten_khach_hang', models.TextField(default='')),
                ('ma_phan_loai_01', models.CharField(default='', max_length=50)),
                ('ma_phan_loai_02', models.CharField(default='', max_length=50)),
                ('ma_phan_loai_03', models.CharField(default='', max_length=50)),
                ('ma_phan_loai_04', models.CharField(default='', max_length=50)),
                ('ma_phan_loai_05', models.CharField(default='', max_length=50)),
                ('ma_phan_loai_06', models.CharField(default='', max_length=50)),
                ('ma_phan_loai_07', models.CharField(default='', max_length=50)),
                ('ma_phan_loai_08', models.CharField(default='', max_length=50)),
                ('mst', models.CharField(default='', max_length=20)),
                ('dia_chi', models.TextField(default='')),
            ],
            options={
                'db_table': 'inventory"."LA_CLIENT_CATEGORIES',
                'managed': True,
            },
        ),
        migrations.CreateModel(
            name='LA_INVENTORY_CATEGORIES',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('date', models.DateTimeField(auto_now_add=True)),
                ('id_nhan_vien', models.CharField(max_length=10)),
                ('xoa_sua', models.CharField(max_length=10)),
                ('ma_hang', models.CharField(max_length=50)),
                ('ten_hang', models.TextField()),
                ('dvt', models.CharField(max_length=50)),
                ('sl_ton_dau_ky', models.DecimalField(blank=True, decimal_places=2, max_digits=15, null=True)),
                ('don_gia_ton_dau_ky', models.DecimalField(blank=True, decimal_places=2, max_digits=15, null=True)),
                ('ma_kho_luu_tru', models.CharField(blank=True, max_length=50, null=True)),
            ],
            options={
                'db_table': 'inventory"."LA_INVENTORY_CATEGORIES',
                'managed': True,
            },
        ),
        migrations.CreateModel(
            name='LA_INVENTORY_STOCK_RECEIVED_ISSSUED_RETURNED',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('date', models.DateTimeField(auto_now_add=True)),
                ('id_nhan_vien', models.CharField(max_length=10)),
                ('xoa_sua', models.CharField(max_length=10)),
                ('so_phieu', models.CharField(max_length=50)),
                ('phan_loai_nhap_xuat_hoan', models.CharField(max_length=50)),
                ('ma_doi_tuong', models.CharField(max_length=50)),
                ('ngay_tren_phieu', models.DateTimeField()),
                ('so_phieu_de_nghi', models.CharField(max_length=50)),
                ('thong_tin_them', models.TextField(blank=True, null=True)),
                ('stt_dong', models.IntegerField(blank=True, null=True)),
                ('ma_hang', models.CharField(max_length=50)),
                ('so_luong', models.DecimalField(decimal_places=2, max_digits=15)),
                ('don_gia', models.DecimalField(decimal_places=2, max_digits=15)),
                ('thanh_tien', models.DecimalField(decimal_places=2, max_digits=15)),
                ('ghi_chu_sp', models.TextField(blank=True, null=True)),
                ('ma_kho_nhan', models.CharField(max_length=50)),
                ('ma_kho_xuat', models.CharField(max_length=50)),
            ],
            options={
                'db_table': 'inventory"."LA_INVENTORY_STOCK_RECEIVED_ISSSUED_RETURNED',
                'managed': True,
            },
        ),
        migrations.CreateModel(
            name='LA_SUPPLIER_CATEGORIES',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('date', models.DateTimeField(auto_now_add=True)),
                ('id_nhan_vien', models.CharField(default='', max_length=10)),
                ('xoa_sua', models.CharField(default='', max_length=10)),
                ('ma_nha_cung_cap', models.CharField(default='', max_length=50)),
                ('ten_nha_cung_cap', models.TextField(default='')),
                ('ma_phan_loai_01', models.CharField(default='', max_length=50)),
                ('ma_phan_loai_02', models.CharField(default='', max_length=50)),
                ('ma_phan_loai_03', models.CharField(default='', max_length=50)),
                ('ma_phan_loai_04', models.CharField(default='', max_length=50)),
                ('ma_phan_loai_05', models.CharField(default='', max_length=50)),
                ('ma_phan_loai_06', models.CharField(default='', max_length=50)),
                ('ma_phan_loai_07', models.CharField(default='', max_length=50)),
                ('ma_phan_loai_08', models.CharField(default='', max_length=50)),
                ('mst', models.CharField(default='', max_length=20)),
                ('dia_chi', models.TextField(default='')),
            ],
            options={
                'db_table': 'inventory"."LA_SUPPLIER_CATEGORIES',
                'managed': True,
            },
        ),
        migrations.CreateModel(
            name='LoginInfo',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('login_id', models.CharField(max_length=100, unique=True)),
                ('pass_field', models.CharField(max_length=254)),
            ],
            options={
                'db_table': 'myconfiguration"."login_info',
                'managed': True,
            },
        ),
        migrations.CreateModel(
            name='MIENTAY_CLIENT_CATEGORIES',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('date', models.DateTimeField(auto_now_add=True)),
                ('id_nhan_vien', models.CharField(default='', max_length=10)),
                ('xoa_sua', models.CharField(default='', max_length=10)),
                ('ma_khach_hang', models.CharField(default='', max_length=50)),
                ('ten_khach_hang', models.TextField(default='')),
                ('ma_phan_loai_01', models.CharField(default='', max_length=50)),
                ('ma_phan_loai_02', models.CharField(default='', max_length=50)),
                ('ma_phan_loai_03', models.CharField(default='', max_length=50)),
                ('ma_phan_loai_04', models.CharField(default='', max_length=50)),
                ('ma_phan_loai_05', models.CharField(default='', max_length=50)),
                ('ma_phan_loai_06', models.CharField(default='', max_length=50)),
                ('ma_phan_loai_07', models.CharField(default='', max_length=50)),
                ('ma_phan_loai_08', models.CharField(default='', max_length=50)),
                ('mst', models.CharField(default='', max_length=20)),
                ('dia_chi', models.TextField(default='')),
            ],
            options={
                'db_table': 'inventory"."MIENTAY_CLIENT_CATEGORIES',
                'managed': True,
            },
        ),
        migrations.CreateModel(
            name='MIENTAY_INVENTORY_CATEGORIES',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('date', models.DateTimeField(auto_now_add=True)),
                ('id_nhan_vien', models.CharField(max_length=10)),
                ('xoa_sua', models.CharField(max_length=10)),
                ('ma_hang', models.CharField(max_length=50)),
                ('ten_hang', models.TextField()),
                ('dvt', models.CharField(max_length=50)),
                ('sl_ton_dau_ky', models.DecimalField(blank=True, decimal_places=2, max_digits=15, null=True)),
                ('don_gia_ton_dau_ky', models.DecimalField(blank=True, decimal_places=2, max_digits=15, null=True)),
                ('ma_kho_luu_tru', models.CharField(blank=True, max_length=50, null=True)),
            ],
            options={
                'db_table': 'inventory"."MIENTAY_INVENTORY_CATEGORIES',
                'managed': True,
            },
        ),
        migrations.CreateModel(
            name='MIENTAY_INVENTORY_STOCK_RECEIVED_ISSSUED_RETURNED',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('date', models.DateTimeField(auto_now_add=True)),
                ('id_nhan_vien', models.CharField(max_length=10)),
                ('xoa_sua', models.CharField(max_length=10)),
                ('so_phieu', models.CharField(max_length=50)),
                ('phan_loai_nhap_xuat_hoan', models.CharField(max_length=50)),
                ('ma_doi_tuong', models.CharField(max_length=50)),
                ('ngay_tren_phieu', models.DateTimeField()),
                ('so_phieu_de_nghi', models.CharField(max_length=50)),
                ('thong_tin_them', models.TextField(blank=True, null=True)),
                ('stt_dong', models.IntegerField(blank=True, null=True)),
                ('ma_hang', models.CharField(max_length=50)),
                ('so_luong', models.DecimalField(decimal_places=2, max_digits=15)),
                ('don_gia', models.DecimalField(decimal_places=2, max_digits=15)),
                ('thanh_tien', models.DecimalField(decimal_places=2, max_digits=15)),
                ('ghi_chu_sp', models.TextField(blank=True, null=True)),
                ('ma_kho_nhan', models.CharField(max_length=50)),
                ('ma_kho_xuat', models.CharField(max_length=50)),
            ],
            options={
                'db_table': 'inventory"."MIENTAY_INVENTORY_STOCK_RECEIVED_ISSSUED_RETURNED',
                'managed': True,
            },
        ),
        migrations.CreateModel(
            name='MIENTAY_SUPPLIER_CATEGORIES',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('date', models.DateTimeField(auto_now_add=True)),
                ('id_nhan_vien', models.CharField(default='', max_length=10)),
                ('xoa_sua', models.CharField(default='', max_length=10)),
                ('ma_nha_cung_cap', models.CharField(default='', max_length=50)),
                ('ten_nha_cung_cap', models.TextField(default='')),
                ('ma_phan_loai_01', models.CharField(default='', max_length=50)),
                ('ma_phan_loai_02', models.CharField(default='', max_length=50)),
                ('ma_phan_loai_03', models.CharField(default='', max_length=50)),
                ('ma_phan_loai_04', models.CharField(default='', max_length=50)),
                ('ma_phan_loai_05', models.CharField(default='', max_length=50)),
                ('ma_phan_loai_06', models.CharField(default='', max_length=50)),
                ('ma_phan_loai_07', models.CharField(default='', max_length=50)),
                ('ma_phan_loai_08', models.CharField(default='', max_length=50)),
                ('mst', models.CharField(default='', max_length=20)),
                ('dia_chi', models.TextField(default='')),
            ],
            options={
                'db_table': 'inventory"."MIENTAY_SUPPLIER_CATEGORIES',
                'managed': True,
            },
        ),
        migrations.CreateModel(
            name='NAMAN_CLIENT_CATEGORIES',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('date', models.DateTimeField(auto_now_add=True)),
                ('id_nhan_vien', models.CharField(default='', max_length=10)),
                ('xoa_sua', models.CharField(default='', max_length=10)),
                ('ma_khach_hang', models.CharField(default='', max_length=50)),
                ('ten_khach_hang', models.TextField(default='')),
                ('ma_phan_loai_01', models.CharField(default='', max_length=50)),
                ('ma_phan_loai_02', models.CharField(default='', max_length=50)),
                ('ma_phan_loai_03', models.CharField(default='', max_length=50)),
                ('ma_phan_loai_04', models.CharField(default='', max_length=50)),
                ('ma_phan_loai_05', models.CharField(default='', max_length=50)),
                ('ma_phan_loai_06', models.CharField(default='', max_length=50)),
                ('ma_phan_loai_07', models.CharField(default='', max_length=50)),
                ('ma_phan_loai_08', models.CharField(default='', max_length=50)),
                ('mst', models.CharField(default='', max_length=20)),
                ('dia_chi', models.TextField(default='')),
            ],
            options={
                'db_table': 'inventory"."NAMAN_CLIENT_CATEGORIES',
                'managed': True,
            },
        ),
        migrations.CreateModel(
            name='NAMAN_INVENTORY_CATEGORIES',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('date', models.DateTimeField(auto_now_add=True)),
                ('id_nhan_vien', models.CharField(max_length=10)),
                ('xoa_sua', models.CharField(max_length=10)),
                ('ma_hang', models.CharField(max_length=50)),
                ('ten_hang', models.TextField()),
                ('dvt', models.CharField(max_length=50)),
                ('sl_ton_dau_ky', models.DecimalField(blank=True, decimal_places=2, max_digits=15, null=True)),
                ('don_gia_ton_dau_ky', models.DecimalField(blank=True, decimal_places=2, max_digits=15, null=True)),
                ('ma_kho_luu_tru', models.CharField(blank=True, max_length=50, null=True)),
            ],
            options={
                'db_table': 'inventory"."NAMAN_INVENTORY_CATEGORIES',
                'managed': True,
            },
        ),
        migrations.CreateModel(
            name='NAMAN_INVENTORY_STOCK_RECEIVED_ISSSUED_RETURNED',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('date', models.DateTimeField(auto_now_add=True)),
                ('id_nhan_vien', models.CharField(max_length=10)),
                ('xoa_sua', models.CharField(max_length=10)),
                ('so_phieu', models.CharField(max_length=50)),
                ('phan_loai_nhap_xuat_hoan', models.CharField(max_length=50)),
                ('ma_doi_tuong', models.CharField(max_length=50)),
                ('ngay_tren_phieu', models.DateTimeField()),
                ('so_phieu_de_nghi', models.CharField(max_length=50)),
                ('thong_tin_them', models.TextField(blank=True, null=True)),
                ('stt_dong', models.IntegerField(blank=True, null=True)),
                ('ma_hang', models.CharField(max_length=50)),
                ('so_luong', models.DecimalField(decimal_places=2, max_digits=15)),
                ('don_gia', models.DecimalField(decimal_places=2, max_digits=15)),
                ('thanh_tien', models.DecimalField(decimal_places=2, max_digits=15)),
                ('ghi_chu_sp', models.TextField(blank=True, null=True)),
                ('ma_kho_nhan', models.CharField(max_length=50)),
                ('ma_kho_xuat', models.CharField(max_length=50)),
            ],
            options={
                'db_table': 'inventory"."NAMAN_INVENTORY_STOCK_RECEIVED_ISSSUED_RETURNED',
                'managed': True,
            },
        ),
        migrations.CreateModel(
            name='NAMAN_SUPPLIER_CATEGORIES',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('date', models.DateTimeField(auto_now_add=True)),
                ('id_nhan_vien', models.CharField(default='', max_length=10)),
                ('xoa_sua', models.CharField(default='', max_length=10)),
                ('ma_nha_cung_cap', models.CharField(default='', max_length=50)),
                ('ten_nha_cung_cap', models.TextField(default='')),
                ('ma_phan_loai_01', models.CharField(default='', max_length=50)),
                ('ma_phan_loai_02', models.CharField(default='', max_length=50)),
                ('ma_phan_loai_03', models.CharField(default='', max_length=50)),
                ('ma_phan_loai_04', models.CharField(default='', max_length=50)),
                ('ma_phan_loai_05', models.CharField(default='', max_length=50)),
                ('ma_phan_loai_06', models.CharField(default='', max_length=50)),
                ('ma_phan_loai_07', models.CharField(default='', max_length=50)),
                ('ma_phan_loai_08', models.CharField(default='', max_length=50)),
                ('mst', models.CharField(default='', max_length=20)),
                ('dia_chi', models.TextField(default='')),
            ],
            options={
                'db_table': 'inventory"."NAMAN_SUPPLIER_CATEGORIES',
                'managed': True,
            },
        ),
        migrations.CreateModel(
            name='PA_CLIENT_CATEGORIES',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('date', models.DateTimeField(auto_now_add=True)),
                ('id_nhan_vien', models.CharField(default='', max_length=10)),
                ('xoa_sua', models.CharField(default='', max_length=10)),
                ('ma_khach_hang', models.CharField(default='', max_length=50)),
                ('ten_khach_hang', models.TextField(default='')),
                ('ma_phan_loai_01', models.CharField(default='', max_length=50)),
                ('ma_phan_loai_02', models.CharField(default='', max_length=50)),
                ('ma_phan_loai_03', models.CharField(default='', max_length=50)),
                ('ma_phan_loai_04', models.CharField(default='', max_length=50)),
                ('ma_phan_loai_05', models.CharField(default='', max_length=50)),
                ('ma_phan_loai_06', models.CharField(default='', max_length=50)),
                ('ma_phan_loai_07', models.CharField(default='', max_length=50)),
                ('ma_phan_loai_08', models.CharField(default='', max_length=50)),
                ('mst', models.CharField(default='', max_length=20)),
                ('dia_chi', models.TextField(default='')),
            ],
            options={
                'db_table': 'inventory"."PA_CLIENT_CATEGORIES',
                'managed': True,
            },
        ),
        migrations.CreateModel(
            name='PA_INVENTORY_CATEGORIES',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('date', models.DateTimeField(auto_now_add=True)),
                ('id_nhan_vien', models.CharField(max_length=10)),
                ('xoa_sua', models.CharField(max_length=10)),
                ('ma_hang', models.CharField(max_length=50)),
                ('ten_hang', models.TextField()),
                ('dvt', models.CharField(max_length=50)),
                ('sl_ton_dau_ky', models.DecimalField(blank=True, decimal_places=2, max_digits=15, null=True)),
                ('don_gia_ton_dau_ky', models.DecimalField(blank=True, decimal_places=2, max_digits=15, null=True)),
                ('ma_kho_luu_tru', models.CharField(blank=True, max_length=50, null=True)),
            ],
            options={
                'db_table': 'inventory"."PA_INVENTORY_CATEGORIES',
                'managed': True,
            },
        ),
        migrations.CreateModel(
            name='PA_INVENTORY_STOCK_RECEIVED_ISSSUED_RETURNED',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('date', models.DateTimeField(auto_now_add=True)),
                ('id_nhan_vien', models.CharField(max_length=10)),
                ('xoa_sua', models.CharField(max_length=10)),
                ('so_phieu', models.CharField(max_length=50)),
                ('phan_loai_nhap_xuat_hoan', models.CharField(max_length=50)),
                ('ma_doi_tuong', models.CharField(max_length=50)),
                ('ngay_tren_phieu', models.DateTimeField()),
                ('so_phieu_de_nghi', models.CharField(max_length=50)),
                ('thong_tin_them', models.TextField(blank=True, null=True)),
                ('stt_dong', models.IntegerField(blank=True, null=True)),
                ('ma_hang', models.CharField(max_length=50)),
                ('so_luong', models.DecimalField(decimal_places=2, max_digits=15)),
                ('don_gia', models.DecimalField(decimal_places=2, max_digits=15)),
                ('thanh_tien', models.DecimalField(decimal_places=2, max_digits=15)),
                ('ghi_chu_sp', models.TextField(blank=True, null=True)),
                ('ma_kho_nhan', models.CharField(max_length=50)),
                ('ma_kho_xuat', models.CharField(max_length=50)),
            ],
            options={
                'db_table': 'inventory"."PA_INVENTORY_STOCK_RECEIVED_ISSSUED_RETURNED',
                'managed': True,
            },
        ),
        migrations.CreateModel(
            name='PA_SUPPLIER_CATEGORIES',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('date', models.DateTimeField(auto_now_add=True)),
                ('id_nhan_vien', models.CharField(default='', max_length=10)),
                ('xoa_sua', models.CharField(default='', max_length=10)),
                ('ma_nha_cung_cap', models.CharField(default='', max_length=50)),
                ('ten_nha_cung_cap', models.TextField(default='')),
                ('ma_phan_loai_01', models.CharField(default='', max_length=50)),
                ('ma_phan_loai_02', models.CharField(default='', max_length=50)),
                ('ma_phan_loai_03', models.CharField(default='', max_length=50)),
                ('ma_phan_loai_04', models.CharField(default='', max_length=50)),
                ('ma_phan_loai_05', models.CharField(default='', max_length=50)),
                ('ma_phan_loai_06', models.CharField(default='', max_length=50)),
                ('ma_phan_loai_07', models.CharField(default='', max_length=50)),
                ('ma_phan_loai_08', models.CharField(default='', max_length=50)),
                ('mst', models.CharField(default='', max_length=20)),
                ('dia_chi', models.TextField(default='')),
            ],
            options={
                'db_table': 'inventory"."PA_SUPPLIER_CATEGORIES',
                'managed': True,
            },
        ),
        migrations.CreateModel(
            name='SX_DANH_SACH_MA_KHO',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('date', models.DateTimeField()),
                ('id_nhan_vien', models.CharField(max_length=10)),
                ('xoa_sua', models.CharField(max_length=10)),
                ('ma_kho', models.CharField(max_length=50)),
                ('ten_kho', models.TextField()),
            ],
            options={
                'db_table': 'myconfiguration"."SX_DANH_SACH_MA_KHO',
                'managed': True,
            },
        ),
        migrations.CreateModel(
            name='TB_CLIENT_CATEGORIES',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('date', models.DateTimeField(auto_now_add=True)),
                ('id_nhan_vien', models.CharField(default='', max_length=10)),
                ('xoa_sua', models.CharField(default='', max_length=10)),
                ('ma_khach_hang', models.CharField(default='', max_length=50)),
                ('ten_khach_hang', models.TextField(default='')),
                ('ma_phan_loai_01', models.CharField(default='', max_length=50)),
                ('ma_phan_loai_02', models.CharField(default='', max_length=50)),
                ('ma_phan_loai_03', models.CharField(default='', max_length=50)),
                ('ma_phan_loai_04', models.CharField(default='', max_length=50)),
                ('ma_phan_loai_05', models.CharField(default='', max_length=50)),
                ('ma_phan_loai_06', models.CharField(default='', max_length=50)),
                ('ma_phan_loai_07', models.CharField(default='', max_length=50)),
                ('ma_phan_loai_08', models.CharField(default='', max_length=50)),
                ('mst', models.CharField(default='', max_length=20)),
                ('dia_chi', models.TextField(default='')),
            ],
            options={
                'db_table': 'inventory"."TB_CLIENT_CATEGORIES',
                'managed': True,
            },
        ),
        migrations.CreateModel(
            name='TB_INVENTORY_CATEGORIES',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('date', models.DateTimeField(auto_now_add=True)),
                ('id_nhan_vien', models.CharField(max_length=10)),
                ('xoa_sua', models.CharField(max_length=10)),
                ('ma_hang', models.CharField(max_length=50)),
                ('ten_hang', models.TextField()),
                ('dvt', models.CharField(max_length=50)),
                ('sl_ton_dau_ky', models.DecimalField(blank=True, decimal_places=2, max_digits=15, null=True)),
                ('don_gia_ton_dau_ky', models.DecimalField(blank=True, decimal_places=2, max_digits=15, null=True)),
                ('ma_kho_luu_tru', models.CharField(blank=True, max_length=50, null=True)),
            ],
            options={
                'db_table': 'inventory"."TB_INVENTORY_CATEGORIES',
                'managed': True,
            },
        ),
        migrations.CreateModel(
            name='TB_INVENTORY_STOCK_RECEIVED_ISSSUED_RETURNED',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('date', models.DateTimeField(auto_now_add=True)),
                ('id_nhan_vien', models.CharField(max_length=10)),
                ('xoa_sua', models.CharField(max_length=10)),
                ('so_phieu', models.CharField(max_length=50)),
                ('phan_loai_nhap_xuat_hoan', models.CharField(max_length=50)),
                ('ma_doi_tuong', models.CharField(max_length=50)),
                ('ngay_tren_phieu', models.DateTimeField()),
                ('so_phieu_de_nghi', models.CharField(max_length=50)),
                ('thong_tin_them', models.TextField(blank=True, null=True)),
                ('stt_dong', models.IntegerField(blank=True, null=True)),
                ('ma_hang', models.CharField(max_length=50)),
                ('so_luong', models.DecimalField(decimal_places=2, max_digits=15)),
                ('don_gia', models.DecimalField(decimal_places=2, max_digits=15)),
                ('thanh_tien', models.DecimalField(decimal_places=2, max_digits=15)),
                ('ghi_chu_sp', models.TextField(blank=True, null=True)),
                ('ma_kho_nhan', models.CharField(max_length=50)),
                ('ma_kho_xuat', models.CharField(max_length=50)),
            ],
            options={
                'db_table': 'inventory"."TB_INVENTORY_STOCK_RECEIVED_ISSSUED_RETURNED',
                'managed': True,
            },
        ),
        migrations.CreateModel(
            name='TB_SUPPLIER_CATEGORIES',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('date', models.DateTimeField(auto_now_add=True)),
                ('id_nhan_vien', models.CharField(default='', max_length=10)),
                ('xoa_sua', models.CharField(default='', max_length=10)),
                ('ma_nha_cung_cap', models.CharField(default='', max_length=50)),
                ('ten_nha_cung_cap', models.TextField(default='')),
                ('ma_phan_loai_01', models.CharField(default='', max_length=50)),
                ('ma_phan_loai_02', models.CharField(default='', max_length=50)),
                ('ma_phan_loai_03', models.CharField(default='', max_length=50)),
                ('ma_phan_loai_04', models.CharField(default='', max_length=50)),
                ('ma_phan_loai_05', models.CharField(default='', max_length=50)),
                ('ma_phan_loai_06', models.CharField(default='', max_length=50)),
                ('ma_phan_loai_07', models.CharField(default='', max_length=50)),
                ('ma_phan_loai_08', models.CharField(default='', max_length=50)),
                ('mst', models.CharField(default='', max_length=20)),
                ('dia_chi', models.TextField(default='')),
            ],
            options={
                'db_table': 'inventory"."TB_SUPPLIER_CATEGORIES',
                'managed': True,
            },
        ),
        migrations.CreateModel(
            name='TM_DANH_SACH_MA_KHO',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('date', models.DateTimeField()),
                ('id_nhan_vien', models.CharField(max_length=10)),
                ('xoa_sua', models.CharField(max_length=10)),
                ('ma_kho', models.CharField(max_length=50)),
                ('ten_kho', models.TextField()),
            ],
            options={
                'db_table': 'myconfiguration"."TM_DANH_SACH_MA_KHO',
                'managed': True,
            },
        ),
        migrations.CreateModel(
            name='UserPermission',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('user_id', models.CharField(max_length=10)),
                ('subsidiary', models.CharField(max_length=10)),
                ('department', models.CharField(max_length=100)),
            ],
            options={
                'db_table': 'myconfiguration"."user_permissions',
                'managed': True,
            },
        ),
    ]
