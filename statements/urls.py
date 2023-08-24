from django.urls import path

from statements.views import StatementListAPIView, StatementRetrieveAPIView, PostListAPIView, PostRetrieveAPIView

urlpatterns = [
    path("", StatementListAPIView.as_view(), name="statements"),
    path("<int:statement_id>/", StatementRetrieveAPIView.as_view(), name="statements_detail"),
    path("<int:statement_id>/post/", PostListAPIView.as_view(), name="posts"),
    path("<int:statement_id>/post/<int:post_id>/", PostRetrieveAPIView.as_view(), name="posts_detail"),
]
