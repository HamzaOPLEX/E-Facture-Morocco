from django.urls import path
from .views import *
from .handlers_views.dashboard import *
from .handlers_views.clients import *
from .handlers_views.products import *
from .handlers_views.documents import *
from .handlers_views.app_settings import *
from .handlers_views.auth import *
urlpatterns = [
    # Authentication
    path('auth/register', RegisterView.as_view()),
    path('auth/login', LoginView.as_view()),
    path('auth/user', UserView.as_view()),
    path('auth/reset-password/verify',ValidateEmailAPIView.as_view()), # get user email & send password reset url via email
    # path('auth/reset-password/<str:token>'), # Validate Token and redirect to reset password page
    # path('auth/reset-password/') # save new password


    # Document CRUD
    path('documents/<str:type>', DocumentListAPIView.as_view(), name='document-list'),
    path('documents/create/', DocumentCreateAPIView.as_view(), name='document-create'),
    path('document/<str:type>/<int:pk>', DocumentDetailAPIView.as_view(), name='document-detail'),
    path('documents/update/<int:pk>', DocumentEditAPIView.as_view(), name='document-edit'),
    path('documents/delete/<int:pk>', DocumentDeleteAPIView.as_view(), name='document-delete'),

    # Client CRUD
    path('clients/', ClientsListAPIView.as_view(), name='clients-list'),
    path('clients/create/', ClientsCreateAPIView.as_view(), name='client-create'),
    path('clients/<int:pk>/', ClientsDetailAPIView.as_view(), name='client-detail'),
    path('clients/update/<int:pk>', ClientsEditAPIView.as_view(), name='client-edit'),
    path('clients/delete/<int:pk>', ClientsDeleteAPIView.as_view(), name='client-delete'),

    # Product CRUD
    path('products/', ProductsListAPIView.as_view(), name='products-list'),
    path('products/create/', ProductsCreateAPIView.as_view(), name='client-create'),
    path('products/<int:pk>/', ProductsDetailAPIView.as_view(), name='client-detail'),
    path('products/update/<int:pk>', ProductsEditAPIView.as_view(), name='client-edit'),
    path('products/delete/<int:pk>', ProductsDeleteAPIView.as_view(), name='client-delete'),

    # Dashboard
    path('dashboard/', DashboardAPIView.as_view(), name='api-dashboard'),


    # Product CRUD
    path('products/', ProductsListAPIView.as_view(), name='products-list'),
    path('products/create/', ProductsCreateAPIView.as_view(), name='client-create'),
    path('products/<int:pk>/', ProductsDetailAPIView.as_view(), name='client-detail'),
    path('products/update/<int:pk>', ProductsEditAPIView.as_view(), name='client-edit'),
    path('products/delete/<int:pk>', ProductsDeleteAPIView.as_view(), name='client-delete'),

]