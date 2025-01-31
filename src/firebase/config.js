import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
import 'firebase/storage'

const firebaseConfig = {
    apiKey: "AIzaSyAcTtyDL7TzbGHsb_kjc9kHJCSXk_m4bM8",
    authDomain: "youthconnect-2025.firebaseapp.com",
    projectId: "youthconnect-2025",
    databaseURL: "https://youthconnect-2025-default-rtdb.europe-west1.firebasedatabase.app",
    storageBucket: "youthconnect-2025.appspot.com",
    messagingSenderId: "853669693698",
    appId: "1:853669693698:web:38ac3018567fbe004fda1b"
  };

  //init firebase
  firebase.initializeApp(firebaseConfig)

  //init services
  const projectFirestore = firebase.firestore()
  const projectAuth = firebase.auth()
  const projectStorage = firebase.storage()
  
  //timestamp
  const timestamp = firebase.firestore.FieldValue.serverTimestamp
  export { projectFirestore, projectAuth, projectStorage, timestamp }