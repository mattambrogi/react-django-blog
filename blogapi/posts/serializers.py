from django.contrib.auth import get_user_model
from rest_framework import serializers
from rest_framework.authtoken.models import Token
from .models import Post


class PostSerializer(serializers.ModelSerializer):

    author_name = serializers.CharField(source="author.username", read_only=True)

    class Meta:
        fields = ("id", "author", "title", "body", "created_at", "author_name")
        model = Post


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = get_user_model()
        fields = ("id", "username")


class TokenSerializer(serializers.ModelSerializer):

    username = serializers.CharField(source="user.username", read_only=True)

    class Meta:
        model = Token
        fields = ("key", "user", "username")
