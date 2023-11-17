from typing import List

from rest_framework import permissions
from django.contrib.auth.models import Permission

from apps.accounts.models import User


class HasPermission(permissions.BasePermission):
    def has_permission(self, request, view):
        permission_required = None
        user: User = request.user
        if user.deleted_at is not None:
            return False
        if user.is_superuser:
            return True

        permission_required_dict = getattr(view, "permission_required", None)

        if permission_required_dict:
            permission_required = permission_required_dict.get(
                request.method,
                None
            )
        if not permission_required:
            return True

        user_permissions: List[Permission] = [
            perm.split('.', 1)[1] for perm in user.get_all_permissions()
        ]

        return permission_required in user_permissions