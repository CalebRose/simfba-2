import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import {
  getFirestore,
  doc as firestoreDoc,
  onSnapshot,
} from "firebase/firestore";
import { firebaseConfig } from "../firebase-config";

const firebaseApp = initializeApp(firebaseConfig);
const fireStore = getFirestore(firebaseApp);

export const AuthService = {};

AuthService.register = (username, email, password) => {
  const fauth = getAuth();

  return new Promise((resolve, reject) => {
    createUserWithEmailAndPassword(fauth, email, password)
      .then((userCredential) => {
        updateProfile(fauth.currentUser, {
          displayName: username,
        })
          .then(() => {
            resolve({ status: true, message: "Register successfully." });
          })
          .catch((error) => {
            resolve({ status: false, message: "error.message" });
          });
      })
      .catch((error) => {
        let message = "Something Went Wrong.";
        if (error && error.code && error.code == "auth/email-already-in-use") {
          message = "Email already used.";
        }
        resolve({ status: false, message: message });
      });
  });
};

AuthService.user = false;
AuthService.getProfile = (hard = false) => {
  return new Promise(async (res, rej) => {
    const fauth = getAuth();

    fauth.onAuthStateChanged((user) => {
      if (user) {
        const userRef = firestoreDoc(fireStore, `users`, user.uid);
        onSnapshot(userRef, (doc) => {
          if (doc.exists) {
            res({ data: doc.data(), user });
          } else {
            res(false);
          }
        });
      } else {
        res(false);
      }
    });
  });
};

AuthService.logout = async () => {
  return new Promise((resolve) => {
    const fauth = getAuth();
    fauth
      .signOut()
      .then(() => {
        resolve({ status: true, message: "Logged out successfully." });
      })
      .catch((err) => {
        resolve({ status: true, message: "Logged out successfully." });
      });
  });
};

AuthService.login = (email, password) => {
  const fauth = getAuth();
  return new Promise((resolve, reject) => {
    signInWithEmailAndPassword(fauth, email, password)
      .then((user) => {
        if (user) {
          resolve({ status: true, message: "Login successfully." });
        } else {
          resolve({ status: false, message: "Incorrect Email or Password." });
        }
      })
      .catch((err) => {
        resolve({ status: false, message: "Incorrect Email or Password." });
      });
  });
};
