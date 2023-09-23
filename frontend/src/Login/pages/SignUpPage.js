import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/sign.css";
import axios from "axios";
import LoginNavBar from "../comp/loginNavBar";

// Function to check password strength
const checkPasswordStrength = (password) => {
  const minLength = 6;
  const minUpperCase = 1;
  const minLowerCase = 1;
  const minNumbers = 1;

  if (password.length < minLength) {
    return "Password must be at least 8 characters long.";
  }

  if (password.replace(/[^A-Z]/g, "").length < minUpperCase) {
    return "Password must contain at least one uppercase letter.";
  }

  if (password.replace(/[^a-z]/g, "").length < minLowerCase) {
    return "Password must contain at least one lowercase letter.";
  }

  if (password.replace(/[^0-9]/g, "").length < minNumbers) {
    return "Password must contain at least one number.";
  }

  return "Password is strong!"; // Password meets all criteria
};

function SignUpPage() {
  // States for registration
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhonenun] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [passwordMismatchError, setPasswordMismatchError] = useState(false);
  const [emptyError, setEmptyError] = useState(false);
  const [sub, setSub] = useState("");

  // States for checking the errors
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(false);

  // State for password strength error message
  const [passwordStrengthError, setPasswordStrengthError] = useState("");

  // State to store the result of password strength check
  const [passwordStrength, setPasswordStrength] = useState("");

  const extractEmailDomain = (email) => {
    const domain = email.substring(
      email.lastIndexOf("@") + 1,
      email.lastIndexOf(".")
    );
    return domain;
  };

  // Handling the name change
  const handleFName = (e) => {
    setFirstName(e.target.value);
    setSubmitted(false);
  };

  // Handling the name change
  const handleLName = (e) => {
    setLastName(e.target.value);
    setSubmitted(false);
  };

  // Handling the name change
  const handleUserName = (e) => {
    setUserName(e.target.value);
    setSubmitted(false);
  };

  const handleEmail = (e) => {
    setEmail(e.target.value);
    setError(""); // reset the error
    setSubmitted(false);
  };

  const handleSub = (e) => {
    setSub(e.target.value);
    setSubmitted(false);
  };

  // Handling the password change
  const handlePassword = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    setSubmitted(false);
    // Check password strength
    const strengthError = checkPasswordStrength(newPassword);
    setPasswordStrengthError(strengthError);
  };

  const handlePhone = (e) => {
    setPhonenun(e.target.value);
    setSubmitted(false);
  };

  const handleCompany = (e) => {
    setCompanyName(e.target.value);
    setError(""); // reset the error
    setSubmitted(false);
  };

  const passwordMismatchMessage = () => {
    return (
      <div
        className="error"
        style={{
          display: passwordMismatchError ? "" : "none",
        }}
      >
        <h1>Passwords do not match!</h1>
      </div>
    );
  };

  const empty = () => {
    return (
      <div
        className="error"
        style={{
          display: emptyError ? "" : "none",
        }}
      >
        <h1>Please fill out all the fields!</h1>
      </div>
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const emailDomain = extractEmailDomain(email);

    if (
      firstName === "" ||
      phone === "" ||
      lastName === "" ||
      userName === "" ||
      email === "" ||
      sub === ""
    ) {
      setError("Please enter all the fields");
      return;
      // } else if (companyName.toLowerCase() !== emailDomain.toLowerCase()) {
      //    setError("Please use your company email.");
      //     return;
    } else if (password !== passwordConfirm) {
      setPasswordMismatchError(true);
      return; // Stop execution if passwords don't match
    } else if (passwordStrengthError !== "Password is strong!") {
      setError(passwordStrengthError);
      return;
    } else {
      const url = "http://localhost:5000/signup/";

      const data = {
        firstName,
        lastName,
        userName,
        email,
        phone,
        password,
        passwordConfirm,
        companyName,
        sub,
      };
      console.log(data);

      axios
        .post(url, data)
        .then((response) => {
          console.log(response.data);
          navigate("/login");
        })
        .catch((error) => {
          if (
            error.response &&
            error.response.data &&
            error.response.data.errors
          ) {
            const errorMessage = Object.values(error.response.data.errors)[0];
            setError(errorMessage);
          } else {
            setError(
              error.message || "Something went wrong. Please try again."
            );
          }
        });
    }
  };

  const handleConfirmPasswordChange = (event) => {
    setPasswordConfirm(event.target.value);
  };

  // Showing success message
  const successMessage = () => {
    return (
      <div
        className="success"
        style={{
          display: submitted ? "" : "none",
        }}
      >
        <h1>User {firstName + " " + lastName} successfully registered!</h1>
      </div>
    );
  };

  const errorMessage = (message) => {
    return (
      <div className="error" style={{ display: message ? "" : "none" }}>
        <h1>{message}</h1>
      </div>
    );
  };

  return (
    <div>
      <LoginNavBar />
      <center className="cont-signup">
        <div>
          <h1>User Registration</h1>
        </div>

        <div className="messages">
          {errorMessage(error)}
          {successMessage()}
          {passwordMismatchMessage()}
          {empty()}
        </div>

        <form>
          {/* Labels and inputs for form data */}
          <label className="label">First Name</label>
          <input
            onChange={handleFName}
            className="input"
            value={firstName}
            type="text"
          />
          <br></br>

          <label className="label">Last Name</label>
          <input
            onChange={handleLName}
            className="input"
            value={lastName}
            type="text"
          />
          <br></br>

          <label className="label">user Name</label>
          <input
            onChange={handleUserName}
            className="input"
            value={userName}
            type="text"
          />
          <br></br>

          <label className="label">Company name</label>
          <input
            onChange={handleCompany}
            className="input"
            value={companyName}
            type="text"
          />
          <br />

          <label className="label">Phone number</label>
          <input
            onChange={handlePhone}
            className="input"
            value={phone}
            type="text"
          />
          <br></br>

          <label className="label">Email</label>
          <input
            onChange={handleEmail}
            className="input"
            value={email}
            type="email"
          />
          <br></br>

          <label className="label">Password</label>
          <input
            onChange={handlePassword}
            className="input"
            value={password}
            type="password"
          />
          <br></br>
          {/* Display the password strength error */}
          {passwordStrengthError && (
            <div className="password error">
              <div className="password-strength-error">
                {passwordStrengthError}
              </div>
            </div>
          )}

          <label className="label">Confirm password</label>
          <input
            onChange={handleConfirmPasswordChange}
            className="input"
            value={passwordConfirm}
            type="password"
          />
          <br></br>

          <label className="label">Choose a Subscription</label>
          <select onChange={handleSub} className="select">
            <option value="">Select Subscription</option>
            <option value="basic">Basic Subscription</option>
            <option value="standard">Standard Subscription</option>
            <option value="premium">Premium Subscription</option>
          </select>

          <button onClick={handleSubmit} className="btn" type="submit">
            Submit
          </button>
        </form>
      </center>
    </div>
  );
}
export default SignUpPage;
