import React, {useState} from 'react';
import {
    IonBackButton,
    IonButton,
    IonButtons,
    IonContent,
    IonDatetime,
    IonHeader,
    IonInput,
    IonLabel,
    IonPage,
    IonTextarea,
    IonTitle,
    IonToolbar
} from '@ionic/react';
import {useHistory} from 'react-router-dom';
import {Event} from '../../api/types';
import eventService from "../../api/services/event";
import {getCurrentDateTime} from "../../utils/date";


const CreateEventForm: React.FC = () => {
    const [name, setName] = useState<string>('');
    const [location, setLocation] = useState<string>('');
    const [maxPeople, setMaxPeople] = useState<number>(1);
    const [date, setDate] = useState<string>(getCurrentDateTime());
    const [description, setDescription] = useState<string>('');

    const history = useHistory();

    const handleSubmit = () => {

        const newEvent: Partial<Event> = {
            name,
            location,
            max_people: maxPeople,
            date,
            description,
        };

        eventService.create(newEvent)
            .then(() => history.push('/events'))
            .catch(() => console.log('error')) // TODO: handle error
    };

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonBackButton defaultHref="/events" />
                    </IonButtons>
                    <IonTitle>Create Event</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent className="ion-padding">
                <IonLabel>Name</IonLabel>
                <IonInput value={name} onIonChange={(e) => setName(e.detail.value!)} />

                <IonLabel>Location</IonLabel>
                <IonInput value={location} onIonChange={(e) => setLocation(e.detail.value!)} />

                <IonLabel>Max People</IonLabel>
                <IonInput type="number" value={maxPeople} onIonChange={(e) => setMaxPeople(parseInt(e.detail.value!, 10))} />

                <IonLabel>Date</IonLabel>
                <IonDatetime
                    min={getCurrentDateTime()}
                    max="2030"
                    value={date}
                    onIonChange={(e) => setDate(e.detail.value! as string)}
                />

                <IonLabel>Description</IonLabel>
                <IonTextarea value={description} onIonChange={(e) => setDescription(e.detail.value!)} />

                <IonButton expand="full" onClick={handleSubmit}>
                    Create Event
                </IonButton>
            </IonContent>
        </IonPage>
    );
};

export default CreateEventForm;
