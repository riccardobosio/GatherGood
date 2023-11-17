"""
This module contains Swagger settings
"""

from typing import Any, Dict

SWAGGER_SETTINGS: Dict[str, Any] = {
    "USE_SESSION_AUTH": True,
    "LOGIN_URL": "/api/auth/login",
    "LOGOUT_URL": "/api/auth/logout",
    "DEEP_LINKING": True,
}