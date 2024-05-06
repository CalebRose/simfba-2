import { useState, useEffect, useCallback, useMemo } from "react";
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  doc,
  setDoc,
  collection,
  doc as firestoreDoc,
  getDoc,
  updateDoc,
  onSnapshot,
} from "firebase/firestore";
import { firebaseConfig } from "../../firebase-config";
const firebaseApp = initializeApp(firebaseConfig);
const firestore = getFirestore(firebaseApp);

export const useFirestore = (collectionName, docName) => {
  const [data, setData] = useState({});
  const docRef = useMemo(
    () => firestoreDoc(firestore, collectionName, docName),
    [firestore, collectionName, docName]
  );
  useEffect(() => {
    // const docRef = firebase.firestore().collection(collection).doc(docName);
    const unsubscribe = onSnapshot(docRef, (doc) => {
      if (doc.exists) {
        setData(doc.data());
      } else {
        setData(null);
      }
    });

    return () => {
      unsubscribe();
    };
  }, [docRef, collectionName, docName]);

  const updateData = useCallback(
    async (newData) => {
      await updateDoc(docRef, newData);
    },
    [collectionName, docName]
  );

  return [data, updateData];
};
