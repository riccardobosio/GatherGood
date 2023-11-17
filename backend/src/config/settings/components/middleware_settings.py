"""
This module contains Django middleware settings
"""
from typing import Tuple

from config.settings.components import env

DEBUG: bool = env.bool('DEBUG', default=True)

MIDDLEWARE: Tuple[str, ...] = (
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.locale.LocaleMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
)

if DEBUG:
    DEBUG_MIDDLEWARE: Tuple[str, ...] = (
        'debug_toolbar.middleware.DebugToolbarMiddleware',
    )
    MIDDLEWARE += DEBUG_MIDDLEWARE
