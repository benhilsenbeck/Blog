from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import JSONParser
from django.http.response import JsonResponse
from rest_framework_simplejwt.views import TokenObtainPairView
from blog.models import users, blogPosts, blogComments, polls
from blog.serializers import usersSerializer, blogPostsSerializer, MyTokenObtainPairSerializer, userAccountsSerializer, blogCommentsSerializer, blogCommentsDataSerializer, pollsDataSerializer, votesDataSerializer, userEmailSerializer
from django.core.files.storage import default_storage
from rest_framework import status, permissions 
from rest_framework.views import APIView
from rest_framework.response import Response
from django.contrib.auth.hashers import make_password
from django.db.models import F
import json

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

# class blogCategory(APIView):
#     def get(self, request):
#         blogPosts.objects.filter(Category = [request.GET['Category']])


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

class blogPolls(APIView):
    permission_classes = (permissions.AllowAny,)
    def get(self, request):
        blog_polls = polls.objects.all()
        polls_serializer = pollsDataSerializer(blog_polls, many=True)
        return JsonResponse(polls_serializer.data, safe=False)
    
    def post(self, request):
        print (request.data['button'])
        if request.data['buttonPosition'] == 1:
            Votes = polls.objects.filter(Button1 = request.data['button'])
            Votes.update(Image1Votes=F('Image1Votes')+1)
        else:
            Votes = polls.objects.filter(Button2 = request.data['button'])
            Votes.update(Image2Votes=F('Image2Votes')+1)
        image1Votes = Votes.values('Image1Votes')[0]['Image1Votes']
        image2Votes = Votes.values('Image2Votes')[0]['Image2Votes']
        totalVotes = image1Votes + image2Votes
        image1Percentage = round((image1Votes / totalVotes) * 100)
        image2Percentage = round((image2Votes / totalVotes) * 100)
        results = [image1Percentage, image2Percentage]
        return JsonResponse(results, safe=False)

        # votes_data_serializer = votesDataSerializer(Votes, many=True)
        # print(votes_data_serializer)
        # totalVotes = json.dumps(votes_data_serializer)
        # print(totalVotes)
        # return JsonResponse(votes_data_serializer.data, safe=False)

class allBlogPollPercentages(APIView):
    permission_classes = (permissions.AllowAny,)
    def get(self, request):
        try:
            pollNumbers = request.GET['pollIds']
            pollArray = pollNumbers.split(",")
            resultArray = []
            resultDict = {}
            for i in pollArray:
                image1Votes = polls.objects.filter(id=i).values('Image1Votes')[0]['Image1Votes']
                image2Votes = polls.objects.filter(id=i).values('Image2Votes')[0]['Image2Votes']
                totalVotes = image1Votes + image2Votes
                image1Percentage = round((image1Votes / totalVotes) * 100)
                image2Percentage = round((image2Votes / totalVotes) * 100)
                resultDict[i] = [image1Percentage, image2Percentage]
            # print(resultDict)
            return Response(resultDict)
        except:
            return Response("NoVotes")


class pollCategory(APIView):
    permission_classes = (permissions.AllowAny,)
    def get(self, request):
        pollCategories = polls.objects.filter(Category = request.GET['Category'])
        poll_Categories = pollsDataSerializer(pollCategories, many=True)
        return JsonResponse(poll_Categories.data, safe=False)

class blogCategory(APIView):
    permission_classes = (permissions.AllowAny,)
    def get(self, request):
        blogCategories = blogPosts.objects.filter(Category = request.GET['Category'])
        blog_Categories = blogPostsSerializer(blogCategories, many=True)
        return JsonResponse(blog_Categories.data, safe=False)

class userEmail(APIView):
    permission_classes = (permissions.AllowAny,)
    def post(self, request):
        serializer = userEmailSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response("Valid")
        else:
            return Response("The Serializer was not valid")

