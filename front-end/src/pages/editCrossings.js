import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import firebase from 'firebase/compat/app';

export default function EditCrossings({ id, onSubmit }) {
  const [crossings, setCrossings] = useState({});
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token) {
      fetchData(token);
    }
  }, [token]);

  const fetchData = async (token) => {
    try {
      const res = await axios.get(`https://caviar-api-qyyuck654a-et.a.run.app/api/crossings/${id}`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      setCrossings(res.data.data);
    } catch (error) {
      console.log(error);
    } 
  };

  const handleUpdate = () => {
    // Retrieve the access token
    firebase.auth().currentUser.getIdToken(/* forceRefresh */ true)
      .then(function(token) {
        const data = {
          id: crossings.id,
          name: crossings.name,
          latitude: crossings.latitude,
          longitude: crossings.longitude,
          heading: crossings.heading,
        };
  
        // Make the PUT request with the access token
        axios.put(`https://caviar-api-qyyuck654a-et.a.run.app/api/crossing/${id}`, data, {
          headers: {
          Authorization: "Bearer " + token,
          },
        })
          .then((res) => {
            console.log(res.data.data);
            setCrossings(res.data.data);
            onSubmit();
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch(function(error) {
        console.log(error);
        // Handle error
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
