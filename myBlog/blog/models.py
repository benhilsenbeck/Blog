from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, UserManager


class UserManager(BaseUserManager):

    def create_user(self, email, password=None):

        if email is None:
            raise TypeError('Users must have an email address.')

        user = self.model(email=self.normalize_email(email))
        user.set_password(password)
        user.save()

        return user

    def create_superuser(self, email, password):

        if password is None:
            raise TypeError('Superusers must have a password.')

        user = self.create_user(email, password)
        user.is_superuser = True
        user.is_staff = True
        user.save()

        return user
    



class users(AbstractBaseUser):
    userId = models.AutoField(primary_key=True)
    fName = models.CharField(max_length = 20)
    lName = models.CharField(max_length = 20)
    username = models.CharField(max_length = 20, unique = True)
    email = models.EmailField(max_length=254, unique = True)
    password = models.CharField(max_length = 200)
    joinedDate = models.DateTimeField(auto_now_add=True)
    is_staff = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)

    def has_perm(self, perm, obj=None):
        return self.is_superuser

    def has_module_perms(self, app_label):
        return self.is_superuser

    objects = UserManager()
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []
    

class blogPosts(models.Model):
    blogId = models.AutoField(primary_key=True)
    Name = models.CharField(max_length = 255)
    Author = models.CharField(max_length = 100)
    Content = models.TextField()
    ImageName = models.CharField(max_length=100)
    Updated = models.CharField(max_length = 100)
    dateOfPublish = models.DateTimeField(auto_now_add=True)





