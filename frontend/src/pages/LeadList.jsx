import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import useFetch from "../useFetch";
import { Link } from "react-router-dom";

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
  return (
    <>
      <header className="border-bottom border-3 text-center py-3">
        <h1>Lead List </h1>
      </header>
      <main className="row">
        <section
          style={{ height: "" }}
          className="py-4 col-4 col-lg-3 px-5   border-end  border-3 d-flex flex-column align-items-center"
        >
          <Sidebar />
        </section>
        <section className="col-8 col-lg-9 py-4 px-5">
          {loading && (
            <div
              style={{ minHeight: "80vh" }}
              className="col d-flex  justify-content-center text-center display-4"
            >
              Loading...
            </div>
          )}
          {data && (
            <>
              <section className="mb-3">
                <h2 className="text-center">Overview</h2>
              </section>
              <section className="mb-4">
                <div className="row mb-2">
                  <div className="col fw-medium ">Lead </div>
                  <div className="col fw-medium ">Status</div>
                  <div className="col fw-medium ">Sales agent </div>
                </div>
                {data &&
                  data.length &&
                  filteredLeads.map((lead) => (
                    <div className="row mb-2">
                      <div className="col">{lead.name}</div>
                      <div className="col">
                        <Link
                          to={`/status?name=${lead.status}`}
                          className="nav-link d-inline link-hover"
                        >
                          {lead.status}
                        </Link>
                      </div>
                      {/* <div className="col">{lead.priority}</div> */}
                      <div className="col">{lead.salesAgent.name}</div>
                    </div>
                  ))}
              </section>
              <section className="mb-3">
                <div className="row mb-3">
                  <div className="col">Filter by status</div>
                  <div className="col">
                    <select
                      className="w-50  form-select"
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
                  {/* <div className="col"></div> */}
                </div>
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
              </section>
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
