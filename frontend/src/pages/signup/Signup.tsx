import React, { useState } from 'react';
import { IonContent, IonInput, IonButton, IonItem, IonLabel, IonGrid, IonRow, IonCol } from '@ionic/react';
import { useHistory } from 'react-router-dom';
import l from '../../assets/animations/introstrep4.json';
import Lottie from 'lottie-react';
import { UserCreate } from "../../api/types";
import userService from "../../api/services/user";
import { Capacitor, CapacitorHttp, HttpResponse } from '@capacitor/core';

const SignupForm: React.FC = () => {
  const [formData, setFormData] = useState(
    { first_name: '', last_name: '', email: '', password: '' }
  );
  const history = useHistory();

  const handleChange = (event: CustomEvent) => {
    const target = event.target as HTMLInputElement;  // Typecasting the target
    const name = target.name;
    const value = target.value;
    setFormData(prevForm => ({ ...prevForm, [name]: value }));
};


  const doPost = async () => {

    const user: UserCreate = { ...formData, password_confirm: formData.password }

    const response: HttpResponse = await CapacitorHttp.post({
      url: `http://localhost:8000/api/auth/registration/`,
      headers: { 'Content-Type': 'application/json' },
      data: user
    }).then(res => { return res }).catch(err => { return err });

    console.log(formData)

    if (response.status === 200) {
      history.push("/login");
    }
  }

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    console.log('Form Data:', formData);

    const user: UserCreate = { ...formData, password_confirm: formData.password }

    userService.create(user)
      .then(() => history.push('/login')).catch(err => {return err})
    doPost();
  };

  return (
    <IonGrid>
      <IonContent className='centered-content'>
        <IonRow className='centered-content'>
          <IonCol size-xs="12" size-sm="10" size-md="6" size-lg="4">
            <Lottie style={{ width: '100%', height: '300px' }} loop={true} animationData={l} />
            <h2>¡Únete y siéntete mejor!</h2>
            <form onSubmit={handleSubmit}>
              <IonItem>
                <IonLabel position="floating">Nombre</IonLabel>
                <IonInput
                  name="first_name"
                  value={formData.first_name}
                  onIonChange={handleChange}
                  type="text"
                />
              </IonItem>
              <IonItem>
                <IonLabel position="floating">Apellido</IonLabel>
                <IonInput
                  name="last_name"
                  value={formData.last_name}
                  onIonChange={handleChange}
                  type="text"
                />
              </IonItem>
              <IonItem>
                <IonLabel position="floating">Correo</IonLabel>
                <IonInput
                  name="email"
                  value={formData.email}
                  onIonChange={handleChange}
                  type="email"
                />
              </IonItem>
              <IonItem>
                <IonLabel position="floating">Contraseña</IonLabel>
                <IonInput
                  name="password"
                  value={formData.password}
                  onIonChange={handleChange}
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