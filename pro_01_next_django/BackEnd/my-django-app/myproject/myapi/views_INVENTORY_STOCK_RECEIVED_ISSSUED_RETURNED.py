import os

from django.http import FileResponse, HttpResponseNotFound
from django.conf import settings

from rest_framework import status
from rest_framework import generics
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.decorators import api_view

from .models_TB import TB_INVENTORY_CATEGORIES

from .models_TB import TB_INVENTORY_STOCK_RECEIVED_ISSSUED_RETURNED
from .models_LA import LA_INVENTORY_STOCK_RECEIVED_ISSSUED_RETURNED
from .models_Ha_Noi import HANOI_INVENTORY_STOCK_RECEIVED_ISSSUED_RETURNED
from .models_Mien_Tay import MIENTAY_INVENTORY_STOCK_RECEIVED_ISSSUED_RETURNED
from .models_Nam_An import NAMAN_INVENTORY_STOCK_RECEIVED_ISSSUED_RETURNED
from .models_PA import PA_INVENTORY_STOCK_RECEIVED_ISSSUED_RETURNED

from .serializers_TB import InventoryStockSerializer
from .serializers_TB import TB_InventoryStockReceivedIssuedReturnedSerializer
from .serializers_LA import LA_InventoryStockReceivedIssuedReturnedSerializer
from .serializers_PA import PA_InventoryStockReceivedIssuedReturnedSerializer
from .serializers_Ha_Noi import HANOI_InventoryStockReceivedIssuedReturnedSerializer
from .serializers_Mien_Tay import MIENTAY_InventoryStockReceivedIssuedReturnedSerializer
from .serializers_Nam_An import NAMAN_InventoryStockReceivedIssuedReturnedSerializer

DATABASE_NAME_tb = 'tb'

# ==============================================================================
# Model mapping
MODEL_MAP_INVENTORY_STOCK_RECEIVED_ISSSUED_RETURNED = {
    "TB": (TB_INVENTORY_STOCK_RECEIVED_ISSSUED_RETURNED, TB_InventoryStockReceivedIssuedReturnedSerializer, "tb"),
    "LA": (LA_INVENTORY_STOCK_RECEIVED_ISSSUED_RETURNED, LA_InventoryStockReceivedIssuedReturnedSerializer, "tala"),
    "PA": (PA_INVENTORY_STOCK_RECEIVED_ISSSUED_RETURNED, PA_InventoryStockReceivedIssuedReturnedSerializer, "pa"),
    "HANOI": (HANOI_INVENTORY_STOCK_RECEIVED_ISSSUED_RETURNED, HANOI_InventoryStockReceivedIssuedReturnedSerializer, "hanoi"),
    "MIENTAY": (MIENTAY_INVENTORY_STOCK_RECEIVED_ISSSUED_RETURNED, MIENTAY_InventoryStockReceivedIssuedReturnedSerializer, "mientay"),
    "NAMAN": (NAMAN_INVENTORY_STOCK_RECEIVED_ISSSUED_RETURNED, NAMAN_InventoryStockReceivedIssuedReturnedSerializer, "naman"),
    "TB": (TB_INVENTORY_STOCK_RECEIVED_ISSSUED_RETURNED, TB_InventoryStockReceivedIssuedReturnedSerializer, "tb"),
}

