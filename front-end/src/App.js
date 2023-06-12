import { getAuth } from "firebase/auth";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import { useEffect, useState } from "react";
import { Route, Routes, useLocation } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Protected from "./components/Protected";
import { AuthContextProvider } from "./context/AuthContext";
import Crossings from "./pages/crossings";
import Home from './pages/home';
import Login from './pages/login';

function App() {
  const auth = getAuth();
  const [isSignedIn, setIsSignedIn] = useState(
    Boolean(localStorage.getItem("isSignedIn"))
  );
  const location = useLocation();

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setIsSignedIn(true);
        localStorage.setItem("isSignedIn", "true");
        if (!isSignedIn) {
          toast.success('Successfully logged in!');
        }
      } else {
        setIsSignedIn(false);
        localStorage.removeItem("isSignedIn");
      }
    });
  }, [auth, isSignedIn]);

  useEffect(() => {
    if (!isSignedIn && location.pathname !== '/') {
      toast.warn('You are not authenticated. Please log in.');
    }
  }, [isSignedIn, location]);

  return (
    <div>
      <ToastContainer />
      <AuthContextProvider>
        <Routes>
          <Route exact path="/" element={<Login />} />
          <Route
            path="/home"
            element={
              <Protected isSignedIn={isSignedIn}>
                <Home />
              </Protected>
            }
          />
          <Route
            path="/crossings"
            element={
              <Protected isSignedIn={isSignedIn}>
                <Crossings />
              </Protected>
            }
          />
        </Routes>
      </AuthContextProvider>
    </div>
  );
}

export default App;
