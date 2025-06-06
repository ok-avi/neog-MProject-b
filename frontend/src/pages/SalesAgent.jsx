import { useParams } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import useFetch from "../useFetch";
import { useState } from "react";

const SalesAgent = () => {
  const [filter, setFilter] = useState({
    status: "",
    priority: "",
    timeToClose: "",
  });
  const { id } = useParams();
  const { data, loading, error } = useFetch(
    `https://neog-m-project-b-backend.vercel.app/api/v1/leads?salesAgent=${id}`
  );
  // console.log(data && data, loading);
  let sortedLeads = [];
  if (!data) return;
  sortedLeads = [...data];

  if (filter.status) {
    sortedLeads = sortedLeads.filter((lead) => lead.status === filter.status);
  }
  if (filter.priority) {
    sortedLeads = sortedLeads.filter(
      (lead) => lead.priority === filter.priority
    );
  }
  if (filter.timeToClose === "latest") {
    sortedLeads = sortedLeads.sort((a, b) => a.timeToClose - b.timeToClose);
  } else if (filter.timeToClose === "oldest") {
    sortedLeads = sortedLeads.sort((a, b) => b.timeToClose - a.timeToClose);
  }

  return (
    <>
      <header className="border-bottom border-3 text-center py-3">
        <h1>Sales Agent Leads </h1>
      </header>
      <main className="row">
        <section
          style={{ height: "" }}
          className="py-4 col-4 col-lg-3 px-5   border-end  border-3 d-flex flex-column align-items-center"
        >
          <Sidebar />
        </section>
        <section className="col-8 col-lg-9 py-4 px-5">
          {loading&&<p className="text-center fs-4 fw-medium text-info">Loading...</p>}
          {data&&data.length>0?<>
          <section className="my-4">
            <h2><span className="text-danger">{data&&data.length>0 && data[0].salesAgent.name}</span> <span className="text-secondary">&rarr;</span>  Leads</h2>
          </section>
          <section className="mb-3">
            <div className="row mb-2">
              <div className="col text-secondary fw-medium"><span className="border-bottom border-2 border-dark">Lead</span></div>
              <div className="col text-secondary fw-medium"><span className="border-bottom border-2 border-dark">Status</span></div>
              <div className="col text-secondary fw-medium"><span className="border-bottom border-2 border-dark">Priority</span></div>
            </div>
            {data &&
              sortedLeads.map((lead) => (
                <div className="row mb-1">
                  <div className="col">{lead.name}</div>
                  <div className="col">{lead.status}</div>
                  <div className="col">{lead.priority}</div>
                </div>
              ))}
            <div className="row my-4 gx-3">
              <label className="col form-label">Filter </label>
              <div className="col">
                <select
                  className=" form-control"
                  onChange={(e) =>
                    setFilter((prev) => ({ ...prev, status: e.target.value }))
                  }
                >
                  <option value="" hidden>Select Status</option>
                  <option value="New">New</option>
                  <option value="Contacted">Contacted</option>
                  <option value="Qualified">Qualified</option>
                  <option value="Proposal Sent">Proposal Sent</option>
                  <option value="Closed">Closed</option>
                </select>
              </div>
              <div className="col">
                <select
                  className=" form-control"
                  onChange={(e) =>
                    setFilter((prev) => ({ ...prev, priority: e.target.value }))
                  }
                >
                  <option value="" hidden>Select Priority</option>
                  <option value="High">High</option>
                  <option value="Medium">Medium</option>
                  <option value="Low">Low</option>
                </select>
              </div>
            </div>
            <div className="row my-4 gx-3">
              <label className="col form-label"> Time to Close</label>
              <div className="col form-check">
                <input
                  type="radio"
                  name="timeToClose"
                  id="latest"
                  className="form-check-input"
                  value="latest"
                  onChange={(e) =>
                    setFilter((prev) => ({
                      ...prev,
                      timeToClose: e.target.value,
                    }))
                  }
                />
                <label className="form-check-label" htmlFor="latest">
                  Latest
                </label>
              </div>
              <div className="col form-check">
                <input
                  type="radio"
                  name="timeToClose"
                  id="oldest"
                  className="form-check-input"
                  value="oldest"
                  onChange={(e) =>
                    setFilter((prev) => ({
                      ...prev,
                      timeToClose: e.target.value,
                    }))
                  }
                />
                <label className="form-check-label" htmlFor="oldest">
                  Oldest
                </label>
              </div>
            </div>
          </section>
          
          </>:
          <p className="text-center fs-4 fw-medium text-danger">Sales Agent don't have any leads</p>
          }
          {/* {filter.status}, {filter.priority}, {filter.timeToClose} */}
        </section>
      </main>
    </>
  );
};

export default SalesAgent;
