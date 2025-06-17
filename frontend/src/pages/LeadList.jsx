import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import useFetch from "../useFetch";
import { Link } from "react-router-dom";
import Loading from "../components/Loading";

// function getAllLeads(url,setLeads){
//   fetch("http://localhost:3000/api/v1/leads")
//   .then(res=>res.json())
//   .then(data=>setLeads(data))
//   .catch(error=>console.error(error))
// }

const LeadList = () => {
  const [leads, setLeads] = useState();
  const [filterStatus, setFilterStatus] = useState();
  const [sortByPriority, setSortByPriority] = useState();
  const [sortByTimeToClose, setSortByTimeToClose] = useState();
  const [leadView, setLeadView] = useState("card");
  const { data, loading, error } = useFetch(
    "https://neog-m-project-b-backend.vercel.app/api/v1/leads"
  );

  let filteredLeads;
  if (data) {
    filteredLeads = data;

    // useEffect(()=>{

    // },[filterStatus])
    if (filterStatus && filterStatus !== "all") {
      filteredLeads = filteredLeads.filter(
        (lead) => lead.status.toString() === filterStatus.toString()
      );
    }

    const priorityOrder = { Low: 1, Medium: 2, High: 3 };
    const array = [{ value: "High" }, { value: "Low" }, { value: "Medium" }];

    if (sortByPriority === "lowToHigh") {
      filteredLeads.sort(
        (a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]
      );
      array.sort((a, b) => priorityOrder[a.value] - priorityOrder[b.value]);
      console.log(array, filteredLeads);
    } else if (sortByPriority === "highToLow") {
      // console.log(filteredLeads,"highToLow 1",sortByPriority)
      // filteredLeads = [
      //   ...filteredLeads.filter(lead=>lead.priority==="High"),
      //   ...filteredLeads.filter(lead=>lead.priority==="Medium"),
      //   ...filteredLeads.filter(lead=>lead.priority==="Low"),
      //   ]
      /*
       */
      // filteredLeads=filteredLeads.sort((a, b) => priorityOrder[b.priority] - priorityOrder[a.priority]);
      // console.log(filteredLeads,"highToLow",sortByPriority)
    }

    if (sortByTimeToClose === "latest") {
      filteredLeads = filteredLeads.sort(
        (a, b) => a.timeToClose - b.timeToClose
      );
    } else {
      filteredLeads = filteredLeads
        .sort((a, b) => a.timeToClose - b.timeToClose)
        .reverse();
      // console.log(filteredLeads)
    }
  }

  function sortByPriorityHandler(e) {
    const { value, checked } = e.target;
    setSortByPriority(value);
    // console.log(value,checked)
    // console.log(filteredLeads)
  }
  function sortByTimeToCloseHandler(e) {
    const { value, checked } = e.target;
    setSortByTimeToClose(value);
  }
  // console.log(loading && loading);
  function leadViewHandler() {}
  return (
    <>
      <header className="border-bottom border-3 text-center py-3">
        <h1>Lead List </h1>
      </header>
      <main className="row">
        <section className=" py-4 px-5">
          {loading && (
            <div>
              <Loading />
            </div>
          )}
          {data && (
            <>
              <section className="mb-3">
                <h2 className="text-center">Overview</h2>
              </section>
              {/*               
              <section className="mb-3">
                <div>
                  <div className="row mb-3">
                    <div className="col ">Sort by Priority</div>
                    <div className="col form-check">
                      <input
                        type="radio"
                        className="form-check-input"
                        name="sortByPriority"
                        id="lowToHigh"
                        value="lowToHigh"
                        onChange={sortByPriorityHandler}
                      />
                      <label
                        htmlFor="lowToHigh"
                        className="form-check-label border-bottom border-2"
                      >
                        Low to High
                      </label>
                    </div>
                    <div className="col form-check">
                      <input
                        type="radio"
                        className="form-check-input"
                        name="sortByPriority"
                        id="highToLow"
                        value="highToLow"
                        onChange={sortByPriorityHandler}
                      />
                      <label
                        htmlFor="highToLow"
                        className="form-check-label border-bottom border-2"
                      >
                        High to Low
                      </label>
                    </div>
                  </div>
                  <div className="row mb-3">
                    <div className="col ">Sort by Time to Close</div>
                    <div className="col form-check">
                      <input
                        type="radio"
                        className="form-check-input"
                        name="sortByTimeToClose"
                        id="latest"
                        value="latest"
                        onChange={sortByTimeToCloseHandler}
                      />
                      <label
                        htmlFor="latest"
                        className="form-check-label border-bottom border-2"
                      >
                        Latest
                      </label>
                    </div>
                    <div className="col form-check">
                      <input
                        type="radio"
                        className="form-check-input"
                        name="sortByTimeToClose"
                        id="oldest"
                        value="oldest"
                        onChange={sortByTimeToCloseHandler}
                      />
                      <label
                        htmlFor="oldest"
                        className="form-check-label border-bottom border-2"
                      >
                        Oldest
                      </label>
                    </div>
                  </div>
                </div>
              </section> */}

              <section className="mb-3 row">
                <div className="col mb-2">
                  <button
                    onClick={() => setLeadView("list")}
                    className={`border rounded-0 ${
                      leadView === "card" && "bg-white"
                    }`}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="30px"
                      width="30px"
                      viewBox="0 -960 960 960"
                      fill="black"
                    >
                      <path d="M140-220v-45.39h680V-220H140Zm0-158.54v-45.38h680v45.38H140Zm0-157.54v-45.38h680v45.38H140Zm0-158.53V-740h680v45.39H140Z" />
                    </svg>
                  </button>
                  <button
                    onClick={() => setLeadView("card")}
                    className={`border rounded-0 ${
                      leadView === "list" && "bg-white"
                    }`}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="30px"
                      width="30px"
                      viewBox="0 -960 960 960"
                      fill="black"
                      transform="rotate(180)"
                    >
                      <path d="M150.77-190.77h199.31v-338.46H150.77v338.46Zm230.08 0h198.3v-578.46h-198.3v578.46Zm229.07 0h199.31v-258.46H609.92v258.46ZM120-160v-400h230.08v-240h259.84v320H840v320H120Z" />
                    </svg>
                  </button>
                </div>
                <div className="col-lg col-sm-12 row">
                  <div className="mb-2 col-lg col-md-6 col-sm-12 ">
                    <select
                      className="  form-select"
                      onChange={(e) => setSortByTimeToClose(e.target.value)}
                    >
                      <option value="">Sort by Time</option>
                      <option value="latest">latest</option>
                      <option value="oldest">oldest</option>
                    </select>
                  </div>
                  <div className="mb-2 col-lg col-md-6 col-sm-12 ">
                    <select
                      className="  form-select"
                      onChange={sortByPriorityHandler}
                    >
                      <option value="">Sort by Priority</option>
                      <option value="lowToHigh">lowToHigh</option>
                      <option value="highToLow">highToLow</option>
                    </select>
                  </div>
                  <div className="mb-2 col-lg col-md-6 col-sm-12 ">
                    <select
                      className="  form-select"
                      onChange={(e) => setFilterStatus(e.target.value)}
                    >
                      <option value="all">All Status</option>
                      <option value="New">New</option>
                      <option value="Contacted">Contacted</option>
                      <option value="Qualified">Qualified</option>
                      <option value="Proposal Sent">Proposal Sent</option>
                      <option value="Closed">Closed</option>
                    </select>
                  </div>
                </div>
              </section>

              {leadView === "list" && (
                <section className="mb-4">
                  <ul className="list-group">
                    <li className="list-group-item list-group-item-secondary">
                      <div className="row  ">
                        <h4 className="col fw-medium ">Lead </h4>
                        <h4 className="col fw-medium ">Status</h4>
                        <h4 className="col fw-medium ">Sales agent </h4>
                      </div>
                    </li>

                    {data &&
                      data.length &&
                      filteredLeads.map((lead, index) => (
                        <li
                          className={`list-group-item ${
                            (index + 1) % 2 === 0 && "bg-body-tertiary"
                          }`}
                        >
                          <div className="row ">
                            <div className="col">{lead.name}</div>
                            <div className="col">
                              <Link
                                to={`/status?name=${lead.status}`}
                                className="nav-link d-inline link-hover"
                              >
                                {lead.status}
                              </Link>
                            </div>
                            <div className="col">{lead.salesAgent.name}</div>
                          </div>
                        </li>
                      ))}
                  </ul>
                </section>
              )}
              {leadView === "card" && (
                <section className="mb-4">
                  <div className="row ">
                    <div className="col-sm-12 col-md-6 col-lg-3 mb-3">
                      <ul className="list-group">
                        <li className="list-group-item list-group-item-action  list-group-item-secondary">
                          <div className="d-flex justify-content-between">
                            <span>New</span>
                            <span>
                              {
                                filteredLeads.filter(
                                  (lead) => lead.status === "New"
                                ).length
                              }
                            </span>
                          </div>
                        </li>
                      </ul>
                      {data.length > 0 &&
                        filteredLeads
                          .filter((lead) => lead.status === "New")
                          .map((lead) => (
                            <div className="card">
                              <div className="card-body">
                                <div className="card-text">{lead.name}</div>
                              </div>
                            </div>
                          ))}
                    </div>
                    <div className="col-sm-12 col-md-6 col-lg-3 mb-3">
                      <ul className="list-group">
                        <li className="list-group-item list-group-item-action  list-group-item-secondary">
                          <div className="d-flex justify-content-between">
                            <span>Contacted</span>
                            <span>
                              {
                                filteredLeads.filter(
                                  (lead) => lead.status === "Contacted"
                                ).length
                              }
                            </span>
                          </div>
                        </li>
                      </ul>
                      {data.length > 0 &&
                        filteredLeads
                          .filter((lead) => lead.status === "Contacted")
                          .map((lead) => (
                            <div className="card">
                              <div className="card-body">
                                <div className="card-text">{lead.name}</div>
                              </div>
                            </div>
                          ))}
                    </div>
                    <div className="col-sm-12 col-md-6 col-lg-3 mb-3">
                      <ul className="list-group">
                        <li className="list-group-item list-group-item-action  list-group-item-secondary">
                          <div className="d-flex justify-content-between">
                            <span>Qualifed</span>
                            <span>
                              {
                                filteredLeads.filter(
                                  (lead) => lead.status === "Qualified"
                                ).length
                              }
                            </span>
                          </div>
                        </li>
                      </ul>
                      {data.length > 0 &&
                        filteredLeads
                          .filter((lead) => lead.status === "Qualified")
                          .map((lead) => (
                            <div className="card">
                              <div className="card-body">
                                <div className="card-text">{lead.name}</div>
                              </div>
                            </div>
                          ))}
                    </div>
                    <div className="col-sm-12 col-md-6 col-lg-3 mb-3">
                      <ul className="list-group">
                        <li className="list-group-item list-group-item-action  list-group-item-secondary">
                          <div className="d-flex justify-content-between">
                            <span>Proposal Sent</span>
                            <span>
                              {
                                filteredLeads.filter(
                                  (lead) => lead.status === "Proposal Sent"
                                ).length
                              }
                            </span>
                          </div>
                        </li>
                      </ul>
                      {data.length > 0 &&
                        filteredLeads
                          .filter((lead) => lead.status === "Proposal Sent")
                          .map((lead) => (
                            <div className="card">
                              <div className="card-body">
                                <div className="card-text">{lead.name}</div>
                              </div>
                            </div>
                          ))}
                    </div>
                    <div className="col-sm-12 col-md-6 col-lg-3 mb-3">
                      <ul className="list-group">
                        <li className="list-group-item list-group-item-action  list-group-item-danger">
                          <div className="d-flex justify-content-between">
                            <span>Closed</span>
                            <span>
                              {
                                filteredLeads.filter(
                                  (lead) => lead.status === "Closed"
                                ).length
                              }
                            </span>
                          </div>
                        </li>
                      </ul>
                      {data.length > 0 &&
                        filteredLeads
                          .filter((lead) => lead.status === "Closed")
                          .map((lead) => (
                            <div className="card">
                              <div className="card-body">
                                <div className="card-text">{lead.name}</div>
                              </div>
                            </div>
                          ))}
                    </div>
                  </div>
                </section>
              )}

              <section className="my-5">
                <Link to="/lead/form" className="btn btn-outline-danger px-5">
                  Create new lead
                </Link>
              </section>
            </>
          )}
        </section>
      </main>
    </>
  );
};

export default LeadList;
