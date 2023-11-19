import React, { useState } from 'react';
import { IonContent, IonInput, IonButton, IonItem, IonLabel, IonGrid, IonRow, IonCol } from '@ionic/react';
import { useHistory } from 'react-router';
import SignupForm from "../components/Signup";
import { useUser } from "../hooks/useUser";
import './intro/IndexIntro.css';
import l from '../assets/animations/login-intro2.json';
import Lottie from 'lottie-react';
import { CapacitorHttp, HttpResponse } from '@capacitor/core';

interface FormData {
    email: string;
    password: string;
}

const Form: React.FC = () => {
    const [formData, setFormData] = useState<FormData>({ email: '', password: '' });
    const [showSignupForm, setShowSignupForm] = useState(false);
    const history = useHistory();
    const { login } = useUser();


    const handleChange = (event: CustomEvent) => {
        const target = event.target as HTMLInputElement;  // Typecasting the target
        const name = target.name;
        const value = target.value;
        setFormData(prevForm => ({ ...prevForm, [name]: value }));
    };

    const doPost = async() => {
        const response: HttpResponse = await CapacitorHttp.post({
            url: `http://localhost:8000/api/auth/login/`,
            headers: { 'Content-Type': 'application/json' },
            data: formData
        }).then(res => {return res}).catch(err => {return err});

        if(response.status === 200) {
            history.push("/events");
        }
    }

    const handleSubmit = (e: React.FormEvent) => {
        login(formData.email, formData.password).then(() => history.push('/events')).catch(err => console.log(err));
        doPost();
        e.preventDefault();
    };

    return (
        <IonGrid>
            <IonContent className='centered-content'>
                <IonRow className='centered-content'>
                    <IonCol size-xs="12" size-sm="10" size-md="6" size-lg="4">
                        <div className="form-container">
                            <Lottie style={{ width: '100%', height: '200px' }} loop={true} animationData={l} />
                            <h2>Nos alegra verte de nuevo!</h2>
                            <form className='login-form' onSubmit={handleSubmit}>
                                <IonItem>
                                    <IonLabel position="floating">Correo</IonLabel>
                                    <IonInput
                                        name="email"
                                        type="email"
                                        value={formData.email}
                                        onIonChange={handleChange}
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
