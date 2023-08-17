
from django.urls import path, include

from posts.views import index

urlpatterns = [
    path('posts/', include('posts.urls', namespace='posts')),
    path('', index, name='index'),
]
