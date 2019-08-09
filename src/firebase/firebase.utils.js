import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';


const config= {
    apiKey: "AIzaSyC4iqg1pjlZia_KnBJcYh6c6wJKaLMfefc",
    authDomain: "crwn-db-b2353.firebaseapp.com",
    databaseURL: "https://crwn-db-b2353.firebaseio.com",
    projectId: "crwn-db-b2353",
    storageBucket: "",
    messagingSenderId: "170065301503",
    appId: "1:170065301503:web:956e1df10d430580"
  };

  export const createdUserProfileDocument= async(userAuth, additionalData) => {
    if(!userAuth) return;

    const userRef= firestore.doc(`Users/${userAuth.uid}`);

    const snapShot= await userRef.get();

    if(!snapShot.exists){
      const {displayName, email}= userAuth;
      const createdAt = new Date();

      try{
        await userRef.set({
          displayName,
          email,
          createdAt,
          ...additionalData
        })
      }
      catch(error){
        console.log('error creating user', error.message);
      }

    }

 
    return userRef;

  }

  firebase.initializeApp(config);

 export const auth= firebase.auth();
 
 export const firestore= firebase.firestore();

 const provider= new firebase.auth.GoogleAuthProvider(); //google authentication

 provider.setCustomParameters({prompt: 'select_account'});
 export const signInWithGoogle= () => auth.signInWithPopup(provider);

 export default firebase;