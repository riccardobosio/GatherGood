"""
This module contains Django installed apps settings
"""
from typing import Tuple

from config.settings.components import env

DEBUG: bool = env.bool('DEBUG', default=True)

DJANGO_APPS: Tuple[str, ...] = (
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
)

SIDE_APPS: Tuple[str, ...] = (
    'rest_framework',
    'rest_framework.authtoken',
    'corsheaders',
    'dj_rest_auth',
    'django_extensions',
    'drf_yasg',
    'django_filters',
)
DEBUG_APPS: Tuple[str, ...] = (
    "debug_toolbar",
)

PROJECT_APPS: Tuple[str, ...] = (
    'apps.accounts',
)

INSTALLED_APPS: Tuple[str, ...] = DJANGO_APPS + SIDE_APPS + PROJECT_APPS
DEFAULT_AUTO_FIELD: str = 'django.db.models.BigAutoField'

if DEBUG:
    INSTALLED_APPS += DEBUG_APPS
