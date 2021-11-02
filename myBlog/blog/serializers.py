from rest_framework import serializers
from blog.models import users, blogPosts
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from django.contrib import auth
from rest_framework.exceptions import AuthenticationFailed
from django.contrib.auth.hashers import make_password


class userAccountsSerializer(serializers.ModelSerializer):
  class Meta:
    model = users
    fields = ('userId', "last_login", 'fName', 'lName', 'username', 'email', 'password', 'joinedDate', 'is_staff', 'is_superuser')

    def create(self, validated_data):
        print(['password'])
        user = users.objects.create(
            email = validated_data['email'],
            username = validated_data['username'],
            password = make_password(validated_data['password'])
        )
        user.save()
        return user



class usersSerializer(serializers.ModelSerializer):
    class Meta:
        model = users
        fields = ('userId',
        'fName',
        'lName',
        'username',
        'email',
        'password',
        'joinedDate')


class blogPostsSerializer(serializers.ModelSerializer):
    class Meta:
        model = blogPosts
        fields = ('blogId',
        'Name',
        'Author',
        'Content',
        'ImageName',
        'dateOfPublish',
        'Updated')



class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super(MyTokenObtainPairSerializer, cls).get_token(user)
        return token