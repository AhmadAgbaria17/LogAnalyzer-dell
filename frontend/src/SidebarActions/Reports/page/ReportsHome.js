import React from "react";
import "../../../styles/Table.css";
import AdminSidebar from "../../../AdminDashboard/comp/AdminSidebar";
import ConfiquratorSidebar from "../../../ConfiquratorDashboard/comp/ConfiquratorSidebar";
import AdminHeader from "../../../AdminDashboard/comp/AdminHeader";
import ViewerSidebar from "../../../ViewerDashboard/comp/ViewerSidebar";
import Dashboard from "../helpComps/Dashboard"
const ReportsHome = (props) => {
  return (
    <div className="App">
      {props.role === "admin" ? (
        <AdminSidebar />
      ) : props.role === "Configurator" ? (
        <ConfiquratorSidebar />
      ) : (
        <ViewerSidebar />
      )}{" "}
      
      <div className="App2">
        {props.role === "admin" ? (
          <AdminHeader role="Admin" />
        ) : props.role === "Configurator" ? (
          <AdminHeader role="Configurator" />
        ) : (
          <AdminHeader role="Viewer" />
        )}
        <main className="main-content">
          <div className="main-title">
            <h3>Reports</h3>
            <br/>
          </div>
          <hr />
          <div className="logs-page">
            <Dashboard/>
          </div>
        </main>
      </div>
    </div>
  );
};

export default ReportsHome;
