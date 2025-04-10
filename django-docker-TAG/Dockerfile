# Thay thế image Anaconda cũ bằng image Python chính thức mới hơn
FROM python:3.8-slim


# Thiết lập thư mục làm việc
WORKDIR /app

# Cài đặt các phụ thuộc hệ thống (nếu cần)
RUN apt-get update && apt-get install -y \
    build-essential \
    python3-dev \
    libpq-dev

# Cài đặt Django và các thư viện cần thiết từ conda-forge
RUN pip install django

# Copy requirements.txt vào container (sau khi tạo dự án Django)
COPY requirements.txt /app/

# Cài đặt các phụ thuộc từ requirements.txt bằng pip
RUN pip install -r requirements.txt

# Copy toàn bộ mã nguồn vào container
COPY . /app/

# Cổng mà Django sẽ sử dụng
EXPOSE 8000

# Lệnh chạy Django server
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]
