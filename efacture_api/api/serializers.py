from rest_framework import serializers
from .models import *


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'password',"email"]
        extra_kwargs = {
            'password': {'write_only': True}
        }

    def create(self, validated_data):
        password = validated_data.pop('password', None)
        instance = self.Meta.model(**validated_data)
        if password is not None:
            instance.set_password(password)
        instance.save()
        return instance

class UserEmailSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["email"]
    email = serializers.EmailField()
    def validate_email(self, value):
        """
        Check if the provided email already exists in the database.
        """
        if User.objects.filter(email=value).exists():
            return value
        else :
            raise serializers.ValidationError("This email is not registered.")

class APP_ClientsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Client
        fields = '__all__'

class APP_ProductsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Client
        fields = '__all__'

class DocumentListSerializer(serializers.ModelSerializer):
    document_client = APP_ClientsSerializer()
    class Meta:
        model = Document
        fields = '__all__'

class DocumentListSerializer(serializers.ModelSerializer):
    document_client = APP_ClientsSerializer()
    class Meta:
        model = Document
        fields = '__all__'

class DocumentEditSerializer(serializers.ModelSerializer):
    class Meta:
        model = Document
        fields ='__all__'

    # Add this method to allow partial updates
    def update(self, instance, validated_data):
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()
        return instance


class DocumentSerializer(serializers.ModelSerializer):
    # document_client = serializers.CharField(source='document_client.name', read_only=True)
    class Meta:
        model = Document
        fields = '__all__'
    def create(self, validated_data):
        return Document.objects.create(**validated_data)