from typing import Optional

import django_filters

from apps.review.models import Review

from rest_framework.exceptions import NotFound
from apps.accounts.models import User


def get_review(
        **kwargs
) -> Review:
    fetched_review: Optional[Review] = Review.objects.filter(
        **kwargs
    ).first()
    if fetched_review is None:
        raise NotFound
    return fetched_review


class ReviewFilter(django_filters.FilterSet):
    class Meta:
        model = Review
        fields = ("rate", "reviewee")


def get_reviews(*, filters=None):
    filters = filters or {}

    qs = Review.objects.all()

    return ReviewFilter(filters, qs).qs
