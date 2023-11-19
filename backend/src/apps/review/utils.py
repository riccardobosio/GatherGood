from django.db.models import Model


def update_model_object(*,
                        model: Model,
                        refresh_updated_at: bool = True,
                        **data
                        ) -> Model:
    if refresh_updated_at:
        for field_name, field_value in data.items():
            if hasattr(model, field_name):
                setattr(model, field_name, field_value)
        model.save()
    else:
        update_fields = []
        for field_name, field_value in data.items():
            if hasattr(model, field_name):
                setattr(model, field_name, field_value)
                update_fields.append(field_name)
        model.save(update_fields=update_fields)
    return model
