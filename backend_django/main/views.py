from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.static import serve
import json
import urllib.parse
from django.conf import settings
import os


def index(request):
    return render(request, 'index.html')

def admin_page(request):
    return render(request, 'admin.html')

@csrf_exempt
def contact_api(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            print(data)
            return JsonResponse({'message': 'تم إرسال الرسالة بنجاح!'}, status=200)
        except Exception as e:
            print('Error:', e)
            return JsonResponse({'error': 'حدث خطأ أثناء الإرسال.'}, status=400)
    return JsonResponse({'error': 'Invalid request method.'}, status=405)

@csrf_exempt
def get_whatsapp_link(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        name = data.get('name')
        phone = data.get('phone')
        email = data.get('email')
        type_ = data.get('type')
        message = data.get('message')
        lang = data.get('lang', 'ar')
        if lang.startswith('fr'):
            text = f"""Nom: {name}
Téléphone: {phone}
E-mail: {email}
Type de consultation: {type_}
Message: {message}"""
        elif lang.startswith('en'):
            text = f"""Name: {name}
Phone: {phone}
Email: {email}
Consultation Type: {type_}
Message: {message}"""
        else:
            text = f"""الاسم: {name}
الهاتف: {phone}
البريد: {email}
نوع الاستشارة: {type_}
الرسالة: {message}"""
        encoded_text = urllib.parse.quote(text)
        whatsapp_url = f'https://wa.me/212629916074?text={encoded_text}'
        return JsonResponse({'whatsapp_url': whatsapp_url})
    return JsonResponse({'error': 'Invalid request'}, status=400)

# Serve static files
@csrf_exempt
def serve_static(request, path):
    return serve(request, path, document_root=settings.STATIC_ROOT)