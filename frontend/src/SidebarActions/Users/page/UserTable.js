import React, { useState, useEffect } from "react";
import AdminSidebar from "../../../AdminDashboard/comp/AdminSidebar";
import AdminHeader from "../../../AdminDashboard/comp/AdminHeader";
import "../../../styles/Table.css";
import UserAdd from "../comp/UserAdd";
import UserUpdate from "../comp/UserUpdate";
import { STORAGE_KEY } from "../../../api/variables";

const UserTable = () => {
  const [data, setData] = useState([{}]);

  
  useEffect(() => {
    fetchData();
  }, []);
  async function fetchData() {
    try {
      console.log("aaaaaaaaaaaaaaaaaaaaaaa")
      const response = await fetch("http://localhost:5000/admin/get", {
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

  //for open adduser comp
  const [compAddUser, setCompAddUser] = useState(false);
  const [compEditUser, setCompEditUser] = useState(false);

  const [rowToEdit, setRowToEdit] = useState(null);

  const handleDelete = (idx) => {
    fetch(`http://localhost:5000/admin/delete/${idx}`, {
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
        fetchData();
        console.log("Deleted successfully");
      })
      .catch((error) => {
        console.error("Error deleting user:", error);
      });
  };

  const handleEditRow = (idx) => {
    setRowToEdit(idx);

    setCompEditUser(true);
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
      <AdminSidebar />

      <div className="App2">
        <AdminHeader role="Admin" />

        <main className="main-content">
          <div className="main-title">
            <h3>Users Table</h3>
            <br/>
          </div>
          <hr />

          <div className="logs-page">
            <table className="logs-table">
              <tr>
                <th>User Name</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Role</th>
                <th>Actions</th>
              </tr>

              {records.length &&
                records.map((d, i) => (
                  <tr className="rowbody" key={i}>
                    <td>{d.userName}</td>
                    <td>{d.firstName}</td>
                    <td>{d.lastName}</td>
                    <td>{d.email}</td>
                    <td>{d.phone}</td>
                    <td>{d.role}</td>
                    <td>
                      <i
                        class="fa-regular fa-pen-to-square editbtn"
                        onClick={() => handleEditRow(i)}
                      ></i>{" "}
                      <i
                        class="fa-solid fa-trash deletebtn"
                        onClick={() => {
                          handleDelete(d.userName);
                        }}
                      ></i>
                    </td>
                  </tr>
                ))}
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
                <button
                  className="AddTable"
                  onClick={() => setCompAddUser(true)}
                >
                  Add
                </button>
              </ul>
            </nav>
          </div>

          <div>
            {compAddUser && (
              <UserAdd
                closeAddUser={() => {
                  setCompAddUser(false);
                  fetchData();
                }}
              />
            )}
          </div>

          <div>
            {compEditUser && (
              <UserUpdate
                closeEditUser={() => {
                  setCompEditUser(false);
                  setRowToEdit(null);
                  fetchData();
                }}
                defaultValue={rowToEdit !== null && data[rowToEdit]}
              />
            )}
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

export default UserTable;
