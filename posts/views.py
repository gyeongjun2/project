from django.shortcuts import render
import requests, json

from django.core.paginator import Paginator

def index(request):
    king = requests.get('http://13.124.76.164:8000/sites/')
    king = king.json()
    paginator = Paginator(king, 10)
    page_number = request.GET.get('index')
    page_obj = paginator.get_page(page_number)
    return render(request, 'index.html', {'page_obj':page_obj})