from django.shortcuts import get_object_or_404
from drf_yasg.utils import swagger_auto_schema
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView

from statements.models import Post, Statement
from statements.serializers import StatementSerializer, StatementRetrieveSerializer, PostSerializer


class PostListAPIView(APIView):
    @swagger_auto_schema(tags=["post_"])
    def get(self, request, statement_id):
        statement = Statement.objects.get(id=statement_id)
        posts = statement.posts.all()
        serializer = PostSerializer(posts, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    @swagger_auto_schema(tags=["post_"], request_body=PostSerializer, query_serializer=PostSerializer,
                         responses={
                             201: 'post 객체 생성 완료',
                             400: '입력값 유효성 검증 실패',
                         })
    def post(self, request, statement_id):
        serializer = PostSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(statement_id=statement_id)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class PostRetrieveAPIView(APIView):
    @swagger_auto_schema(tags=["post_detail"], request_body=PostSerializer, query_serializer=PostSerializer,
                         responses={
                             202: 'post 객체 수정 완료',
                             400: '입력값 유효성 검증 실패',
                         })
    def put(self, request, statement_id, post_id):
        post = get_object_or_404(Post, id=post_id)
        serializer = PostSerializer(post, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_202_ACCEPTED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class StatementListAPIView(APIView):
    @swagger_auto_schema(tags=["statement_"])
    def get(self, request):
        statements = Statement.objects.all()
        serializer = StatementSerializer(statements, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    @swagger_auto_schema(tags=["statement_"], request_body=StatementSerializer,
                         responses={
                             201: 'statement 객체 생성 완료',
                             400: '입력값 유효성 검증 실패',
                         })
    def post(self, request):
        serializer = StatementSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class StatementRetrieveAPIView(APIView):
    @swagger_auto_schema(tags=["statement_detail"])
    def get(self, request, statement_id):
        statement = get_object_or_404(Statement, id=statement_id)
        serializer = StatementRetrieveSerializer(statement)
        return Response(serializer.data, status=status.HTTP_200_OK)

    @swagger_auto_schema(tags=["statement_detail"], request_body=StatementRetrieveSerializer,
                         query_serializer=StatementRetrieveSerializer,
                         responses={
                             202: 'statement 객체 수정 완료',
                             400: '입력값 유효성 검증 실패',
                         })
    def put(self, request, statement_id):
        statement = get_object_or_404(Statement, id=statement_id)
        serializer = StatementRetrieveSerializer(statement, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_202_ACCEPTED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    @swagger_auto_schema(tags=["statement_detail"], request_body=StatementRetrieveSerializer,
                         query_serializer=StatementRetrieveSerializer,
                         responses={
                             204: 'statement 객체 삭제 완료',
                         })
    def delete(self, request, statement_id):
        statement = get_object_or_404(Statement, id=statement_id)
        statement.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

