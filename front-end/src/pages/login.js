import "../App.css";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import { useContext, useState, useEffect } from "react";
import ListOfCrossing from "../components/ListOfCrossings";
import profile from "../image/a.png";
import emails from "../image/email.jpg";
import pass from "../image/pass.png";
import { useNavigate } from 'react-router-dom';
import {AuthContext} from "../context/AuthContext"
import { signInWithEmailAndPassword } from "firebase/auth";
import { auths } from "../config/firebase-config";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [auth, setAuth] = useState(
    false || window.localStorage.getItem("auth") === "true"
  );
  const [token, setToken] = useState("");
  const navigate = useNavigate();
  const nav = useNavigate();

  const {dispatch} = useContext(AuthContext);

  const handleLogin = (e) => {
    e.preventDefault();

    signInWithEmailAndPassword(auths, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        nav('/home');
      })
  };

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
          navigate('/home');
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
          <form onSubmit={handleLogin}>
            <div>
              <img src={emails} alt="email" className="email"/>
              <input type="email" placeholder="email" className="name" onChange={(e) => setEmail(e.target.value)}/>
            </div>
            <div className="second-input">
              <img src={pass} alt="pass" className="email"/>
              <input type="password" placeholder="password" className="name" onChange={(e) => setPassword(e.target.value)}/>
            </div>
          <div className="login-button">
          <button type="submit">Login</button>
          </div>
         </form><br></br>
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
