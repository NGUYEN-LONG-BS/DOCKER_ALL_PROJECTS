from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view

from .models import FormSubmission
from .serializers import FormSubmissionSerializer

from .models import LoginInfo, TB_INVENTORY_CATEGORIES
from .serializers import LoginInfoSerializer, TBInventoryCategoriesSerializer, InventoryCategoriesSerializer

from .models import LoginInfo
from .serializers import LoginInfoSerializer

from .models import TB_INVENTORY_CATEGORIES
from .serializers import TBInventoryCategoriesSerializer

from rest_framework.generics import ListAPIView

import json
from django.http import JsonResponse
from django.conf import settings
import os

#========================================================================================================================
#========================================================================================================================
#========================================================================================================================
#========================================================================================================================
#========================================================================================================================
#========================================================================================================================
#========================================================================================================================

class FormSubmissionView(APIView):
    def post(self, request):
        try:
            serializer = FormSubmissionSerializer(data=request.data)
            if serializer.is_valid():
                serializer.save()  # Lưu dữ liệu vào database
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            else:
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            # Ghi lại lỗi chi tiết để giúp bạn debug
            print(f"Error: {e}")
            return Response({"error": "Đã có lỗi xảy ra, vui lòng thử lại!"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

#========================================================================================================================
#========================================================================================================================
#========================================================================================================================
#========================================================================================================================
#========================================================================================================================
#========================================================================================================================
#========================================================================================================================

@api_view(['POST'])
def submit_login_info(request):
    if request.method == 'POST':
        serializer = LoginInfoSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "Dữ liệu đã được thêm thành công!"}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
def submit_inventory_categories(request):
    if request.method == 'POST':
        serializer = InventoryCategoriesSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "Dữ liệu đã được thêm thành công!"}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class LoginInfoListView(ListAPIView):
    queryset = LoginInfo.objects.all()
    serializer_class = LoginInfoSerializer

class TBInventoryCategoriesView(ListAPIView):
    queryset = TB_INVENTORY_CATEGORIES.objects.all()
    serializer_class = TBInventoryCategoriesSerializer

#========================================================================================================================
#========================================================================================================================
#========================================================================================================================
#========================================================================================================================
#========================================================================================================================
#========================================================================================================================
#========================================================================================================================
    
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
# Save inventory
# ==============================================================================

from rest_framework import generics
from .models import TB_INVENTORY_STOCK_RECEIVED_ISSSUED_RETURNED
from .serializers import InventoryStockReceivedIssuedReturnedSerializer

class InventoryStockReceivedIssuedReturnedView(generics.ListCreateAPIView):
    queryset = TB_INVENTORY_STOCK_RECEIVED_ISSSUED_RETURNED.objects.all()
    serializer_class = InventoryStockReceivedIssuedReturnedSerializer
    
    # Override create method to handle multiple objects in a single request
    def create(self, request, *args, **kwargs):
        # Check if the request body contains a list of objects
        if isinstance(request.data, list):
            # If it's a list, we need to serialize each item
            serializer = self.get_serializer(data=request.data, many=True)
        else:
            # Otherwise, we process it as a single object
            serializer = self.get_serializer(data=request.data)

        # Validate the data
        if serializer.is_valid():
            # Save and return response
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# ==============================================================================
# Download file
# ==============================================================================
# myproject/views.py
from django.http import FileResponse, HttpResponseNotFound
from django.conf import settings
import os

def download_file_PRINT_TEMPLATE(request):
    # Đường dẫn tới file Excel
    file_path = os.path.join(settings.BASE_DIR, 'static/templates/download/PRINT_TEMPLATE.xlsx')
    
    # Kiểm tra nếu file tồn tại
    if os.path.exists(file_path):
        # Trả về file cho người dùng
        return FileResponse(open(file_path, 'rb'), as_attachment=True, filename='PRINT_TEMPLATE.xlsx')
    else:
        # Nếu file không tồn tại, trả về lỗi 404
        return HttpResponseNotFound("File not found")

def download_file_IMPORT_TEMPLATE(request):
    # Đường dẫn tới file Excel
    file_path = os.path.join(settings.BASE_DIR, 'static/templates/download/IMPORT_TEMPLATE.xlsx')
    
    # Kiểm tra nếu file tồn tại
    if os.path.exists(file_path):
        # Trả về file cho người dùng
        return FileResponse(open(file_path, 'rb'), as_attachment=True, filename='IMPORT_TEMPLATE.xlsx')
    else:
        # Nếu file không tồn tại, trả về lỗi 404
        return HttpResponseNotFound("File not found")

# ==============================================================================
# Upload file
# ==============================================================================

import os
from django.conf import settings
from django.http import JsonResponse
from rest_framework.decorators import api_view
from rest_framework.response import Response

import os
from django.conf import settings
from rest_framework.decorators import api_view
from rest_framework.response import Response

