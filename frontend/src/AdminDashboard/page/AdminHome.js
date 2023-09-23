import React from "react";
import "../../styles/Home.css";
import AdminHeader from "../comp/AdminHeader";
import AdminSidebar from "../comp/AdminSidebar";
import {Link } from "react-router-dom";


const AdminHome = () => {
  return (
    <div className="App">
      <AdminSidebar/>

      <div className="App2">
        <AdminHeader role="Admin"/>

        <main className="main-content">
          <div className="main-title">
            <h3>DASHBOARD</h3>
            <br/>
          </div>
          <hr />

          <div className="main-cards">

          <Link to="/admin/uploadfile" className="card-btn">
              <div className="card">
              <i class="fa-solid fa-upload card-icon"></i>
                <h1>Upload</h1>
              </div>
            </Link>

            <Link to="/admin/analyzefile" className="card-btn">
              <div className="card">
              <i class="fa-solid fa-gears card-icon"></i>
                <h1>Analyze</h1>
              </div>
            </Link>
            

            <Link to="/admin/users" className="card-btn">
              <div className="card">
                <i class="fas fa-users card-icon"></i>
                <h1>Users</h1>
              </div>
            </Link>

            <Link to="/admin/logs" className="card-btn">
              <div className="card">
                <i class="fa-regular fa-file card-icon"></i>
                <h1>Logs</h1>
              </div>
            </Link>

            <Link to="/admin/rules" className="card-btn">
              <div className="card">
              <i class="fa-solid fa-scale-balanced card-icon"></i>
                <h1>Rules</h1>
              </div>
            </Link>

            <Link to="/admin/reports" className="card-btn">
              <div className="card">
              <i class="fa-solid fa-flag card-icon"></i>
                <h1>Reports</h1>
              </div>
            </Link>

            
            <Link to="/admin/dispatcher" className="card-btn">
              <div className="card">
              <i class="fa-solid fa-circle-user card-icon "></i>
                <h1>Dispatcher</h1>
              </div>
            </Link>

          </div>
          
        </main>
      </div>
    </div>
  );
};

export default AdminHome;
