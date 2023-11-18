import { Route } from 'react-router-dom';
import {
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  setupIonicReact
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { calendar, person} from 'ionicons/icons';
import Signup from './pages/signup/Signup';
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
import UserDetails from './pages/users/UserDetail';

setupIonicReact();

const App: React.FC = () => (
    <IonReactRouter>
      <UserProvider>
        <IonRouterOutlet>

          <Route exact path="/">
            <Intro />
          </Route>
          <Route exact path="/login">
            <Login />
          </Route>
          <Route exact path="/steps">
            <StepProgress />
          </Route>
          <Route exact path="/signup">
            <Signup />
          </Route>

          <IonTabs>
            <IonRouterOutlet>
              <Route exact path="/events">
                <EventsList />
              </Route>
              <Route exact path="/events/:id">
                <EventDetails />
              </Route>
              <Route exact path="/events/create">
                <EventCreate />
              </Route>
              <Route exact path="/profile">
                <Profile />
              </Route>
              <Route exact path="/users/:id">
                <UserDetails />
              </Route>
            </IonRouterOutlet>

            <IonTabBar slot="bottom">
              <IonTabButton tab="Events" href="/events">
                <IonIcon aria-hidden="true" icon={calendar} />
                <IonLabel>Eventos</IonLabel>
              </IonTabButton>
              <IonTabButton tab="Profile" href="/profile">
                <IonIcon aria-hidden="true" icon={person} />
                <IonLabel>Perfil</IonLabel>
              </IonTabButton>
            </IonTabBar>
          </IonTabs>
        </IonRouterOutlet>
      </UserProvider>
    </IonReactRouter>
);

export default App;