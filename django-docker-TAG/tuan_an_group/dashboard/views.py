from django.conf import settings
from django.shortcuts import render, redirect
from django.contrib import messages
from .forms import InventoryCategoryForm
from .models import InventoryCategory

def index(request):
    return render(request, 'home.html')

def home(request):
    # Pass MEDIA_URL to the context
    context = {
        'MEDIA_URL': settings.MEDIA_URL
    }
    return render(request, 'home.html', context)
# ===================================================================================================================
# ===================================================================================================================
# ===================================================================================================================
# ===================================================================================================================
# ===================================================================================================================
# Login

def login(request):
    # Pass MEDIA_URL to the context
    context = {
        'MEDIA_URL': settings.MEDIA_URL
    }
    return render(request, 'login.html', context)

def login_view(request):
    if request.method == 'POST':
        # Lấy thông tin từ form
        username = request.POST.get('username')
        password = request.POST.get('password')
        
        # Kiểm tra thông tin đăng nhập
        if username == 'admin' and password == '123':
            return redirect('DashboardAllDepartment')  # Chuyển hướng đến trang chủ hoặc trang bạn muốn
        else:
            # Thông báo sai thông tin đăng nhập
            messages.error(request, 'Sai tên đăng nhập hoặc mật khẩu')
    
    return render(request, 'login.html')
# ===================================================================================================================
# ===================================================================================================================
# ===================================================================================================================
# ===================================================================================================================
# ===================================================================================================================
# Register

def register(request):
    # Pass MEDIA_URL to the context
    context = {
        'MEDIA_URL': settings.MEDIA_URL
    }
    return render(request, 'register.html', context)

def DashboardAllDepartment(request):
    # Pass MEDIA_URL to the context
    context = {
        'MEDIA_URL': settings.MEDIA_URL
    }
    return render(request, 'dashboard/DashboardAllDepartment.html', context)

def DashboardBPKinhDoanh(request):
    # Pass MEDIA_URL to the context
    context = {
        'MEDIA_URL': settings.MEDIA_URL
    }
    # Render a template or return a response
    return render(request, 'dashboard/DashboardBPKinhDoanh.html', context)
# ===================================================================================================================
# ===================================================================================================================
# ===================================================================================================================
# ===================================================================================================================
# ===================================================================================================================
# Vat Tu
def DashboardBPVatTu(request):
    # Pass MEDIA_URL to the context
    context = {
        'MEDIA_URL': settings.MEDIA_URL
    }
    # Render a template or return a response
    return render(request, 'dashboard/DashboardBPVatTu.html', context)

def DashboardBPKho(request):
    # Pass MEDIA_URL to the context
    context = {
        'MEDIA_URL': settings.MEDIA_URL
    }
    # Render a template or return a response
    return render(request, 'dashboard/DashboardBPKho.html', context)

def DashboardBPKyThuat(request):
    # Pass MEDIA_URL to the context
    context = {
        'MEDIA_URL': settings.MEDIA_URL
    }
    # Render a template or return a response
    return render(request, 'dashboard/DashboardBPKyThuat.html', context)

def DashboardBPNhanSu(request):
    # Pass MEDIA_URL to the context
    context = {
        'MEDIA_URL': settings.MEDIA_URL
    }
    # Render a template or return a response
    return render(request, 'dashboard/DashboardBPNhanSu.html', context)

def DashboardBPTaiChinh(request):
    # Pass MEDIA_URL to the context
    context = {
        'MEDIA_URL': settings.MEDIA_URL
    }
    # Render a template or return a response
    return render(request, 'dashboard/DashboardBPTaiChinh.html', context)

def template_01(request):
    # Render a template or return a response
    return render(request, './template_01.html')

# ===================================================================================================================
# ===================================================================================================================
# ===================================================================================================================
# ===================================================================================================================
# ===================================================================================================================
# Manage table

def inventory(request):
    # Pass MEDIA_URL to the context
    context = {
        'MEDIA_URL': settings.MEDIA_URL
    }
    # Render a template or return a response
    return render(request, 'inventory.html', context)

