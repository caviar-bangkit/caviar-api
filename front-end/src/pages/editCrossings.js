import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Form, Button } from "react-bootstrap";

export default function EditCrossings() {
  const [crossings, setCrossings] = useState([]);

  const [name, setName] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [heading, setHeading] = useState("");

  const { id } = useParams();

  useEffect(() => {
    fetchData();
  }, []);

  const navigate = useNavigate();

  const data = {
    name: name,
    latitude: latitude,
    longitude: longitude,
    heading: heading
  };

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

  function Update(e) {
    e.preventDefault();
    axios.put(`http://localhost:5000/api/${id}`, data).then(navigate("/home"));
  }
  return (
    <Form onSubmit={Update}>
    <Form.Group>
        <Form.Control
            type="text"
            placeholder="Name"
            name="name"
            value={crossings.name}
            onChange={(e) => setName(e.target.value)}
            required
        />
    </Form.Group><br></br>
    <Form.Group>
        <Form.Control
            type="text"
            placeholder="Latitude"
            name="latitude"
            value={crossings.latitude}
            onChange={(e) => setLatitude(e.target.value)}
        />
    </Form.Group><br></br>
    <Form.Group>
        <Form.Control
            type="text"
            placeholder="Longitude"
            name="longitude"
            value={crossings.longitude}
            onChange={(e) => setLongitude(e.target.value)}
        />
    </Form.Group><br></br>
    <Form.Group>
        <Form.Control
            type="text"
            placeholder="Heading"
            name="heading"
            value={crossings.heading}
            onChange={(e) => setHeading(e.target.value)}
        />
    </Form.Group><br></br>
    <Button variant="success" type="submit" block>
        Update
    </Button>
</Form>
  );
}