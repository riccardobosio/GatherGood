import {
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonCardSubtitle,
    IonCardTitle,
    IonContent,
    IonHeader,
    IonPage,
    IonTitle,
    IonToolbar,
    IonButton,
    IonGrid,
    IonRow,
    IonCol, IonButtons,
} from '@ionic/react';
import React, { useEffect, useState } from 'react';
import { Event } from '../../api/types';
import eventService from '../../api/services/event';
import { formatDate } from '../../utils/date';
import {useHistory} from "react-router";

const EventsList: React.FC = () => {
    const [seeUpcoming, setSeeUpcoming] = useState(true)
    const [upcomingEvents, setUpcomingEvents] = useState<Event[]>([]);
    const [pastEvents, setPastEvents] = useState<Event[]>([]);
    const history = useHistory();

    useEffect(() => {
        eventService.getList().then((events) => setUpcomingEvents(events));
        eventService.getPassedJoinedEvents().then((events) => setPastEvents(events));
    }, []);

    const viewEventDetails = (event: Event) => {
        history.push(`/events/${event.id}`)
    };

    const viewCreateEvent = () => {
        history.push(`/events/create`)
    };

    const getFontWeight = (bold: boolean) => {
        if (bold) return 'bold'
        return 'normal'
    }

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Eventos</IonTitle>
                    <IonButtons slot="end">
                        <IonButton
                            onClick={() => setSeeUpcoming(true)}
                            style={{ fontWeight: getFontWeight(seeUpcoming) }}
                        >
                            Próximos
                        </IonButton>
                        <IonButton
                            onClick={() => setSeeUpcoming(false)}
                            style={{ fontWeight: getFontWeight(!seeUpcoming) }}
                        >
                            Pasados
                        </IonButton>
                    </IonButtons>
                    <IonButtons slot="end">
                        <IonButton color="primary" onClick={viewCreateEvent}>
                            Crear Nuevo
                        </IonButton>
                    </IonButtons>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                <IonHeader collapse="condense">
                    <IonToolbar>
                        <IonTitle size="large">Eventos</IonTitle>
                        <IonTitle size="large">Eventos</IonTitle>
                    </IonToolbar>
                </IonHeader>
                {/* Copied this cause got no time */}
                {seeUpcoming &&
                    upcomingEvents.map((event) => (
                            <IonCard key={event.id}>
                                <IonCardHeader>
                                    <IonCardTitle>{event.name}</IonCardTitle>
                                    <IonCardSubtitle>{event.location}, {formatDate(event.date)}</IonCardSubtitle>
                                </IonCardHeader>
                                <IonCardContent>
                                    <p>{event.description}</p>
                                    <IonGrid>
                                        <IonRow>
                                            <IonCol className="ion-text-end">
                                                <IonButton onClick={() => viewEventDetails(event)}>
                                                    Ver Evento
                                                </IonButton>
                                            </IonCol>
                                        </IonRow>
                                    </IonGrid>
                                </IonCardContent>
                            </IonCard>
                    ))
                }
                {!seeUpcoming &&
                    pastEvents.map((event) => (
                        <IonCard key={event.id}>
                            <IonCardHeader>
                                <IonCardTitle>{event.name}</IonCardTitle>
                                <IonCardSubtitle>{event.location}, {formatDate(event.date)}</IonCardSubtitle>
                                <IonCardSubtitle>{event.location}, {formatDate(event.date)}</IonCardSubtitle>
                            </IonCardHeader>
                            <IonCardContent>
                                <p>{event.description}</p>
                                <IonGrid>
                                    <IonRow>
                                        <IonCol className="ion-text-end">
                                            <IonButton onClick={() => viewEventDetails(event)}>
                                                Ver Evento
                                                Ver Evento
                                            </IonButton>
                                        </IonCol>
                                    </IonRow>
                                </IonGrid>
                            </IonCardContent>
                        </IonCard>
                    ))
                }
            </IonContent>
        </IonPage>
    );
};

export default EventsList;
