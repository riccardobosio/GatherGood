// EventDetails.tsx

import React, {useEffect, useState} from 'react';
import {IonPage, IonHeader, IonToolbar, IonButtons, IonBackButton, IonTitle, IonContent, IonButton} from '@ionic/react';

import {useParams} from "react-router";
import {Event, User} from "../api/types"
import eventService from "../api/services/event";
import {useUser} from "../hooks/useUser";

const EventDetails: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [event, setEvent] = useState<Event>();
    const [hasJoined, setHasJoined] = useState<boolean>(false);
    const { user } = useUser();

    useEffect(() => {
        eventService.get(id).then(event => {
            setEvent(event)
            setHasJoined(isParticipantInEvent(user, event))
        })
    }, [id])

    const isParticipantInEvent = (user: User | null | undefined, event: Event): boolean => {
        console.log(user, event)
        if (!user) return false;
        return event.participants.some((participant) => participant.id === user.id);
    };

    const joinEvent = () => {
        if (!event?.id) return
        eventService.joinEvent(event.id).then(() => setHasJoined(true))
    }

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonBackButton defaultHref="/events" />
                    </IonButtons>
                    <IonTitle>Event Details</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                {event && (
                    <>
                        <p>Event Name: {event.name}</p>
                        <p>Date: {event.date}</p>
                        <p>Description: {event.description}</p>
                        <IonButton expand="full" onClick={joinEvent} disabled={hasJoined}>
                            {hasJoined ? "You've already joined the event" : 'Join Event'}
                        </IonButton>
                    </>
                )}
            </IonContent>
        </IonPage>
    );
};

export default EventDetails;
