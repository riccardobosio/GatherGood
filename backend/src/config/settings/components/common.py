"""
Django settings for config project.

Generated by 'django-admin startproject' using Django 4.2.3.

For more information on this file, see
https://docs.djangoproject.com/en/4.2/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/4.2/ref/settings/
"""
import os
from os.path import abspath, dirname, join
from typing import List, Tuple

from django.utils.translation import gettext_lazy as _

from config.settings.components import env

BASE_DIR = dirname(dirname(dirname(abspath(__file__))))

SECRET_KEY: str = env.str('SECRET_KEY')

DEBUG: bool = env.bool('DEBUG', default=True)

API_URL: str = env.str("API_URL", default='http://localhost:8000')
FRONTEND_URL: str = env.str("FRONTEND_URL", default='http://localhost:8000')

ALLOWED_HOSTS: Tuple[str] = ("*",)

TEMPLATES: Tuple = (
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [os.path.join(BASE_DIR, 'templates')],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
)

AUTH_USER_MODEL: str = 'accounts.User'
ROOT_URLCONF: str = 'config.urls'
WSGI_APPLICATION: str = 'config.wsgi.application'
ASGI_APPLICATION: str = "config.asgi.application"

# Password validation
# https://docs.djangoproject.com/en/4.2/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = (
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    }
)

# Internationalization
# https://docs.djangoproject.com/en/4.2/topics/i18n/

LANGUAGE_CODE = 'en'

TIME_ZONE = 'UTC'

USE_I18N = True

USE_L10N = True

USE_TZ = True

# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/4.2/howto/static-files/

# File access
STATIC_URL: str = "/static/"
STATICFILES_DIRS: Tuple[str] = (join(BASE_DIR, "static"),)
STATIC_ROOT: str = join(BASE_DIR, "staticfiles")
MEDIA_URL: str = "/media/"
MEDIA_ROOT: str = join("media")

# Cors
CORS_ALLOWED_ORIGINS: List[str] = env.list('CORS_ALLOWED_ORIGINS', default=[FRONTEND_URL])
CORS_ALLOW_CREDENTIALS: bool = True

DJANGO_SUPERUSER_EMAIL: str = env.str("DJANGO_SUPERUSER_EMAIL")
DJANGO_SUPERUSER_PASSWORD: str = env.str("DJANGO_SUPERUSER_PASSWORD")
DJANGO_SUPERUSER_FIRST_NAME: str = env.str("DJANGO_SUPERUSER_FIRST_NAME")
DJANGO_SUPERUSER_LAST_NAME: str = env.str("DJANGO_SUPERUSER_LAST_NAME")

# ML model

import gensim.downloader as api
import nltk

# Download and load a pre-trained word embedding model
RECOMMENDER_MODEL = api.load('glove-wiki-gigaword-100')  # A medium-sized model

# Ensure you have the NLTK stopwords dataset downloaded
nltk.download('punkt')
nltk.download('stopwords')
