import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth'; 

const config = {
    apiKey: "AIzaSyAmqR61s5pbOg1Bqn7EQUE7QiK-UHIkB_4",
    authDomain: "crwn-backend-13c47.firebaseapp.com",
    projectId: "crwn-backend-13c47",
    storageBucket: "crwn-backend-13c47.appspot.com",
    messagingSenderId: "69491067464",
    appId: "1:69491067464:web:3fac3d058b33c05bf5e67d",
    measurementId: "G-E7PQB2DVKV"
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
    if(!userAuth) return;
    
    const userRef = firestore.doc(`users/${userAuth.uid}`);
                            
    const snapShot = await userRef.get();
    
    if(!snapShot.exists) {
        const { displayName, email } = userAuth;
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
}

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase