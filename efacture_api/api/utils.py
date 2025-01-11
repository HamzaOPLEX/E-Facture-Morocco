# utils.py

from rest_framework.views import exception_handler
from django.http import JsonResponse

def custom_exception_handler(exc, context):
    response = exception_handler(exc, context)

    if response is not None:
        response.data = {
            'error': True,
            'detail': response.data
        }
        response.content_type = 'application/json'

    return response
