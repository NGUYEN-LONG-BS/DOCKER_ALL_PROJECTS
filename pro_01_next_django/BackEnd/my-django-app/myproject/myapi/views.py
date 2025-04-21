from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view

from .models import FormSubmission
from .serializers import FormSubmissionSerializer

from .models import LoginInfo
from .serializers import LoginInfoSerializer

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

@api_view(['POST'])
def submit_login_info(request):
    if request.method == 'POST':
        serializer = LoginInfoSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "Dữ liệu đã được thêm thành công!"}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
