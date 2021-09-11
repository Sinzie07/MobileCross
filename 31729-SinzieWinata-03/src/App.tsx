import { Redirect, Route } from "react-router-dom";
import {
  IonApp,
  IonButton,
  IonCard,
  IonCardContent,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonIcon,
  IonInput,
  IonItem,
  IonLabel,
  IonRouterOutlet,
  IonRow,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { calculatorOutline, refreshOutline } from "ionicons/icons";
import { IonReactRouter } from "@ionic/react-router";
import Home from "./pages/Home";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/* Theme variables */
import "./theme/variables.css";

/* User Ref */
import { useRef, useState } from "react";

const App: React.FC = () => {
  const [calculatedBMI, setCalculateBMI] = useState<number>();
  const [categoryResultBMI, setcategoryResultBMI] = useState<string>();

  const heightInputRef = useRef<HTMLIonInputElement>(null);
  const weightInputRef = useRef<HTMLIonInputElement>(null);

  const calculateBMI = () => {
    const enteredHeight = heightInputRef.current!.value;
    const enteredWeight = weightInputRef.current!.value;

    if (!enteredHeight || !enteredWeight) return;

    const bmi =
      +enteredWeight / ((+enteredHeight / 100) * (+enteredHeight / 100));

    if (bmi < 18.5) {
      setcategoryResultBMI("Kurus");
    } else if (bmi >= 18.5 && bmi <= 24.9) {
      setcategoryResultBMI("Normal");
    } else if (bmi >= 25 && bmi <= 29.9) {
      setcategoryResultBMI("Gemuk");
    } else if (bmi >= 30) {
      setcategoryResultBMI("Obesitas");
    } else {
      setcategoryResultBMI("Undifined");
    }

    console.log(bmi);

    setCalculateBMI(Math.round(bmi * 100) / 100);
  };

  const resetInputs = () => {
    heightInputRef.current!.value = " ";
    weightInputRef.current!.value = " ";
  };

  return (
    <IonApp>
      <IonHeader>
        <IonToolbar>
          <IonTitle>BMI Calculator</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent class="ion-padding">
        <IonGrid>
          <IonRow>
            <IonCol>
              <IonItem>
                <IonLabel position="floating">Tinggi Badan (cm)</IonLabel>
                <IonInput ref={heightInputRef}></IonInput>
              </IonItem>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
              <IonItem>
                <IonLabel position="floating">Berat Badan (kg)</IonLabel>
                <IonInput ref={weightInputRef}></IonInput>
              </IonItem>
            </IonCol>
          </IonRow>
        </IonGrid>
        <IonGrid class="ion-text-center ion-margin">
          <IonRow>
            <IonCol className="ion-text-left">
              <IonButton onClick={calculateBMI}>
                <IonIcon slot="start" icon={calculatorOutline}></IonIcon>
                Calculate
              </IonButton>
            </IonCol>
            <IonCol className="ion-text-right">
              <IonButton onClick={resetInputs}>
                <IonIcon slot="start" icon={refreshOutline}></IonIcon>
                Reset
              </IonButton>
            </IonCol>
          </IonRow>
        </IonGrid>
        {calculatedBMI && (
          <IonCard>
            <IonCardContent className="ion-text-center">
              <h2>{calculatedBMI}</h2>
              <h1>{categoryResultBMI}</h1>
            </IonCardContent>
          </IonCard>
        )}
      </IonContent>
    </IonApp>
  );
};

export default App;
