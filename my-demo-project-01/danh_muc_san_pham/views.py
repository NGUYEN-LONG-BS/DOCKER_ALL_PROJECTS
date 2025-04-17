from .models import Product, Category
from django.shortcuts import render, redirect
from .forms import ProductForm

def danh_muc_san_pham(request):
    # Lấy danh sách sản phẩm và danh mục từ cơ sở dữ liệu
    products = Product.objects.all()
    categories = Category.objects.all()

    # Lấy số lượng sản phẩm và số sản phẩm mỗi trang
    products_per_page = 20
    total_products = products.count()

    # Truyền vào template
    return render(request, 'danh_muc_san_pham.html', {
        'products': products,
        'categories': categories,
        'products_per_page': products_per_page,
        'total_products': total_products,
    })

def add_product(request):
    if request.method == 'POST':
        form = ProductForm(request.POST, request.FILES)
        if form.is_valid():
            form.save()  # Lưu sản phẩm vào cơ sở dữ liệu
            return redirect('danh_muc_san_pham')  # Sau khi lưu, chuyển hướng về trang danh mục sản phẩm
    else:
        form = ProductForm()

    return render(request, 'add_product.html', {'form': form})
