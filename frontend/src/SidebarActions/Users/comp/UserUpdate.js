import React, { useState } from "react";
import "../../../styles/form.css";
import { STORAGE_KEY } from "../../../api/variables";

const UserUpdate = ({ closeEditUser, defaultValue }) => {
  const [inputs, setInputs] = useState(defaultValue || {});

  const validateForm = () => {
    if (
      inputs.userName &&
      inputs.firstName &&
      inputs.lastName &&
      inputs.email &&
      inputs.phone
    )
      return true;
    return false;
  };

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!validateForm()) return;

    try {
      const response = await fetch("http://localhost:5000/admin/update", {
        method: "PUT",
        body: JSON.stringify(inputs),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem(STORAGE_KEY)}`,
        },
      });

      if (!response.ok) {
        // Handle the case where the request was not successful, e.g., show an error message.
        throw new Error("Failed to update user");
      }

      // Close the component after a successful request.
      closeEditUser();
    } catch (error) {
      console.error("Error updating user:", error);
      // Handle the error, e.g., display an error message to the user.
    }
  };

  return (
    <div
      className="mainForm-container"
      onClick={(e) => {
        if (e.target.className === "mainForm-container") closeEditUser();
      }}
    >
      <div className="mainForm">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>User Name: </label>
            <input
              type="text"
              name="userName"
              value={inputs.userName || ""}
              onChange={handleChange}
              disabled
            />
          </div>
          <div className="form-group">
            <label>First Name: </label>
            <input
              type="text"
              name="firstName"
              value={inputs.firstName || ""}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>Last Name: </label>
            <input
              type="text"
              name="lastName"
              value={inputs.lastName || ""}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>Email: </label>
            <input
              type="text"
              name="email"
              value={inputs.email || ""}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>Phone: </label>
            <input
              type="text"
              name="phone"
              value={inputs.phone || ""}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>Role: </label>
            <select
              name="role"
              value={inputs.role || ""}
              onChange={handleChange}
            >
              <option value="Admin">Admin</option>
              <option value="Configurator">Configurator</option>
              <option value="Viewer">Viewer</option>
            </select>
          </div>
          <button type="submit" className="btn" onClick={handleSubmit}>
            Update
          </button>
        </form>
      </div>
    </div>
  );
};

export default UserUpdate;
