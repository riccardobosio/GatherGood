from django.db import models
from django.utils.translation import gettext_lazy as _

from apps.accounts.models.user import BaseModel

RATES = (
    (1, "1 Star"),
    (2, "2 Star"),
    (3, "3 Star"),
    (4, "4 Star"),
    (5, "5 Star"),

)


class Review(
    BaseModel,
):
    reviewer = models.ForeignKey(
        to='accounts.User',
        verbose_name=_('Reviewer'),
        on_delete=models.SET_NULL,
        blank=True,
        null=True,
        related_name='reviews_as_reviewer'
    )
    reviewee = models.ForeignKey(
        to='accounts.User',
        verbose_name=_('Reviewee'),
        on_delete=models.SET_NULL,
        blank=True,
        null=True,
        related_name='reviews_as_reviewee'
    )
    rate = models.SmallIntegerField(choices=RATES, default=0)

    description = models.TextField(
        verbose_name='description',
    )

    class Meta:
        db_table = 'reviews'
