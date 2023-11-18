from apps.review.models import Review


def create_review(**kwargs) -> Review:
    new_review = Review(**kwargs)
    new_review.save()
    return new_review
