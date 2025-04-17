from django.shortcuts import render

def danh_muc_san_pham(request):
    return render(request, 'danh_muc_san_pham/danh_muc_san_pham.html')