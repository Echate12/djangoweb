from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json
import urllib.parse


def index(request):
    return render(request, 'index.html')

def admin_page(request):
    return render(request, 'admin.html')

@csrf_exempt
def contact_api(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            # You can print data for debugging:
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

        text = f"""الاسم: {name}\nالهاتف: {phone}\nالبريد: {email}\nنوع الاستشارة: {type_}\nالرسالة: {message}"""
        encoded_text = urllib.parse.quote(text)
        whatsapp_url = f'https://wa.me/212666462665?text={encoded_text}'
        return JsonResponse({'whatsapp_url': whatsapp_url})
    return JsonResponse({'error': 'Invalid request'}, status=400) 