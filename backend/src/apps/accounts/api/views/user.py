from drf_yasg.utils import swagger_auto_schema
from rest_framework import mixins, status
from dj_rest_auth.jwt_auth import unset_jwt_cookies
from rest_framework.response import Response
from apps.accounts.api.views.common import CustomApiView
from apps.accounts.models import User
from apps.accounts.exceptions import PasswordNotValidError
from django.shortcuts import get_object_or_404
from apps.accounts.serializers import ProfileDeleteInputSerializer, UserDetailSerializer, UserReviewDetailSerializer, \
    RegistrationInputSerializer
from rest_framework.permissions import AllowAny
from rest_framework.exceptions import ValidationError


class ProfileRetrieveUpdateDeleteAPI(
    CustomApiView,
    mixins.RetrieveModelMixin,
    mixins.UpdateModelMixin,
    mixins.DestroyModelMixin
):
    api_description = 'User Profile Details'
    serializer_class = UserDetailSerializer

    def get_object(self):
        user: User = self.request.user
        return user

    @swagger_auto_schema(
        operation_summary='Get account information.',
        operation_description=api_description,
        operation_id='ReadUserProfile',
        responses={status.HTTP_200_OK: UserDetailSerializer()}
    )
    def get(self, request):
        return self.retrieve(request)

    @swagger_auto_schema(
        operation_summary='Update account information.',
        operation_description=api_description,
        operation_id='UpdateUserProfile',
        request_body=UserDetailSerializer,
        responses={status.HTTP_200_OK: UserDetailSerializer()}
    )
    def patch(self, request, *args, **kwargs):
        return self.partial_update(request)

    @swagger_auto_schema(
        operation_summary='Delete account.',
        operation_description=api_description,
        operation_id='DeleteUserProfile',
        request_body=ProfileDeleteInputSerializer,
        responses={
            status.HTTP_204_NO_CONTENT: '',
        },
    )
    def delete(self, request):
        serializer = ProfileDeleteInputSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        password: str = serializer.data['password']

        if not request.user.check_password(password):
            raise PasswordNotValidError

        request.user.delete()
        response = Response(status=status.HTTP_204_NO_CONTENT)
        unset_jwt_cookies(response)
        return response


class UserDetailAPI(CustomApiView):
    api_description = 'User Detail and Review'

    @swagger_auto_schema(
        operation_summary='Get User Detail.',
        operation_description=api_description,
        operation_id='GetUserDetail',
        responses={status.HTTP_200_OK: UserReviewDetailSerializer()}
    )
    def get(self, request, user_id):
        fetched_user: User = get_object_or_404(User, id=user_id)
        serializer = UserReviewDetailSerializer(fetched_user)
        return Response(serializer.data)


class RegistrationApi(CustomApiView):
    api_description = 'User Registration'
    permission_classes = (AllowAny,)
    authentication_classes = ()

    @swagger_auto_schema(
        operation_summary="Registration.",
        operation_description=api_description,
        operation_id="Registration",
        request_body=RegistrationInputSerializer,
        responses={status.HTTP_200_OK: UserDetailSerializer()}
    )
    def post(self, request):
        serializer = RegistrationInputSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        data = serializer.data
        if data["password"] != data["password_confirm"]:
            raise ValidationError("Both password and password_confirmation are required.")

        del data["password_confirm"]

        User.objects.create_user(
            **data
        )

        return Response(
            status=status.HTTP_200_OK
        )
