"""
This module contains OpenAPI Schema Generator
"""

from drf_yasg.generators import OpenAPISchemaGenerator


class SchemaGenerator(OpenAPISchemaGenerator):
    """
    Class to iterate over all registered API endpoints 
    and return an appropriate OpenAPI 2.0 compliant schema
    """

    def get_schema(self, request=None, public=False):
        schema = super().get_schema(request, public)
        schema.basePath = '/api' + schema.basePath
        return schema
