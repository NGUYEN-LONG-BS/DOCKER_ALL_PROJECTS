from rest_framework import serializers
from .models_LA import LA_CLIENT_CATEGORIES

class LA_CLIENT_CATEGORIES_Serializer(serializers.ModelSerializer):
    class Meta:
        model = LA_CLIENT_CATEGORIES
        fields = '__all__'

class LAClientCategoriesSerializer(serializers.ModelSerializer):
    class Meta:
        model = LA_CLIENT_CATEGORIES
        fields = '__all__'