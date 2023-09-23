import React from 'react';
import AdminSidebar from '../../../AdminDashboard/comp/AdminSidebar';
import ConfiquratorSidebar from '../../../ConfiquratorDashboard/comp/ConfiquratorSidebar';
import AdminHeader from '../../../AdminDashboard/comp/AdminHeader';
import Fetchdata from './getuserdata';
import reportWebVitals from './reportWebVitals';


const DispatcherHome = (props) => {
  reportWebVitals();

  return (
    <div className="App">
    {props.role === "admin" ? <AdminSidebar /> : <ConfiquratorSidebar />}

    <div className="App2">
      {props.role === "admin" ? (
        <AdminHeader role="Admin" />
      ) : (
        <AdminHeader role="Configurator" />
      )}

      <main className="main-content">

      <div className="main-title">
            <h3>Dispatcher</h3>
            <br/>
          </div>
          <hr />

    
      <Fetchdata />

      

      
      </main>
    </div>
  </div>);

  
}

export default DispatcherHome;
