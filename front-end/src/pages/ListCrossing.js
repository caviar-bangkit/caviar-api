import axios from "axios";
import { useEffect, useState } from 'react';
import { Button, Modal, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { useParams } from "react-router";
import EditForm from '../pages/editCrossings';

export default function ListCrossings() {
    const [crossings, setCrossings] = useState([]);
    const { id } = useParams();

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const res = await axios.get("http://localhost:5000/api");
            setCrossings(res.data.data);
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
        fetchData();
    };

    function deleteCrossings(id) {
        axios.delete(`http://localhost:5000/api/${id}`).then(() => fetchData());
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