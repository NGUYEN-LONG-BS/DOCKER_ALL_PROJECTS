# Sử dụng image chính thức của Python
FROM python:3.9-slim

# Đặt thư mục làm việc trong container
WORKDIR /app

# Sao chép tệp requirements.txt vào container
COPY requirements.txt .

# Cài đặt các dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Sao chép toàn bộ mã nguồn vào container
COPY . .

# Mở cổng 8000 cho Django
EXPOSE 8000

# Lệnh chạy server Django
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]
