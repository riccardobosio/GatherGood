from django.db import models
from apps.accounts.models.user import BaseModel, User


class Event(BaseModel):
    name = models.CharField(
        verbose_name="Name of the event",
    )
    creator = models.ForeignKey(
        verbose_name="Creator of event",
        to='accounts.User',
        on_delete=models.CASCADE,
        related_name='creator',
    )
    location = models.CharField(
        verbose_name="Location of the event",
    )
    max_people = models.IntegerField(
        verbose_name="Maximum number of people",
    )
    date = models.DateTimeField(
        verbose_name="Date of the event",
    )
    description = models.TextField(
        verbose_name="Description of the event",
    )
    participants = models.ManyToManyField(User)