import React, { useState } from 'react';
import { IonContent, IonPage, IonInput, IonButton, IonItem, IonLabel, IonApp, IonGrid, IonRow, IonCol } from '@ionic/react';
import { useHistory } from 'react-router';
import SignupForm from "../components/Signup";
import { useUser } from "../hooks/useUser";
import './intro/IndexIntro.css';
import l from '../assets/animations/login-intro2.json';
import Lottie from 'lottie-react';

interface FormData {
    email: string;
    password: string;
}

const Form: React.FC = () => {
    const [formData, setFormData] = useState<FormData>({ email: '', password: '' });
    const [showSignupForm, setShowSignupForm] = useState(false);
    const history = useHistory();
    const { login } = useUser();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        login(formData.email, formData.password).then(() => history.push('/events'));
    };

    return (
        <IonGrid>
            <IonContent className='centered-content'>
                <IonRow className='centered-content'>
                    <IonCol size-xs="12" size-sm="10" size-md="6" size-lg="4">
                        <div className="form-container">
                        <Lottie style={{ width: '100%', height: '200px'}} loop={true} animationData={l} />
                            <h2>Nos alegra verte de nuevo!</h2>
                            <form className='login-form' onSubmit={handleSubmit}>
                                <IonItem>
                                    <IonLabel position="floating">Correo</IonLabel>
                                    <IonInput
                                        name="email"
                                        value={formData.email}
                                        onIonChange={handleChange}
                                        type="email"
                                        required
                                    />
                                </IonItem>
                                <IonItem>
                                    <IonLabel position="floating">Contraseña</IonLabel>
                                    <IonInput
                                        name="password"
                                        value={formData.password}
                                        onIonChange={handleChange}
                                        type="password"
                                        required
                                    />
                                </IonItem>
                                <IonButton shape='round' fill='outline' className="custom-button login-btn-1 ion-margin-top ion-padding-vertical" type="submit">
                                    A Disfrutar!
                                </IonButton>
                            </form>
                        </div>
                        {showSignupForm && <SignupForm />}
                    </IonCol>
                </IonRow>
            </IonContent>
        </IonGrid>
    );
};

export default Form;
