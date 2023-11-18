// src/pages/UserProfilePage.tsx
import React, {useEffect, useState} from 'react';
import { IonPage, IonContent, IonItem, IonLabel, IonInput, IonButton } from '@ionic/react';
import { User } from '../api/types';
import {useUser} from "../hooks/useUser";

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
            <IonContent className="ion-padding center-content">
                <div className="form-container">
                    <h2>User Profile</h2>
                    <IonItem>
                        <IonLabel>Email</IonLabel>
                        <IonInput value={editedUser?.email} disabled />
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
                </div>
            </IonContent>
        </IonPage>
    );
};

export default UserProfilePage;
