from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.response import Response
from rest_framework.views import APIView
from django.core.files.storage import FileSystemStorage
from ..serializers import FileUploadSerializer, SettingSerializer  # Assuming you have this serializer
from rest_framework import status
from ..models import setting

from django.http import FileResponse, JsonResponse
from django.views import View
import os

# This view is used to upload the background image for the invoice
@method_decorator(csrf_exempt, name='dispatch')
class UploadInvoiceBackgroundView(APIView):
    # Ensure we can handle multipart file uploads
    parser_classes = [MultiPartParser, FormParser]

    def post(self, request, *args, **kwargs):
        # Validate and deserialize the uploaded file data
        serializer = FileUploadSerializer(data=request.data)
        if serializer.is_valid():
            uploaded_file = serializer.validated_data['file']
            
            # Set the storage location and file name
            fs = FileSystemStorage(location='static/img')  # Save to 'static/img' folder
            file_name = 'main-invoice-bg.png'  # File name to overwrite
            
            # Check if the file already exists, and delete it to overwrite
            if fs.exists(file_name):
                fs.delete(file_name)

            # Save the new file and get its path
            file_path = fs.save(file_name, uploaded_file)
            
            # Return a success message with the file path
            return Response({'message': 'File uploaded successfully.', 'file_path': file_path}, status=status.HTTP_201_CREATED)
        
        # Return errors if the serializer is invalid
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# This view is used to get the background image for the invoice
class GetInvoiceBackgroundView(View):
    def get(self, request, *args, **kwargs):
        # Define the file path for the background image
        file_path = os.path.join('static', 'img', 'main-invoice-bg.png')
        
        # Check if the file exists
        if not os.path.exists(file_path):
            return JsonResponse({'error': 'Background image not found.'}, status=404)
        
        # Serve the file as a response
        return FileResponse(open(file_path, 'rb'), content_type='image/png')


class SettingView(APIView):
    def get(self, request, *args, **kwargs):
        """Retrieve the current template color."""
        try:
            current_setting = setting.objects.first()  # Get the latest setting
            serializer = SettingSerializer(current_setting)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except setting.DoesNotExist:
            return Response({"error": "No settings found."}, status=status.HTTP_404_NOT_FOUND)

    def post(self, request, *args, **kwargs):
        """Create or update the template color."""
        serializer = SettingSerializer(data=request.data)
        if serializer.is_valid():
            setting.objects.all().delete()
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
