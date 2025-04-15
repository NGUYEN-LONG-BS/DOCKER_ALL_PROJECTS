from django.conf import settings
from django.shortcuts import render, redirect, get_object_or_404
from django.http import HttpResponse
from .models import Blog
from .forms import BlogForm

def index(request):
    return render(request, 'home.html')

def django_guidance(request):
    return render(request, 'start_django_with_docker.html')

def blog_list(request):
    blogs = Blog.objects.all()  # Lấy tất cả các bài viết từ cơ sở dữ liệu
    return render(request, 'blog_list.html', {'blogs': blogs})

# Hàm hiển thị chi tiết bài viết
def blog_detail(request, id):
    # Lấy bài viết theo id
    blog = Blog.objects.get(id=id)
    return render(request, 'blog_detail.html', {'blog': blog})

def add_blog(request):
    if request.method == 'POST':
        form = BlogForm(request.POST)
        if form.is_valid():
            form.save()  # Lưu bài viết mới vào cơ sở dữ liệu
            return redirect('blog_list')  # Chuyển hướng đến danh sách blog sau khi lưu
    else:
        form = BlogForm()

    return render(request, 'add_blog.html', {'form': form})

def edit_blog(request, id):
    blog = get_object_or_404(Blog, id=id)  # Lấy bài viết từ cơ sở dữ liệu
    
    if request.method == 'POST':
        form = BlogForm(request.POST, instance=blog)  # Điền dữ liệu hiện có vào form
        if form.is_valid():
            form.save()  # Lưu các thay đổi vào cơ sở dữ liệu
            return redirect('blog_list')  # Sau khi lưu, chuyển hướng đến danh sách blog
    else:
        form = BlogForm(instance=blog)  # Tạo form với dữ liệu hiện có của bài viết

    return render(request, 'edit_blog.html', {'form': form, 'blog': blog})