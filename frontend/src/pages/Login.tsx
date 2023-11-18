import React, { useState } from 'react';
import { IonContent, IonPage, IonInput, IonButton, IonItem, IonLabel } from '@ionic/react';
import { useHistory } from 'react-router';
import authenticationService from '../api/services/authentication';
import '../styles.css';
import SignupForm from "../components/Signup";

interface FormData {
    email: string;
    password: string;
}

const Form: React.FC = () => {
    const [formData, setFormData] = useState<FormData>({ email: '', password: '' });
    const [showSignupForm, setShowSignupForm] = useState(false);
    const history = useHistory();

    // @ts-ignore
    const handleChange = (e) => {
        const { name, value } = e.detail;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        authenticationService.login(formData.email, formData.password).then(() => history.push('/profile'));
    };

    return (
        <IonPage>
            <IonContent className="ion-padding center-content">
                <div className="form-container">
                    <h2>Login</h2>
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
                        <IonButton expand="block" type="submit">
                            Submit
                        </IonButton>
                    </form>
                    <IonButton fill="clear" onClick={() => setShowSignupForm(true)}>
                        Don't have an account? Sign Up now!
                    </IonButton>
                </div>
                {showSignupForm && <SignupForm />}
            </IonContent>
        </IonPage>
    );
};

export default Form;
