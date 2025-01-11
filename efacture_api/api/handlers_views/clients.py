from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.exceptions import AuthenticationFailed
from ..serializers import UserSerializer
from ..models import User
from ..models import Client
from ..serializers import APP_ClientsSerializer
from rest_framework import status
from time import sleep
from django.http import JsonResponse
from rest_framework.permissions import IsAuthenticated
from django.views.decorators.cache import cache_page
from django.utils.decorators import method_decorator
from django.core.cache import cache
from django.views.decorators.cache import cache_control
from efacture_api import settings

class ClientsListAPIView(APIView):
    permission_classes = [IsAuthenticated]
    @method_decorator(cache_page(settings.CACHE_TIME))
    @method_decorator(cache_control(no_cache=True, must_revalidate=True))
    # Get a list of all clients
    def get(self, request, format=None):
        clients = Client.objects.all()
        serializer = APP_ClientsSerializer(clients, many=True)
        return Response(serializer.data)



class ClientsCreateAPIView(APIView):
    permission_classes = [IsAuthenticated]

    # Create a new client
    def post(self, request, format=None):
        serializer = APP_ClientsSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            selectedClient = serializer.data['id']
            clients = Client.objects.all()
            serializer = APP_ClientsSerializer(clients, many=True)
            return Response([serializer.data,selectedClient], status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class ClientsEditAPIView(APIView):
    permission_classes = [IsAuthenticated]

    # Update an existing client
    def put(self, request, pk, format=None):
        client = Client.objects.get(id=pk)
        serializer = APP_ClientsSerializer(client, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class ClientsDeleteAPIView(APIView):
    permission_classes = [IsAuthenticated]

    # Delete a client
    def delete(self, request, pk, format=None):
        try :
            client = Client.objects.all().filter(id=pk)
            client.delete()
            clients = Client.objects.all()
            serializer = APP_ClientsSerializer(clients, many=True)
            return Response(serializer.data,status=status.HTTP_200_OK)
        except Exception as Error:
            return JsonResponse({'error': str(Error)}, status=500)


class ClientsDetailAPIView(APIView):
    permission_classes = [IsAuthenticated]

    @method_decorator(cache_page(settings.CACHE_TIME))
    def get(self, request,pk, format=None):
        clients = Client.objects.filter(id=pk)
        serializer = APP_ClientsSerializer(clients, many=True)
        return Response(serializer.data[0])