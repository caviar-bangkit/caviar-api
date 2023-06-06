import React, { Component } from 'react'

export default class Menu extends Component {
    render() {
        return (
          <div>
  <aside className="main-sidebar sidebar-light-primary elevation-4">
    {/* Brand Logo */}
    <a href="#" className="brand-link">
      <img src="dist/img/caviar.png" alt="AdminLTE Logo" className="brand-image img-circle elevation-3" style={{opacity: '.8'}} />
      <span className="brand-text font-weight-light">CAVIAR</span>
    </a>
    {/* Sidebar */}
    <div className="sidebar">
      {/* Sidebar user panel (optional) */}
      <div className="user-panel mt-3 pb-3 mb-3 d-flex">
        <div className="image">
          <img src="dist/img/user.png" className="img-circle elevation-2" alt="User Image" />
        </div>
        <div className="info">
          <a href="#" className="d-block">Admin</a>
        </div>
      </div>
      {/* Sidebar Menu */}
      <nav class="mt-2">
        <ul class="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">

          <li class="nav-item ">
            <a href="/home" class="nav-link">
              <i class="nav-icon fas fa-chart-pie text-danger"></i>
              <p>
                Dashboard

              </p>
            </a>
          </li>

          <li class="nav-item">
            <a href="/crossings" class="nav-link">
              <i class="nav-icon fas fas fa-map-marked-alt text-success"></i>
              <p>
                Crossings Data

              </p>
            </a>
          </li>

          {/* <li class="nav-item">
            <a href="/cuti" class="nav-link">
              <i class="nav-icon fas fa-cut text-white"></i>
              <p>
                Cuti

              </p>
            </a>
          </li>

          <li class="nav-item user-panel d-flex">
            <a href="/spd" class="nav-link">
              <i class="nav-icon fas fa-align-left text-primary"></i>
              <p>
                Surat Perjalanan Dinas

              </p>
            </a>
          </li> */}

        </ul>
        </nav>
    </div>
  </aside>
</div>

        )
    }
}