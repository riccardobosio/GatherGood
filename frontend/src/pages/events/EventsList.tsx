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
    IonCol, IonButtons, IonIcon,
} from '@ionic/react';
import React, { useEffect, useState } from 'react';
import { Event } from '../../api/types';
import eventService from '../../api/services/event';
import { formatDate } from '../../utils/date';
import {useHistory} from "react-router";
import {addOutline} from "ionicons/icons";

const EventsList: React.FC = () => {
    const [events, setEvents] = useState<Event[]>([]);
    const history = useHistory();

    useEffect(() => {
        eventService.getList().then((events) => setEvents(events));
    }, []);

    const viewEventDetails = (event: Event) => {
        history.push(`/events/${event.id}`)
    };

    const viewCreateEvent = () => {
        history.push(`/events/create`)
    };

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Eventos</IonTitle>
                    <IonButtons slot="end">
                        <IonButton color="primary" onClick={viewCreateEvent}>
                            <IonIcon slot="start" icon={addOutline} />
                            Crear Nuevo
                        </IonButton>
                    </IonButtons>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                <IonHeader collapse="condense">
                    <IonToolbar>
                        <IonTitle size="large">Eventos</IonTitle>
                    </IonToolbar>
                </IonHeader>
                <>
                    {events.map((event) => (
                        <IonCard key={event.id}>
                            <IonCardHeader>
                                <IonCardTitle>{event.name}</IonCardTitle>
                                <IonCardSubtitle>{formatDate(event.date)}</IonCardSubtitle>
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
                    ))}
                </>
            </IonContent>
        </IonPage>
    );
};

export default EventsList;
