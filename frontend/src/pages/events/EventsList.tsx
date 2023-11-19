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
import { useHistory } from "react-router";
import { addOutline, eyeOutline, chatbubblesOutline } from "ionicons/icons";

import './Events.css';

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
                    <IonButtons slot="end">
                        <IonButton color="primary" onClick={viewCreateEvent}>
                            <IonIcon slot="start" icon={addOutline} />
                        </IonButton>
                    </IonButtons>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                <IonHeader collapse="condense">
                    <IonToolbar>
                        <div className='flex-settings'>
                            <IonTitle size="large"><IonIcon icon={chatbubblesOutline}></IonIcon> Eventos</IonTitle>
                        </div>
                    </IonToolbar>
                </IonHeader>
                <>
                    {events.map((event) => (
                        <IonCard className='card-settings' key={event.id}>
                            <IonCardHeader>
                                <IonCardTitle>{event.name}</IonCardTitle>
                                <IonCardSubtitle>{event.location}, {formatDate(event.date)}</IonCardSubtitle>
                            </IonCardHeader>
                            <IonCardContent>
                                <p>{event.description}</p>
                                <IonGrid>
                                    <IonRow>
                                        <IonCol className="ion-text-end">
                                            <IonButton fill='outline' className='btn-edit' onClick={() => viewEventDetails(event)}>
                                                <IonIcon icon={eyeOutline} />&nbsp;
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
