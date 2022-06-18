from django.urls import re_path
from blog import views

from django.conf.urls.static import static
from django.conf import settings

urlpatterns = [

    re_path(r'^users/$', views.usersApi),
    re_path(r'^users/([0-9]+)$', views.usersApi),

    re_path(r'^blog/$', views.blogApi),
    re_path(r'^blog/([0-9]+)$', views.blogApi),
    
    re_path(r'^SaveFile$', views.SaveFile),

    re_path(r'^blogSpecific/$', views.blogSpecific),
    re_path(r'^blogSpecific/([0-9]+)$', views.blogSpecific),

] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)