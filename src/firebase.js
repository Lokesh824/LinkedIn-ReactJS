import firebase from "firebase";
const firebaseConfig = {
  apiKey: "AIzaSyBUQHStx0yCa511R6DSw_4K8Fx6lIqrwuo",
  authDomain: "linkedin-clone-ca635.firebaseapp.com",
  projectId: "linkedin-clone-ca635",
  storageBucket: "linkedin-clone-ca635.appspot.com",
  messagingSenderId: "743969387130",
  appId: "1:743969387130:web:725248c57f3418937f81c3",
  measurementId: "G-Y3XDS0XN8R",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();

export { db, auth };
