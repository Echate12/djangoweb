from django.urls import path
from . import views
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('', views.index, name='index'),
    path('admin/', views.admin_page, name='admin'),
    path('api/contact/', views.contact_api, name='contact_api'),
    path('api/get_whatsapp_link/', views.get_whatsapp_link, name='get_whatsapp_link'),
    path('static/<path:path>', views.serve_static, name='serve_static'),
] + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)