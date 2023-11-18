// EventDetails.tsx

import React, {useEffect, useState} from 'react';
import {
    IonPage,
    IonHeader,
    IonToolbar,
    IonButtons,
    IonBackButton,
    IonTitle,
    IonContent,
    IonList, IonCard, IonCardContent, IonIcon, IonLabel
} from '@ionic/react';

import {useParams} from "react-router";
import {User, Review} from "../../api/types"
import userService from "../../api/services/user";
import {star} from "ionicons/icons";
import {formatDate} from "../../utils/date";

const UserDetails: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [user, setUser] = useState<User>();

    useEffect(() => {
        userService.get(id).then(user => {
            setUser(user)
        })
    }, [id])

    return <>
        {user && (
            <IonPage>
                <IonHeader>
                    <IonToolbar>
                        <IonButtons slot="start">
                            <IonBackButton defaultHref="/events" />
                        </IonButtons>
                        <IonTitle>{user.last_name} {user.first_name}'s reviews</IonTitle>
                    </IonToolbar>
                </IonHeader>
                <IonContent className="ion-text-center ion-padding">
                    {user.reviews.length === 0 &&
                        <IonLabel>
                            <p>{user.first_name} does not have any reviews yet</p>
                        </IonLabel>
                    }
                    <IonList>
                        {user.reviews.map((review: Review) => (
                            <IonCard key={review.id}>
                                <IonCardContent>
                                    {[...Array(review.rate)].map((_, index) => (
                                        <IonIcon key={index} icon={star} color="warning" />
                                    ))}
                                    <p><strong>{review.description}</strong></p>
                                    <p>Created at: {formatDate(review.created_at, false)}</p>
                                </IonCardContent>
                            </IonCard>
                        ))}
                    </IonList>
                </IonContent>
            </IonPage>
        )}
    </>
};

export default UserDetails;
