import { useParams } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import useFetch from "../useFetch";
import { useState } from "react";
import Loading from "../components/Loading";

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
  console.log(data && data);
  let sortedLeads = [];
  if (data) {
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
  }

  return (
    <>
      <header className="border-bottom border-3 text-center py-3">
        <h1>Sales Agent Leads </h1>
      </header>
      <main className="row">
        <section className=" py-3 px-5">
          {loading && <Loading />}
          {data &&
            (data.length > 0 ? (
              <>
                <section className="my-4">
                  <h2>
                    <span className="text-danger">
                      {data && data.length > 0 && data[0].salesAgent.name}
                    </span>{" "}
                    <span className="text-secondary">&rarr;</span> Leads
                  </h2>
                </section>
                <section className="mb-3">
                  
                  <ul className="list-group">
                    <li className="list-group-item list-group-item-secondary">
                      <div className="row mb-2">
                        <div className="col  fw-medium">Lead</div>
                        <div className="col  fw-medium">Status</div>
                        <div className="col  fw-medium">Priority</div>
                      </div>
                    </li>
                    {data &&
                      sortedLeads.map((lead, index) => (
                        <li
                          className={`list-group-item ${
                            (index + 1) % 2 === 0 && "bg-body-tertiary"
                          }`}
                        >
                          <div className="row mb-1">
                            <div className="col">{lead.name}</div>
                            <div className="col">{lead.status}</div>
                            <div className="col">{lead.priority}</div>
                          </div>
                        </li>
                      ))}
                  </ul>
                  <div className="row my-4 gx-3">
                    <label className="col form-label">Filter </label>
                    <div className="col">
                      <select
                        className=" form-control"
                        onChange={(e) =>
                          setFilter((prev) => ({
                            ...prev,
                            status: e.target.value,
                          }))
                        }
                      >
                        <option value="" >
                          Select Status
                        </option>
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
                          setFilter((prev) => ({
                            ...prev,
                            priority: e.target.value,
                          }))
                        }
                      >
                        <option value="" hidden>
                          Select Priority
                        </option>
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
              </>
            ) : (
              <p className="text-center fs-4 fw-medium text-danger">
                Sales Agent don't have any leads
              </p>
            ))}
          {/* {filter.status}, {filter.priority}, {filter.timeToClose} */}
        </section>
      </main>
    </>
  );
};

export default SalesAgent;
