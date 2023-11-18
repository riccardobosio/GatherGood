import django_filters

from apps.events.models import Event


class EventFilter(django_filters.FilterSet):
    name = django_filters.CharFilter(field_name='name', lookup_expr='icontains')
    creator_name = django_filters.CharFilter(field_name='creator__first_name', lookup_expr='icontains')
    creator_id = django_filters.UUIDFilter(field_name='creator__id', lookup_expr='exact')
    location = django_filters.CharFilter(field_name='location', lookup_expr='icontains')
    date = django_filters.DateTimeFilter(field_name='date')

    class Meta:
        model = Event
        fields = ['name', 'creator_name', 'creator_id', 'location', 'date']