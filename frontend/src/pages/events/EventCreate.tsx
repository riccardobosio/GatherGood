import React, {useState} from 'react';
import {
    IonBackButton,
    IonButton,
    IonButtons,
    IonContent,
    IonDatetime,
    IonHeader,
    IonInput,
    IonItem,
    IonLabel, IonList,
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
    const [maxPeople, setMaxPeople] = useState<number>();
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
                <IonList>
                    <IonItem>
                        <IonLabel>
                            <h2>Name</h2>
                        </IonLabel>
                        <IonInput placeholder="Enter event name" value={name} onIonChange={(e) => setName(e.detail.value!)} />
                    </IonItem>

                    <IonItem>
                        <IonLabel>
                            <h2>Description</h2>
                        </IonLabel>
                        <IonInput
                            placeholder="Enter event description"
                            value={description}
                            onIonChange={(e) => setDescription(e.detail.value!)}
                        />
                    </IonItem>

                    <IonItem>
                        <IonLabel>
                            <h2>Location</h2>
                        </IonLabel>
                        <IonInput placeholder="Enter event location" value={location} onIonChange={(e) => setLocation(e.detail.value!)} />
                    </IonItem>

                    <IonItem>
                        <IonLabel>
                            <h2>Max People</h2>
                        </IonLabel>
                        <IonInput
                            placeholder="Enter max number of people"
                            type="number"
                            value={maxPeople}
                            onIonChange={(e) => setMaxPeople(parseInt(e.detail.value!, 10))}
                        />
                    </IonItem>

                    <IonItem>
                        <IonDatetime
                            placeholder="Select event date and time"
                            min={getCurrentDateTime()}
                            max="2030"
                            value={date}
                            onIonChange={(e) => setDate(e.detail.value! as string)}
                        />
                    </IonItem>

                    <IonItem className="ion-text-center" lines="none">
                        <IonButton expand="full" onClick={handleSubmit} disabled={!name || !description || !location || !maxPeople || !date}>
                            Create Event
                        </IonButton>
                    </IonItem>
                </IonList>
            </IonContent>
        </IonPage>
    );
};

export default CreateEventForm;
