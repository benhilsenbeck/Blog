from django.contrib import admin
from django.urls import path, include
from django.conf.urls import url
from blog import views
from rest_framework_simplejwt import views as jwt_views 

urlpatterns = [
    path('admin/', admin.site.urls),
    path('summernote/', include('django_summernote.urls')),
    path('token/obtain', views.ObtainTokenPairView.as_view(), name='token_create'),
    path('token/refresh', jwt_views.TokenRefreshView.as_view(), name='token_refresh'),
    path('userCreateAccount', views.userCreateAccountView.as_view(), name='userCreateAccount'),
    # path('token/check', views.checkToken.as_view(), name="checkToken"),
    url(r'^', include('blog.urls')),
]
