from django.contrib import admin
from django.urls import path, include, re_path
from blog import views
from rest_framework_simplejwt import views as jwt_views 

urlpatterns = [
    path('admin/', admin.site.urls),
    path('summernote/', include('django_summernote.urls')),
    path('token/obtain', views.ObtainTokenPairView.as_view(), name='token_create'),
    path('token/refresh', jwt_views.TokenRefreshView.as_view(), name='token_refresh'),
    path('userCreateAccount', views.userCreateAccountView.as_view(), name='userCreateAccount'),
    path('blog/comments', views.blogComment.as_view(), name="blogcomments"),
    path('blog/polls', views.blogPolls.as_view(), name="blogPolls"),
    path('blog/pollPercentages', views.allBlogPollPercentages.as_view(), name="blogPercentages"),
    path('blog/poll/category', views.pollCategory.as_view(), name="pollCategory"),
    path('blog/category', views.blogCategory.as_view(), name="blogCategory"),
    path('blog/email', views.userEmail.as_view(), name="userEmail"),
    # path('token/check', views.checkToken.as_view(), name="checkToken"),
    re_path(r'^', include('blog.urls')),
]
