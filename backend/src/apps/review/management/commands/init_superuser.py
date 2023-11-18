import subprocess
from typing import Tuple

from django.conf import settings
from django.core.management import CommandError
from django.core.management.base import BaseCommand

from apps.accounts.models import User

DJANGO_SUPERUSER_VARIABLES: Tuple[str, ...] = (
    settings.DJANGO_SUPERUSER_EMAIL,
    settings.DJANGO_SUPERUSER_PASSWORD,
    settings.DJANGO_SUPERUSER_FIRST_NAME,
    settings.DJANGO_SUPERUSER_LAST_NAME
)


class Command(BaseCommand):

    def handle(self, *args, **options):
        user: User = User.objects.filter(
            email=settings.DJANGO_SUPERUSER_EMAIL,
        ).first()
        if user is None:
            for var in DJANGO_SUPERUSER_VARIABLES:
                if not isinstance(var, str) or not var.strip():
                    raise CommandError("Superuser variables not populated")

            bash_command = "python manage.py createsuperuser --noinput"

            process = subprocess.Popen(
                bash_command.split(),
                stdout=subprocess.PIPE
            )

            output, error = process.communicate()
            print(output.decode())

            self.stdout.write('--------------------------')

        else:
            self.stdout.write('Superuser already exists.')
            self.stdout.write('--------------------------')
