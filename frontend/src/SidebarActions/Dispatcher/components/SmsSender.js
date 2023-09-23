
// frontend/src/SendSMS.js
import React, { useState } from 'react';
import "./SmsSender.css"; 

function SmsSender({ selectedUsersData }) {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [message, setMessage] = useState('');
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  console.log(selectedUsersData);

  const handleSendSMS = async () => {

    try {
      const response = await fetch('http://localhost:8080/sendsms', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ phoneNumber:selectedUsersData.phoneNumber , text:message }),
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
      setError('Failed to send email');
    }
  };

  return (
    <div className="send-sms-container">
      <h1 className="send-sms-title">Send SMS</h1>
      <input
        type="text"
        placeholder="Phone Number"
        className="input-field"
        value={selectedUsersData.phoneNumber || ""}
        onChange={(e) => setPhoneNumber(e.target.value)}
        readOnly 
      />
      <textarea
        type="text"
        placeholder="Message"
        className="input-field"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button className="button" onClick={handleSendSMS}>Send SMS</button>
      {success && <p className="success-message">Message sent successfully</p>}
      {error && <p className="error-message">Error: {error}</p>}
    </div>
  );
}

export default SmsSender;




