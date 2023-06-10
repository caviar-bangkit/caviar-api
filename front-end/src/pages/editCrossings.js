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

  const data = {
    id: id,
    name: name,
    latitude: latitude,
    longitude: longitude,
    heading: heading
  };

  const fetchData = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api`); // change to real api url later
      // add authorization header later
      console.log(res.data.data);
      setCrossings(res.data.data); // adjust with response from real api later
    } catch (error) {
      console.log(error);
      // Handle error
    }
  };

  function Update(id) {
    axios.put(`http://localhost:5000/api/${id}`, data).then(fetchData());
  }
  return (
    <>
    {crossings.map((data) => (
    <Form onSubmit={Update(data.id)}>
    <Form.Group>
        <Form.Control
            type="text"
            placeholder="Name"
            name="name"
            value={data.name}
            onChange={(e) => setName(e.target.value)}
            required
        />
    </Form.Group><br></br>
    <Form.Group>
        <Form.Control
            type="text"
            placeholder="Latitude"
            name="latitude"
            value={data.latitude}
            onChange={(e) => setLatitude(e.target.value)}
        />
    </Form.Group><br></br>
    <Form.Group>
        <Form.Control
            type="text"
            placeholder="Longitude"
            name="longitude"
            value={data.longitude}
            onChange={(e) => setLongitude(e.target.value)}
        />
    </Form.Group><br></br>
    <Form.Group>
        <Form.Control
            type="text"
            placeholder="Heading"
            name="heading"
            value={data.heading}
            onChange={(e) => setHeading(e.target.value)}
        />
    </Form.Group><br></br>
    <Button variant="success" type="submit" block>
        Update
    </Button>
</Form>
    ))}
    </>
  );
}