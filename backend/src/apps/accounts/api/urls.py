from django.urls import path

from apps.accounts.api.views.user import ProfileRetrieveUpdateDeleteAPI

urlpatterns = [
    path(
        'profile/',
        ProfileRetrieveUpdateDeleteAPI.as_view(),
        name="profile"
    ),
]
