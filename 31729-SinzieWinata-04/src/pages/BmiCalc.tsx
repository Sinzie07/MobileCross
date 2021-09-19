import {
  IonAlert,
  IonBackButton,
  IonButtons,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonInput,
  IonItem,
  IonLabel,
  IonPage,
  IonRow,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { useRef, useState } from "react";
import BMIControls from "../components/BMIControls";
import BMIResults from "../components/BMIResults";
import InputControls from "../components/InputControls";
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
//   import "../theme/variables.css";

const BmiCalc: React.FC = () => {
  const [calculatedBMI, setCalculatedBMI] = useState<number>();
  const [BMIType, setBMIType] = useState<string>();
  const [error, setError] = useState<string>();
  const [calcUnits, setCalcUnits] = useState<"cmkg" | "ftlbs">("cmkg");

  const heightInputRef = useRef<HTMLIonInputElement>(null);
  const weightInputRef = useRef<HTMLIonInputElement>(null);

  const calculateBMI = () => {
    const enteredHeight = heightInputRef.current!.value;
    const enteredWeight = weightInputRef.current!.value;
    let typeOfBMI: string = "";

    if (
      !enteredHeight ||
      !enteredWeight ||
      +enteredHeight <= 0 ||
      +enteredWeight <= 0
    ) {
      setError("Please enter a valid number (Non-Negative)");
      return;
    }

    const feet = calcUnits === "ftlbs" ? 0.0328 : 1;
    const lbs = calcUnits === "ftlbs" ? 2.2 : 1;

    const realWeight = +enteredWeight / lbs;
    const realHeight = +enteredHeight / feet;

    console.log(realWeight);
    console.log(realHeight);

    const bmi = realWeight / ((realHeight / 100) * (realHeight / 100));

    if (bmi < 18.5) {
      typeOfBMI = "Kurus";
    } else if (bmi >= 18.5 && bmi <= 24.9) {
      typeOfBMI = "Normal";
    } else if (bmi >= 25 && bmi <= 29.9) {
      typeOfBMI = "Gemuk";
    } else if (bmi >= 30) {
      typeOfBMI = "Obesitas";
    }
    setCalculatedBMI(bmi);
    setBMIType(typeOfBMI);
    console.log(bmi);
  };

  const resetInputs = () => {
    heightInputRef.current!.value = "";
    weightInputRef.current!.value = "";
  };

  const selectedCalsUnitHandler = (selectedValue: "cmkg" | "ftlbs") => {
    setCalcUnits(selectedValue);
  };

  return (
    <>
      <IonAlert
        isOpen={!!error}
        message={error}
        buttons={[
          {
            text: "Okay",
            handler: setError,
          },
        ]}
      />
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonBackButton defaultHref="/home" />
            </IonButtons>
            <IonTitle>BMI Calculator</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding">
          <IonGrid>
            <IonRow>
              <IonCol>
                <InputControls
                  selectedValue={calcUnits}
                  onSelectedValue={selectedCalsUnitHandler}
                />
              </IonCol>
            </IonRow>
            <IonRow>
              <IonCol>
                <IonItem>
                  <IonLabel position="floating">
                    Tinggi Badan ({calcUnits === "cmkg" ? "cm" : "ft"})
                  </IonLabel>
                  <IonInput ref={heightInputRef}></IonInput>
                </IonItem>
              </IonCol>
            </IonRow>
            <IonRow>
              <IonCol>
                <IonItem>
                  <IonLabel position="floating">
                    Berat Badan ({calcUnits === "cmkg" ? "kg" : "lbs"})
                  </IonLabel>
                  <IonInput ref={weightInputRef}></IonInput>
                </IonItem>
              </IonCol>
            </IonRow>
            <BMIControls onCalculate={calculateBMI} onReset={resetInputs} />
            {calculatedBMI && BMIType && (
              <BMIResults calculateResult={calculatedBMI} bmiType={BMIType} />
            )}
          </IonGrid>
        </IonContent>
      </IonPage>
    </>
  );
};

export default BmiCalc;
