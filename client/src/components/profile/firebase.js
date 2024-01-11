
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig1 = {
  apiKey: "AIzaSyDS6al6QAN1V8iaE4ez_aqptA1Vxet0kHA",
  authDomain: "otp-project-f2126.firebaseapp.com",
  projectId: "otp-project-f2126",
  storageBucket: "otp-project-f2126.appspot.com",
  messagingSenderId: "813515110664",
  appId: "1:813515110664:web:999f831d476972880154bd",
  measurementId: "G-2GTQPQH2S4"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig1);
// const analytics = getAnalytics(app);
export const auth=getAuth(app)
export default auth