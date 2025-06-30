from rest_framework import serializers
from .models import LoginInfo, UserPermission

"""
Trong Django REST Framework, các file serializers có tác dụng:

Chuyển đổi dữ liệu giữa model (database) và JSON: Serializer giúp chuyển dữ liệu từ model thành JSON để trả về cho frontend (API response),
và ngược lại, nhận dữ liệu JSON từ frontend để tạo/cập nhật object trong database.

Kiểm tra và validate dữ liệu: Serializer kiểm tra dữ liệu đầu vào (từ request) có hợp lệ không trước khi lưu vào database.

Định nghĩa trường nào sẽ expose ra ngoài API: Bạn có thể chọn fields nào sẽ trả về cho frontend hoặc nhận từ frontend.

Nói ngắn gọn: Serializer là cầu nối giữa dữ liệu Python/Django (model) và dữ liệu JSON (API), đồng thời giúp kiểm soát, validate dữ liệu khi trao đổi qua API.
"""

class LoginInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = LoginInfo
        fields = ['login_id', 'pass_field']

class LoginInfo_all_columns_Serializer(serializers.ModelSerializer):
    class Meta:
        model = LoginInfo
        fields = '__all__'

class UserPermissionSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserPermission
        fields = '__all__'
