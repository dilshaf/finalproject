
// import { initializeApp } from "firebase/app";
// import {getAuth,GoogleAuthProvider} from 'firebase/auth'

// const firebaseConfigGoogle = {
//   apiKey: "AIzaSyAl_nnSNTXblUYKtAFZNKb4vE4N_v05JdQ",
//   authDomain: "signin-with-f7a86.firebaseapp.com",
//   projectId: "signin-with-f7a86",
//   storageBucket: "signin-with-f7a86.appspot.com",
//   messagingSenderId: "146011027425",
//   appId: "1:146011027425:web:91cb498aa6ee6d2574c4a0",
//   measurementId: "G-T4CD2DJHH0"
// };

// // Initialize Firebase
// const appGoogle = initializeApp(firebaseConfigGoogle);
// const authGoogle=getAuth(appGoogle)
// const providerGoogle=new GoogleAuthProvider()
// export {authGoogle,providerGoogle}


import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';
import 'firebase/compat/analytics';

// ... rest of your code

// import firebase from 'firebase/app';
// import 'firebase/firestore';
// import 'firebase/auth';
// import 'firebase/analytics';

import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';


firebase.initializeApp({
 apiKey: "AIzaSyAIoQCcDStvgQXFRy0rIsM0ufphxMv0Hhg",
authDomain: "chat-app-c271b.firebaseapp.com",
projectId: "chat-app-c271b",
storageBucket: "chat-app-c271b.appspot.com",
messagingSenderId: "654827030343",
appId: "1:654827030343:web:7a973d8c92bdbcc0adee62",
measurementId: "G-XL7PMD980T"
})
// const firebaseConfig = {
//     apiKey: "AIzaSyDS6al6QAN1V8iaE4ez_aqptA1Vxet0kHA",
//     authDomain: "otp-project-f2126.firebaseapp.com",
//     projectId: "otp-project-f2126",
//     storageBucket: "otp-project-f2126.appspot.com",
//     messagingSenderId: "813515110664",
//     appId: "1:813515110664:web:999f831d476972880154bd",
//     measurementId: "G-2GTQPQH2S4"
//   };

 const auth = firebase.auth();
export const firestore = firebase.firestore();
const analytics = firebase.analytics();

export default auth
