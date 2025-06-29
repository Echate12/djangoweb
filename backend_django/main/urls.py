from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('admin/', views.admin_page, name='admin'),
    path('api/contact/', views.contact_api, name='contact_api'),
     path('api/get_whatsapp_link/', views.get_whatsapp_link),
     
]