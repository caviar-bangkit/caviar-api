import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function Add({ token }) {
  const [name, setName] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longtitude, setLongtitude] = useState("");
  const [header, setHeader] = useState("");

  const { id } = useParams();

  useEffect(() => {
    if (token) {
      fetchData(token);
    }
  }, [token]);

  const navigate = useNavigate();

  const data = {
    name: name,
    latitude: latitude,
    longtitude: longtitude,
    header: header
  };

  const fetchData = async (token) => {
    const res = await axios.get("http://localhost:5000/api/crossings${id}", {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    console.log(res.data.data);
    setName(res.data.name);
    setLatitude(res.data.latitude);
    setLongtitude(res.data.longtitude);
    setHeader(res.data.header);
  };

  function Update(e) {
    e.preventDefault();
    axios.put(`http://localhost:5000/api/crossing/${id}`, data).then(navigate("/home"));
  }
  return (
    <div className="w-screen h-full flex flex-col justify-center items-center mt-16">
      <h2 className="text-2xl font-bold">Crossing Details</h2>
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
          onClick={Update}
        >
          UPDATE CROSSING
        </button>
      </form>
    </div>
  );
}