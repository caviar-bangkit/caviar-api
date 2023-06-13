import axios from "axios";
import React, { useEffect, useState } from "react";
import { Alert, Button, Modal } from 'react-bootstrap';
import { Link } from "react-router-dom";
import ListCrossing from '../pages/ListCrossing';
import AddForm from '../pages/addCrossings';
import Header from '../pages/layout/Header';
import Menu from '../pages/layout/Menu';

export default function Crossings() {
  const [crossings, setCrossings] = useState([]);
  const [showAlert, setShowAlert] = useState(false);
  const [show, setShow] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
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
      setCrossings(res.data.data);
      setError(null);
    } catch (error) {
      console.log(error);
      setError("An error occurred while fetching data.");
    } finally {
      setLoading(false);
    }
  };

  const updateCrossings = async () => {
    await fetchData(token);
  };

  const deleteCrossings = (id) => {
    axios.delete(`https://caviar-api-qyyuck654a-et.a.run.app/api/crossings/${id}`, {
      headers: {
        Authorization: "Bearer " + token,
      },
    })
      .then(() => fetchData(token))
      .catch((error) => {
        console.log(error);
        setError("An error occurred while deleting the crossing.");
      });
  };

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  const handleShowAlert = () => {
    setShowAlert(true);
    setTimeout(() => {
      setShowAlert(false);
    }, 500);
  };

  const handleDataUpdate = async () => {
    await updateCrossings();
    handleShowAlert();
    handleClose();
  };

  useEffect(() => {
    handleClose();
    return () => {
      handleShowAlert();
    };
  }, []);

  useEffect(() => {
    const timer = setInterval(fetchData, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <div className="wrapper">
      <Header />
      <Menu />
      <div className="content-wrapper">
        <div className="content-header">
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-sm-6">
                <h1 className="m-0">Crossings Data</h1>
              </div>
              <div className="col-sm-6">
                <ol className="breadcrumb float-sm-right">
                  <li className="breadcrumb-item"><Link to="/Home">Home</Link></li>
                  <li className="breadcrumb-item active">Crossings Data</li>
                </ol>
              </div>
            </div>
          </div>
        </div>

        <div className="container">
          <div className="table-title">
            <div className="row">
              <div className="col-sm-6">
                <Button onClick={handleShow} className="btn btn-success" data-toggle="modal">
                  <i className="material-icons"></i> <span>Add Crossings Data</span>
                </Button>
              </div>
            </div>
          </div>

          <br />
          {error && <Alert variant="danger">{error}</Alert>}
          <Alert show={showAlert} variant="success">
            Crossing Data Updated Successfully!
          </Alert>

          <div className="table-responsive">
            {loading ? (
              <div>Loading...</div>
            ) : (
              <table className="table table-striped table-hover">
                <thead>
                  <tr>
                    <th>No</th>
                    <th>Name</th>
                    <th>Latitude</th>
                    <th>Longitude</th>
                    <th>Heading</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <ListCrossing crossings={crossings} deleteCrossings={deleteCrossings} />
                </tbody>
              </table>
            )}
          </div>

          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Add Crossings</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <AddForm handleDataUpdate={handleDataUpdate} />
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close Button
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      </div>
    </div>
  );
}
