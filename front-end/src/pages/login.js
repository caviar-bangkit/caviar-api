import "../App.css";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import { useState, useEffect } from "react";
import ListOfCrossing from "../components/ListOfCrossings";
import profile from "../image/a.png";
import email from "../image/email.jpg";
import pass from "../image/pass.png";
import { useNavigate } from 'react-router-dom';

function Login() {
  const [auth, setAuth] = useState(
    false || window.localStorage.getItem("auth") === "true"
  );
  const [token, setToken] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    firebase.auth().onAuthStateChanged((userCred) => {
      if (userCred) {
        setAuth(true);
        window.localStorage.setItem("auth", "true");
        userCred.getIdToken().then((token) => {
          setToken(token);
        });
      }
    });
  }, []);

  const loginWithGoogle = () => {
    firebase
      .auth()
      .signInWithPopup(new firebase.auth.GoogleAuthProvider())
      .then((userCred) => {
        if (userCred) {
          setAuth(true);
          window.localStorage.setItem("auth", "true");
          navigate('../home');
        }
      });
  };

  return (
    <div className="main">
    <div className="sub-main">
      <div>
        <div className="imgs">
          <div className="container-image">
            <img src={profile} alt="profile" className="profile"/>
          </div>
        </div>
        <div>
          <h1>Admin Login</h1>
          <div>
            <img src={email} alt="email" className="email"/>
            <input type="text" placeholder="username" className="name"/>
          </div>
          <div className="second-input">
            <img src={pass} alt="pass" className="email"/>
            <input type="password" placeholder="password" className="name"/>
          </div>
         <div className="login-button">
         <button>Login</button>
         </div><br></br>
         {auth ? (
              <ListOfCrossing token={token} />
            ) : (
              <button onClick={loginWithGoogle} >Login with Google</button>
            )}
        </div>
      </div>
    </div>
   </div>
           
  );
}

export default Login;
