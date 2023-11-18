import React, { useState } from 'react';
import { IonContent, IonPage, IonInput, IonButton, IonItem, IonLabel, IonIcon, IonGrid, IonRow, IonCol, IonNav, IonTitle } from '@ionic/react';
import { personOutline } from 'ionicons/icons';
import './Signup.css';
import Tab1 from '../Tab1';
import { useHistory } from 'react-router-dom';

interface FormData {
  name: string;
  email: string;
  password: string;
}

const SignupForm: React.FC = () => {
  const [formData, setFormData] = useState({name: '', email: '', password: '' });
  const history = useHistory();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    console.log('Form Data:', formData);
    // Add your signup logic here

    history.push("/tab1");
  };

  return (
    <IonPage>
      <IonContent className="ion-padding">
        <IonGrid>
          <IonRow>
            <IonCol size='9' sizeSm='7' sizeMd='7' sizeLg='4' sizeXl='4'>
            <IonTitle size="large" className='ion-text-center'>Title</IonTitle>
              <form onSubmit={handleSubmit}>
            <IonItem>
                <IonLabel position="floating">Name</IonLabel>
                <IonInput
                  name="name"
                  value={formData.name}
                  onIonChange={() => handleChange}
                  type="text"
                />
              </IonItem>
              <IonItem>
                <IonLabel position="floating">Email</IonLabel>
                <IonInput
                  name="email"
                  value={formData.email}
                  onIonChange={() => handleChange}
                  type="email"
                />
              </IonItem>
              <IonItem>
                <IonLabel position="floating">Password</IonLabel>
                <IonInput
                  name="password"
                  value={formData.password}
                  onIonChange={() => handleChange}
                  type="password"
                />
              </IonItem>
              <IonButton expand="block"  shape='round' type="submit" >
                Sign Up
              </IonButton>
              </form>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default SignupForm;