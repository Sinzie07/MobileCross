import {
  IonAvatar,
  IonButton,
  IonContent,
  IonHeader,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import "./Home.css";
import { collection, addDoc } from "firebase/firestore";
import { getDocs, getFirestore } from "@firebase/firestore";
import React, { useEffect, useRef, useState } from "react";
import { app } from "../firebase/firebaseConfig";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

const Home: React.FC = () => {
  const db = getFirestore(app);

  const [selectedFile, setSelectedFile] = useState<File>();
  const [filename, setFilename] = useState("");
  const [students, setStudents] = useState<Array<any>>([]);

  const nim = useRef<HTMLIonInputElement>(null);
  const prodi = useRef<HTMLIonInputElement>(null);
  const nama = useRef<HTMLIonInputElement>(null);

  const storage = getStorage();

  useEffect(() => {
    const getData = async () => {
      const querySnapshot = await getDocs(collection(db, "students"));
      console.log("querySnapshot : ", querySnapshot);
      setStudents(
        querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
      );

      querySnapshot.forEach((doc) => {
        console.log(`${doc.id} => ${doc.data()}`);
        console.log("doc: ", doc);
      });
    };

    getData();
  }, []);

  const fileChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedFile(event.target.files![0]);
    setFilename(event.target!.files![0].name);
  };

  const addData = async (url: string) => {
    try {
      const docRef = await addDoc(collection(db, "users"), {
        nim: nim.current?.value,
        nama: nama.current?.value,
        prodi: prodi.current?.value,
        foto: filename,
        fotoUrl: url,
      });
      console.log("Document ID : ", docRef.id);
    } catch (error) {
      console.log(error);
    }
  };

  const insertHandler = async () => {
    const storageRef = ref(storage, filename);
    uploadBytes(storageRef, selectedFile as Blob).then(() => {
      console.log("Upload file success");
      getDownloadURL(ref(storage, filename)).then((url) => {
        addData(url);
      });
    });
  };
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Week 11</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonList>
          {students.map((student) => (
            <IonItem key={student.id}>
              <IonAvatar slot="start">
                <img src={student.fotoUrl} />
              </IonAvatar>
              <IonLabel>
                {student.nim}
                <br />
                {student.nama}
                <br />
                {student.prodi}
              </IonLabel>
            </IonItem>
          ))}
        </IonList>
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
