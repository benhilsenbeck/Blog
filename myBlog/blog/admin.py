from django.contrib import admin
from .models import blogPosts
from django_summernote.admin import SummernoteModelAdmin
  
class blogadmin(SummernoteModelAdmin):
    list_display = ('blogId', 'Name', 'Updated', 'dateOfPublish')
    list_filter = ("Updated", )
    search_fields = ['Name', 'Content']
    summernote_fields = ('Content', )
  
admin.site.register(blogPosts, blogadmin)
