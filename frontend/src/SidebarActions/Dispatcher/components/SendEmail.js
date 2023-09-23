
// frontend/src/SendEmail.js
import React, { useState } from 'react';
import "./SendEmail.css"; 

function SendEmail({ selectedUsersData }) {
  const [email, setEmail] = useState('');
  const [emailSubject, setEmailSubject] = useState('');
  const [emailMessage, setEmailMessage] = useState('');
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSendEmail = async () => {
    try {
      const response = await fetch('http://localhost:8080/sendemail', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ to: selectedUsersData.email, subject: emailSubject, text: emailMessage }),
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
    <div className="send-email-container">
      <h1 className="send-email-title">Send Email</h1>
      <input
        type="email"
        placeholder="Recipient Email"
        className="input-field"
        value={selectedUsersData.email || ""}
        onChange={(e) => setEmail(e.target.value)}
        readOnly 
      />
      <input
        type="text"
        placeholder="Email Subject"
        className="input-field"
        value={emailSubject}
        onChange={(e) => setEmailSubject(e.target.value)}
      />
      <textarea
        placeholder="Email Message"
        className="input-field"
        value={emailMessage}
        onChange={(e) => setEmailMessage(e.target.value)}
      />
      <button className="button" onClick={handleSendEmail}>Send Email</button>
      {success && <p className="success-message">Email sent successfully</p>}
      {error && <p className="error-message">Error: {error}</p>}
    </div>
  );
}

export default SendEmail;
