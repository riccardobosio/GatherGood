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
    IonCol,
} from '@ionic/react';
import React, { useEffect, useState } from 'react';
import { Event } from '../api/types';
import eventService from '../api/services/event';
import { formatDate } from '../utils/date';
import {useHistory} from "react-router";

const Events: React.FC = () => {
    const [events, setEvents] = useState<Event[]>([]);
    const history = useHistory();

    useEffect(() => {
        eventService.getList().then((events) => setEvents(events));
    }, []);

    const viewEventDetails = (event: Event) => {
        history.push(`/events/${event.id}`)
    };

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Events</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                <IonHeader collapse="condense">
                    <IonToolbar>
                        <IonTitle size="large">Events</IonTitle>
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
                                                View Details
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

export default Events;
