from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import FormSubmission
from .serializers import FormSubmissionSerializer

class FormSubmissionView(APIView):
    def post(self, request):
        print("staring")
        try:
            print("b1")
            serializer = FormSubmissionSerializer(data=request.data)
            if serializer.is_valid():
                print("b2")
                serializer.save()  # Lưu dữ liệu vào database
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            else:
                print("b3")
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            # Ghi lại lỗi chi tiết để giúp bạn debug
            print(f"Error: {e}")
            return Response({"error": "Đã có lỗi xảy ra, vui lòng thử lại!"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
