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

# def get_json_data(request, file_path: str):
#     json_file_path = os.path.join(settings.BASE_DIR, 'static', 'templates', 'json', file_path)
#     print(json_file_path)
#     try:
#         # Mở và đọc file JSON với mã hóa UTF-8
#         with open(json_file_path, 'r', encoding='utf-8') as file:
#             data = json.load(file)
        
#         # Trả dữ liệu dưới dạng JSON
#         return JsonResponse(data, safe=False)
    
#     except FileNotFoundError:
#         return JsonResponse({"error": "File not found"}, status=404)
#     except json.JSONDecodeError:
#         return JsonResponse({"error": "Invalid JSON format"}, status=400)
#     except UnicodeDecodeError:
#         return JsonResponse({"error": "Unicode decoding error in file"}, status=400)
    
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

# from rest_framework.views import APIView
# from rest_framework.response import Response
# from rest_framework import status
# from .serializers import InventoryFormSerializer

# class SaveInventoryView(APIView):
#     def post(self, request, *args, **kwargs):
#         serializer = InventoryFormSerializer(data=request.data)
#         if serializer.is_valid():
#             # Xử lý dữ liệu ở đây, ví dụ lưu vào database
#             # Bạn có thể tạo model và lưu dữ liệu vào database
#             return Response({"message": "Data saved successfully"}, status=status.HTTP_201_CREATED)
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

from rest_framework import generics
from .models import TB_INVENTORY_STOCK_RECEIVED_ISSSUED_RETURNED
from .serializers import InventoryStockReceivedIssuedReturnedSerializer

class InventoryStockReceivedIssuedReturnedView(generics.ListCreateAPIView):
    queryset = TB_INVENTORY_STOCK_RECEIVED_ISSSUED_RETURNED.objects.all()
    serializer_class = InventoryStockReceivedIssuedReturnedSerializer