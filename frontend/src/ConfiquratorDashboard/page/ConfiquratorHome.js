import React from 'react';
import "../../styles/Home.css";
import ConfiquratorSidebar from "../comp/ConfiquratorSidebar";
import {Link } from "react-router-dom";
import AdminHeader from '../../AdminDashboard/comp/AdminHeader';


const ConfiquratorHome = () => {
  return (
    <div className="App">
    <ConfiquratorSidebar/>

    <div className="App2">
      <AdminHeader role="Configurator"/>

      <main className="main-content">
        <div className="main-title">
          <h3>DASHBOARD</h3>
          <br/>
        </div>
        <hr />

        <div className="main-cards">

        <Link to="/Configurator/uploadfile" className="card-btn">
            <div className="card">
            <i class="fa-solid fa-upload card-icon"></i>
              <h1>Upload</h1>
            </div>
          </Link>

          <Link to="/Configurator/analyzefile" className="card-btn">
              <div className="card">
              <i class="fa-solid fa-gears card-icon"></i>
                <h1>Analyze</h1>
              </div>
            </Link>


          <Link to="/Configurator/logs" className="card-btn">
            <div className="card">
              <i class="fa-regular fa-file card-icon"></i>
              <h1>Logs</h1>
            </div>
          </Link>

          <Link to="/Configurator/rules" className="card-btn">
            <div className="card">
            <i class="fa-solid fa-scale-balanced card-icon"></i>
              <h1>Rules</h1>
            </div>
          </Link>

          <Link to="/Configurator/reports" className="card-btn">
            <div className="card">
            <i class="fa-solid fa-flag card-icon"></i>
              <h1>Reports</h1>
            </div>
          </Link>

          <Link to="/Configurator/dispatcher" className="card-btn">
            <div className="card">
            <i class="fa-solid fa-circle-user card-icon" ></i>
              <h1>Dispatcher</h1>
            </div>
          </Link>
        </div>
      </main>
    </div>
  </div>
  );
}

export default ConfiquratorHome;
