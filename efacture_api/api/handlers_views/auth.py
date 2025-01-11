from base64 import urlsafe_b64encode
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.exceptions import AuthenticationFailed
from ..serializers import UserEmailSerializer
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
from django.contrib.auth.tokens import PasswordResetTokenGenerator
from django.core.mail import send_mail
from django.utils.encoding import force_bytes


class ValidateEmailAPIView(APIView):
    def post(self, request, format=None):
        serializer = UserEmailSerializer(data=request.data)
        if serializer.is_valid():  # Check if the serializer is valid
            try:
                user = User.objects.get(email=request.data["email"])
            except User.DoesNotExist:
                return Response(status=status.HTTP_404_NOT_FOUND)

            encoded_pk = urlsafe_b64encode(force_bytes(user.id))
            token = PasswordResetTokenGenerator().make_token(user)
            url = f"/{encoded_pk}/{token}"

            send_mail(
                "E-Facture - Password Reset",
                f"Hello {user.username}\n please use this link to reset your password: {url}",
                "hamzaoplex@gmail.com",
                [request.data["email"]]
            )
            return Response({'message': 'Password reset email sent successfully'}, status=status.HTTP_200_OK)
        else:
            return Response({'message': 'Invalid input data', 'errors': serializer.errors}, status=status.HTTP_406_NOT_ACCEPTABLE)

