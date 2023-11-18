from rest_framework import serializers

from apps.review.models import Review


class ReviewCreateInputSerializer(serializers.ModelSerializer):
    class Meta:
        model = Review
        fields = ("reviewee", "rate", "description")


class ReviewDetailOutputSerializer(serializers.ModelSerializer):
    reviewer_name = serializers.SerializerMethodField()

    def get_reviewer_name(self, obj):
        return obj.reviewer.first_name if obj else None

    class Meta:
        model = Review
        fields = ('id', 'reviewer_name', 'rate', 'description', 'created_at')


class ReviewUpdateInputSerializer(serializers.ModelSerializer):
    class Meta:
        model = Review
        fields = ('rate', 'description')


class ReviewFilterSerializer(serializers.Serializer):
    rate = serializers.IntegerField(required=False)
    reviewee = serializers.CharField(required=False)
