from django.urls import path
from apps.events.api.views.event import EventsAPI, EventDetailRetrieveUpdateDestroyAPI

urlpatterns = [
    path('events/', EventsAPI.as_view(), name='events'),
    path('events/<uuid:pk>/', EventDetailRetrieveUpdateDestroyAPI.as_view(), name='events_id'),
]
