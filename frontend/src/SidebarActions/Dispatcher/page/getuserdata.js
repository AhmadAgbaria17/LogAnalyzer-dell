import React, { useState, useEffect } from "react";
import SmsSender from "../components/SmsSender";
import EmailSender from "../components/SendEmail";
// import IotSend from "./IotSend";
import SearchBar from "../components/SearchBar";
import CallPhone from "../components/CallPhone";
import "./getuserdata.css";
import { STORAGE_KEY } from "../../../api/variables";

function Fetchdata() {
  const [Users, setUsers] = useState([]); // Store selected user IDs
  const [selectedUsersData, setSelectedUsersData] = useState([]); // Store selected user details
  const [temp, setTemp] = useState(""); // Store user's choice (emails or sms)

  const [userOptions, setUserOptions] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  const [rulesOptions, setRulesOptions] = useState([
    {
      value: 0,
      label: "Send Email",
    },
    {
      value: 1,
      label: "Send SMS",
    },
    {
      value: 2,
      label: "Call Phone automatic",
    },
    // {
    //   value: 3,
    //   label: "IOT (send alert)",
    // }
  ]);

  useEffect(() => {
    // Fetch user data from the API
    fetch("http://localhost:5000/admin/get", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem(STORAGE_KEY),
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        // Transform the API data into the format required by react-select
        const options = data.map((user) => ({
          label: user.firstName + " " + user.lastName,
        }));
        setUserOptions(options);
        setUsers(data);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  }, []);

  function handleUserSelect(selectedUser) {
    setSelectedUser(selectedUser);
    const userselect = Users.find((user) => user.id === selectedUser.value);
    setSelectedUsersData(userselect);
  }

  function handleDispatcherSelect(selectedUser) {
    setTemp(selectedUser);
  }

  return (
    <div className="fetchdata-container">
      <div
        className="checkbox-list"
        style={{
          margin: "10px 0px 0px 0px ",
        }}
      >
        <h1 className="fetchdata-title">Users List</h1>
        <SearchBar
          text={"Select a user..."}
          Options={userOptions}
          setOptions={setUserOptions}
          onSelect={handleUserSelect}
        />
      </div>
      <div
        className="checkbox-options"
        style={{
          margin: "10px 0px 0px 0px ",
        }}
      >
        <h1 className="fetchdata-title">dispatcher options</h1>

        <SearchBar Options={rulesOptions} onSelect={handleDispatcherSelect} />
      </div>
      <div className="selected-users">
        {temp.value === 0 && (
          <EmailSender selectedUsersData={selectedUsersData} />
        )}
        {temp.value === 1 && (
          <SmsSender selectedUsersData={selectedUsersData} />
        )}
        {temp.value === 2 && (
          <CallPhone selectedUsersData={selectedUsersData} />
        )}
        {/* {temp.value === 3 && (
          <IotSend selectedUsersData={selectedUsersData} />
        )} */}
      </div>
    </div>
  );
}

export default Fetchdata;
