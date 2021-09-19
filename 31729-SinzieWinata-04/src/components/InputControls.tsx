import { IonLabel, IonSegment, IonSegmentButton } from "@ionic/react";

const InputControls: React.FC<{
  selectedValue: "cmkg" | "ftlbs";
  onSelectedValue: (value: "cmkg" | "ftlbs") => void;
}> = (props) => {
  const InputChangeHandler = (event: CustomEvent) => {
    props.onSelectedValue(event.detail.value);
  };

  return (
    <IonSegment value={props.selectedValue} onIonChange={InputChangeHandler}>
      <IonSegmentButton value="cmkg">
        <IonLabel>cm / kg</IonLabel>
      </IonSegmentButton>
      <IonSegmentButton value="ftlbs">
        <IonLabel>ft / lbs</IonLabel>
      </IonSegmentButton>
    </IonSegment>
  );
};

export default InputControls;
