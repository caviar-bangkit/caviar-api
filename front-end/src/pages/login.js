import { signInWithEmailAndPassword } from "firebase/auth";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ListOfCrossing from "../components/ListofCrossings";
import { auths } from "../config/firebase-config";
import { AuthContext } from "../context/AuthContext";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [auth, setAuth] = useState(false);
  const [token, setToken] = useState("");
  const navigate = useNavigate();
  const { dispatch } = useContext(AuthContext);

  const handleLogin = (e) => {
    e.preventDefault();

    signInWithEmailAndPassword(auths, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        navigate("/home");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((userCred) => {
      if (userCred) {
        setAuth(true);
        window.localStorage.setItem("auth", "true");
        userCred.getIdToken().then((token) => {
          setToken(token);
        });
      } else {
        setAuth(false);
        window.localStorage.removeItem("auth");
      }
    });

    return () => unsubscribe();
  }, []);

  const loginWithGoogle = () => {
    firebase
      .auth()
      .signInWithPopup(new firebase.auth.GoogleAuthProvider())
      .then((userCred) => {
        if (userCred) {
          setAuth(true);
          window.localStorage.setItem("auth", "true");
          navigate("/home");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="hold-transition login-page">
      <div className="login-box">
        <div className="card card-outline card-primary">
          <div className="card-header text-center">
            <img
              src="dist/img/caviar.png"
              alt="AdminLTE Logo"
              className="rounded mx-auto d-block"
              width="50%"
            />
            <h2 className="mt-2 login-box-msg">CAVIAR</h2>
          </div>
          <div className="card-body">
            <h3 className="login-box-msg">
              <b>Admin Login</b>
            </h3>

            <form onSubmit={handleLogin}>
              <div className="input-group mb-3">
                <input
                  type="email"
                  className="form-control"
                  name="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <div className="input-group-append">
                  <div className="input-group-text">
                    <span className="fas fa-envelope"></span>
                  </div>
                </div>
              </div>
              <div className="input-group mb-3">
                <input
                  type="password"
                  className="form-control"
                  name="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <div className="input-group-append">
                  <div className="input-group-text">
                    <span className="fas fa-lock"></span>
                  </div>
                </div>
              </div>

              <div className="d-flex justify-content-center">
                <button type="submit" className="btn btn-primary">
                  Sign In with Email
                </button>
              </div>
            </form>

            <div className="d-flex justify-content-center mt-3">
              {auth ? (
                <ListOfCrossing token={token} />
              ) : (
                <button
                  onClick={loginWithGoogle}
                  className="btn btn-danger"
                >
                  Log In with Google
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
