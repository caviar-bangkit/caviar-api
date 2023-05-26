import "./App.css";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import { useState, useEffect } from "react";
import ListOfCrossing from "./components/ListOfCrossings";

function App() {
  const [auth, setAuth] = useState(
    false || window.localStorage.getItem("auth") === "true"
  );
  const [token, setToken] = useState("");

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
        }
      });
  };

  return (
    <div className="App">
      {auth ? (
        <ListOfCrossing token={token} />
      ) : (
        <button onClick={loginWithGoogle}>Login with Google</button>
      )}
    </div>
  );
}

export default App;
