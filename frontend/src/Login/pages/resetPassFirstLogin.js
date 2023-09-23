import React, { useState } from "react";
import axios from "../../api/axios";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import LoginNavBar from "../comp/loginNavBar";

const ResetPassFirstLogin = () => {
  const navigate = useNavigate();
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const { username } = useParams();
  const handleSubmit = async (e) => {
    console.log(username);

    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setError("Passwords don't match");
      return;
    }

    try {
      // Replace this URL with your backend endpoint
      const response = await axios.post(
        "/changePassword",
        JSON.stringify({
          oldPassword: oldPassword,
          newPassword: newPassword,
          username: username,
        }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      console.log(response?.data.success);
      if (response?.data.status === "success") {
        setSuccess("Password changed successfully");
        navigate("/home");
      } else if (response?.data.status === "incorrect old password") {
        setError("incorrect old password");
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div>
      <LoginNavBar />
      <div className="RestPassCont">
        <form onSubmit={handleSubmit}>
          <div>
            <h1>Change Password</h1>
            {error && <div className="error">{error}</div>}
            {success && <div className="success">{success}</div>}
            <label>Old Password:</label>
            <input
              type="password"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              required
            />
          </div>
          <div>
            <label>New Password:</label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Confirm Password:</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit">Change Password</button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassFirstLogin;
