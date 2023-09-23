import React, { useState,useEffect } from "react";
import "../../styles/header.css";
import { STORAGE_KEY } from "../../api/variables";

const AdminHeader = (props) => {


  const [data, setData] = useState([{}]);


  useEffect(() => {
    fetchData();
  }, []);
  async function fetchData() {
    try {
      const response = await fetch("http://localhost:5000/login/getuser", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem(STORAGE_KEY),
        },
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const jsonData = await response.json();
      setData(jsonData);

    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }


  const [notifications, setNotifications] = useState([{}]);
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("http://localhost:5000/notifications", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const jsonData = await response.json();
        setNotifications(jsonData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
  
    fetchData();
  }, []);

  

  const [compUploadPic, setCompUploadPic] = useState(false);
  const [newImageURL, setNewImageURL] = useState("");
  const [compNotifications, setCompNotifications] = useState(false);

  const toggleUploadPic = () => {
    if (compNotifications) setCompNotifications(false);
    setCompUploadPic((prevState) => !prevState);
  };

  const toggleNotifications = () => {
    if (compUploadPic) setCompUploadPic(false);
    setCompNotifications((prevState) => !prevState);
  };


  const handleDeleteNotification = (id) => {
    setNotifications((prevNotifications) =>
      prevNotifications.filter((notif) => notif._id !== id)
    );
    // we need to fetch to backend
  };

  return (
    <header>
      <div className="header">
        <div className="leftheader">
          <h3>{props.role} Dashboard</h3>
        </div>
        <div className="rightheader">
            <span>
            {data.firstName} {data.lastName}
          </span>
          <i className="fa-regular fa-bell" onClick={toggleNotifications}></i>
        
        </div>
      </div>
  

      {compNotifications && (
        <div className="notf-container">
          <div className="notf-header">
            <h4>Notifications</h4>
            <i className="fa-solid fa-times" onClick={toggleNotifications}></i>
          </div>
          <div className="notf-list">
            {notifications.length > 0 ? (
              <div className="scrollable-notifications">
                {notifications.map((notif) => (
                  <div className="notification" key={notif._id}>
                    <div className="notification-content">
                      <div>
                        <strong>From: {notif.from}</strong>
                      </div>
                      <div>{notif.message}</div>
                    </div>
                    <button
                      className="delete-button"
                      onClick={() => handleDeleteNotification(notif._id)}
                    >
                      Delete
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <p>No notifications</p>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default AdminHeader;
