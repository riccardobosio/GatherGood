import uuid

from django.contrib.auth.base_user import AbstractBaseUser, BaseUserManager
from django.contrib.auth.models import PermissionsMixin
from django.db import models
from django.utils.translation import gettext_lazy as _


class BaseModel(models.Model):
    class Meta:
        abstract = True

    id = models.UUIDField(
        primary_key=True,
        default=uuid.uuid4,
        editable=False
    )
    created_at = models.DateTimeField(
        auto_now_add=True
    )
    updated_at = models.DateTimeField(
        auto_now=True
    )
    deleted_at = models.DateTimeField(
        blank=True,
        null=True
    )


class UserManager(BaseUserManager):

    def _create_user(
            self,
            email: str,
            password: str,
            first_name: str,
            last_name: str,
            **other):
        user: User = self.model(
            email=self.normalize_email(email.lower()),
            first_name=first_name,
            last_name=last_name,
            **other)

        user.set_password(password)
        user.full_clean()
        user.save()

        return user

    def create_user(
            self,
            email: str,
            password: str,
            first_name: str,
            last_name: str,
            **other
    ):
        other.setdefault('is_staff', False)
        other.setdefault('is_superuser', False)

        return self._create_user(
            email,
            password,
            first_name,
            last_name,
            **other
        )

    def create_superuser(
            self,
            email: str,
            password: str,
            first_name: str,
            last_name: str,
            **other
    ):
        other.setdefault('is_staff', True)
        other.setdefault('is_superuser', True)

        if other.get('is_staff') is not True:
            raise ValueError('Superuser must have is_staff=True.')
        if other.get('is_superuser') is not True:
            raise ValueError('Superuser must have is_superuser=True.')

        return self._create_user(
            email,
            password,
            first_name,
            last_name,
            **other
        )


class User(
    BaseModel,
    AbstractBaseUser,
    PermissionsMixin
):
    email = models.EmailField(
        verbose_name=_('User\'s email'),
        unique=True,
    )
    first_name = models.CharField(
        verbose_name=_('First Name'),
        max_length=56,
        default="",

    )
    last_name = models.CharField(
        verbose_name=_('Last Name'),
        max_length=56,
        default="",

    )

    is_superuser = models.BooleanField(
        verbose_name=_('Superuser status'),
        default=False,
    )
    is_staff = models.BooleanField(
        verbose_name=_('Staff status'),
        default=False,
    )

    objects = UserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['first_name', 'last_name']

    class Meta:
        db_table = 'users'
