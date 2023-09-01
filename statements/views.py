from django.shortcuts import get_object_or_404
from drf_yasg.utils import swagger_auto_schema
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated

from statements.models import Post, Statement
from statements.py_hanspell import return_text500, spell_checker
from statements.serializers import StatementSerializer, StatementRetrieveSerializer, PostSerializer, \
    GetContentSerializer

from django.db.models import Max

from .gpt_tools.gpt_response import get_advice


class PostListAPIView(APIView):
    permission_classes = [IsAuthenticated]
    @swagger_auto_schema(tags=["post_"])
    def get(self, request, statement_id):
        statement = Statement.objects.get(statement_order=statement_id)
        posts = statement.posts.all()
        serializer = PostSerializer(posts, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    @swagger_auto_schema(tags=["post_"], request_body=PostSerializer, query_serializer=PostSerializer,
                         responses={
                             201: 'post 객체 생성 완료',
                             400: '입력값 유효성 검증 실패',
                         })
    def post(self, request, statement_id):
        statement = get_object_or_404(Statement, statement_order=statement_id)
        # Find the highest post_order in the current Statement
        max_order = statement.posts.aggregate(Max('post_order'))['post_order__max'] or 0
        # Increment by 1
        new_order = max_order + 1

        serializer = PostSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(statement=statement, post_order=new_order)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class PostRetrieveAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, statement_id, post_id):
        post = get_object_or_404(Post, post_order=post_id, statement__statement_order=statement_id)
        serializer = PostSerializer(post)
        return Response(serializer.data, status=status.HTTP_200_OK)
    @swagger_auto_schema(tags=["post_detail"], request_body=PostSerializer, query_serializer=PostSerializer,
                         responses={
                             202: 'post 객체 수정 완료',
                             400: '입력값 유효성 검증 실패',
                         })
    def put(self, request, statement_id, post_id):
        post = get_object_or_404(Post, post_order=post_id, statement__statement_order=statement_id)
        serializer = PostSerializer(post, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_202_ACCEPTED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class StatementListAPIView(APIView):
    permission_classes = [IsAuthenticated]
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
        statement = Statement.objects.all()
        # Find the highest post_order in the current Statement
        max_order = statement.aggregate(Max('statement_order'))['statement_order__max'] or 0
        # Increment by 1
        new_order = max_order + 1

        serializer = StatementSerializer(data=request.data, context={"request": request})
        if serializer.is_valid():
            serializer.save(statement_order=new_order)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class StatementRetrieveAPIView(APIView):
    permission_classes = [IsAuthenticated]
    @swagger_auto_schema(tags=["statement_detail"])
    def get(self, request, statement_id):
        statement = get_object_or_404(Statement, statement_order=statement_id)
        serializer = StatementRetrieveSerializer(statement)
        return Response(serializer.data, status=status.HTTP_200_OK)

    @swagger_auto_schema(tags=["statement_detail"], request_body=StatementRetrieveSerializer,
                         query_serializer=StatementRetrieveSerializer,
                         responses={
                             202: 'statement 객체 수정 완료',
                             400: '입력값 유효성 검증 실패',
                         })
    def put(self, request, statement_id):
        statement = get_object_or_404(Statement, statement_order=statement_id)
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
        statement = get_object_or_404(Statement, statement_order=statement_id)
        statement.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class SpellCheckAPIView(APIView):
    permission_classes = [IsAuthenticated]
    @swagger_auto_schema(tags=["post_detail"])
    def get(self, request, statement_id, post_id):
        post = get_object_or_404(Post, post_order=post_id, statement__statement_order=statement_id)
        checked_text = ''
        text_chunk_list = return_text500.operator(post.content)
        for text_chunk in text_chunk_list:
            checked_chunk = spell_checker.check(text_chunk)
            checked_text += checked_chunk

        post.content = checked_text
        post.save()
        serializer = PostSerializer(post)
        return Response(serializer.data, status=status.HTTP_200_OK)


class CallGPTAPIView(APIView):
    permission_classes = [IsAuthenticated]
    @swagger_auto_schema(tags=["GPT CALL"], request_body=GetContentSerializer, query_serializer=GetContentSerializer,
                         responses={
                             200: 'GPT API 호출 성공',
                             400: '입력값 유효성 검증 실패',
                         })
    def post(self, request):
        serializer = GetContentSerializer(data=request.data)
        if serializer.is_valid():
            res = get_advice(serializer.data['content'], serializer.data['order'])
            return Response(res, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
