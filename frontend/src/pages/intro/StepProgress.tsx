import React, { useState } from 'react';
import { IonApp, IonButton, IonCol, IonContent, IonFooter, IonGrid, IonHeader, IonPage, IonRow, IonTitle, IonToolbar } from '@ionic/react';
import is1 from '../../assets/animations/introstep.json';
import is3 from '../../assets/animations/introstep2.json';
import is4 from '../../assets/animations/introstrep6.json';
import is2 from '../../assets/animations/introstrep5.json';
import './IndexIntro.css'
import Lottie from 'lottie-react';

const StepProgress: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const totalSteps = 3;

  const renderDots = () => {
    let dots = [];
    for (let i = 0; i <= totalSteps; i++) {
      let dotColor;
      if (i === currentStep) {
        dotColor = 'grey'; // Color for the current step
      } else if (i < currentStep) {
        dotColor = 'rgb(174,108,194	)'; // Fixed RGB color for completed steps
      } else {
        dotColor = 'black'; // Color for steps not yet reached
      }
      const dotStyle = {
        color: dotColor,
        marginRight: '5px',
        fontSize: '50px',
      };

      dots.push(
        <span className='step-dot' key={i} style={dotStyle}>
          ●
        </span>
      );
    }
    return dots;
  };

  const stepController = {
    nextStep: () => {
      if (currentStep < totalSteps) {
        setCurrentStep(currentStep + 1);
      }
    },
    previousStep: () => {
      if (currentStep > 1) {
        setCurrentStep(currentStep - 1);
      }
    }
  };


  return (
    <IonApp>
      <IonContent className="ion-padding ion-text-center">
        <IonGrid className="ion-justify-content-center ion-align-items-center">
          <IonRow className="ion-align-items-center">
            <IonCol size-xs="12" size-sm="8" size-md="6" size-lg="4">
              <div style={{ width: '100%', height: 'auto' }}>
                {renderDots()}
              </div>
              <div>
                {elementsArray[currentStep]}
              </div>
              <IonButton onClick={stepController.nextStep} expand='full' shape='round' fill='outline' className="custom-button signup-btn ion-margin-top ion-padding-vertical">Segueix!</IonButton>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonApp>
  );
};

const Step1: React.FC = () => {
  return (
    <>
      <Lottie loop autoPlay style={{ width: '100%', height: '300px' }} animationData={is1} />
      <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Blanditiis voluptate saepe ex aut fugit aspernatur cumque tenetur eligendi minima consequuntur atque modi asperiores omnis quidem libero eos, aliquam unde. Esse?</p>
    </>
  );
};

const Step2: React.FC = () => {
  return (
    <>
      <Lottie loop autoPlay style={{ width: '100%', height: '300px' }} animationData={is2} />
      <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Blanditiis voluptate saepe ex aut fugit aspernatur cumque tenetur eligendi minima consequuntur atque modi asperiores omnis quidem libero eos, aliquam unde. Esse?</p>
    </>
  );
};

const Step3: React.FC = () => {
  return (
    <>
      <Lottie loop autoPlay style={{ width: '100%', height: '300px' }} animationData={is3} />
      <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Blanditiis voluptate saepe ex aut fugit aspernatur cumque tenetur eligendi minima consequuntur atque modi asperiores omnis quidem libero eos, aliquam unde. Esse?</p>
    </>
  );
};

const Step4: React.FC = () => {
  return (
    <>
      <Lottie loop autoPlay style={{ width: '100%', height: '300px' }} animationData={is4} />
      <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Blanditiis voluptate saepe ex aut fugit aspernatur cumque tenetur eligendi minima consequuntur atque modi asperiores omnis quidem libero eos, aliquam unde. Esse?</p>
    </>
  );;
}

const elementsArray: React.ReactElement[] = [
  <Step1 />,
  <Step2 />,
  <Step3/>,
  <Step4/>,
];

export default StepProgress;

