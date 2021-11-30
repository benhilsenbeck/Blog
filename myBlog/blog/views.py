from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import JSONParser
from django.http.response import JsonResponse
from rest_framework_simplejwt.views import TokenObtainPairView
from blog.models import users, blogPosts, blogComments
from blog.serializers import usersSerializer, blogPostsSerializer, MyTokenObtainPairSerializer, userAccountsSerializer, blogCommentsSerializer, blogCommentsDataSerializer
from django.core.files.storage import default_storage
from rest_framework import status, permissions 
from rest_framework.views import APIView
from rest_framework.response import Response
from django.contrib.auth.hashers import make_password

class ObtainTokenPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


class userCreateAccountView(APIView):
  permission_classes = (permissions.AllowAny,)
  def post(self, request):
    serializer = userAccountsSerializer(data=request.data)
    if serializer.is_valid():
      if('password' in self.request.data):
        password = make_password(self.request.data['password'])
        serializer.save(password=password)
        return Response(serializer.data)
      else:
        return Response("This did not save serializer")
    else:
        return Response("The serializer was not valid")

def usersApi(request, id=0):
    permission_classes = (permissions.AllowAny,)
    if request.method =="GET":
        users = users.objects.all()
        users_serializer = usersSerializer(users, many=True)
        return JsonResponse(users_serializer.data, safe=False)
    elif request.method=="POST":
        user_data=JSONParser().parse(request)
        user_serializer = usersSerializer(data = user_data)
        if user_serializer.is_valid():
            user_serializer.save()
            return JsonResponse("Added Successfully!!", safe=False)
        return JsonResponse("Failed to ad.", safe=False)

    elif request.method=='PUT':
        user_data = JSONParser().parse(request)
        user = users.objects.get(usersId = user_data['userId'])
        user_serializer=usersSerializer(user, data=user_data)
        if user_serializer.is_valid():
            user_serializer.save()
            return JsonResponse("Updated Successfully!!", safe=False)
        return JsonResponse("Failed to Update.", safe=False)

    elif request.method=='DELETE':
        user=users.objects.get(userId=id)
        user.delete()
        return JsonResponse("Deleted Succesfully!!", safe=False)


def blogApi(request, id=0):
    permission_classes = (permissions.AllowAny,)
    if request.method =="GET":
        blogs = blogPosts.objects.all()
        blogs_serializer = blogPostsSerializer(blogs, many=True)
        return JsonResponse(blogs_serializer.data, safe=False)
    elif request.method=="POST":
        blogPost_data=JSONParser().parse(request)
        blogPost_serializer = blogPostsSerializer(data = blogPost_data)
        if blogPost_serializer.is_valid():
            blogPost_serializer.save()
            return JsonResponse("Added Successfully!!", safe=False)
        return JsonResponse("Failed to ad.", safe=False)

    elif request.method=='PUT':
        blogPost_data = JSONParser().parse(request)
        blogPost = blogPosts.objects.get(blogId = blogPost_data['blogId'])
        blogPost_serializer=blogPostsSerializer(blogPost, data=blogPost_data)
        if blogPost_serializer.is_valid():
            blogPost_serializer.save()
            return JsonResponse("Updated Successfully!!", safe=False)
        return JsonResponse("Failed to Update.", safe=False)

    elif request.method=='DELETE':
        blogPost=blogPosts.objects.get(blogId=id)
        blogPost.delete()
        return JsonResponse("Deleted Succesfully!!", safe=False)

def SaveFile(request):
    permission_classes = (permissions.AllowAny,)
    file=request.FILES['uploadedFile']
    file_name = default_storage.save(file.name, file)
    return JsonResponse(file_name, safe=False)

def blogSpecific(request, id=0):
    if request.method =="GET":
        blogs = blogPosts.objects.get(blogId=id)
        blogs_serializer = blogPostsSerializer(blogs)
        return JsonResponse(blogs_serializer.data, safe=False)

class blogComment(APIView):
    permission_classes = (permissions.AllowAny,)
    def get(self, request):
        comments = blogComments.objects.filter(blogID_id = request.GET['blogID_id'])
        blogs_comment_serializer = blogCommentsDataSerializer(comments, many=True)
        return JsonResponse(blogs_comment_serializer.data, safe=False)

    def post(self, request):
        serializer = blogCommentsSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(blogID_id = request.data['blogID_id'])
            print("serializer submitted successfully")
            return Response("Valid")
        else:
            print("serializer failed to post comment")
            return Response("Invalid")


# def blogComment(request, id=0):
#     permission_classes = (permissions.AllowAny,)
#     if request.method == "POST":
#         serializer = blogCommentsSerialzer(data=request.data)
#         if serializer.is_valid():
#             print("serializer submitted successfully")
#             return Response("Valid")
#         else:
#             print("serializer failed to post comment")
#             return Response("Invalid")

#     if request.method =="GET":
#         comments = blogComments.objects.get(blogID_id = id)
#         blogs_comment_serializer = blogCommentsDataSerializer(comments)
#         return JsonResponse(blogs_serializer.data, safe=False)