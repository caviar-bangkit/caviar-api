import "./App.css";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import { useState, useEffect } from "react";
import { useNavigate, Route, Routes } from 'react-router-dom';
import Login from './pages/login';
import Home from './pages/home';

function App() {
  const navigate = useNavigate();
  return (
    <div>
        {/* <button onClick={() => navigate(-1)}>go back</button> */}
        <Routes>
          <Route exact path="/" element={<Login/>}/>
          <Route exact path="/home" element={<Home/>}/>
        </Routes>
      </div>
  );
}

export default App;
