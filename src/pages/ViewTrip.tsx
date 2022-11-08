import { IonButton, IonContent, IonHeader, IonIcon, IonItem, IonLabel, IonList, IonListHeader, IonPage, IonRouterLink, IonTitle, IonToolbar } from '@ionic/react';
import { useEffect, useState } from 'react';
import ExploreContainer from '../components/ExploreContainer';
import { deleteAllTripdb, deleteTrip, getallTrip } from '../dbhandler';
import { Trip } from '../model/Trip';
import { trash } from 'ionicons/icons'
import './Home.css';

const ViewTrip: React.FC = () => {
    const [allTrip, setAllTrip] = useState<Trip[]>([])
    const fetchDataDB = async () => {
        const data = await getallTrip()
        setAllTrip(data)
    }

    useEffect(() => {
        fetchDataDB()
    }, [])


    function deleteTripById(id: number){
        deleteTrip(id);
        fetchDataDB();
    }
    function deleteAllTrip(){
        deleteAllTripdb();
        fetchDataDB();
    }
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar color="primary">
                    <IonButton color="danger" slot="end" onClick={() => { deleteAllTrip() }}>
                        <IonIcon slot="icon-only" icon={trash}></IonIcon>
                        Delete all trips
                    </IonButton>
                    <IonTitle>View Trip Data</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen  >
                <IonList>
                    <IonItem>
                        <IonTitle>Trip Name</IonTitle>
                        <IonTitle>Trip Destination</IonTitle>
                        <IonTitle>Trip Date</IonTitle>
                        <IonTitle>Trip Action</IonTitle>
                    </IonItem>
                    {allTrip.map((trip) =>

                        <IonItem key={trip.id}>
                            <IonLabel>{trip.name}</IonLabel>
                            <IonLabel>{trip.destination}</IonLabel>
                            <IonLabel>{trip.date}</IonLabel>
                            <IonLabel>Risk</IonLabel>
                            <IonLabel>
                                <IonRouterLink routerLink={'/TripDetail/' + trip.id}>
                                    <IonButton color="primary">View Detail</IonButton>
                                </IonRouterLink>
                                <IonButton color="danger" onClick={() => { deleteTripById(trip.id!) }}>Delete this Trip</IonButton>
                            </IonLabel>
                        </IonItem>

                    )}
                </IonList>
            </IonContent>
        </IonPage>
    );
};

export default ViewTrip;
