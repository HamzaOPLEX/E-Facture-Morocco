from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.exceptions import AuthenticationFailed
from ..serializers import UserSerializer
from ..models import User
from ..models import Product
from ..serializers import APP_ProductsSerializer
from rest_framework import status
from time import sleep
from django.http import JsonResponse
from rest_framework.permissions import IsAuthenticated
from django.views.decorators.cache import cache_page
from django.utils.decorators import method_decorator
from django.core.cache import cache
from django.views.decorators.cache import cache_control
from efacture_api import settings

class ProductsListAPIView(APIView):
    permission_classes = [IsAuthenticated]
    @method_decorator(cache_page(settings.CACHE_TIME))
    @method_decorator(cache_control(no_cache=True, must_revalidate=True))
    # Get a list of all products
    def get(self, request, format=None):
        products = Product.objects.all()
        serializer = APP_ProductsSerializer(products, many=True)
        return Response(serializer.data)



class ProductsCreateAPIView(APIView):
    permission_classes = [IsAuthenticated]

    # Create a new Product
    def post(self, request, format=None):
        serializer = APP_ProductsSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            selectedProduct = serializer.data['id']
            products = Product.objects.all()
            serializer = APP_ProductsSerializer(products, many=True)
            return Response([serializer.data,selectedProduct], status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class ProductsEditAPIView(APIView):
    permission_classes = [IsAuthenticated]

    # Update an existing Product
    def put(self, request, pk, format=None):
        product = Product.objects.get(id=pk)
        serializer = APP_ProductsSerializer(Product, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class ProductsDeleteAPIView(APIView):
    permission_classes = [IsAuthenticated]

    # Delete a Product
    def delete(self, request, pk, format=None):
        try :
            product = Product.objects.all().filter(id=pk)
            Product.delete()
            products = Product.objects.all()
            serializer = APP_ProductsSerializer(products, many=True)
            return Response(serializer.data,status=status.HTTP_200_OK)
        except Exception as Error:
            return JsonResponse({'error': str(Error)}, status=500)


class ProductsDetailAPIView(APIView):
    permission_classes = [IsAuthenticated]

    @method_decorator(cache_page(settings.CACHE_TIME))
    def get(self, request,pk, format=None):
        products = Product.objects.filter(id=pk)
        serializer = APP_ProductsSerializer(products, many=True)
        return Response(serializer.data[0])