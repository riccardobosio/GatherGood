import { Redirect, Route } from 'react-router-dom';
import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  setupIonicReact
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { calendar, person, square } from 'ionicons/icons';
import Tab2 from './pages/Tab2';
import Tab3 from './pages/Tab3';
import Signup from './pages/signup/Signup';
import StepsContainer from './pages/intro/StepProgress';
import Intro from './pages/intro/Intro';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';
import Login from "./pages/Login";
import UserProvider from "./contexts/UserProvider";
import Profile from "./pages/Profile";
import EventDetails from "./pages/events/EventDetail";
import EventCreate from "./pages/events/EventCreate";
import EventsList from "./pages/events/EventsList";
import StepProgress from './pages/intro/StepProgress';
import Intro1 from './pages/intro/Intro';

setupIonicReact();

const App: React.FC = () => (
  <IonReactRouter>
    <UserProvider>
    <Route exact path="/signup">
        <Signup />
      </Route>
      <Route exact path="/login">
        <Login />
      </Route>
      <Route exact path="/steps">
        <StepProgress />
      </Route>
      <Route exact path="/">
        <Intro1 />
      </Route>
    </UserProvider>
  </IonReactRouter>
);

export default App;
