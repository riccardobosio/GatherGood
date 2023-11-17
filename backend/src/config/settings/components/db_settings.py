"""
This module contains Django database settings:
https://docs.djangoproject.com/en/4.2/ref/settings/#databases
"""
from typing import Any, Dict

from config.settings.components import env

DATABASES: Dict[str, Any] = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': env.str('DATABASE_NAME'),
        'USER': env.str('DATABASE_USER'),
        'PASSWORD': env.str('DATABASE_PASSWORD'),
        'HOST': env.str('DATABASE_HOST'),
        'PORT': env.int('DATABASE_PORT'),
        'ATOMIC_REQUESTS': env.bool('ATOMIC_REQUESTS', default=False)
    }
}
