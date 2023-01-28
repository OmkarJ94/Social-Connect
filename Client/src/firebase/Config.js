import firebase from "firebase/compat/app"
import "firebase/compat/storage"

const firebaseConfig = {
    apiKey: "AIzaSyCdi0-0ZNbJViPmhxJ66alUxZVjTvhsFrM",
    authDomain: "chatapp-f32cb.firebaseapp.com",
    projectId: "chatapp-f32cb",
    storageBucket: "chatapp-f32cb.appspot.com",
    messagingSenderId: "638949864398",
    appId: "1:638949864398:web:7e701623e482a1b8b7319f",
    measurementId: "G-1JKEDWCHV7"
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig)
}

export { firebase }