import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
        apiKey: "AIzaSyCyAInNa-q-iJCwuJg6E2I5t9K6pTdYb68",
        authDomain: "crwn-db-84be6.firebaseapp.com",
        databaseURL: "https://crwn-db-84be6.firebaseio.com",
        projectId: "crwn-db-84be6",
        storageBucket: "crwn-db-84be6.appspot.com",
        messagingSenderId: "608358124358",
        appId: "1:608358124358:web:0bf31e6eb95ab44595f347"
      };

      firebase.initializeApp(config);

export const createUserProfileDocument = async (userAuth, additionalData) => {
if (!userAuth) return;

const userRef = firestore.doc(`users/${userAuth.uid}`);

const snapShot = await userRef.get();

if(!snapShot.exists) {
  const {displayName, email} = userAuth;
  const createdAt = new Date();

  try {
    await userRef.set({
      displayName,
      email,
      createdAt,
      ...additionalData
    })
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }
  return userRef;
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({prompt: 'select_account'});
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;