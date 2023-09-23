import { useState, useEffect } from "react";
import AdminSidebar from "../../../AdminDashboard/comp/AdminSidebar";
import ConfiquratorSidebar from "../../../ConfiquratorDashboard/comp/ConfiquratorSidebar";
import AdminHeader from "../../../AdminDashboard/comp/AdminHeader";
import Select from "react-select";
import "./Loading.css";
import { useNavigate } from "react-router-dom";
import { STORAGE_KEY } from "../../../api/variables";

const MainPage = (props) => {
  const [ruleOptions, setRuleOptions] = useState([]);
  const [documentOptions, setDocumentOptions] = useState([]);

  const [selectedRules, setSelectedRules] = useState([]);
  const [selectedDocument, setSelectedDocument] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // useHistory to navigate to the second page
  const navigate = useNavigate();
  const [analyzation, setAnalyzation] = useState(null);

  const handleRuleSelectChange = (selectedRules) => {
    setSelectedRules(selectedRules);
  };

  const handleDocumentSelectChange = (selectedOption) => {
    setSelectedDocument(selectedOption); // Set the selected document
  };

  //useEffect to get the log files and rules from the backend
  useEffect(
    () =>
      async function () {
        //GET http request to get all the avaiable rules and files
        await fetch("http://localhost:5000/ruleGroup", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem(STORAGE_KEY)}`,
            },
        })
          .then((response) => response.json())
          .then((data) => {
            setRuleOptions(
              data.map((rule) => ({
                value: rule.ruleName,
                label: rule.ruleName,
              }))
            );
          });

        await fetch("http://localhost:5000/log", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem(STORAGE_KEY)}`,
            },
        })
          .then((response) => response.json())
          .then((data) =>
            setDocumentOptions(
              data.map((file) => ({ value: file, label: file }))
            )
          );
      },
    []
  );

  const handleSubmit = () => {
    if (selectedRules.length === 0) {
      alert("You should choose at least one rule");
      return;
    }

    if (!selectedDocument) {
      alert("Please choose a document");
      return;
    }

    setIsLoading(true);

    const dataToSend = {
      selectedRules: selectedRules.map((option) => option.value),
      selectedDocument: selectedDocument.value, // Use the selected document value
    };
    console.log(dataToSend);

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem(STORAGE_KEY)}`,},
      body: JSON.stringify(dataToSend),
      
    };

    if (dataToSend) {
      fetch("http://localhost:5000/analyze", requestOptions)
        .then((response) => response.json())
        .then((data) => {
          setAnalyzation(data);
          setTimeout(() => {
            console.log("Data to send to the backend:", dataToSend);
            setIsLoading(false);
            navigate("/admin/analyzefile/analyze", { state: { data } });
          }, 2000);
        });
    }
  };

  const handleCancel = () => {
    setSelectedRules([]);
    setSelectedDocument(null); // Reset selected document
  };
  return (
    <div className="App">
      {props.role === "admin" ? <AdminSidebar /> : <ConfiquratorSidebar />}
      <div className="App2">
        {props.role === "admin" ? (
          <AdminHeader role="Admin" />
        ) : (
          <AdminHeader role="Configurator" />
        )}
        <main className="main-content">
          <div className="main-title">
            <h3>Analyze File</h3>
            <br />
          </div>
          <hr />
          <div>
            <br/>
            <h1>Select Rules and Document</h1>
            <div>
              <label>Rules:</label>
              <br/>
              <br/>
              <Select className="select-analyze"
                isMulti
                options={ruleOptions}
                value={selectedRules}
                onChange={handleRuleSelectChange}
              />
              <br/>
              <br/>
            </div>
            <div>
              <label>Files:</label>
              <br/>
              <br/>
              <Select className="select-analyze"
                options={documentOptions}
                value={selectedDocument}
                onChange={handleDocumentSelectChange}
              />
            </div>
            <br />
            <button className="analize-btn" onClick={handleSubmit} disabled={isLoading}>
              {isLoading ? (
                <div className="loading-overlay">
                  <div className="loading-bars">
                    <div className="loading-bar">L</div>
                    <div className="loading-bar">o</div>
                    <div className="loading-bar">a</div>
                    <div className="loading-bar">d</div>
                    <div className="loading-bar">i</div>
                    <div className="loading-bar">n</div>
                    <div className="loading-bar">g</div>
                  </div>
                </div>
              ) : (
                "Submit"
              )}
            </button>
            <button className="analize-btn" onClick={handleCancel}>Cancel</button>
          </div>
        </main>
      </div>
    </div>
  );
};

export default MainPage;
