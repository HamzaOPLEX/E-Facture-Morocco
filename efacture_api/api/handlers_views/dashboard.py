from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from ..models import *
from rest_framework.permissions import IsAuthenticated

class DashboardAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, format=None):
        # Calculate total counts
        total_invoices = Document.objects.filter(document_type='invoices').count()
        total_devis = Document.objects.filter(document_type='devis').count()
        total_bl = Document.objects.filter(document_type='bl').count()
        total_clients = Client.objects.count()
        total_products = Product.objects.count()
        total_users = User.objects.count()

        # Create a dictionary with the counts
        data = {
            'total_invoices': total_invoices,
            'total_devis': total_devis,
            'total_bl': total_bl,
            'total_clients': total_clients,
            'total_products': total_products,
            'total_users': total_users,
        }

        return Response(data, status=status.HTTP_200_OK)
