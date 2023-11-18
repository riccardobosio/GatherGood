// src/pages/UserProfilePage.tsx
import React, {useEffect, useState} from 'react';
import {
    IonPage,
    IonContent,
    IonItem,
    IonLabel,
    IonInput,
    IonButton,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardSubtitle,
    IonCardContent,
    IonButtons,
    IonBackButton,
    IonList,
    IonIcon
} from '@ionic/react';
import { User } from '../api/types';
import {useUser} from "../hooks/useUser";
import {formatDate} from "../utils/date";
import authenticationService from '../api/services/authentication';
import { useHistory } from 'react-router';
import {addOutline} from "ionicons/icons";

const UserProfilePage: React.FC = () => {
    const { user, getUser } = useUser();
    const [editedUser, setEditedUser] = useState<User | null | undefined>(user);
    const history = useHistory();

    const handleInputChange = (key: keyof User, value: string) => {
        setEditedUser((prevUser: any) => ({
            ...prevUser,
            [key]: value,
        }));
    };

    const handleSave = () => {
        console.log('User data saved:', editedUser);
        // TODO: Edit user
    };

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonBackButton defaultHref="/events" />
                    </IonButtons>
                    <IonTitle>Profile</IonTitle>
                    <IonButtons slot="end">
                        <IonButton
                            onClick={() => {
                                authenticationService.logout()
                                    .then(() => {
                                        history.push(`/login`)
                                        window.location.reload();
                                    })
                            }}
                            color="primary">
                            Logout
                        </IonButton>
                    </IonButtons>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <IonList>
                    <IonItem>
                        <IonLabel>
                            <h2>Email</h2>
                            <p>
                                <IonInput value={editedUser?.email} />
                            </p>
                        </IonLabel>
                    </IonItem>
                    <IonItem>
                        <IonLabel>
                            <h2>First name</h2>
                            <p>
                                <IonInput
                                    value={editedUser?.first_name}
                                    onIonChange={(e) => handleInputChange('first_name', e.detail.value!)}
                                />
                            </p>
                        </IonLabel>
                    </IonItem>
                    <IonItem>
                        <IonLabel>
                            <h2>Last name</h2>
                            <p>
                                <IonInput
                                    value={editedUser?.last_name}
                                    onIonChange={(e) => handleInputChange('last_name', e.detail.value!)}
                                />
                            </p>
                        </IonLabel>
                    </IonItem>
                    <IonItem className="ion-text-center" lines="none">
                        <IonButton expand="full" onClick={handleSave}>
                            Save Changes
                        </IonButton>
                    </IonItem>

                </IonList>
            </IonContent>
        </IonPage>
    );
};

export default UserProfilePage;
