import React from "react";
import  {db,auth, provider } from "../firebase";
import { useNavigate } from "react-router-dom";
import { setDoc,doc } from "firebase/firestore";
import "./Login.css";
import { signInWithPopup } from "firebase/auth";


function Login({ setUser }) {
  const navigate = useNavigate();
  const signInWithGoogle = () => {
    
      signInWithPopup(auth,provider)
      .then((result) => {
        const newUser = {
          id:result.user.uid,
          fullname: result.user.displayName,
          email: result.user.email,
          photoURL: result.user.photoURL,
        };
        setUser(newUser);
        localStorage.setItem("user", JSON.stringify(newUser));
        const user = doc(db, "users",result.user.email);
        setDoc(user,newUser)
        navigate("/");
      })
      .catch((err) => alert(err.message));
  };

  return (
    <div className="login">
      <div className="login-container">
        <img className="login-logo" src="./whatsapp-logo.png" alt="" />
        <p className="login-name">WhatsApp Web</p>
        <button className="login-btn" onClick={signInWithGoogle}>
          <img src="./google-logo.png" alt="login with google" />
          Login with Google
        </button>
      </div>
    </div>
  );
}

export default Login;