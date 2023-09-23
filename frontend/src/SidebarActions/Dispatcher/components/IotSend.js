
// frontend/src/SendIOT.js
import React, { useState } from 'react';
import "./IotSend.css"; 

function SendIOT({ selectedUsersData}) {
  const [IP, setIP] = useState('');
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSendIOT = async () => {
    try {
      const response = await fetch('http://localhost:8080/sendIoT', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({  iotIp:selectedUsersData.iotId, ErrorDetails: "Have log error" }),
      });

      if (response.ok) {
        setSuccess(true);
        setError('');
      } else {
        setSuccess(false);
        const data = await response.json();
        setError(data.message);
      }
    } catch (err) {
      console.error(err);
      setError('Failed to send IOT');
    }
  };

  return (
    <div className="send-IOT-container">
      <h1 className="send-IOT-title">Send IOT</h1>
      
      <input
        type="text"
        placeholder="IP IOT"
        className="input-field"
        value={selectedUsersData.iotId || ""}
        onChange={(e) => setIP(e.target.value)}
        readOnly
      />
    
      <button className="button" onClick={handleSendIOT}>Send IOT</button>
      {success && <p className="success-message">IOT sent successfully</p>}
      {error && <p className="error-message">Error: {error}</p>}
    </div>
  );
}

export default SendIOT;
