from django.contrib import admin
from django.urls import path, include, re_path
from django.views.generic import TemplateView
from django.conf import settings
from django.conf.urls.static import static
import os

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('main.urls')),  # API routes with 'api/' prefix
    # Catch-all for React routes (excluding admin, api, static, and assets)
    re_path(r'^(?!api/|admin/|static/|assets/).*$', TemplateView.as_view(template_name='index.html'), name='react_app'),
]

# Additional static file serving for development
if settings.DEBUG:
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
    urlpatterns += static('/media/', document_root=settings.MEDIA_ROOT)