import { IonButton, IonContent, IonDatetime, IonHeader, IonImg, IonInput, IonItem, IonLabel, IonList, IonPage, IonPopover, IonRadio, IonRadioGroup, IonRouterLink, IonThumbnail, IonTitle, IonToolbar } from '@ionic/react';
import { Children, useEffect, useState } from 'react';
import { Trip } from '../model/Trip';
import './Home.css';
import { insertTrip, getallTrip } from '../dbhandler';

const Home: React.FC = () => {

  const [name, setname] = useState('')
  const setNameInput =(e: any) =>{
      setname(e.detail.value);
  }
  const [description, setdescription] = useState('')
  const setDescriptionInput =(e: any) =>{
    setdescription(e.detail.value);
}
  const [destination, setdestination] = useState('')
  const setDestinationInput =(e: any) =>{
    setdestination(e.detail.value);
}
  const [date, setdate] = useState<string>()
  const setdateinput = (e: any) => {
    const mydate = new Date(e.detail.value)
    setdate(mydate.toLocaleDateString('en-GB'));
  }
  const [allTrip, setAllTrip] = useState<Trip[]>([])
  
  const [risk, setrisk] = useState('')
  const setRiskInput = (e: any) => {
    setrisk(e);
  }

  const fetchDataDB = async () => {
    const data = await getallTrip()
    setAllTrip(data)
  }

  useEffect(() => {
    fetchDataDB()
  }, [])


  const saveHandler = async () => {
    var message = "Must input "
    var check = false;
    const newTrip : Trip = { 'name': name, 'description': description, 'destination': destination , "date": date, "risk": risk}
    if(newTrip.name == null || newTrip.name == ""){
      message = message + "- trip Name -"
      check = true;
    }
    if(newTrip.destination == null || newTrip.destination == ""){
      message = message + "- trip Destination -"
      check = true;
    }
    if(newTrip.date == null || newTrip.date == ""){
      message = message + "- trip Date -"
      check = true;
    }
    if(check == true){
      alert(message)
    }else{
      await insertTrip(newTrip)
      fetchDataDB();
    } 
  }
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonTitle>Input Trip Data</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen  >

        <IonItem>
          <IonLabel position="floating">Trip Name</IonLabel>
          <IonInput onIonChange={e => setNameInput(e)}></IonInput>
        </IonItem>

        <IonItem>
          <IonLabel position="floating">Trip Description</IonLabel>
          <IonInput onIonChange={e => setDescriptionInput(e)}></IonInput>
        </IonItem>

        <IonItem>
          <IonLabel position="floating">Trip Destination</IonLabel>
          <IonInput onIonChange={e => setDestinationInput(e)}></IonInput>
        </IonItem>

        <IonItem>
          <IonLabel position="floating">Date Start</IonLabel>
          <IonInput id='mydatepicker' value={date}></IonInput>
          <IonPopover keepContentsMounted={true} trigger="mydatepicker" triggerAction="click">
            <IonContent>
              <IonDatetime onIonChange={e => setdateinput(e)}></IonDatetime>
            </IonContent>
          </IonPopover>
        </IonItem>
        <IonItem>
            <IonLabel position="floating">Risk assessment</IonLabel>
            <IonInput id='riskPicker' value={risk} ></IonInput>
        <IonPopover keepContentsMounted={true} trigger="riskPicker" triggerAction="click">
            <IonContent>
            <IonList>
            <IonRadioGroup value={risk} onIonChange={e => setrisk(e.detail.value)}>          
              <IonItem>
                <IonLabel>Yes</IonLabel>
                <IonRadio slot="end" value={"yes"} ></IonRadio>
              </IonItem>

              <IonItem>
                <IonLabel>No</IonLabel>
                <IonRadio slot="end" value={"no"} ></IonRadio>
              </IonItem>
            </IonRadioGroup>
          </IonList>
            </IonContent>
          </IonPopover>
        </IonItem>
      
        <IonButton onClick={saveHandler} expand='block' class='ion-margin' color='primary'>Save</IonButton>


      </IonContent>
    </IonPage>
  );
};

export default Home;
