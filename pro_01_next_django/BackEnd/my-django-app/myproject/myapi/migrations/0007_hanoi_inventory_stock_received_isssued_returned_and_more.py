# Generated by Django 5.2 on 2025-06-27 06:39

import uuid
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('myapi', '0006_la_supplier_categories_and_more'),
    ]

    operations = [
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
    ]
