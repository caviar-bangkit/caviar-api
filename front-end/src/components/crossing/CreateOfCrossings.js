import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Add() {
  const [name, setName] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longtitude, setLongtitude] = useState("");
  const [header, setHeader] = useState("");

  const navigate = useNavigate();
  const data = {
    name: name,
    latitude: latitude,
    longtitude: longtitude,
    header: header
  };

  function submitForm(e) {
    e.preventDefault();
    axios.post("http://localhost:5000/api/crossing", data).then(navigate("/home"));
  }
  return (
    <div className="w-screen h-full flex flex-col justify-center items-center mt-16">
      <h2 className="text-2xl font-bold">Add Crossing</h2>
      <form className="w-[50%] h-full flex flex-col mt-2">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="bg-white/10 outline-none font-normal border border-zinc-400 py-6 pl-6 mt-4"
          type="text"
          placeholder="Enter your name"
        />
        <input
          value={latitude}
          onChange={(e) => setLatitude(e.target.value)}
          className="bg-white/10 outline-none font-normal border border-zinc-400 py-6 pl-6 mt-4"
          type="latitude"
          placeholder="Enter your latitude"
        />
        <input
          value={longtitude}
          onChange={(e) => setLongtitude(e.target.value)}
          className="bg-white/10 outline-none font-normal border border-zinc-400 py-6 pl-6 mt-4"
          type="longtitude"
          placeholder="Enter your longtitude"
        />
        <input
          value={header}
          onChange={(e) => setHeader(e.target.value)}
          className="bg-white/10 outline-none font-normal border border-zinc-400 py-6 pl-6 mt-4"
          type="header"
          placeholder="Enter your header"
        />
        <button
          className="bg-teal-600 outline-none font-bold border text-white border-zinc-400 py-4 pl-4 mt-4"
          type="submit"
          onClick={submitForm}
        >
          ADD CROSSING
        </button>
      </form>
    </div>
  );
}

export default Add;