import { useState, useEffect } from "react";
import "../../../styles/Table.css";
import { Link, useHistory } from "react-router-dom";
import AdminHeader from "../../../AdminDashboard/comp/AdminHeader";
import AdminSidebar from "../../../AdminDashboard/comp/AdminSidebar";
import ConfiquratorSidebar from "../../../ConfiquratorDashboard/comp/ConfiquratorSidebar";
import { STORAGE_KEY } from "../../../api/variables";

const Logs = (props) => {
  //  get data from the backend

  const [data, setData] = useState([{}]);

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    try {
      console.log("bbbbbbbbbbbbbbbbbbb")

      let response = await fetch("http://localhost:5000/logfiles/get", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem(STORAGE_KEY),

        },
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const jsonData = await response.json();
      setData(jsonData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }


  const handleDelete = (idx) => {
    fetch(`http://localhost:5000/logfiles/delete/${idx}`, {
      method: "DELETE",
      headers: {
        Authorization: "Bearer " + localStorage.getItem(STORAGE_KEY),
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        console.log("Deleted successfully")
        fetchData();
      })
      .catch((error) => {
        console.error("Error deleting log:", error);
      });
  };

  //for the number of page
  const [currentpage, setcurrentpage] = useState(1);
  const recordsperPage = 5;
  const lastIndex = currentpage * recordsperPage;
  const firstIndex = lastIndex - recordsperPage;
  const records = data.slice(firstIndex, lastIndex);
  const npage = Math.ceil(data.length / recordsperPage);
  const numbers = [...Array(npage + 1).keys()].slice(1);

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
            <h3>Logs Table</h3>
            <br />
          </div>
          <hr />
          <div className="logs-page">
            <table className="logs-table">
              <thead>
                <tr>
                  <th>User Name</th>
                  <th>File Name</th>
                  <th>File Date</th>
                  <th>Process</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {records.map((d, i) => (
                  <tr key={d.file_name} className="rowbody">
                    <td>{d.userName}</td>
                    <td>{d.file_name}</td>
                    <td>{d.file_date}</td>
                    <td>
                      <Link
                        to={
                          
                          props.role === "admin"
                            ? `/admin/process-logs/${d.file_name}`
                            : `/Configurator/process-logs/${d.file_name}`
                        }
                      >
                        <button className="processBTN">Show</button>
                      </Link>
                    </td>
                    <td>
                      <i
                        class="fa-solid fa-trash deletebtn"
                        onClick={() => {handleDelete(d.file_name)}}
                      ></i>
                    </td>
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

export default Logs;
