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
                last_name='Arystan',
            )
            riccardo.set_password('default')
            riccardo.save()
            self.stdout.write(f'Created user {riccardo.email} with pw "default"\n')

            arystan = User.objects.create(
                email='arystan@email.com',
                first_name='Arystan',
                last_name='Gaurav',
            )
            arystan.set_password('default')
            arystan.save()
            self.stdout.write(f'Created user {arystan.email} with pw "default"\n')

            laia = User.objects.create(
                email='laia@email.com',
                first_name='Laia',
                last_name='Gaurav',
            )
            laia.set_password('default')
            laia.save()
            self.stdout.write(f'Created user {laia.email} with pw "default"\n')

            self.stdout.write('--------------------------')

            self.stdout.write('Creating data for demo...\n')
            levon = User.objects.create(
                email='levon@email.com',
                first_name='Levon',
                last_name='Arystan',
            )
            levon.set_password('default')
            levon.save()
            self.stdout.write(f'Created user {levon.email} with pw "default"\n')
            event_1 = Event.objects.create(
                name="Pintar mi habitación",
                location="Barcelona",
                max_people="3",
                date="2023-10-11T10:15:00.499Z",
                description="Busco alguien que quiera echarme una mano pintando una habitación de forma creativa",
                creator=riccardo
            )
            event_1.participants.add(levon)
            event_2 = Event.objects.create(
                name="Ir a limpiar el parque",
                location="Badalona",
                max_people="10",
                date="2023-10-12T17:30:06.499Z",
                description="El parque de mi barrio siempre está muy sucio. Se lo he comunicado al ayuntamiento varias veces, pero nadie me hace caso. Me gustaría reunir a varias personas y limpiarlo juntos.",
                creator=riccardo
            )
            event_2.participants.add(levon)
            event_3 = Event.objects.create(
                name="Ir a dibujar a la playa",
                location="Castelldefels",
                max_people="5",
                date="2023-10-22T16:09:15.499Z",
                description="A veces voy a la playa a pintar el mar. Me gustaría conocer a otros pintores que quisieran acompañarme.",
                creator=arystan
            )
            event_3.participants.add(levon)
            event_4 = Event.objects.create(
                name="Pintar un escritorio antiguo",
                location="Castelldefels",
                max_people="3",
                date="2023-10-23T16:00:00.499Z",
                description="El otro día compré un escritorio de madera en un anticuario. Lo estoy restaurando y el siguiente paso es pintar la madera",
                creator=arystan
            )
            event_4.participants.add(levon)
            self.stdout.write(f'Created history of events that {levon.email} has joined in the past\n')
            event_5 = Event.objects.create(
                name="Organizar maratón",
                location="Barcelona",
                max_people="2",
                date="2023-12-11T12:30:00.499Z",
                description="Soy de una asociación que una vez al año organiza una maratón solidaria. Se necesita gente que nos quiera echar una mano.",
                creator=riccardo
            )
            event_6 = Event.objects.create(
                name="Taller de biología marina en la playa",
                location="Barcelona",
                max_people="8",
                date="2023-12-14T11:00:06.499Z",
                description="Hemos organizado una charla para todos los públicos en la playa",
                creator=riccardo
            )
            event_7 = Event.objects.create(
                name="Ayúdame con mi huerto",
                location="Valencia",
                max_people="1",
                date="2023-12-12T16:30:06.499Z",
                description="Quiero empezar un huerto urbano, pero no se mucho del tema. Busco alguien que me pueda dar algunas indicaciones.",
                creator=arystan
            )
            event_8 = Event.objects.create(
                name="Clases de pintura",
                location="Barcelona",
                max_people="3",
                date="2023-12-16T17:30:06.499Z",
                description="Busco alguien que me pueda introducir en el mundo de la pintura. Podríamos intercambiar clases de distintas disciplinas. Yo por ejemplo puedo enseñar italiano o programación.",
                creator=riccardo
            )
            self.stdout.write(f'Created available events\n')
            review_1 = Review.objects.create(
                reviewer=levon,
                reviewee=riccardo,
                rate=4,
                description="Me lo pasé muy bien con él con sus clases de italiano."
            )
            review_2 = Review.objects.create(
                reviewer=levon,
                reviewee=riccardo,
                rate=3,
                description="Fue un evento interesante"
            )
            review_3 = Review.objects.create(
                reviewer=laia,
                reviewee=riccardo,
                rate=5,
                description="Me ayudó mucho con mi proyecto de React. Muy recomendable."
            )

        else:
            self.stdout.write('Database is already populated.\n')