# ==============================================================================
#  get inventory stock received issued returned
class InventoryStockReceivedIssuedReturnedView(generics.ListCreateAPIView):
    def get_queryset(self):
        model_key = self.request.query_params.get('model_key', 'TB')
        model_tuple = MODEL_MAP_INVENTORY_STOCK_RECEIVED_ISSSUED_RETURNED.get(model_key)
        if not model_tuple:
            # Nếu không có model phù hợp, trả về queryset rỗng của model đầu tiên trong mapping (không hard code)
            first_model = list(MODEL_MAP_INVENTORY_STOCK_RECEIVED_ISSSUED_RETURNED.values())[0][0]
            return first_model.objects.none()
        ModelClass, _, db_name = model_tuple
        return ModelClass.objects.using(db_name).all()

    def get_serializer_class(self):
        model_key = self.request.query_params.get('model_key', 'TB')
        model_tuple = MODEL_MAP_INVENTORY_STOCK_RECEIVED_ISSSUED_RETURNED.get(model_key)
        if not model_tuple:
            # Không hard code serializer, lấy serializer đầu tiên trong mapping
            first_serializer = list(MODEL_MAP_INVENTORY_STOCK_RECEIVED_ISSSUED_RETURNED.values())[0][1]
            return first_serializer
        _, SerializerClass, _ = model_tuple
        return SerializerClass

    def create(self, request, *args, **kwargs):
        # Lấy model_key từ query param, nếu không có thì lấy từ body nếu là dict, nếu là list thì mặc định 'TB'
        model_key = request.query_params.get('model_key')
        if not model_key:
            if isinstance(request.data, dict):
                model_key = request.data.get('model_key', 'TB')
            else:
                model_key = 'TB'
        model_tuple = MODEL_MAP_INVENTORY_STOCK_RECEIVED_ISSSUED_RETURNED.get(model_key)
        if not model_tuple:
            return Response({'error': 'Invalid model_key'}, status=status.HTTP_400_BAD_REQUEST)
        ModelClass, SerializerClass, db_name = model_tuple
        # Check if the request body contains a list of objects
        if isinstance(request.data, list):
            serializer = SerializerClass(data=request.data, many=True)
        else:
            serializer = SerializerClass(data=request.data)
        if serializer.is_valid():
            # Save to correct database using bulk_create or save(using=...)
            if isinstance(request.data, list):
                # For many=True, create objects and bulk_create with using=db_name
                objs = [ModelClass(**item) for item in serializer.validated_data]
                ModelClass.objects.using(db_name).bulk_create(objs)
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            else:
                # For single object, save with using=db_name
                instance = serializer.save()
                instance.save(using=db_name)
                return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# ==============================================================================
# Download file
# ==============================================================================
# myproject/views.py

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

class MaxSoPhieuView(APIView):

    def get(self, request, format=None):
        # Lấy tất cả các số phiếu từ bảng
        phieu_list = TB_INVENTORY_STOCK_RECEIVED_ISSSUED_RETURNED.objects.using(DATABASE_NAME_tb).all()
        
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
        exists = TB_INVENTORY_STOCK_RECEIVED_ISSSUED_RETURNED.objects.using(DATABASE_NAME_tb).filter(so_phieu=value_to_search).exists()

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
        exists = TB_INVENTORY_CATEGORIES.objects.using(DATABASE_NAME_tb).filter(ma_hang=value_to_search).exists()

        # Trả về kết quả với status 200
        return Response({'existed': exists}, status=status.HTTP_200_OK)

# ==============================================================================
# List inventory stock
# ==============================================================================

class InventoryStockListView(APIView):
    def get(self, request, format=None):
        from_date = request.query_params.get('from_date')
        to_date = request.query_params.get('to_date')
        so_phieu = request.query_params.get('so_phieu')
        so_phieu_de_nghi = request.query_params.get('so_phieu_de_nghi')
        ma_doi_tuong = request.query_params.get('ma_doi_tuong')
        ma_hang = request.query_params.get('ma_hang')

        qs = TB_INVENTORY_STOCK_RECEIVED_ISSSUED_RETURNED.objects.using(DATABASE_NAME_tb).all()

        # Đúng tên trường ngày
        if from_date:
            qs = qs.filter(ngay_tren_phieu__date__gte=from_date)
        if to_date:
            qs = qs.filter(ngay_tren_phieu__date__lte=to_date)
        if so_phieu:
            qs = qs.filter(so_phieu__icontains=so_phieu)
        if so_phieu_de_nghi:
            qs = qs.filter(so_phieu_de_nghi__icontains=so_phieu_de_nghi)
        if ma_doi_tuong:
            qs = qs.filter(ma_doi_tuong__icontains=ma_doi_tuong)
        if ma_hang:
            qs = qs.filter(ma_hang__icontains=ma_hang)

        qs = qs.order_by('-so_phieu')

        serialized_data = []
        for index, item in enumerate(qs):
            serializer = InventoryStockSerializer(item, context={'index': index})
            serialized_data.append(serializer.data)
        return Response(serialized_data, status=status.HTTP_200_OK)
    

# inherit slip
class InventoryStockBySoPhieuView(APIView):
    def get(self, request, format=None):
        so_phieu = request.query_params.get('so_phieu')
        if not so_phieu:
            return Response({'error': 'Thiếu tham số so_phieu'}, status=status.HTTP_400_BAD_REQUEST)
        qs = TB_INVENTORY_STOCK_RECEIVED_ISSSUED_RETURNED.objects.using(DATABASE_NAME_tb).filter(so_phieu=so_phieu, xoa_sua="new")
        serialized_data = []
        for index, item in enumerate(qs):
            serializer = InventoryStockSerializer(item, context={'index': index})
            serialized_data.append(serializer.data)
        return Response(serialized_data, status=status.HTTP_200_OK)