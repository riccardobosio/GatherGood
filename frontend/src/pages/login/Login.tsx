import React, { useState } from 'react';
import {IonContent, IonPage, IonInput, IonButton, IonItem, IonLabel, InputChangeEventDetail} from '@ionic/react';
import './Login.css'
import authenticationService from "../../api/services/authentication";
import {useHistory} from "react-router";

interface FormData {
    email: string;
    password: string;
}

const Form: React.FC = () => {
    const [formData, setFormData] = useState<FormData>({ email: '', password: '' });
    const history = useHistory();

    // @ts-ignore
    const handleChange = (e) => {
        console.log(e)
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log(formData)
        authenticationService.login(formData.email, formData.password)
            .then(() => history.push('/profile'))
        console.log('Form Data Submitted:', formData);
    };

    return (
        <IonPage>
            <IonContent>
                <div className="form-container">
                    <form onSubmit={handleSubmit}>
                        <IonItem>
                            <IonLabel position="floating">Email</IonLabel>
                            <IonInput
                                name="email"
                                value={formData.email}
                                onIonChange={handleChange}
                                type="email"
                                required
                            />
                        </IonItem>
                        <IonItem>
                            <IonLabel position="floating">Password</IonLabel>
                            <IonInput
                                name="password"
                                value={formData.password}
                                onIonChange={handleChange}
                                type="password"
                                required
                            />
                        </IonItem>
                        <IonButton expand="block" type="submit">Submit</IonButton>
                    </form>
                </div>
            </IonContent>
        </IonPage>
    );
};
export default Form;