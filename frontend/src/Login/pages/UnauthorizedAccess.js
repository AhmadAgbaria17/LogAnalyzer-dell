import React from "react";
import { Link, useNavigate } from "react-router-dom";

const unauthorizedAccessStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "calc(100vh - 100px)",
};

const buttonStyle = {
    margin: "10px",
    padding: "10px 20px",
    fontSize: "16px",
    borderRadius: "5px",
    cursor: "pointer",
    border: "none",
    backgroundColor: "#007BFF",
    color: "#fff",
};

const UnauthorizedAccess = () => {
    const navigate = useNavigate();

    const handleLoginRedirect = () => {
        navigate("/login");
    };

    const handleSignUpRedirect = () => {
        navigate("/signup");
    };

    return (
        <div style={unauthorizedAccessStyle}>
            <h2>You are not logged in!</h2>
            <p>You need to be logged in to access this page.</p>
            <p>Would you like to:</p>
            <button style={buttonStyle} onClick={handleLoginRedirect}>
                Login
            </button>
            <span>or</span>
            <button style={buttonStyle} onClick={handleSignUpRedirect}>
                Sign Up
            </button>
        </div>
    );
};

export default UnauthorizedAccess;
