from django.urls import path
from apps.events.api.views.event import EventsAPI, EventDetailRetrieveUpdateDestroyAPI, EventsJoinedAPI, EventsCreatedAPI

urlpatterns = [
    path('events/', EventsAPI.as_view(), name='events'),
    path('events/<uuid:pk>/', EventDetailRetrieveUpdateDestroyAPI.as_view(), name='events_id'),
    path('events/joined/', EventsJoinedAPI.as_view(), name='events_joined'),
    path('events/created/', EventsCreatedAPI.as_view(), name='events_created'),
]
