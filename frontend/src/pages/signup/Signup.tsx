import React, { useState } from 'react';
import { IonContent, IonPage, IonInput, IonButton, IonItem, IonLabel, IonIcon, IonGrid, IonRow, IonCol, IonNav, IonTitle } from '@ionic/react';
import { personOutline } from 'ionicons/icons';
import { useHistory } from 'react-router-dom';
import l from '../../assets/animations/introstrep4.json';
import Lottie from 'lottie-react';

interface FormData {
  name: string;
  email: string;
  password: string;
}

const SignupForm: React.FC = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
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
    <IonGrid>
      <IonContent className='centered-content'>
        <IonRow className='centered-content'>
          <IonCol size-xs="12" size-sm="10" size-md="6" size-lg="4">
            <Lottie style={{ width: '100%', height: '300px'}} loop={true} animationData={l} />
            <h2>¡Únete y siéntete mejor!</h2>
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
              <IonButton className='custom-button login-btn-1 ion-margin-top ion-padding-vertical' shape='round' type="submit" >
                Unirse
              </IonButton>
            </form>
          </IonCol>
        </IonRow>
      </IonContent>
    </IonGrid>
  );
};

export default SignupForm;