
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"
import {getFirestore} from "firebase/firestore"
import {getStorage} from "firebase/storage"

const firebaseConfig = {
  apiKey: "AIzaSyAjJ7MOtsB-S2MVX3uMuWPsNJji5xwCPg4",
  authDomain: "richardcommerce.firebaseapp.com",
  projectId: "richardcommerce",
  storageBucket: "richardcommerce.appspot.com",
  messagingSenderId: "804296716536",
  appId: "1:804296716536:web:03af4c7fdf57c916998b0d"
};


const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const db = getFirestore(app)
export const storage = getStorage(app)

export default app