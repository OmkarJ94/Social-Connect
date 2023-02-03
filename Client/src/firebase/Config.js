import firebase from "firebase/compat/app"
import "firebase/compat/storage"
import { apiKey, authDomain, projectId, storageBucket, messagingSenderId, appId, measurementId } from "@env"

const firebaseConfig = {
    apiKey,
    authDomain,
    projectId,
    storageBucket,
    messagingSenderId,
    appId,
    measurementId
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig)
}

export { firebase }