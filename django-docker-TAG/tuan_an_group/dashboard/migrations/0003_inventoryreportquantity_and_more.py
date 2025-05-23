# Generated by Django 5.2 on 2025-04-16 04:58

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('dashboard', '0002_alter_tb_inventory_categories_table_and_more'),
    ]

    operations = [
        migrations.CreateModel(
            name='InventoryReportQuantity',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('ma_hang', models.CharField(max_length=50)),
                ('ten_hang', models.TextField()),
                ('dvt', models.CharField(max_length=50)),
                ('sl_dau_ky', models.DecimalField(decimal_places=2, max_digits=15)),
                ('tong_sl_nhap', models.DecimalField(decimal_places=2, max_digits=15)),
                ('tong_sl_xuat', models.DecimalField(decimal_places=2, max_digits=15)),
                ('tong_sl_ton', models.DecimalField(decimal_places=2, max_digits=15)),
            ],
            options={
                'db_table': 'inventory."VIEW_INVENTORY_REPORT_QUANTITY"',
                'managed': False,
            },
        ),
        migrations.DeleteModel(
            name='VIEW_INVENTORY_STANDARD_REPORT_BY_WAREHOUSE_CODE',
        ),
    ]
