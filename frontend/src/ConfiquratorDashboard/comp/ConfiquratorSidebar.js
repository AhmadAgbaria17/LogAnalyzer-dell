import React from 'react';
import "../../styles/Sidebar.css";
import {NavLink } from "react-router-dom";
import {useSignOut} from "react-auth-kit";
import { STORAGE_KEY } from '../../api/variables';


const ConfiquratorSidebar = () => {
  const signOut = useSignOut()

  const signouthandle =()=>{
    window.open("http://localhost:5000/logout", "_self");
    localStorage.removeItem("accessToken");
    localStorage.removeItem("userID");
    localStorage.removeItem(STORAGE_KEY);
    signOut()
  }
  return (
    <aside id="sidebar">
    <div className="sidebar-title">
      <div className="sidebar-brand">Log Analyzer</div>

    </div>

    <ul className="sidebar-list">

      <NavLink className="a-sidebar dashboard" to="/Configurator">
        <li className="sidebar-list-item">
          <i class="fa-solid fa-table-columns"></i> Dashboard
        </li>
      </NavLink>

      <NavLink className="a-sidebar " to="/Configurator/uploadfile">
        <li className="sidebar-list-item">
        <i class="fa-solid fa-upload"></i> Upload File
        </li>
      </NavLink>

      
      <NavLink className="a-sidebar " to="/Configurator/analyzefile">
          <li className="sidebar-list-item">
          <i class="fa-solid fa-gears"></i> Analyze File
          </li>
        </NavLink>


      <NavLink className="a-sidebar" to="/Configurator/logs">
        <li className="sidebar-list-item">
          <i class="fa-regular fa-file"></i> Logs
        </li>
      </NavLink>
      
      <NavLink className="a-sidebar" to="/Configurator/rules">
        <li className="sidebar-list-item">
        <i class="fa-solid fa-scale-balanced"></i> Rules
        </li>
      </NavLink>

            
      <NavLink className="a-sidebar" to="/Configurator/reports">
        <li className="sidebar-list-item">
        <i class="fa-solid fa-flag"></i> Reports
        </li>
      </NavLink>

      <NavLink className="a-sidebar" to="/Configurator/dispatcher">
          <li className="sidebar-list-item">
          <i class="fa-solid fa-circle-user"></i> Dispatcher
          </li>
        </NavLink>


      

      <a className="a-sidebar" href="/" onClick={signouthandle}>
        <li className="sidebar-list-item signout">
        <i class="fa-solid fa-arrow-right-from-bracket"></i> Sign out
        </li>
      </a>

      

    </ul>
  </aside>
  );
}

export default ConfiquratorSidebar;
