from django.utils.timezone import now
from django.http import HttpResponse

from rest_framework import viewsets
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view, parser_classes
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.pagination import PageNumberPagination

from .models_LA import LA_INVENTORY_CATEGORIES
from .models_LA import LA_CLIENT_CATEGORIES

from .serializers_LA import LAClientCategoriesSerializer

import openpyxl
import re
from openpyxl.utils import get_column_letter
from datetime import timedelta

DATABASE_NAME = 'tala'

# ==============================================================================
# CLIENT CATEGORIES
# ==============================================================================

# Lazy loading pagination class
class ClientPagination(PageNumberPagination):
    page_size = 25  # Default number of records per page
    page_size_query_param = 'limit'  # Allow the client to specify the page size
    max_page_size = 100  # Maximum number of records per page

# Get all data
class get_data_LA_CLIENT_CATEGORIES(viewsets.ModelViewSet):
    queryset = LA_CLIENT_CATEGORIES.objects.using(DATABASE_NAME).filter(xoa_sua="new").order_by("-ma_khach_hang")
    serializer_class = LAClientCategoriesSerializer
    pagination_class = ClientPagination  # Add pagination support

    @classmethod
    def as_view(cls, actions=None, **initkwargs):
        if actions is None:
            actions = {'get': 'list'}
        return super().as_view(actions, **initkwargs)


# Create LA_CLIENT_CATEGORIES
class LAClientCategoriesCreateView(APIView):
    def post(self, request):
        data = request.data
        ma_khach_hang = data.get("ma_khach_hang")
        action = data.pop("action", None)  # Remove 'action' from data

        # Check if a record with ma_khach_hang exists
        existing_record = LA_CLIENT_CATEGORIES.objects.filter(ma_khach_hang=ma_khach_hang).first()

        if action == "create":
            if existing_record:
                if LA_CLIENT_CATEGORIES.objects.filter(ma_khach_hang=ma_khach_hang, xoa_sua="new").exists():
                    # Return an error if the record already exists with xoa_sua = "new"
                    return Response({"error": "Record with ma_khach_hang already exists and xoa_sua is 'new'."}, status=status.HTTP_400_BAD_REQUEST)
                else:
                    # Create a new record with xoa_sua = "new"
                    data["xoa_sua"] = "new"
                    LA_CLIENT_CATEGORIES.objects.create(**data)
                    return Response({"message": "New record created successfully."}, status=status.HTTP_201_CREATED)                    
            else:
                # Create a new record since ma_khach_hang does not exist
                LA_CLIENT_CATEGORIES.objects.create(**data)
                return Response({"message": "Record created successfully."}, status=status.HTTP_201_CREATED)
        elif action == "edit":
            if existing_record:
                if existing_record.xoa_sua == "new":
                    # Update existing record's xoa_sua to "old"
                    existing_record.xoa_sua = "old"
                    existing_record.save()
                    # Create a new record with xoa_sua = "new"
                    data["xoa_sua"] = "new"
                    LA_CLIENT_CATEGORIES.objects.create(**data)
                    return Response({"message": "Record updated and new record created successfully."}, status=status.HTTP_200_OK)
                else:
                    # Update the existing record directly
                    for key, value in data.items():
                        setattr(existing_record, key, value)
                    existing_record.save()
                    return Response({"message": "Record updated successfully."}, status=status.HTTP_200_OK)
            else:
                # Return an error if the record does not exist
                return Response({"error": "Record with ma_khach_hang does not exist."}, status=status.HTTP_404_NOT_FOUND)
        else:
            return Response({"error": "Invalid action specified."}, status=status.HTTP_400_BAD_REQUEST)

