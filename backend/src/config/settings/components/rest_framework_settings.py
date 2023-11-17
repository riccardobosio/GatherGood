"""
This module contains DRF settings
"""

from typing import Any, Dict

from config.settings.components import env

DEBUG: bool = env.bool('DEBUG', default=True)

REST_FRAMEWORK: Dict[str, Any] = {
    'DEFAULT_AUTHENTICATION_CLASSES': (
        'rest_framework.authentication.TokenAuthentication',
        'dj_rest_auth.jwt_auth.JWTCookieAuthentication'
    ),
    'DEFAULT_SCHEMA_CLASS': 'rest_framework.schemas.coreapi.AutoSchema',
    'DEFAULT_PERMISSION_CLASSES': [
        'rest_framework.permissions.IsAuthenticated'
    ],
    'ORDERING_PARAM': 'sort'
}

REST_AUTH: Dict[str, Any] = {
    'SESSION_LOGIN': False,
    'USE_JWT': True,
    'JWT_AUTH_COOKIE': 'jwt-access-token',
    'JWT_AUTH_REFRESH_COOKIE': 'jwt-refresh-token',
    'JWT_AUTH_SECURE': False,
}

if not DEBUG:
    REST_FRAMEWORK['DEFAULT_RENDERER_CLASSES'] = (
        'rest_framework.renderers.JSONRenderer',
    )
