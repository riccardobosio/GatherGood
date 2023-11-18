// src/components/SignupForm.tsx
import React, { useState } from 'react';
import { IonInput, IonButton, IonItem, IonLabel, IonContent, IonPage } from '@ionic/react';

interface SignupFormData {
    name: string;
    email: string;
    password: string;
}

const SignupForm: React.FC = () => {
    const [signupFormData, setSignupFormData] = useState<SignupFormData>({ name: '', email: '', password: '' });

    const handleSignupChange = (e: CustomEvent) => {
        const { name, value } = e.detail;
        setSignupFormData({ ...signupFormData, [name]: value });
    };

    const handleSignupSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // TODO: create user
    };

    return (
        <IonPage>
            <IonContent className="ion-padding center-content">
                <div className="form-container">
                    <h2>Sign Up</h2>
                    <form onSubmit={handleSignupSubmit}>
                        <IonItem>
                            <IonLabel position="floating">Name</IonLabel>
                            <IonInput
                                name="name"
                                value={signupFormData.name}
                                onIonChange={handleSignupChange}
                                type="text"
                                required
                            />
                        </IonItem>
                        <IonItem>
                            <IonLabel position="floating">Email</IonLabel>
                            <IonInput
                                name="email"
                                value={signupFormData.email}
                                onIonChange={handleSignupChange}
                                type="email"
                                required
                            />
                        </IonItem>
                        <IonItem>
                            <IonLabel position="floating">Password</IonLabel>
                            <IonInput
                                name="password"
                                value={signupFormData.password}
                                onIonChange={handleSignupChange}
                                type="password"
                                required
                            />
                        </IonItem>
                        <IonButton expand="block" type="submit">
                            Sign Up
                        </IonButton>
                    </form>
                </div>
            </IonContent>
        </IonPage>
    );
};

export default SignupForm;
