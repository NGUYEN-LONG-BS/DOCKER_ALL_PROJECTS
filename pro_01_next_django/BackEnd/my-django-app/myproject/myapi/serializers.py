from rest_framework import serializers
from .models import FormSubmission, LoginInfo

class FormSubmissionSerializer(serializers.ModelSerializer):
    class Meta:
        model = FormSubmission
        fields = ['id', 'name', 'email']

class LoginInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = LoginInfo
        fields = ['login_id', 'pass_field']