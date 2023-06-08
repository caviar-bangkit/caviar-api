import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button } from "react-bootstrap";

export default function AddCrossings() {
  const [name, setName] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [heading, setHeading] = useState("");

  const navigate = useNavigate();
  const data = {
    name: name,
    latitude: latitude,
    longitude: longitude,
    heading: heading
  };

  function submitForm(e) {
    e.preventDefault();
    axios.post("http://localhost:5000/api", data).then(navigate("/crossings"));
  }
  return (
    <Form onSubmit={submitForm}>
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