import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import { useContext, useState, useEffect } from "react";
import ListOfCrossing from "../components/ListofCrossings";
import { useNavigate } from 'react-router-dom';
import {AuthContext} from "../context/AuthContext"
import { signInWithEmailAndPassword } from "firebase/auth";
import { auths } from "../config/firebase-config";
import React from 'react'

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
  <div class="hold-transition login-page">
    <div class="login-box">
      <div class="card card-outline card-primary">
        <div class="card-header text-center">
          <img src="dist/img/caviar.png" alt="AdminLTE Logo" class="rounded mx-auto d-block" width="50%" />
          <h2 class="mt-2 login-box-msg">CAVIAR</h2>
        </div>
        <div class="card-body">
          <h3 class="login-box-msg"><b>Login</b></h3>

          <form onSubmit={handleLogin}>
          <div class="row">
              <div class="input-group mb-3 ">
                <input type="email" class="form-control " name="email" placeholder="Email" className="name" onChange={(e) => setEmail(e.target.value)} />
                <div class="input-group-append">
                  <div class="input-group-text">
                    <span class="fas fa-envelope"></span>
                  </div>
                </div>
              </div>
              <div class="input-group mb-3">
                <input type="password" class="form-control" name="password" placeholder="Password" className="name" onChange={(e) => setPassword(e.target.value)} />
                <div class="input-group-append">
                  <div class="input-group-text">
                    <span class="fas fa-lock"></span>
                  </div>
                </div>
              </div>
          </div>
            <div class="row">
              <div class="col-8">
                <div class="icheck-primary">
                  <input type="checkbox" id="remember" />
                  <label for="remember">
                    Remember Me
                  </label>
                </div>
              </div>
              
              <div class="col-4">
                <button type="submit" class="btn btn-primary btn-block">Sign In</button>
              </div>
              
            </div>
          </form>
              <div class="col-4">
              {auth ? (
                  <ListOfCrossing token={token} />
                ) : (
                <button onClick={loginWithGoogle} class="btn btn-danger btn-block">Google</button>
                )}
              </div>
        </div>
      </div>
    </div>
  </div>
           
  )
}

export default Login;
