
import React from 'react';
import { Link } from 'react-router-dom';
import "../styles/landpage.css"
import LoginNavBar from '../comp/loginNavBar';


const headerStyle = {
  
  backgroundColor: "#263043",
  color: "white",
    textAlign: "center",
    padding: "100px 20px",
};

const headerText = {
    fontSize: "2.5rem",
    margin: "0",
};

const subHeaderText = {
    fontSize: "1.2rem",
    marginTop: "10px",
};

const btnStyle = {
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    padding: "10px 20px",
    cursor: "pointer",
    fontSize: "1rem",
    marginTop:"10px",
};

const featuresStyle = {
    margin: "40px auto",
    textAlign: "center",
};

const featureContainerStyle = {
    display: "flex",
    justifyContent: "space-around",
};

const featureStyle = {
    backgroundColor: "#263043",
    color:"white",
    padding: "20px",
    margin: "20px",
    borderRadius: "5px",
    boxShadow: "0px 3px 6px rgba(0, 0, 0, 0.1)",
    width: "30%",
    boxSizing: "border-box",
};

function LandPage() {
    return (
        <div>
            {/* Header */}
            <LoginNavBar/>
            <div className="login-header" style={headerStyle}>
                <h1 style={headerText}>Welcome to LogAnalyzer</h1>
                <p style={subHeaderText}>Discover amazing features!</p>
                <Link to="/signup"> 
                  <button  style={btnStyle}>Get Started</button>   </Link>
            </div>

            {/* Features */}
            <div className="features" style={featuresStyle}>
                <h2>Features</h2>
                <div className="feature-container" style={featureContainerStyle}>
                    {/* Feature 1: Log Error and Exception Tracking */}
                    <div className="feature" style={featureStyle}>
                        <h3> Log Error and Exception Tracking</h3>
                        <p>
                            LogAnalyzer allows you to track log errors and exceptions with
                            precision. Our AI-powered models provide advanced prediction and
                            analysis capabilities. You can easily identify and monitor issues
                            in your application, helping you maintain a high level of software
                            quality.
                        </p>
                    </div>

                    {/* Feature 2: Dispatcher for Alerting */}
                    <div className="feature" style={featureStyle}>
                        <h3> Dispatcher for Alerting</h3>
                        <p>
                            With LogAnalyzer, you can set up automated alerting systems using
                            our dispatcher feature. If the error level in your logs reaches a
                            dangerous threshold, LogAnalyzer can send SMS notifications or
                            make phone calls to your company's team, ensuring that critical
                            issues are addressed promptly.
                        </p>
                    </div>

                    {/* Feature 3: Customizable Insights */}
                    <div className="feature" style={featureStyle}>
                        <h3> Customizable Insights</h3>
                        <p>
                            LogAnalyzer goes beyond standard log analysis tools. Our platform
                            allows you to create custom insights tailored to your specific
                            needs. You can define your own metrics and visualize data in ways
                            that provide unique and valuable insights into your application's
                            performance.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LandPage;
