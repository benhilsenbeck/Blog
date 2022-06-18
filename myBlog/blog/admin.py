from .models import blogPosts, polls
from django_summernote.admin import SummernoteModelAdmin
from django.contrib import admin
  
class blogadmin(SummernoteModelAdmin):
    list_display = ('blogId', 'Name', 'Updated', 'dateOfPublish')
    list_filter = ("Updated", )
    search_fields = ['Name', 'Content']
    summernote_fields = ('Content', )

class pollsadmin(admin.ModelAdmin):
    list_display = ("Title", "Image1", "Image2", "Button1", "Button2")
  
admin.site.register(blogPosts, blogadmin)
admin.site.register(polls, pollsadmin)
