import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Header from '../pages/layout/Header';
import Menu from '../pages/layout/Menu';

export default function EditCrossings() {
  const [name, setName] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longtitude, setLongtitude] = useState("");
  const [heading, setHeading] = useState("");

  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/${id}`);
        // set the state of the data based on the id
        setName(res.data.name);
        setLatitude(res.data.latitude);
        setLongtitude(res.data.longtitude);
        setHeading(res.data.heading);
      } catch (error) {
        console.error("Error fetching data:", error);
        // Handle the error (e.g., display an error message, redirect, etc.)
      }
    };
  
    fetchData();
  }, [id]);

  const navigate = useNavigate();

  const data = {
    name: name,
    latitude: latitude,
    longtitude: longtitude,
    heading: heading
  };


  function Update(e) {
    e.preventDefault();
    axios.put(`http://localhost:5000/api/${id}`, data).then(navigate("/home"));
  }
  return (
    <div class="wrapper">
    <Header/>
    <Menu/>
    <h1 class="text-center mb-5 mt-5">Create Crossings Data</h1>

    <div class="container mb-5">
    	<div class="row justify-content-center">
    		<div class="col-8">
    			<div class="card">
	    			<div class="card-body">
	    				<form>
						  <div class="mb-3">
                <label for="exampleInputEmail1" class="form-label">Nama</label>
							  <input type="text" id="name" name="name" class="form-control" 
                  placeholder="Enter your name"
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                />
						  </div>
						  <div class="mb-3">
                <label for="exampleInputEmail1" class="form-label">Latitude</label>
							  <input type="number" id="latitude" name="latitude" class="form-control" 
                  onChange={(e) => setLatitude(e.target.value)}
                  value={latitude}
                />
						  </div>
              <div class="mb-3">
                <label for="exampleInputEmail1" class="form-label">Longtitude</label>
							  <input type="number" id="longtitude" name="longtitude" class="form-control"
                  onChange={(e) => setLongtitude(e.target.value)}
                  value={longtitude}
                />
						  </div>
              <div class="mb-3">
                <label for="exampleInputEmail1" class="form-label">Header</label>
							  <input type="number" id="header" name="header" class="form-control" 
                  onChange={(e) => setHeading(e.target.value)}
                  value={heading}/>
						  </div>
						  <button type="submit" class="btn btn-primary pr-3" onClick={Update}>Simpan</button>
						</form>
    				</div>
    			</div>
    		</div>
    	</div>
    </div>
    </div>


  );
}