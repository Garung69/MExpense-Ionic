import { IonBackButton, IonButton, IonButtons, IonContent, IonHeader, IonIcon, IonImg, IonInput, IonItem, IonLabel, IonList, IonPage, IonRouterLink, IonSelect, IonSelectOption, IonThumbnail, IonTitle, IonToolbar } from '@ionic/react';
import { useEffect, useState } from 'react';
import ExploreContainer from '../components/ExploreContainer';
import './Home.css';
import { Trip } from '../model/Trip';
import { insertTrip, getallTrip, getTrip, deleteTrip } from '../dbhandler';
import { useParams } from 'react-router';
import {trash} from 'ionicons/icons'

interface IdParam{
    id: string;
}

const Detail: React.FC = () => {
    const [name, setName] = useState('')
    const [description, setdescription] = useState('')
    const [destination, setdestination] = useState('')
    const [date, setdate] = useState<string>()
    const [risk, setrisk] = useState('')
    const {id} = useParams<IdParam>()

    const fetchDataDB = async () => {
        const trip = await getTrip(Number.parseInt(id)) as Trip
        setName(trip.name)
        setdescription(trip.description)
        setdestination(trip.destination)
        setdate(trip.date)
        setrisk(trip.risk)
    }
    useEffect(()=>{
        fetchDataDB()
    })

    function deleteTripById(id: number){
        deleteTrip(id);
        fetchDataDB();

    }

    return (
        
        <IonPage>
            <IonHeader>
                <IonToolbar color="warning">
                    <IonButtons slot="start">
                        <IonBackButton></IonBackButton>
                    </IonButtons>
                    <IonButton color="danger" slot="end" onClick={() => { deleteTripById(Number.parseInt(id)) }} routerLink={'/view'}>
                        <IonIcon slot="icon-only" icon={trash}></IonIcon>
                    </IonButton>
                    <IonTitle>Trip Detail</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>   
            <IonItem> 
                <IonLabel position="floating">Name</IonLabel>
                <IonInput value={name} ></IonInput>
            </IonItem> 
            <IonItem>
                <IonLabel position="floating">Description</IonLabel>
                <IonInput value={description} ></IonInput>
            </IonItem>
            <IonItem>
                <IonLabel position="floating">Destination</IonLabel>
                <IonInput value={destination} ></IonInput>
            </IonItem> 
            <IonItem>
                <IonLabel position="floating">Date Start</IonLabel>
                <IonInput value={date} ></IonInput>
            </IonItem> 
            <IonItem>
                <IonLabel position="floating">Risk assessment</IonLabel>
                <IonInput value={risk} ></IonInput>
            </IonItem> 
            </IonContent>
        </IonPage>
    );
};

export default Detail;
