import {useContext, useState, useEffect} from 'react';
import { Modal, Button, OverlayTrigger, Tooltip } from 'react-bootstrap';
import EditForm from '../pages/editCrossings';
import axios from "axios";

export default function ListCrossings() {
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

    const [show, setShow] = useState(false);
    
    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);

    useEffect(() => {
        handleClose()
    }, [])

    function deleteCrossings(id) {
        axios.delete(`http://localhost:5000/api/${id}`).then(fetchData());
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
                    <button onClick={handleShow}  class="btn btn-primary mr-2" data-toggle="modal"><i className="material-icons">Edit</i></button>
                </OverlayTrigger>
                <OverlayTrigger
                    overlay={
                        <Tooltip id={`tooltip-top`}>
                            Delete
                        </Tooltip>
                    }>
                    <button onClick={()=>deleteCrossings(data.id)}  class="btn btn-danger" data-toggle="modal"><i className="material-icons">Delete</i></button>
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
            <EditForm />
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