import React, { useState } from "react";
import "../../../styles/form.css";
import { STORAGE_KEY } from "../../../api/variables";

const RuleAdd = ({ closeAddRule }) => {
  const [inputs, setInputs] = useState({});

  const validateForm = () => {
    if (inputs.ruleName && inputs.keywords) return true;
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
      
      console.log(inputs);
      inputs.keywords= inputs.keywords.split(',');
      const response = await fetch("http://localhost:5000/rule/save", {
        method: "POST",
        body: JSON.stringify(inputs),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem(STORAGE_KEY)}`,
        },
      });

      if (!response.ok) {
        // Handle the case where the request was not successful, e.g., show an error message.
        throw new Error("Failed to add rule");
      }

      // Close the component after a successful request.
      closeAddRule();
    } catch (error) {
      console.error("Error adding rule:", error);
      // Handle the error, e.g., display an error message to the user.
    }
  };

  return (
    <div
      className="mainForm-container"
      onClick={(e) => {
        if (e.target.className === "mainForm-container") closeAddRule();
      }}
    >
      <div className="mainForm">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Rule Name: </label>
            <input
              type="text"
              name="ruleName"
              value={inputs.ruleName || ""}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Key Words: </label>
            <input
              type="text"
              name="keywords"
              value={inputs.keywords || ""}
              onChange={handleChange}
            />
          </div>

          <button type="submit" className="btn" onClick={handleSubmit}>
            Add
          </button>
        </form>
      </div>
    </div>
  );
};

export default RuleAdd;
