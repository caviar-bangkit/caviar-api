import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import { useState, useEffect } from "react";
import { useNavigate, Route, Routes } from 'react-router-dom';
import Login from './pages/login';
import Home from './pages/home';
import Team from "./scenes/team";
import List from './pages/crossings';
import Contacts from "./scenes/contacts";

function App() {
  const navigate = useNavigate();
  return (
    <div>
        {/* <button onClick={() => navigate(-1)}>go back</button> */}
        <Routes>
          <Route exact path="/" element={<Login/>}/>
          <Route exact path="/home" element={<Home/>}/>
          <Route exact path="/team" element={<List />} />
          <Route exact path="/contacts" element={<Contacts />} />
        </Routes>
      </div>
  );
}

export default App;
