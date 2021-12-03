import {
  IonButton,
  IonContent,
  IonHeader,
  IonInput,
  IonItem,
  IonLabel,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { useEffect, useRef, useState } from "react";
import "./Home.css";
import axios, { AxiosResponse } from "axios";

type Student = {
  nim: string;
  nama: string;
  prodi: string;
  foto: string;
};

const Home: React.FC = () => {
  const [data, setData] = useState<AxiosResponse>();
  const [students, setStudents] = useState<Array<Student>>([]);
  const nim = useRef<HTMLIonInputElement>(null);
  const nama = useRef<HTMLIonInputElement>(null);
  const prodi = useRef<HTMLIonInputElement>(null);
  const [selectedFile, setSelectedFile] = useState<File>();

  const url = "http://localhost/umn_api/insert_new_student.php";

  // useEffect(() => {
  //   axios.get(url).then((response) => {
  //     setData(response);
  //     console.log(data);
  //   });
  // }, []);

  // useEffect(() => {
  //   setStudents(data?.data.students);
  // }, [data]);

  const fileChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedFile(event.target!.files![0]);
  };

  const insertHandler = () => {
    const formData = new FormData();

    const inNim = nim.current?.value as string;
    const inNama = nama.current?.value as string;
    const inProdi = prodi.current?.value as string;

    formData.append("nim", inNim);
    formData.append("nama", inNama);
    formData.append("prodi", inProdi);
    formData.append("foto", selectedFile as File);

    axios.post(url, formData).then((res) => {
      console.log(res);
    });
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Week 10 Tutorial</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonItem>
          <IonLabel position="floating">NIM</IonLabel>
          <IonInput ref={nim}></IonInput>
        </IonItem>
        <IonItem>
          <IonLabel position="floating">Nama</IonLabel>
          <IonInput ref={nama}></IonInput>
        </IonItem>
        <IonItem>
          <IonLabel position="floating">Prodi</IonLabel>
          <IonInput ref={prodi}></IonInput>
        </IonItem>
        <IonItem>
          <input type="file" onChange={fileChangeHandler} />
        </IonItem>
        <IonButton onClick={insertHandler}>Simpan</IonButton>
      </IonContent>
    </IonPage>
  );
};

export default Home;
