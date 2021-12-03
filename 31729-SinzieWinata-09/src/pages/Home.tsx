import {
  IonButton,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import "./Home.css";
import { Geolocation } from "@capacitor/geolocation";
import { LoadScript, GoogleMap, Marker } from "@react-google-maps/api";
import { useState } from "react";

const Home: React.FC = () => {
  const [lat, setLat] = useState(0);
  const [lng, setLng] = useState(0);

  const selectPos = (e: google.maps.MapMouseEvent) => {
    if (e.latLng?.lat()) {
      setLat(e.latLng?.lat());
    }
    if (e.latLng?.lng()) {
      setLng(e.latLng?.lng());
    }
  };

  const containerStyle = {
    width: "100%",
    height: "100%",
  };

  const API_KEY = "AIzaSyB75Z6jr6XxUGo9NBl_7GyyyiSglD_LTs0";

  const getCurrentPosition = async () => {
    const coordinates = await Geolocation.getCurrentPosition({
      enableHighAccuracy: true,
    });

    console.log("Current Position : ", coordinates);
    console.log("Lat : ", coordinates.coords.latitude);
    console.log("Lng : ", coordinates.coords.longitude);

    setLat(coordinates.coords.latitude);
    setLng(coordinates.coords.longitude);
  };

  const trackPosition = async () => {
    const data = await Geolocation.watchPosition(
      {
        enableHighAccuracy: true,
        timeout: 1000,
      },
      (position, err) => {
        if (position) {
          console.log(position);
        }
      }
    );
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Geolocation</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonButton onClick={getCurrentPosition}>Current Position</IonButton>
        <IonButton onClick={trackPosition}>Track Position</IonButton>
        <LoadScript googleMapsApiKey="AIzaSyB75Z6jr6XxUGo9NBl_7GyyyiSglD_LTs0">
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={{ lat: lat, lng: lng }}
            zoom={16}
          >
            <Marker position={{ lat: lat, lng: lng }} />
          </GoogleMap>
        </LoadScript>
      </IonContent>
    </IonPage>
  );
};

export default Home;
