import React, { Component } from 'react'

export default class Dashboard extends Component {
  render() {
    return (
      <div>
        <div className="content-wrapper">
          {/* Content Header (Page header) */}
          <div className="content-header">
            <div className="container-fluid mb-5">
              <div className="row mb-2">
                <div className="col-sm-6">
                  <h1 className="m-0 text-dark">Dashboard</h1>
                </div>{/* /.col */}
                <div className="col-sm-6">
                  <ol className="breadcrumb float-sm-right">
                    <li className="breadcrumb-item"><a href="#">Home</a></li>
                    <li className="breadcrumb-item active">Dashboard</li>
                  </ol>
                </div>{/* /.col */}
              </div>{/* /.row */}
            </div>{/* /.container-fluid */}
            <div className="container-fluid">
              <div className="row mb-5">
                <div className="col-sm-6">
                  <h5 className="m-0 text-dark">Welcome to the CAVIAR API Admin Dashboard</h5>
                </div>{/* /.col */}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}