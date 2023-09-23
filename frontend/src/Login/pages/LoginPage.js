import Google from "../image/google.png";
import { Link } from "react-router-dom";
import React from "react";
import { useState, useContext, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../api/axios";
import LoginNavBar from "../comp/loginNavBar";
import { STORAGE_KEY } from "../../api/variables";
import { useSignIn } from "react-auth-kit";

const LoginPage = () => {
  const [user, setUser] = useState({});
  const navigate = useNavigate();
  const userRef = useRef();
  const errRef = useRef();
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const signIn = useSignIn();

  useEffect(() => {
    userRef.current.focus();
  }, []);
  useEffect(() => {
    setErrMsg("");
  }, [userName, password]);

  // const navigate = useNavigate();

  const submit = async () => {
    console.log(userName);
    console.log(password);
    try {
      const response = await axios.post(
        "/login/",
        JSON.stringify({ userName: userName, password: password }),
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      console.log(response);
      if (response.data.success === true) {
        signIn({
          token: response.data.token,
          expiresIn: 60 * 15, //15 mins
          tokenType: "Bearer",
          authState: response.data.role, //info about the user
        });
        localStorage.setItem(STORAGE_KEY, response.data.accessToken);
        console.log(localStorage.getItem(STORAGE_KEY));
        navigate("/" + response.data.role);
      }
      setPassword("");
    } catch (err) {
      if (!err?.response) {
        setErrMsg("No Server Response");
      } else if (err.response?.status === 400) {
        setErrMsg("Missing Username or Password");
      } else if (err.response?.status === 401) {
        setErrMsg("Unauthorized");
      } else {
        setErrMsg("Login Failed");
      }
      errRef.current.focus();
    }
  };

  const google = async () => {
    window.open("http://localhost:5000/googlelogin/google", "_self");
  };

  const signUp = () => {
    navigate("../Signup");
  };

  return (
    <div>
      <LoginNavBar />

      <div className="login">
        <h1 className="loginTitle">Choose a Login Method</h1>
        <div className="wrapper">
          <div className="left">
            <div className="loginButton google" onClick={google}>
              <img src={Google} alt="Google icon" className="icon" />
              Google
            </div>
            <div className="loginButton github center" onClick={signUp}>
              Sign Up
            </div>
          </div>
          <div className="center">
            <div className="line" />
            <div className="or">OR</div>
          </div>
          <div className="right">
            <p
              ref={errRef}
              className={errMsg ? "errmsg" : "offscreen"}
              aria-live="assertive"
            >
              {errMsg}
            </p>

            <input
              type="email"
              placeholder="Enter username"
              ref={userRef}
              autoComplete="off"
              onChange={(e) => setUserName(e.target.value)}
              value={userName}
              required
            />
            <input
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              required
            />
            <button className="submit" onClick={submit}>
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
