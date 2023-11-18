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
    IonTitle, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent
} from '@ionic/react';
import { User } from '../api/types';
import {useUser} from "../hooks/useUser";
import {formatDate} from "../utils/date";

const UserProfilePage: React.FC = () => {
    const { user, getUser } = useUser();
    const [editedUser, setEditedUser] = useState<User | null | undefined>(user);

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
                    <IonTitle>Profile</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
            <IonItem>
                <IonLabel>Email</IonLabel>
                <IonInput value={editedUser?.email} disabled/>
            </IonItem>
            <IonItem>
                <IonLabel>First Name</IonLabel>
                <IonInput
                    value={editedUser?.first_name}
                    onIonChange={(e) => handleInputChange('first_name', e.detail.value!)}
                />
            </IonItem>
            <IonItem>
                <IonLabel>Last Name</IonLabel>
                <IonInput
                    value={editedUser?.last_name}
                    onIonChange={(e) => handleInputChange('last_name', e.detail.value!)}
                />
            </IonItem>
            <IonButton expand="block" onClick={handleSave}>
                Save Changes
            </IonButton>
            </IonContent>
        </IonPage>
    );
};

export default UserProfilePage;
