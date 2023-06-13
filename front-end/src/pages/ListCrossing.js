import axios from "axios";
import { useEffect, useState } from 'react';
import { Button, Modal, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { useParams } from "react-router";
import EditForm from '../pages/editCrossings';
import firebase from 'firebase/compat/app';

export default function ListCrossings() {
    const [crossings, setCrossings] = useState([]);
    const { id } = useParams();
    const token = localStorage.getItem("token");

    useEffect(() => {
        if (token) {
            fetchData(token);
        }
    }, [token]);

    const fetchData = async (token) => {
        try {
            const res = await axios.get("https://caviar-api-qyyuck654a-et.a.run.app/api/crossings", {
                headers: {
                    Authorization: "Bearer " + token,
                },
            });
            console.log(res.data.data);
            setCrossings(res.data.data); // Update with the response data
        } catch (error) {
            console.log(error);
            // Handle error
        }
    };

    const [show, setShow] = useState(false);
    const [editFormId, setEditFormId] = useState(null);

    const handleShow = (id) => {
        setEditFormId(id);
        setShow(true);
    };

    const handleClose = () => setShow(false);

    const handleEditFormSubmit = () => {
        console.log("Update successful!");
        handleClose();
        fetchData(token);
    };

    function deleteCrossings(id) {
        // Retrieve the access token
        firebase.auth().currentUser.getIdToken(/* forceRefresh */ true)
          .then(function(token) {
            axios.delete(`https://caviar-api-qyyuck654a-et.a.run.app/api/crossing/${id}`, {
              headers: {
                Authorization: `Bearer ${token}`
              },
            }).then(() => {
              fetchData(token); // Assuming fetchData is a function that retrieves data after deletion
            }).catch((error) => {
              console.log(error);
              // Handle error
            });
          }).catch(function(error) {
            console.log(error);
            // Handle error
          });
      }

    return (
        <>
            {crossings.map((data, index) => (
                <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{data.name}</td>
                    <td>{data.latitude}</td>
                    <td>{data.longitude}</td>
                    <td>{data.heading}</td>
                    <td>
                        <OverlayTrigger
                            overlay={
                                <Tooltip id={`tooltip-top`}>
                                    Edit
                                </Tooltip>
                            }>
                            <button onClick={() => handleShow(data.id)} className="btn btn-primary mr-2" data-toggle="modal"><i className="material-icons">edit</i></button>
                        </OverlayTrigger>
                        <OverlayTrigger
                            overlay={
                                <Tooltip id={`tooltip-top`}>
                                    Delete
                                </Tooltip>
                            }>
                            <button onClick={() => deleteCrossings(data.id)} className="btn btn-danger" data-toggle="modal"><i className="material-icons">delete</i></button>
                        </OverlayTrigger>
                    </td>
                </tr>
            ))}
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        Update Crossings
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <EditForm id={editFormId} onSubmit={handleEditFormSubmit} />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close Button
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}