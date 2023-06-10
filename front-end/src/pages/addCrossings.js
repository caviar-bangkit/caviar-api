import axios from "axios";
import React from "react";
import { Button, Form } from "react-bootstrap";
import { v4 as uuidv4 } from 'uuid';

export default function AddCrossings({ handleClose, handleDataUpdate }) {
  const submitForm = (e) => {
    e.preventDefault();
    const id = uuidv4();
    const data = {
      id: id,
      name: e.target.name.value,
      latitude: e.target.latitude.value,
      longitude: e.target.longitude.value,
      heading: e.target.heading.value
    };
    axios.post("http://localhost:5000/api", data)
      .then(() => {
        // Call the handleDataUpdate function passed as a prop
        handleDataUpdate();
        // Reset form fields
        e.target.reset();
      })
      .catch((error) => {
        console.log(error);
        // Handle error
      });
  };

  return (
    <Form onSubmit={submitForm}>
      <Form.Group>
        <Form.Control
          type="text"
          name="name"
          placeholder="Name"
          required
        />
      </Form.Group><br></br>
      <Form.Group>
        <Form.Control
          type="text"
          name="latitude"
          placeholder="Latitude"
        />
      </Form.Group><br></br>
      <Form.Group>
        <Form.Control
          type="text"
          name="longitude"
          placeholder="Longitude"
        />
      </Form.Group><br></br>
      <Form.Group>
        <Form.Control
          type="text"
          name="heading"
          placeholder="Heading"
        />
      </Form.Group><br></br>
      <Button variant="success" type="submit" block>
        Create
      </Button>
    </Form>
  );
}