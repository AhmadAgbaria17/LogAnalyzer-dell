import React from 'react';
import "../../styles/Home.css";
import ViewerSidebar from "../comp/ViewerSidebar";
import {Link } from "react-router-dom";
import AdminHeader from '../../AdminDashboard/comp/AdminHeader';

const ViewerHome = () => {
  return (
    <div className="App">
      <ViewerSidebar/>

      <div className="App2">
      <AdminHeader role="Viewer" />

        <main className="main-content">
          <div className="main-title">
            <h3>DASHBOARD</h3>
            <br/>
          </div>
          <hr />

          <div className="main-cards">

            <Link to="/viewer/reports" className="card-btn">
              <div className="card">
              <i class="fa-solid fa-flag card-icon"></i>
                <h1>Reports</h1>
              </div>
            </Link>
          </div>
        </main>
      </div>
    </div>
  );
}

export default ViewerHome;
