from drf_yasg import openapi
from drf_yasg.utils import swagger_auto_schema
from rest_framework import status
from rest_framework.response import Response

from apps.accounts.api.views.common import CustomApiView
from apps.review.models import Review
from apps.review.selectors import get_review, get_reviews
from apps.review.serializers import (ReviewCreateInputSerializer,
                                     ReviewDetailOutputSerializer,
                                     ReviewFilterSerializer,
                                     ReviewUpdateInputSerializer)
from apps.review.services import create_review
from apps.review.utils import update_model_object

rate_params = openapi.Parameter(
    'rate',
    in_=openapi.IN_QUERY,
    type=openapi.TYPE_NUMBER,
    description="Review Rate",
)

reviewee_params = openapi.Parameter(
    'reviewee',
    in_=openapi.IN_QUERY,
    type=openapi.TYPE_STRING,
    description="Reviewee",
)


class ReviewCreateAndListApi(CustomApiView):
    api_description = 'Create and List Reviews'

    @swagger_auto_schema(
        operation_summary="ReviewCreate",
        operation_description=api_description,
        operation_id="ReviewCreate",
        responses={status.HTTP_201_CREATED: ReviewDetailOutputSerializer()},
        request_body=ReviewCreateInputSerializer,

    )
    def post(self, request):
        serializer = ReviewCreateInputSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        new_review: Review = create_review(reviewer=request.user, **serializer.data)
        data = ReviewDetailOutputSerializer(new_review).data
        return Response(data=data, status=status.HTTP_201_CREATED)

    @swagger_auto_schema(
        operation_summary="ReviewListRetrieve",
        operation_description=api_description,
        operation_id="ReviewListRetrieve",
        manual_parameters=[
            rate_params,
            reviewee_params
        ],
        responses={status.HTTP_200_OK: ReviewDetailOutputSerializer(many=True)}
    )
    def get(self, request):
        filters_serializer = ReviewFilterSerializer(data=request.query_params)
        filters_serializer.is_valid(raise_exception=True)
        fetched_vps_list = get_reviews(filters=filters_serializer.validated_data)

        page = self.paginate_queryset(fetched_vps_list)
        if page is not None:
            serializer = ReviewDetailOutputSerializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        data = ReviewDetailOutputSerializer(
            fetched_vps_list, many=True
        ).data

        return Response(
            data=data,
            status=status.HTTP_200_OK
        )


class ReviewRetrieveAndUpdateApi(CustomApiView):
    api_description = 'Get and Patch Review By ID'

    @swagger_auto_schema(
        operation_summary="ReviewRetrieve",
        operation_description=api_description,
        operation_id="ReviewRetrieve",
        responses={status.HTTP_200_OK: ReviewDetailOutputSerializer()}
    )
    def get(self, request, review_id):
        fetched_review: Review = get_review(id=review_id)

        data = ReviewDetailOutputSerializer(fetched_review).data

        return Response(data=data, status=status.HTTP_200_OK)

    @swagger_auto_schema(
        operation_summary="ReviewUpdateStatus",
        operation_description=api_description,
        operation_id="ReviewUpdateStatus",
        responses={status.HTTP_200_OK: ReviewDetailOutputSerializer()},
        request_body=ReviewUpdateInputSerializer,

    )
    def put(self, request, review_id):
        serializer = ReviewUpdateInputSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        fetched_review: Review = get_review(id=review_id, reviewer=request.user)
        update_model_object(
            model=fetched_review,
            refresh_updated_at=True,
            **serializer.data
        )
        data = ReviewDetailOutputSerializer(fetched_review).data
        return Response(data=data, status=status.HTTP_200_OK)
