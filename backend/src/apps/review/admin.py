from django.contrib import admin

from apps.review.models import Review


class ReviewAdmin(admin.ModelAdmin):
    model = Review


admin.site.register(Review, ReviewAdmin)
