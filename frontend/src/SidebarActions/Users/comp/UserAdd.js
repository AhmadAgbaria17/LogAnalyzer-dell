import React, { useState } from "react";
import "../../../styles/form.css";
import { STORAGE_KEY } from "../../../api/variables";
const UserAdd = ({closeAddUser}) => {

  const [inputs, setInputs] = useState({});
  

  const validateForm=()=>{
    if(inputs.userName&&inputs.firstName && inputs.lastName &&inputs.email&& inputs.phone)
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
  
    try {
      console.log(localStorage.getItem(STORAGE_KEY))
      const response = await fetch('http://localhost:5000/admin/save', {
        method: 'POST',
        body: JSON.stringify(inputs),
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem(STORAGE_KEY)}`,
        },
      });
      console.log(response)
  
      if (!response.ok) {
        // Handle the case where the request was not successful, e.g., show an error message.
        throw new Error('Failed to add user');
      }
  
      // Close the form after a successful request.
      closeAddUser();
    } catch (error) {
      console.error('Error adding user:', error);
      // Handle the error, e.g., display an error message to the user.
    }
  };
  

  return (
    <div className="mainForm-container" onClick={(e)=>{
      if(e.target.className==="mainForm-container")
      closeAddUser();
    }}>
      <div className="mainForm">
        <form onSubmit={handleSubmit}>
      
          <div className="form-group">
            <label>User Name: </label>
            <input type="text"  name="userName"   value={inputs.userName || ""} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label >First Name: </label>
            <input type="text" name="firstName"  value={inputs.firstName || ""} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label >Last Name: </label>
            <input type="text"  name="lastName"  value={inputs.lastName || ""} onChange={handleChange}/>
          </div>
          <div className="form-group"> 
            <label >Email: </label>
            <input type="text"  name="email" value={inputs.email || ""} onChange={handleChange}/>
          </div>
          <div className="form-group">
            <label >phone: </label>
            <input type="text" name="phone" value={inputs.phone || ""} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label >Role: </label>
            <select   name="role" value={inputs.role || ""} onChange={handleChange} >
              <option value="Admin">Admin</option>
              <option value="Configurator">Configurator</option>
              <option value="Viewer">Viewer</option>
            </select>
          </div>
          <button type="submit" className="btn" onClick={handleSubmit}>Add</button>
        </form>
      </div>
    </div>
  );
};

export default UserAdd;
