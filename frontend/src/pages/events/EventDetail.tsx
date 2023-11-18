// EventDetails.tsx

import React, {useEffect, useState} from 'react';
import {
    IonPage,
    IonHeader,
    IonToolbar,
    IonButtons,
    IonBackButton,
    IonTitle,
    IonContent,
    IonButton,
    IonList, IonItem, IonLabel
} from '@ionic/react';

import {useHistory, useParams} from "react-router";
import {Event, User} from "../../api/types"
import eventService from "../../api/services/event";
import {useUser} from "../../hooks/useUser";
import userService from "../../api/services/user";
import {formatDate} from "../../utils/date";

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
                    <IonList>
                        <IonItem>
                            <IonLabel>
                                <h2>Description</h2>
                                <p>{event.description}</p>
                            </IonLabel>
                        </IonItem>

                        {creator && (
                            <IonItem>
                                <IonLabel>
                                    <h2>Creator</h2>
                                    <p>{creator.first_name} {creator.last_name}</p>
                                </IonLabel>

                                <IonButton fill="clear" size="small" onClick={() => goToUserDetail(event.creator)}>
                                    See Reviews
                                </IonButton>
                            </IonItem>
                        )}

                        <IonItem>
                            <IonLabel>
                                <h2>Date</h2>
                                <p>{formatDate(event.date)}</p>
                            </IonLabel>
                        </IonItem>

                        <IonItem className="ion-text-center" lines="none">
                            <IonButton expand="full" onClick={joinEvent} disabled={hasJoined}>
                                {hasJoined ? "You've already joined the event" : 'Join Event'}
                            </IonButton>
                        </IonItem>
                    </IonList>
                </IonContent>

            </IonPage>
        )}
    </>
};

export default EventDetails;
