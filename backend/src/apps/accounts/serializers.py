from rest_framework import serializers
from django.utils.translation import gettext_lazy as _
from apps.accounts.models.user import User
from apps.review.serializers import ReviewDetailOutputSerializer


class StrictReadOnlyFieldsMixin:
    """
    Raises error if read only fields passed to input data.
    When PUT/PATCH a read_only_fields, 200 is returned even if that field is not actually updated (https://github.com/encode/django-rest-framework/issues/1655).  # noqa
    """
    default_error_messages = {
        'read_only': _('This field is read only')
    }

    def validate(self, attrs):
        attrs = super().validate(attrs)

        if not hasattr(self, 'initial_data'):
            return attrs

        # collect declared read only fields and read only fields from Meta
        read_only_fields = {
                               field_name for field_name, field in self.fields.items() if field.read_only  # noqa
                           } | set(getattr(self.Meta, 'read_only_fields', set()))  # noqa

        received_read_only_fields = set(self.initial_data) & read_only_fields

        if received_read_only_fields:
            errors = {}
            for field_name in received_read_only_fields:
                errors[field_name] = serializers.ErrorDetail(
                    self.error_messages['read_only'],
                    code='read_only'
                )

            raise serializers.ValidationError(errors)

        return attrs


class UserDetailSerializer(
    StrictReadOnlyFieldsMixin,
    serializers.ModelSerializer
):
    password = serializers.CharField(write_only=True)
    password_confirm = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = (
            'id',
            'email',
            'password',
            'password_confirm',
            'first_name',
            'last_name',
            'is_superuser',
        )
        read_only_fields = (
            'id',
            'is_superuser',
        )

    def validate(self, data):

        password = data.get('password')
        password_confirm = data.get('password_confirm')
        if password is None and password_confirm is None:
            pass
        elif password is None or password_confirm is None:
            raise serializers.ValidationError(
                "Both password and password_confirmation are required."
            )
        elif password != password_confirm:
            raise serializers.ValidationError("Passwords do not match.")
        validated_data = super().validate(data)

        return validated_data

    def update(self, instance, validated_data):
        password = validated_data.pop('password', None)
        if password:
            instance.set_password(password)

        return super().update(instance, validated_data)


class ProfileDeleteInputSerializer(serializers.Serializer):
    password = serializers.CharField()


class UserReviewDetailSerializer(serializers.ModelSerializer):
    reviews = ReviewDetailOutputSerializer(many=True, read_only=True, source='reviews_as_reviewee')

    class Meta:
        model = User
        fields = ('email', 'first_name', 'last_name', 'reviews')


class RegistrationInputSerializer(serializers.ModelSerializer):
    password_confirm = serializers.CharField()

    class Meta:
        model = User
        fields = (
            'first_name',
            'last_name',
            'email',
            'password',
            'password_confirm',
        )
