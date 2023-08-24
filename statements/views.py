from django.shortcuts import get_object_or_404
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView

from statements.models import Post, Statement
from statements.serializers import StatementSerializer, StatementRetrieveSerializer, PostSerializer


class PostListAPIView(APIView):
    def get(self, request, statement_id):
        statement = Statement.objects.get(id=statement_id)
        posts = statement.posts.all()
        serializer = PostSerializer(posts, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request, statement_id):
        serializer = PostSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(statement_id=statement_id)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class PostRetrieveAPIView(APIView):
    def put(self, request, statement_id, post_id):
        post = get_object_or_404(Post, id=post_id)
        serializer = PostSerializer(post, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_202_ACCEPTED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class StatementListAPIView(APIView):
    def get(self, request):
        statements = Statement.objects.all()
        serializer = StatementSerializer(statements, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request):
        serializer = StatementSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class StatementRetrieveAPIView(APIView):
    def get(self, request, statement_id):
        statement = get_object_or_404(Statement, id=statement_id)
        serializer = StatementRetrieveSerializer(statement)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def put(self, request, statement_id):
        statement = get_object_or_404(Statement, id=statement_id)
        serializer = StatementRetrieveSerializer(statement, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, statement_id):
        statement = get_object_or_404(Statement, id=statement_id)
        statement.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
