from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.exceptions import AuthenticationFailed
from ..serializers import UserSerializer
from ..models import User
from ..models import Document
from ..serializers import *
from rest_framework import status
from time import sleep
from rest_framework.permissions import IsAuthenticated
from django.views.decorators.cache import cache_page
from django.core.cache import cache
from django.utils.decorators import method_decorator
from django.views.decorators.cache import cache_control
from efacture_api import settings

class DocumentListAPIView(APIView):
    permission_classes = [IsAuthenticated]
    @method_decorator(cache_page(settings.CACHE_TIME))
    @method_decorator(cache_control(no_cache=True, must_revalidate=True))
    def get(self, request, type, format=None):
        documents = Document.objects.filter(document_type=type)
        serializer = DocumentListSerializer(documents, many=True)
        result = serializer.data
        return Response(result)

class DocumentCreateAPIView(APIView):
    permission_classes = [IsAuthenticated]

    # Create a new document
    def post(self, request, format=None):
        # request.data['document_client'] = int(request.data['document_client'])
        serializer = DocumentSerializer(data=request.data)
        if serializer.is_valid():
            document = serializer.save()
            ser = DocumentListSerializer(document)
            return Response(ser.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class DocumentEditAPIView(APIView):
    permission_classes = [IsAuthenticated]

    # Update an existing document
    def put(self, request, pk, format=None):
        document = Document.objects.all().get(id=pk)
        serializer = DocumentEditSerializer(document, data=request.data,partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class DocumentDeleteAPIView(APIView):
    permission_classes = [IsAuthenticated]

    # Delete a document
    def delete(self, request, pk, format=None):
        document = Document.objects.all().get(id=pk)
        TYPE = document.document_type
        document.delete()
        documents = Document.objects.filter(document_type=TYPE)
        serializer = DocumentListSerializer(documents, many=True)
        return Response(serializer.data,status=status.HTTP_200_OK)

class DocumentDetailAPIView(APIView):
    permission_classes = [IsAuthenticated]

    # Helper method to get a specific document by its primary key (pk)
    # Get a list of all documents
    @method_decorator(cache_page(1))
    @method_decorator(cache_control(no_cache=True, must_revalidate=True))
    def get(self, request,type,pk, format=None):
        documents = Document.objects.filter(id=pk)
        serializer = DocumentListSerializer(documents, many=True)
        return Response(serializer.data[0])

class SearchDocument(APIView):
    permission_classes = [IsAuthenticated]

    # Helper method to get a specific document by its primary key (pk)
    # Get a list of all documents
    @method_decorator(cache_page(settings.CACHE_TIME))
    @method_decorator(cache_control(no_cache=True, must_revalidate=True))
    def get(self, request,document_number, format=None):
        documents = Document.objects.filter(document_number=document_number)
        serializer = DocumentListSerializer(documents, many=True)
        return Response(serializer.data[0])