def manage_inventory(request):
    # Đường dẫn JSON cho Tab 1 và Tab 2
    json_path_tab1 = 'templates/json/VT_QUAN_LY_HANG_HOA/PNK_table_input.json'
    json_path_tab2 = 'templates/json/VT_QUAN_LY_HANG_HOA/PXK_table_input.json'

    context = {
        'json_path_tab1': json_path_tab1,
        'json_path_tab2': json_path_tab2,
    }
    
    print(request)
    print(context)
    
    # Truyền các đường dẫn JSON vào template
    return render(request, 'inventory.html', context)



# def add_inventory_category(request):
#     if request.method == 'POST':
#         form = InventoryCategoryForm(request.POST)
#         if form.is_valid():
#             form.save()  # Lưu dữ liệu vào bảng
#             return redirect('success')  # Chuyển hướng đến trang thành công sau khi lưu
#     else:
#         form = InventoryCategoryForm()

#     return render(request, 'add_inventory_category.html', {'form': form})

# def add_inventory_category(request):
#     if request.method == 'POST':
#         form = InventoryCategoryForm(request.POST)

#         # Kiểm tra xem mã hàng đã tồn tại chưa
#         ma_hang = request.POST.get('ma_hang')
#         if InventoryCategory.objects.filter(ma_hang=ma_hang).exists():
#             # Nếu mã hàng đã tồn tại, hiển thị thông báo cảnh báo
#             messages.error(request, f"Mã hàng '{ma_hang}' đã tồn tại.")
#         else:
#             # Nếu mã hàng chưa tồn tại, lưu dữ liệu vào cơ sở dữ liệu
#             if form.is_valid():
#                 form.save()
#                 messages.success(request, "Danh mục hàng đã được thêm thành công!")
#                 return redirect('inventory_data')  # Chuyển hướng tới trang hiển thị dữ liệu
#     else:
#         form = InventoryCategoryForm()

#     return render(request, 'add_inventory_category.html', {'form': form})

def add_inventory_category(request):
    if request.method == 'POST':
        form = InventoryCategoryForm(request.POST)

        # Lấy mã nhân viên từ tên người dùng đăng nhập (request.user.username)
        if request.user.is_authenticated:  # Kiểm tra xem người dùng đã đăng nhập chưa
            id_nhan_vien = request.user.username  # Hoặc bạn có thể lấy thêm thông tin từ người dùng nếu cần
        else:
            id_nhan_vien = "NV01"  # Nếu không có người dùng đăng nhập, đặt giá trị mặc định

        # Kiểm tra xem mã hàng đã tồn tại chưa
        ma_hang = request.POST.get('ma_hang')
        if InventoryCategory.objects.filter(ma_hang=ma_hang).exists():
            # Nếu mã hàng đã tồn tại, hiển thị thông báo cảnh báo
            messages.error(request, f"Mã hàng '{ma_hang}' đã tồn tại.")
        else:
            # Nếu mã hàng chưa tồn tại, lưu dữ liệu vào cơ sở dữ liệu
            if form.is_valid():
                # Lấy đối tượng từ form và gán thêm id_nhan_vien
                inventory_category = form.save(commit=False)
                inventory_category.id_nhan_vien = id_nhan_vien  # Gán mã nhân viên
                inventory_category.save()  # Lưu đối tượng vào cơ sở dữ liệu

                messages.success(request, "Danh mục hàng đã được thêm thành công!")
                return redirect('inventory_data')  # Chuyển hướng tới trang hiển thị dữ liệu
    else:
        form = InventoryCategoryForm()

    return render(request, 'add_inventory_category.html', {'form': form})

def success(request):
    return render(request, 'success.html')

def get_inventory_data(request):
    # Lấy tất cả dữ liệu từ bảng InventoryCategory
    inventory_data = InventoryCategory.objects.all()

    return render(request, 'inventory_data.html', {'inventory_data': inventory_data})