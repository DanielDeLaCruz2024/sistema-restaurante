// firebase.js
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyCkFysYwSbVop3dJ6qa0BQrufjgiagL4Ig",
  authDomain: "gestion-de-restaurante-9bfc7.firebaseapp.com",
  databaseURL:
    "https://gestion-de-restaurante-9bfc7-default-rtdb.firebaseio.com",
  projectId: "gestion-de-restaurante-9bfc7",
  storageBucket: "gestion-de-restaurante-9bfc7.firebasestorage.app",
  messagingSenderId: "396015284794",
  appId: "1:396015284794:web:9c228af0222a388c34fb03",
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export { database };

