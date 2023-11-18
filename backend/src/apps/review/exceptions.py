from rest_framework import status
from rest_framework.exceptions import APIException


class PasswordNotValidError(APIException):
    status_code = status.HTTP_409_CONFLICT
    default_detail = "Password is not valid"
    default_code = 'PasswordNotValid'

class UserNotFoundError(APIException):
    status_code = status.HTTP_404_NOT_FOUND
    default_detail = "User not found"
    default_code = 'UserNotFound'