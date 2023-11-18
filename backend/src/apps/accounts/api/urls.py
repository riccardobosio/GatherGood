from django.urls import path

from apps.accounts.api.views.user import (ProfileRetrieveUpdateDeleteAPI,
                                          RegistrationApi, UserDetailAPI)

urlpatterns = [
    path(
        'profile/',
        ProfileRetrieveUpdateDeleteAPI.as_view(),
        name="profile"
    ),
    path(
        'users/<str:review_id>/',
        UserDetailAPI.as_view(),
        name="user_detail"
    ),
    path(
        'registration/',
        RegistrationApi.as_view(),
        name="user_registration"
    ),
]
