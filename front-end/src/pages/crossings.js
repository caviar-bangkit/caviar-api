import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Header from '../pages/layout/Header';
import Menu from '../pages/layout/Menu';

export default function Crossings() {
  const [crossings, setCrossings] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);
  // change with token later

  const fetchData = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api"); // change to real api url later
      // add authorization header later
      console.log(res.data.data);
      setCrossings(res.data.data); // adjust with response from real api later
    } catch (error) {
      console.log(error);
      // Handle error
    }
  };

  function deleteCrossings(id) {
    axios.delete(`http://localhost:5000/crossings/${id}`).then(fetchData());
  }

  return (
    <div class="wrapper">
    <Header/>
    <Menu/>
    <div class="content-wrapper">
    <div class="content-header">
      <div class="container-fluid">
        <div class="row mb-2">
          <div class="col-sm-6">
            <h1 class="m-0">Crossings Data</h1>
          </div>
          <div class="col-sm-6">
            <ol class="breadcrumb float-sm-right">
              <li class="breadcrumb-item"><a href="/Home">Home</a></li>
              <li class="breadcrumb-item active">Crossings Data</li>
            </ol>
          </div>
        </div>
      </div>
    </div>

<div class="container">

		<div class="row g-3 align-items-center mt-2">
	        <div class="col-auto">
	            <form action="/home" method="GET">
		            <input type="search" id="inputPassword6" name="search" placeholder="Search" class="form-control"
		                        aria-describedby="passwordHelpInline" />
		        </form>
	        </div>
	        <div class="col-auto">
				<a href="/addcrossings" class="btn btn-info">Add Data</a>
	     	</div>
	     	
    		<table class="table">
			  <thead>
			    <tr>
			      <th scope="col">No</th>
			      <th scope="col">Name</th>
				    <th scope="col">Latitude</th>
            <th scope="col">Longtitude</th>
            <th scope="col">Heading</th>
            <th scope="col">Admin</th>
			    </tr>
			  </thead>
			  <tbody>
          {crossings.map((data, index) => (
			    <tr key={index}>
            <td>{index + 1}</td>
            <td>{data.name}</td>
            <td>{data.latitude}</td>
            <td>{data.longitude}</td>
            <td>{data.heading}</td>
            <td>
              <Link
                to={`/edit-user/${data.id}`}
                class="btn btn-primary"
                >
                Edit
              </Link>
            </td>
            <td>
              <Link
                onClick={()=>deleteCrossings(data.id)}
                to={"#"}
                class="btn btn-danger"
                >
                Delete
              </Link>
            </td>
			    </tr>
          ))}
			  </tbody>
			</table>
    	</div>
    </div>
</div>
</div>

    
  );
}
