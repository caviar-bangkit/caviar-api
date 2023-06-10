import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";

export default function EditCrossings({ id, onSubmit }) {
  const [crossings, setCrossings] = useState({});

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/${id}`);
      setCrossings(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdate = () => {
    const data = {
      id: crossings.id,
      name: crossings.name,
      latitude: crossings.latitude,
      longitude: crossings.longitude,
      heading: crossings.heading,
    };

    axios
      .put(`http://localhost:5000/api/${id}`, data)
      .then((res) => {
        console.log(res.data.data);
        setCrossings(res.data.data);
        onSubmit();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleChange = (e) => {
    setCrossings({ ...crossings, [e.target.name]: e.target.value });
  };

  return (
    <Form onSubmit={handleUpdate}>
      <Form.Group>
        <Form.Control
          type="text"
          placeholder="Name"
          name="name"
          value={crossings?.name || ''}
          onChange={handleChange}
          required
        />
      </Form.Group><br></br>
      <Form.Group>
        <Form.Control
          type="text"
          placeholder="Latitude"
          name="latitude"
          value={crossings?.latitude || ''}
          onChange={handleChange}
          required
        />
      </Form.Group><br></br>
      <Form.Group>
        <Form.Control
          type="text"
          placeholder="Longitude"
          name="longitude"
          value={crossings?.longitude || ''}
          onChange={handleChange}
          required
        />
      </Form.Group><br></br>
      <Form.Group>
        <Form.Control
          type="text"
          placeholder="Heading"
          name="heading"
          value={crossings?.heading || ''}
          onChange={handleChange}
          required
        />
      </Form.Group><br></br>
      <Button variant="success" type="submit" block>
        Update
      </Button>
    </Form>
  );
}