@api_view(['POST'])
def import_data(request):
    print("Bắt đầu lưu file")

    # Lấy file từ request
    file = request.FILES.get('file')
    
    if not file:
        return Response({'error': 'No file uploaded'}, status=400)

    # Đảm bảo thư mục static/templates/upload tồn tại
    upload_dir = os.path.join(settings.BASE_DIR, 'static/templates/upload')
    if not os.path.exists(upload_dir):
        os.makedirs(upload_dir)
        print(f"Thư mục {upload_dir} đã được tạo.")

    # Đặt tên file và kiểm tra tên file để đảm bảo không có ký tự đặc biệt
    file_name = file.name
    file_path = os.path.join(upload_dir, file_name)

    try:
        # Lưu file vào thư mục upload
        with open(file_path, 'wb') as f:
            for chunk in file.chunks():
                f.write(chunk)
        
        # In ra file path để kiểm tra
        print(f"File đã được lưu tại {file_path}")

        return Response({'message': 'File uploaded and saved successfully'}, status=200)
    
    except Exception as e:
        # Xử lý lỗi khi lưu file
        print(f"Lỗi khi lưu file: {str(e)}")
        return Response({'error': f'Error saving file: {str(e)}'}, status=500)


# ==============================================================================
# Get max number of slip
# ==============================================================================

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import TB_INVENTORY_STOCK_RECEIVED_ISSSUED_RETURNED

class MaxSoPhieuView(APIView):

    def get(self, request, format=None):
        # Lấy tất cả các số phiếu từ bảng
        phieu_list = TB_INVENTORY_STOCK_RECEIVED_ISSSUED_RETURNED.objects.all()
        
        # Danh sách chứa các số phiếu và 6 số cuối của chúng
        max_phieu = None
        max_last_six = -1  # Giá trị ban đầu thấp nhất để so sánh

        for phieu in phieu_list:
            # Trích xuất 6 ký tự cuối và chuyển thành số
            last_six_digits = phieu.so_phieu[-6:]

            try:
                # So sánh các số cuối cùng (chuyển sang kiểu số nguyên để so sánh)
                last_six_number = int(last_six_digits)
                
                if last_six_number > max_last_six:
                    max_last_six = last_six_number
                    max_phieu = phieu.so_phieu
            except ValueError:
                continue  # Nếu không thể chuyển thành số thì bỏ qua

        if max_phieu:
            # Tăng số cuối lên 1
            max_last_six += 1
            
            # Tạo số phiếu mới
            new_number_slip = f"{max_phieu[:-6]}{max_last_six:06d}"
            
            # Trả về số phiếu moi
            return Response({'new_number_slip': new_number_slip}, status=status.HTTP_200_OK)
        else:
            return Response({'error': 'Không có số phiếu nào'}, status=status.HTTP_404_NOT_FOUND)

# ==============================================================================
# Check number slip exist
# ==============================================================================
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import TB_INVENTORY_STOCK_RECEIVED_ISSSUED_RETURNED
        
class CheckSoPhieuExistView(APIView):
    def get(self, request, format=None):
        # Lấy số phiếu từ query parameters
        value_to_search = request.query_params.get('so_phieu', None)

        if not value_to_search:
            return Response(
                {'error': 'Số phiếu không được cung cấp'},
                status=status.HTTP_400_BAD_REQUEST
            )

        # Kiểm tra xem số phiếu đã tồn tại trong cơ sở dữ liệu chưa
        exists = TB_INVENTORY_STOCK_RECEIVED_ISSSUED_RETURNED.objects.filter(so_phieu=value_to_search).exists()

        # Trả về kết quả với status 200, bất kể số phiếu tồn tại hay không
        return Response({'existed': exists}, status=status.HTTP_200_OK)
    
class CheckMaHangExistView(APIView):
    def get(self, request, format=None):
        # Lấy giá trị cần tìm từ query parameters
        value_to_search = request.query_params.get('ma_hang', None)

        if not value_to_search:
            return Response(
                {'error': 'Mã hàng không được cung cấp'},
                status=status.HTTP_400_BAD_REQUEST
            )

        # Kiểm tra xem giá trị có tồn tại trong cột ma_hang của bảng không
        exists = TB_INVENTORY_CATEGORIES.objects.filter(ma_hang=value_to_search).exists()

        # Trả về kết quả với status 200
        return Response({'existed': exists}, status=status.HTTP_200_OK)

# ==============================================================================
# List inventory stock
# ==============================================================================

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import TB_INVENTORY_STOCK_RECEIVED_ISSSUED_RETURNED
from .serializers import InventoryStockSerializer

class InventoryStockListView(APIView):
    def get(self, request, format=None):
        # Lấy tất cả bản ghi từ model
        inventory_items = TB_INVENTORY_STOCK_RECEIVED_ISSSUED_RETURNED.objects.all()
        # Serialize dữ liệu, truyền index cho mỗi bản ghi
        serialized_data = []
        for index, item in enumerate(inventory_items):
            serializer = InventoryStockSerializer(item, context={'index': index})
            serialized_data.append(serializer.data)
        # Trả về response với status 200
        return Response(serialized_data, status=status.HTTP_200_OK)


# ==============================================================================
# check login
# ==============================================================================

from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from .models import LoginInfo
import json

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
            return JsonResponse({'error': str(e)}, status=500)
    
    return JsonResponse({'error': 'Phương thức không được hỗ trợ'}, status=405)