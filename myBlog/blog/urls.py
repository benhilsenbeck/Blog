from django.conf.urls import url
from blog import views

from django.conf.urls.static import static
from django.conf import settings

urlpatterns = [

    url(r'^users/$', views.usersApi),
    url(r'^users/([0-9]+)$', views.usersApi),

    url(r'^blog/$', views.blogApi),
    url(r'^blog/([0-9]+)$', views.blogApi),
    
    url(r'^SaveFile$', views.SaveFile),

    url(r'^blogSpecific/$', views.blogSpecific),
    url(r'^blogSpecific/([0-9]+)$', views.blogSpecific),

] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)