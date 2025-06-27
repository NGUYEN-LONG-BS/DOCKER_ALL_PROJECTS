from django.http import JsonResponse
from django.conf import settings
from django.views.decorators.csrf import csrf_exempt

from rest_framework import status
from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework.generics import ListAPIView

from .models import LoginInfo, UserPermission

from .serializers import LoginInfoSerializer
from .serializers import LoginInfoSerializer
from .serializers import UserPermissionSerializer

import json
import os

DATABASE_NAME_default = 'default'
DATABASE_NAME_tb = 'tb'

#==========================================================================
# LoginInfo
@api_view(['POST'])
def submit_login_info(request):
    if request.method == 'POST':
        serializer = LoginInfoSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "Dữ liệu đã được thêm thành công!"}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# ==========================================================================
# get login info
class LoginInfoListView(ListAPIView):
    queryset = LoginInfo.objects.all()
    serializer_class = LoginInfoSerializer

# ==============================================================================
# Get JSON data from file
def get_json_data(request):
    # Đường dẫn đến file JSON trong thư mục static/templates/json
    json_file_path = os.path.join(settings.BASE_DIR, 'static', 'templates', 'json', 'VT_QUAN_LY_HANG_HOA', 'inventoies_categoried.json')
    
    try:
        # Mở và đọc file JSON với mã hóa UTF-8
        with open(json_file_path, 'r', encoding='utf-8') as file:
            data = json.load(file)
        
        # Trả dữ liệu dưới dạng JSON
        return JsonResponse(data, safe=False)
    
    except FileNotFoundError:
        return JsonResponse({"error": "File not found"}, status=404)
    except json.JSONDecodeError:
        return JsonResponse({"error": "Invalid JSON format"}, status=400)
    except UnicodeDecodeError:
        return JsonResponse({"error": "Unicode decoding error in file"}, status=400)

# ==============================================================================
# check login
@csrf_exempt
def check_login(request):
    if request.method == 'POST':
        try:
            # Lấy dữ liệu từ request body
            data = json.loads(request.body)
            login_id = data.get('login_id')
            pass_field = data.get('pass_field')

            # Kiểm tra xem login_id và pass_field có được cung cấp hay không
            if not login_id or not pass_field:
                return JsonResponse({'error': 'Vui lòng cung cấp login_id và pass_field'}, status=400)

            # Kiểm tra trong database
            exists = LoginInfo.objects.filter(login_id=login_id, pass_field=pass_field).exists()
            
            return JsonResponse({'result': exists}, status=200)
        
        except json.JSONDecodeError:
            return JsonResponse({'error': 'Dữ liệu JSON không hợp lệ'}, status=400)
        except Exception as e:
            print(e)  # In lỗi ra console
            return JsonResponse({'error': str(e)}, status=500)
    
    return JsonResponse({'error': 'Phương thức không được hỗ trợ'}, status=405)

# ==============================================================================
# Login and Permission
class UserPermissionViewSet(viewsets.ModelViewSet):
    serializer_class = UserPermissionSerializer

    def get_queryset(self):
        queryset = UserPermission.objects.using(DATABASE_NAME_default).all().order_by('user_id')
        # Đánh lại số thứ tự (STT) cho từng bản ghi
        for idx, obj in enumerate(queryset, start=1):
            obj.stt = idx
        return queryset

    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        serializer = self.get_serializer(queryset, many=True)
        # Thêm trường STT vào từng bản ghi trả về
        data = serializer.data
        for idx, item in enumerate(data, start=1):
            item['stt'] = idx
        return Response(data)

# ==============================================================================
# Get user permission info
@api_view(['GET'])
def get_user_permission_info(request):
    user_id = request.query_params.get('user_id')
    if not user_id:
        return Response({'error': 'Thiếu user_id'}, status=400)
    user_permissions = UserPermission.objects.using(DATABASE_NAME_default).filter(user_id=user_id)
    if not user_permissions.exists():
        return Response({'error': 'Không tìm thấy user_id này'}, status=404)
    data = [
        {
            'subsidiary': up.subsidiary,
            'department': up.department
        }
        for up in user_permissions
    ]
    # print('user_permission_info:', data)
    return Response(data, status=200)

