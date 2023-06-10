import axios from "axios";
import React, { useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import { Form, Button } from "react-bootstrap";

export default function AddCrossings() {
  const [crossings, setCrossings] = useState([]);

  const [name, setName] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [heading, setHeading] = useState("");
  const [id, setId] = uuidv4();
  

  const data = {
    id: id,
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

  function submitForm() {
    axios.post("http://localhost:5000/api", data).then(fetchData());
  }
  return (
    <Form onSubmit={submitForm}>
        <Form.Group>
          <Form.Control
              type="text"
              name="id"
              value={id}
              onChange={(e) => setId(e.target.value)}
              readOnly
          />
      </Form.Group><br></br>
      <Form.Group>
          <Form.Control
              type="text"
              placeholder="Name"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
          />
      </Form.Group><br></br>
      <Form.Group>
          <Form.Control
              type="text"
              placeholder="Latitude"
              name="latitude"
              value={latitude}
              onChange={(e) => setLatitude(e.target.value)}
          />
      </Form.Group><br></br>
      <Form.Group>
          <Form.Control
              type="text"
              placeholder="Longitude"
              name="longitude"
              value={longitude}
              onChange={(e) => setLongitude(e.target.value)}
          />
      </Form.Group><br></br>
      <Form.Group>
          <Form.Control
              type="text"
              placeholder="Header"
              name="heading"
              value={heading}
              onChange={(e) => setHeading(e.target.value)}
          />
      </Form.Group><br></br>
      <Button variant="success" type="submit" block>
          Create
      </Button>
  </Form>
  )
};