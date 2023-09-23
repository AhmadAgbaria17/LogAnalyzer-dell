import React, { useState, useEffect } from "react";
import AdminHeader from "../../../AdminDashboard/comp/AdminHeader";
import AdminSidebar from "../../../AdminDashboard/comp/AdminSidebar";
import { STORAGE_KEY } from "../../../api/variables";

const JiraHome = () => {
  const [inputs, setInputs] = useState({});

  useEffect(() => {
    fetchData();
  }, []);
  async function fetchData() {
    try {
      const response = await fetch(
        "http://localhost:5000/companyInfo/getInfo",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem(STORAGE_KEY),
          },
        }
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const jsonData = await response.json();
      setInputs(jsonData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  const handleChange = (event) => {
    event.persist(); // Persist the event to keep the reference

    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
    console.log(inputs);
  };
  function ggg() {}
  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(`req.body  ${JSON.stringify(inputs)}`);
    try {
      const response = await fetch(
        "http://localhost:5000/companyInfo/updateInfo",
        {
          method: "PUT",
          body: JSON.stringify(inputs),
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem(STORAGE_KEY)}`,
          },
        }
      );

      if (!response.ok) {
        // Handle the case where the request was not successful, e.g., show an error message.
        throw new Error("Failed to update user");
      }

      // Close the component after a successful request.
    } catch (error) {
      console.error("Error updating user:", error);
      // Handle the error, e.g., display an error message to the user.
    }
  };

  return (
    <div className="App">
      <AdminSidebar />

      <div className="App2">
        <AdminHeader role="Admin" />

        <main className="main-content">
          <div className="main-title">
            <h3>Company Info</h3>
            <br />
          </div>
          <hr />
          <br />

          <center>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>jira BaseUrl: </label>
                <input
                  type="text"
                  name="jiraBaseUrl"
                  value={inputs.jiraBaseUrl || ""}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label>jira Email: </label>
                <input
                  type="text"
                  name="jiraEmail"
                  value={inputs.jiraEmail || ""}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label>api Token: </label>
                <input
                  type="text"
                  name="apiToken"
                  value={inputs.apiToken || ""}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label>Project Key: </label>
                <input
                  type="text"
                  name="projectKey"
                  value={inputs.projectKey || ""}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label>IOT ip: </label>
                <input
                  type="text"
                  name="IOT_ip"
                  value={inputs.IOT_ip || ""}
                  onChange={handleChange}
                />
              </div>

              <button type="submit" className="btn" onClick={handleSubmit}>
                Send
              </button>
            </form>
          </center>
        </main>
      </div>
    </div>
  );
};

export default JiraHome;
