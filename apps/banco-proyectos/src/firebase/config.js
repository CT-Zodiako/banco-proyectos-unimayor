import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Configuración de Firebase
const firebaseConfig = {
    apiKey: "AIzaSyCsUppLWOwrWdwKrPfVWVWURTdCX7evi74",
    authDomain: "reserva-de-laboratorio-26ae0.firebaseapp.com",
    databaseURL: "https://reserva-de-laboratorio-26ae0-default-rtdb.firebaseio.com",
    projectId: "reserva-de-laboratorio-26ae0",
    storageBucket: "reserva-de-laboratorio-26ae0.firebasestorage.app",
    messagingSenderId: "656639688452",
    appId: "1:656639688452:web:a1bfb28f6a03d78f5e5a51"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
