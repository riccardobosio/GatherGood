// EventDetails.tsx

import React, {useEffect, useState} from 'react';
import {IonPage, IonHeader, IonToolbar, IonButtons, IonBackButton, IonTitle, IonContent, IonButton} from '@ionic/react';

import {useHistory, useParams} from "react-router";
import {Event, User} from "../../api/types"
import eventService from "../../api/services/event";
import {useUser} from "../../hooks/useUser";
import userService from "../../api/services/user";

const EventDetails: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [event, setEvent] = useState<Event>();
    const [creator, setCreator] = useState<User>();
    const [hasJoined, setHasJoined] = useState<boolean>(false);
    const { user } = useUser();
    const history = useHistory();

    useEffect(() => {
        eventService.get(id).then(event => {
            setEvent(event)
            setHasJoined(isParticipantInEvent(event))
            userService.get(event.creator)
                .then(creator => setCreator(creator))
        })
    }, [id])

    const isParticipantInEvent = (event: Event): boolean => {
        if (!user) return false; // TODO: see why user is undefined
        return user.id === event.creator || event.participants.some((participant) => participant.id === user.id);
    };

    const joinEvent = () => {
        if (!event?.id) return
        eventService.joinEvent(event.id).then(() => setHasJoined(true))
    }

    const goToUserDetail = (id: string) => {
        history.push(`/users/${id}`)
    }

    return <>
        {event && (
            <IonPage>
                <IonHeader>
                    <IonToolbar>
                        <IonButtons slot="start">
                            <IonBackButton defaultHref="/events" />
                        </IonButtons>
                        <IonTitle>{event.name}</IonTitle>
                    </IonToolbar>
                </IonHeader>
                <IonContent>
                    <>
                        <p>Event Name: {event.name}</p>
                        <p>Date: {event.date}</p>
                        <p>Description: {event.description}</p>
                        {creator &&
                            <IonButton onClick={() => goToUserDetail(event.creator)}>
                                Creator: {creator.first_name} {creator.last_name}
                            </IonButton>
                        }
                        <IonButton expand="full" onClick={joinEvent} disabled={hasJoined}>
                            {hasJoined ? "You've already joined the event" : 'Join Event'}
                        </IonButton>
                    </>
                </IonContent>
            </IonPage>
        )}
    </>
};

export default EventDetails;
