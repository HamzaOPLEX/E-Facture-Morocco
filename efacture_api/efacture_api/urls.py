from django.contrib import admin
from django.urls import path, re_path, include
# drf_yasg code starts here
from rest_framework import permissions
from drf_yasg.views import get_schema_view
from drf_yasg import openapi
from django.views.generic.base import RedirectView
from efacture_api import settings

schema_view = get_schema_view(
    openapi.Info(
        title="E-LEARNING API",
        default_version='v1',
        contact=openapi.Contact(email="e-facture@efacture.ma"),
        license=openapi.License(name="Awesome IP"),
    ),
    public=True,
    permission_classes=(permissions.AllowAny,),
)
# ends here
urlpatterns = [
    path('apidoc/', schema_view.with_ui('swagger', cache_timeout=0),
         name='schema-swagger-ui'),
    path('redoc/', schema_view.with_ui('redoc', cache_timeout=0),
         name='schema-redoc'),
    path('admin/', admin.site.urls),
    path('api/', include('api.urls')),
    path('',RedirectView.as_view(url=settings.FRONT_END_SERVER))
]