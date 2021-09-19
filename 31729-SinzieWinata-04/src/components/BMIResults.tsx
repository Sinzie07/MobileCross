import { IonRow, IonCol, IonCard, IonCardContent } from "@ionic/react";

const BMIResults: React.FC<{ calculateResult: number; bmiType: string }> = (
  props
) => {
  return (
    <IonRow>
      <IonCol>
        <IonCard>
          <IonCardContent className="ion-text-center">
            <h4>{props.calculateResult}</h4>
            <h4>{props.bmiType}</h4>
          </IonCardContent>
        </IonCard>
      </IonCol>
    </IonRow>
  );
};

export default BMIResults;
