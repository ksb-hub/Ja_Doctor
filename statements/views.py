from django.shortcuts import get_object_or_404
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView

from statements.models import Post, Statement
from statements.serializers import StatementSerializer, StatementRetrieveSerializer


class PostPutAPIView(APIView):
    def put(self, request, pk):
        statement = get_object_or_404(Statement, pk=pk)
        post = get_object_or_404(statement=statement)


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
    def get(self, request, pk):
        statement = get_object_or_404(Statement, pk=pk)
        serializer = StatementRetrieveSerializer(statement)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def put(self, request, pk):
        statement = get_object_or_404(Statement, pk=pk)
        serializer = StatementRetrieveSerializer(statement, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        statement = get_object_or_404(Statement, pk=pk)
        statement.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
