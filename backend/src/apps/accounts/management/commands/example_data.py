from django.core.management.base import BaseCommand

from apps.accounts.models import User
from apps.events.models import Event


class Command(BaseCommand):

    def handle(self, *args, **options):
        if Event.objects.count() == 0:
            self.stdout.write('Creating example data...\n')
            riccardo = User.objects.create(
                email='riccardo@email.com',
                first_name='Riccardo',
                last_name='B',
            )
            riccardo.set_password('default')
            riccardo.save()
            self.stdout.write(f'Created user {riccardo.email} with pw "default"\n')

            event = Event.objects.create(
                name="Move",
                location="BCN",
                max_people="10",
                date="2023-11-25T10:13:06.499Z",
                description="Help me to move to my new place",
                creator=riccardo
            )
            self.stdout.write(f'Created event {event.name} with id {event.id}\n')

            arystan = User.objects.create(
                email='arystan@email.com',
                first_name='Arystan',
                last_name='I',
            )
            arystan.set_password('default')
            arystan.save()
            self.stdout.write(f'Created user {arystan.email} with pw "default"\n')

            self.stdout.write('--------------------------')
        else:
            self.stdout.write('Database is already populated.\n')