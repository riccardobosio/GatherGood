"""
URLs configuration
"""
from dj_rest_auth.jwt_auth import get_refresh_view
from dj_rest_auth.views import (LoginView, LogoutView, PasswordChangeView,
                                PasswordResetConfirmView, PasswordResetView)
from django.conf import settings
from django.contrib import admin
from django.urls import include, path
from drf_yasg import openapi
from drf_yasg.views import get_schema_view
from rest_framework import permissions

from config.settings.components.yasg_schemas import SchemaGenerator

api_authentication = [
    path('password/reset/', PasswordResetView.as_view(), name='rest_password_reset'),
    path('password/reset/confirm/', PasswordResetConfirmView.as_view(), name='rest_password_reset_confirm'),
    path('login/', LoginView.as_view(), name='rest_login'),
    path('logout/', LogoutView.as_view(), name='rest_logout'),
    path('password/change/', PasswordChangeView.as_view(), name='rest_password_change'),
    path('token/refresh/', get_refresh_view().as_view(), name='token_refresh'),
]

api_urlpatterns = [
    path('', include('apps.accounts.api.urls'), name='user_api'),
    path('auth/', include(api_authentication)),
    path('', include('apps.events.api.urls'), name='event_api'),
    path('reviews/', include('apps.review.api.urls'), name='review_api'),
]

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(
        (api_urlpatterns, 'api_v1'),
        namespace='api_urlpatterns')),
]

if settings.DEBUG:
    import debug_toolbar

    schema_view = get_schema_view(
        openapi.Info(
            title="SocialHack API",
            default_version='v1',
            description="SocialHack Backend",
            terms_of_service="https://www.google.com/policies/terms/",
            contact=openapi.Contact(email="contact@snippets.local"),
            license=openapi.License(name="BSD License"),
        ),
        public=True,
        permission_classes=(permissions.AllowAny,),
        patterns=api_urlpatterns,
        generator_class=SchemaGenerator,
    )
    urlpatterns += [
        path('__debug__/', include(debug_toolbar.urls)),
        path(
            'api/swagger/',
            schema_view.with_ui('swagger', cache_timeout=0),
            name='schema-swagger-ui',
        )
    ]
