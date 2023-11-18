from rest_framework import serializers

from apps.review.models import Review


class ReviewCreateInputSerializer(serializers.ModelSerializer):
    class Meta:
        model = Review
        fields = ("reviewee", "rate", "description")


class ReviewDetailOutputSerializer(serializers.ModelSerializer):
    class Meta:
        model = Review
        fields = ('id', 'reviewee', 'rate', 'description', 'created_at')


class ReviewUpdateInputSerializer(serializers.ModelSerializer):
    class Meta:
        model = Review
        fields = ('rate', 'description')


class ReviewFilterSerializer(serializers.Serializer):
    rate = serializers.IntegerField(required=False)
    reviewee = serializers.CharField(required=False)
