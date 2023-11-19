import React from 'react';
import Lottie from 'lottie-react';
import { IonButton, IonCol, IonContent, IonGrid, IonRow, IonTitle } from '@ionic/react'
import i1 from '../../assets/animations/intro2-animation.json';
import './IndexIntro.css';
import { useHistory } from 'react-router';

const Intro: React.FC = () => {
  const history = useHistory();
  return (
    <IonGrid>
      <IonContent className='centered-content'>
        <IonRow className='centered-content'>
          <IonCol size-xs="12" size-sm="10" size-md="6" size-lg="4">
            <IonTitle className='fancy-text'>GatherGood</IonTitle>
            <Lottie style={{ width: '100%', height: '300px' }} loop={true} animationData={i1} />
            <IonButton onClick={() => history.push("/login")} expand='full' shape='round' fill='outline' className="custom-button login-btn ion-margin-top ion-padding-vertical">Iniciar Sesión</IonButton>
            <IonButton onClick={() => history.push("/steps")} expand='full' shape='round' fill='outline' className="custom-button signup-btn ion-margin-top ion-padding-vertical">Registrarse</IonButton>
          </IonCol>
        </IonRow>
      </IonContent>

    </IonGrid>
  );
};

export default Intro;