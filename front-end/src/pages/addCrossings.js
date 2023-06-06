import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from '../pages/layout/Header';
import Menu from '../pages/layout/Menu';

export default function AddCrossings() {
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
    axios.post("http://localhost:5000/api/crossing", data).then(navigate("/crossings"));
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
                  placeholder="Enter your latitude" 
                  onChange={(e) => setLatitude(e.target.value)}
                  value={latitude}
                />
						  </div>
              <div class="mb-3">
                <label for="exampleInputEmail1" class="form-label">Longtitude</label>
							  <input type="number" id="longtitude" name="longtitude" class="form-control"
                  placeholder="Enter your longtitude"
                  onChange={(e) => setLongtitude(e.target.value)}
                  value={longtitude}
                />
						  </div>
              <div class="mb-3">
                <label for="exampleInputEmail1" class="form-label">Header</label>
							  <input type="number" id="header" name="header" class="form-control" 
                  placeholder="Enter your header"
                  onChange={(e) => setHeader(e.target.value)}
                  value={header}/>
						  </div>
						  <button type="submit" class="btn btn-primary pr-3" onClick={submitForm}>Simpan</button>
						</form>
    				</div>
    			</div>
    		</div>
    	</div>
    </div>
    </div>
  )
};