from django.urls import path

from statements.views import StatementListAPIView, StatementRetrieveAPIView

urlpatterns = [
    path("statements/", StatementListAPIView.as_view(), name="statements"),
    path("statements/<int:pk>/", StatementRetrieveAPIView.as_view(), name="statements_detail"),
]