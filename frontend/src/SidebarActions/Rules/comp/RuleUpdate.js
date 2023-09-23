import React, { useState } from "react";
import "../../../styles/form.css";
import { STORAGE_KEY } from "../../../api/variables";


const RuleUpdate = ({closeEditRule,defaultValue}) => {

  const [inputs, setInputs] = useState(defaultValue||{});

  const validateForm=()=>{
    if(inputs.ruleName&&inputs.keywords)
    return true;
  return false
  }

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs(values => ({...values, [name]: value}))
  }


  
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!validateForm()) return;
    console.log("hellooo");

    try {
      inputs.keywords= inputs.keywords.split(',');

      const response = await fetch("http://localhost:5000/rule/update", {
        method: "PUT",
        body: JSON.stringify(inputs),
        headers: {
          Authorization: "Bearer " + localStorage.getItem(STORAGE_KEY),   
          "Content-Type": "application/json",
        },
      });
  
      if (!response.ok) {
        // Handle the case where the request was not successful, e.g., show an error message.
        throw new Error("Failed to update rule");
      }
  
      // Close the component after a successful request.
      closeEditRule();
    } catch (error) {
      console.error("Error updating rule:", error);
      // Handle the error, e.g., display an error message to the user.
    }
  };
  


  return (
    <div className="mainForm-container" onClick={(e)=>{
      if(e.target.className==="mainForm-container")
      closeEditRule();
    }}>
      <div className="mainForm">
        <form onSubmit={handleSubmit}>

        
          
          <div className="form-group">
            <label>Rule Name: </label>
            <input type="text"  name="rule_name"   value={inputs.ruleName || ""} onChange={handleChange} disabled />
          </div>

          <div className="form-group">
            <label >Key Words: </label>
            <input type="text" name="keywords"  value={inputs.keywords || ""} onChange={handleChange} />
          </div>
          

          <button type="submit" className="btn" onClick={handleSubmit}>Update</button>
        </form>
      </div>
    </div>
  );
}

export default RuleUpdate;