# Get next ma_khach_hang
class GetNextMaKhachHangView(APIView):
    def get(self, request):
        # Get the latest ma_khach_hang in the format KH00000
        latest_record = LA_CLIENT_CATEGORIES.objects.filter(ma_khach_hang__startswith="KH").order_by("-ma_khach_hang").first()
        
        if latest_record:
            latest_ma_khach_hang = latest_record.ma_khach_hang
            # Extract the numeric part and increment it
            match = re.match(r"KH(\d+)", latest_ma_khach_hang)
            if match:
                next_number = int(match.group(1)) + 1
                next_ma_khach_hang = f"KH{next_number:05d}"
                return Response({"next_ma_khach_hang": next_ma_khach_hang}, status=status.HTTP_200_OK)
        
        # If no records exist, return KH00001
        return Response({"next_ma_khach_hang": "KH00001"}, status=status.HTTP_200_OK)

# Export LA_CLIENT_CATEGORIES to Excel
class ExportLAClientCategoriesToExcel(APIView):
    def get(self, request):
        # Create a workbook and worksheet
        workbook = openpyxl.Workbook()
        worksheet = workbook.active
        worksheet.title = "LA_CLIENT_CATEGORIES"

        # Define the headers
        headers = [
            "ID", "Date", "ID Nhân Viên", "Xóa/Sửa", "Mã Khách Hàng", "Tên Khách Hàng",
            "Mã Phân Loại 01", "Mã Phân Loại 02", "Mã Phân Loại 03", "Mã Phân Loại 04",
            "Mã Phân Loại 05", "Mã Phân Loại 06", "Mã Phân Loại 07", "Mã Phân Loại 08",
            "MST", "Địa Chỉ"
        ]
        worksheet.append(headers)

        # Fetch all data from the model
        clients = LA_CLIENT_CATEGORIES.objects.all()

        # Add data rows
        for client in clients:
            worksheet.append([
                str(client.id),  # Convert UUID to string
                client.date.replace(tzinfo=None),  # Remove timezone from datetime
                client.id_nhan_vien, client.xoa_sua, client.ma_khach_hang,
                client.ten_khach_hang, client.ma_phan_loai_01, client.ma_phan_loai_02,
                client.ma_phan_loai_03, client.ma_phan_loai_04, client.ma_phan_loai_05,
                client.ma_phan_loai_06, client.ma_phan_loai_07, client.ma_phan_loai_08,
                client.mst, client.dia_chi
            ])

        # Adjust column widths
        for col_num, col_title in enumerate(headers, 1):
            column_letter = get_column_letter(col_num)
            worksheet.column_dimensions[column_letter].width = 20

        # Create a response with the Excel file
        response = HttpResponse(
            content_type="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        )
        response["Content-Disposition"] = 'attachment; filename="LA_CLIENT_CATEGORIES.xlsx"'
        workbook.save(response)
        return response

# Update xoa_sua field
class UpdateXoaSuaView(APIView):
    def post(self, request):
        ma_khach_hang = request.data.get("ma_khach_hang")
        pass_field = request.data.get("pass_field")
        if not pass_field or pass_field != "admincome":
            return Response({"error": "Invalid or missing password."}, status=status.HTTP_403_FORBIDDEN)

        if not ma_khach_hang:
            return Response({"error": "ma_khach_hang is required."}, status=status.HTTP_400_BAD_REQUEST)

        # Check if the record exists with xoa_sua = "new"
        record = LA_CLIENT_CATEGORIES.objects.filter(ma_khach_hang=ma_khach_hang, xoa_sua="new").first()
        if not record:
            return Response({"error": "Record with ma_khach_hang does not exist or xoa_sua is not 'new'."}, status=status.HTTP_404_NOT_FOUND)

        # Check the time difference
        time_difference = now() - record.date
        if time_difference < timedelta(hours=0, minutes=2):
            # Update xoa_sua to "delete"
            record.xoa_sua = "delete"
            record.save()
            return Response({"message": "Record updated successfully."}, status=status.HTTP_200_OK)
        else:
            return Response({"error": "overtime to delete"}, status=status.HTTP_400_BAD_REQUEST)
