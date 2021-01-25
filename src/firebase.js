import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
/* eslint-disable */
// firebase init - add your own config here
const firebaseConfig = {
  apiKey: "",
  authDomain: "",
  databaseURL: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: ""
};
firebase.initializeApp(firebaseConfig)

// utils
const db = firebase.firestore()
const auth = firebase.auth()
const fbAdmin = firebase.firestore.FieldValue.arrayUnion;

// collection references
const postsCollection = db.collection('posts')
const usersCollection = db.collection('users')

// export utils/refs
export {
  db,
  auth,
  postsCollection,
  usersCollection,
  fbAdmin
}
