import {
    IonCard, IonCardContent,
    IonCardHeader,
    IonCardSubtitle,
    IonCardTitle,
    IonContent,
    IonHeader,
    IonPage,
    IonTitle,
    IonToolbar
} from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './Tab1.css';
import React, {useEffect, useState} from "react";
import {Event} from "../api/types";
import eventService from "../api/services/event";
import {formatDate} from "../utils/date";

const Events: React.FC = () => {
    const [events, setEvents] = useState<Event[]>([])

    useEffect(() => {
        eventService.getList().then(events => setEvents(events))
    }, [])

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
                      </IonCardContent>
                  </IonCard>
              ))}
          </>
      </IonContent>
    </IonPage>
  );
};

export default Events;
