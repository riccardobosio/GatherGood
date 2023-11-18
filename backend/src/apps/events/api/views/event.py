from django.utils import timezone
from django_filters.rest_framework import DjangoFilterBackend
from drf_yasg.utils import swagger_auto_schema
from rest_framework import filters, mixins, status
from rest_framework.exceptions import ValidationError, NotAuthenticated
from rest_framework.response import Response
from apps.accounts.models import User
from apps.accounts.api.views.common import CustomApiView
from apps.events.filters import EventFilter
from apps.events.models import Event
from apps.events.serializers import EventCreateSerializer, EventDetailSerializer
from apps.events.services import recommend_events


class EventsAPI(CustomApiView, mixins.ListModelMixin):
    api_description = "List and create events"
    filter_backends = [filters.OrderingFilter, DjangoFilterBackend]
    filterset_class = EventFilter

    def get_serializer_class(self):
        if self.request.method == 'POST':
            return EventCreateSerializer
        return EventDetailSerializer

    def get_queryset(self):
        user: User = self.request.user
        current_datetime = timezone.now()

        if not user.is_authenticated:
            raise NotAuthenticated

        available_events = Event.objects.filter(date__gte=current_datetime)

        joined_events = Event.objects.filter(participants__in=[user])

        joined_events_list = [{'id': str(event.id), 'description': event.description} for event in
                              joined_events]

        available_events_list = [{'id': str(event.id), 'description': event.description} for event in available_events]

        if joined_events.count() == 0 or available_events.count() == 0:
            return available_events.order_by('date')

        ordered_id_list = recommend_events(joined_events_list, available_events_list)

        return sorted(available_events, key=lambda event: ordered_id_list.index(event.id))

    @swagger_auto_schema(
        operation_summary='Get list of events.',
        operation_description=api_description,
        operation_id='GetEventsList',
    )
    def get(self, request, *args, **kwargs):
        return self.list(request, *args, **kwargs)

    @swagger_auto_schema(
        operation_summary='Create a new event.',
        operation_description=api_description,
        operation_id='CreateEvent',
        request_body=EventCreateSerializer,
        responses={status.HTTP_201_CREATED: 'Event created successfully'},
    )
    def post(self, request, *args, **kwargs):
        serializer_event = EventCreateSerializer(data=request.data)
        serializer_event.is_valid(raise_exception=True)

        user: User = self.request.user
        event: Event = Event.objects.create(
            creator=user,
            name=serializer_event.data.get('name'),
            location=serializer_event.data.get('location'),
            max_people=serializer_event.data.get('max_people'),
            date=serializer_event.data.get('date'),
            description=serializer_event.data.get('description'),
        )
        event.save()
        return Response({'Event created successfully'}, status=status.HTTP_201_CREATED)


class EventDetailRetrieveUpdateDestroyAPI(
    CustomApiView,
    mixins.RetrieveModelMixin,
    mixins.UpdateModelMixin,
    mixins.DestroyModelMixin
):
    api_description = 'Events id'
    serializer_class = EventDetailSerializer

    def get_queryset(self):
        user: User = self.request.user
        if user.is_authenticated:
            return Event.objects.all()

    def get_serializer_context(self):
        context = super().get_serializer_context()
        context['request'] = self.request
        return context

    @swagger_auto_schema(
        operation_summary='Get the detail of a certain event.',
        operation_description=api_description,
        operation_id='GetEventDetail',
        responses={status.HTTP_200_OK: EventDetailSerializer},
    )
    def get(self, request, pk):
        return self.retrieve(request, pk)

    @swagger_auto_schema(
        operation_summary='Update the information of a certain event.',
        operation_description=api_description,
        operation_id='UpdateEventDetail',
        request_body=EventDetailSerializer,
        responses={status.HTTP_200_OK: EventDetailSerializer},
    )
    def patch(self, request, pk):
        user: User = request.user
        fetched_event = Event.objects.filter(id=pk).first()
        if user and user.id == fetched_event.creator.id:
            return self.partial_update(request, pk)
        else:
            fetched_event.participants.add(user.id)
            return Response("You have joined the event.", 200)

    @swagger_auto_schema(
        operation_summary='Delete an event.',
        operation_description=api_description,
        operation_id='DeleteEventDetail',
        responses={status.HTTP_204_NO_CONTENT: ''},
    )
    def delete(self, request, pk):
        user: User = self.request.user
        fetched_event = Event.objects.filter(id=pk).first()
        if user and fetched_event and user.id == fetched_event.creator.id:
            return self.destroy(request, pk)
        else:
            raise ValidationError("Only creator of the event can delete it.")


class EventsJoinedAPI(CustomApiView, mixins.ListModelMixin):
    api_description = "List joined events"
    filter_backends = [filters.OrderingFilter, DjangoFilterBackend]
    filterset_class = EventFilter

    def get_serializer_class(self):
        return EventDetailSerializer

    def get_queryset(self):
        user: User = self.request.user
        if user.is_authenticated:
            return Event.objects.filter(participants__in=[user]).order_by('date')

    @swagger_auto_schema(
        operation_summary='Get list of joined events.',
        operation_description=api_description,
        operation_id='GetEventsJoinedList',
    )
    def get(self, request, *args, **kwargs):
        return self.list(request, *args, **kwargs)


class EventsCreatedAPI(CustomApiView, mixins.ListModelMixin):
    api_description = "List created events"
    filter_backends = [filters.OrderingFilter, DjangoFilterBackend]
    filterset_class = EventFilter

    def get_serializer_class(self):
        return EventDetailSerializer

    def get_queryset(self):
        user: User = self.request.user
        if user.is_authenticated:
            return Event.objects.filter(creator=user).order_by('date')

    @swagger_auto_schema(
        operation_summary='Get list of created events.',
        operation_description=api_description,
        operation_id='GetEventsCreatedList',
    )
    def get(self, request, *args, **kwargs):
        return self.list(request, *args, **kwargs)
