from django.conf import settings
from django.shortcuts import render, redirect
from django.contrib import messages

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

def inventory(request):
    # Pass MEDIA_URL to the context
    context = {
        'MEDIA_URL': settings.MEDIA_URL
    }
    # Render a template or return a response
    return render(request, 'inventory.html', context)

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

# def manage_inventory(request):
#     # Đường dẫn JSON cho Tab 1 và Tab 2
#     json_path_tab1 = 'templates/json/VT_QUAN_LY_HANG_HOA/PNK_table_input.json'
#     json_path_tab2 = 'templates/json/VT_QUAN_LY_HANG_HOA/PXK_table_input.json'

#     return render(request, 'inventory.html', {
#         'json_path_tab1': json_path_tab1,
#         'json_path_tab2': json_path_tab2
#     })
def manage_inventory(request):
    # Đường dẫn JSON cho Tab 1 và Tab 2
    json_path_tab1 = 'templates/json/VT_QUAN_LY_HANG_HOA/PNK_table_input.json'
    json_path_tab2 = 'templates/json/VT_QUAN_LY_HANG_HOA/PXK_table_input.json'

    # Truyền các đường dẫn JSON vào template
    return render(request, 'inventory.html', {
        'json_path_tab1': json_path_tab1,
        'json_path_tab2': json_path_tab2
    })