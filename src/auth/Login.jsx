import React, { useContext } from 'react'
import { FcGoogle } from 'react-icons/fc'
import Contextpage from '../Contextpage';
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

function Login() {
    
    
     const firebaseConfig = {
       apiKey: "AIzaSyDZcCwWRlB5n4qB4V1ZAPS8g9hHN4a3jUw",
       authDomain: "sopa-332de.firebaseapp.com",
       projectId: "sopa-332de",
       storageBucket: "sopa-332de.appspot.com",
       messagingSenderId: "588670818449",
       appId: "1:588670818449:web:d2ad314d90d2358d6dc730",
       measurementId: "G-MYV11W22L6",
     };

     // Initialize Firebase
     const app = initializeApp(firebaseConfig);
     const analytics = getAnalytics(app);
     const auth = getAuth(app);

     const provider = new GoogleAuthProvider();

     const signinWithgoogle = () => {
       signInWithPopup(auth, provider)
         .then((result) => {
        //    setImg1(result.user.photoURL);
           console.log(result.user.photoURL);
        //    setAuth(true);
        //    setM();
        //    onClose();
         })
         .catch((error) => {
           console.error(error);
         });
     };
  

    return (
      <div className="h-screen flex justify-center items-center">
        <div
          className="border-2 border-white/30 p-5 flex justify-center items-center gap-5 rounded-2xl cursor-pointer hover:bg-black"
          onClick={signinWithgoogle}
        >
          <FcGoogle className="text-3xl" />
          <h1 className="text-white font-semibold">Sign in with Google</h1>
        </div>
      </div>
    );
}

export default Login