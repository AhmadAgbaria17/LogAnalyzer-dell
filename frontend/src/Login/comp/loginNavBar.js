import React from "react";
import { Link } from "react-router-dom";

const LoginNavBar = () => {
  return (
    <div>
      <div className="navbar">
        <span className="logo">
          <Link className="link" to="/">
            Log Analayzer
          </Link>
        </span>

        <Link className="link" to="/login">
          Login
        </Link>
      </div>
    </div>
  );
};

export default LoginNavBar;
