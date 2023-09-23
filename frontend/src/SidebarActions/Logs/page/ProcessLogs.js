import React, { useState ,useEffect  } from "react";
import { useParams } from "react-router-dom";
import AdminSidebar from "../../../AdminDashboard/comp/AdminSidebar";
import AdminHeader from "../../../AdminDashboard/comp/AdminHeader";
import "../../../styles/Table.css";
import ConfiquratorSidebar from "../../../ConfiquratorDashboard/comp/ConfiquratorSidebar";
import { STORAGE_KEY } from "../../../api/variables";

const ProcessLogs = (props) => {
  const { file_name } = useParams();

  
  const [logData, setLogData] = useState([{}]); // Initialize logData as null
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(`http://localhost:5000/logfiles/getprocess/${file_name}`, {
          method: "GET",
          headers: {
            Authorization: "Bearer " + localStorage.getItem(STORAGE_KEY),
            "Content-Type": "application/json",
          },
        });
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const jsonData = await response.json();
        setLogData(jsonData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData();
  }, [file_name]);







  

  // for the number of page
  const [currentpage, setcurrentpage] = useState(1);
  const recordsperPage = 15;
  const lastIndex = currentpage * recordsperPage;
  const firstIndex = lastIndex - recordsperPage;
  const records = logData && logData.process ? logData.process.slice(firstIndex, lastIndex) : [];
  const npage = logData && logData.process ? Math.ceil(logData.process.length / recordsperPage) : 0;  const numbers = [...Array(npage + 1).keys()].slice(1);

  return (
    <div className="App">
      {props.role==="admin"? <AdminSidebar/> : <ConfiquratorSidebar/>}
      <div className="App2">
      {props.role==="admin"? <AdminHeader role="Admin" /> : <AdminHeader role="Configurator" />}
        <main className="main-content">
          <div className="main-title">
            <h3>Process for {file_name}</h3>
            <br/>
          </div>
          <hr />

          <div className="logs-page">
            <table className="logs-table">
              <thead>
                <tr>
                  <th>Rules</th>
                  <th>Rank</th>
                  <th>Message</th>
                  <th>Date</th>
                  
                </tr>
              </thead>
              <tbody>
                {records.length > 0 &&
                  records.map((d, i) => (
                    <tr className="rowbody" key={i}>
                      <td>{d.rule}</td>
                      <td>{d.rank}</td>
                      <td>{d.message}</td>
                      <td>{d.date}</td>
                      
                    </tr>
                  ))}
              </tbody>
            </table>

            <nav>
              <ul className="pagination">
                <li className="page-item">
                  <a href="#" className="page-link" onClick={prePage}>
                    Prev
                  </a>
                </li>
                {numbers.map((n, i) => (
                  <li
                    className={`page-item ${currentpage === n ? "active" : ""}`}
                    key={i}
                  >
                    <a
                      href="#"
                      className="page-link"
                      onClick={() => changeCPage(n)}
                    >
                      {n}
                    </a>
                  </li>
                ))}
                <li className="page-item">
                  <a href="#" className="page-link" onClick={nextPage}>
                    Next
                  </a>
                </li>
          
              </ul>
            </nav>
          </div>


        
        </main>
      </div>
    </div>
  );

  function nextPage() {
    if (currentpage !== npage) {
      setcurrentpage(currentpage + 1);
    }
  }

  function prePage() {
    if (currentpage !== 1) {
      setcurrentpage(currentpage - 1);
    }
  }

  function changeCPage(id) {
    setcurrentpage(id);
  }
};

export default ProcessLogs;
