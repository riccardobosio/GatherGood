from datetime import timedelta
from django.utils import timezone
from rest_framework import serializers
from apps.events.models import Event
from apps.accounts.models import User


class ParticipantsSerializer(serializers.ModelSerializer):
    email = serializers.EmailField()
    first_name = serializers.CharField()
    last_name = serializers.CharField()

    class Meta:
        model = User
        fields = ['id', 'email', 'first_name', 'last_name']


class EventDetailSerializer(serializers.ModelSerializer):
    participants = serializers.PrimaryKeyRelatedField(many=True, queryset=User.objects.all())

    class Meta:
        model = Event
        fields = ['id', 'name', 'creator', 'location', 'max_people', 'date', 'description', 'participants']
    
    def to_representation(self, instance):
        representation = super().to_representation(instance)
        representation['participants'] = ParticipantsSerializer(instance.participants.all(), many=True).data
        return representation


class EventCreateSerializer(serializers.ModelSerializer):
    name = serializers.CharField(required=True)
    location = serializers.CharField(required=True)
    max_people = serializers.CharField(required=True)
    date = serializers.DateTimeField(required=True)
    description = serializers.CharField(required=True)

    class Meta:
        model = Event
        fields = ['name', 'location', 'max_people', 'date', 'description']

    def validate_date(self, value):
        """
        Validate that the date is at least greater than one day after now.
        """
        current_datetime = timezone.now()
        min_valid_date = current_datetime + timedelta(days=1)

        if value <= min_valid_date:
            raise serializers.ValidationError("Date must be at least one day in the future.")

        return value