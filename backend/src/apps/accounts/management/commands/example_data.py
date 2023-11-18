from django.core.management.base import BaseCommand

from apps.accounts.models import User
from apps.events.models import Event
from apps.review.models.review import Review


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

            arystan = User.objects.create(
                email='arystan@email.com',
                first_name='Arystan',
                last_name='I',
            )
            arystan.set_password('default')
            arystan.save()
            self.stdout.write(f'Created user {arystan.email} with pw "default"\n')

            laia = User.objects.create(
                email='laia@email.com',
                first_name='Laia',
                last_name='V',
            )
            laia.set_password('default')
            laia.save()
            self.stdout.write(f'Created user {laia.email} with pw "default"\n')

            self.stdout.write('--------------------------')

            self.stdout.write('Creating data for demo...\n')
            levon = User.objects.create(
                email='levon@email.com',
                first_name='Levon',
                last_name='L',
            )
            levon.set_password('default')
            levon.save()
            self.stdout.write(f'Created user {levon.email} with pw "default"\n')
            event_1 = Event.objects.create(
                name="Paint room",
                location="BCN",
                max_people="10",
                date="2023-10-11T10:13:06.499Z",
                description="Help me paint my old room.",
                creator=riccardo
            )
            event_1.participants.add(levon)
            event_2 = Event.objects.create(
                name="Park cleanup",
                location="BCN",
                max_people="10",
                date="2023-10-12T10:13:06.499Z",
                description="Local park cleanup and tree planting.",
                creator=riccardo
            )
            event_2.participants.add(levon)
            event_3 = Event.objects.create(
                name="Draw at the sea",
                location="BCN",
                max_people="5",
                date="2023-10-22T16:13:06.499Z",
                description="Drawing at the beach.",
                creator=arystan
            )
            event_3.participants.add(levon)
            event_4 = Event.objects.create(
                name="Desk painting",
                location="BCN",
                max_people="3",
                date="2023-10-23T16:13:06.499Z",
                description="Paint my old wood desk.",
                creator=arystan
            )
            event_4.participants.add(levon)
            self.stdout.write(f'Created history of events that {levon.email} has joined in the past\n')
            event_5 = Event.objects.create(
                name="Organize marathon",
                location="BCN",
                max_people="2",
                date="2023-12-11T12:13:06.499Z",
                description="City marathon for charity.",
                creator=riccardo
            )
            event_6 = Event.objects.create(
                name="Clean the beach",
                location="BCN",
                max_people="2",
                date="2023-12-14T12:13:06.499Z",
                description="Beach cleanup and environmental awareness workshop.",
                creator=riccardo
            )
            event_7 = Event.objects.create(
                name="Farming suggestion",
                location="Valencia",
                max_people="1",
                date="2023-12-12T17:13:06.499Z",
                description="Urban farming and sustainable living seminar.",
                creator=arystan
            )
            event_8 = Event.objects.create(
                name="Kitchen painting",
                location="Valencia",
                max_people="2",
                date="2023-12-16T17:13:06.499Z",
                description="Kitchen painters.",
                creator=riccardo
            )
            self.stdout.write(f'Created available events\n')
            review_1 = Review.objects.create(
                reviewer=levon,
                reviewee=riccardo,
                rate=4,
                description="Had fun with him!"
            )
            review_2 = Review.objects.create(
                reviewer=levon,
                reviewee=riccardo,
                rate=3,
                description="He organized the event in a simple way"
            )
            review_3 = Review.objects.create(
                reviewer=laia,
                reviewee=riccardo,
                rate=5,
                description="Helped a lot"
            )

        else:
            self.stdout.write('Database is already populated.\n')