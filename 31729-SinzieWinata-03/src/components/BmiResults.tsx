import {
  IonRow,
  IonCol,
  IonButton,
  IonIcon,
  IonCard,
  IonCardContent,
} from "@ionic/react";
import { calculatorOutline, refreshOutline } from "ionicons/icons";
import React from "react";

const BmiResults: React.FC<{
  onCalculatedBMI: number;
  onCategoryResultBMI: string | undefined;
}> = (props) => {
  return (
    <IonCard>
      <IonCardContent className="ion-text-center">
        <h2>{props.onCalculatedBMI}</h2>
        <h1>{props.onCategoryResultBMI}</h1>
      </IonCardContent>
    </IonCard>
  );
};

export default BmiResults;
