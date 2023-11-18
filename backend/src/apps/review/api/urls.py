from django.urls import path

from apps.review.api.views import ReviewCreateAndListApi, ReviewRetrieveAndUpdateApi

urlpatterns = [
    path('', ReviewCreateAndListApi.as_view(), name='create-get-vps'),
    path('<str:review_id>/', ReviewRetrieveAndUpdateApi.as_view(), name='retrieve-update-vps'),
]
