import { useParams, useSearchParams } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import useFetch from "../useFetch";
import { useState } from "react";

function uniqueSalesAgents(data) {
  const agents = data.map((lead) => lead.salesAgent);
  const uniqueArray = agents.filter(
    (obj, index, self) => index === self.findIndex((o) => o._id === obj._id)
  );
  return uniqueArray;
}
// 0 === 0
// 1 === 0
// 2 === 2
function uniquePriority(data) {
  const unique = data.filter(
    (lead, index, array) =>
      index === array.findIndex((l) => l.priority === lead.priority)
  );
  return unique;
}

const Status = () => {
  const [filter, setFilter] = useState({
    agent: "",
    priority: "",
    timeToClose: "",
  });
  const [searchParams] = useSearchParams();
  const name = searchParams.get("name");
  const { data, loading, error } = useFetch(
    `https://neog-m-project-b-backend.vercel.app/api/v1/leads?status=${name}`
  );
  // console.log(data&&data)
  //   console.log(searchParams.get("name"),searchParams)
  if (!data) return;
  // console.log(uniquePriority(data))
  let filteredLead = [...data];

  if (filter.agent) {
    filteredLead = filteredLead.filter(
      (lead) => lead.salesAgent.name === filter.agent
    );
  }
  if (filter.priority) {
    filteredLead = filteredLead.filter(
      (lead) => lead.priority === filter.priority
    );
    // console.log(filteredLead,"priority")
  }
  if (filter.timeToClose === "latest") {
    filteredLead = filteredLead.sort((a, b) => a.timeToClose - b.timeToClose);
  } else if (filter.timeToClose === "oldest") {
    filteredLead = filteredLead
      .sort((a, b) => a.timeToClose - b.timeToClose)
      .reverse();
    // console.log(filteredLead,"oldest")
  }
  return (
    <>
      <header className="border-bottom border-3 text-center py-3">
        <h1>Lead's Status </h1>
      </header>
      <main className="row">
        <section className=" py-4 px-5">
          <section className="mb-3">
            <h2>Lead By Status </h2>
          </section>
          {data && (
            <>
              <section className="mb-3">
                <div>Status: {data && data[0].status}</div>
              </section>
              <section className="mb-3">
                <ul className="list-group">
                  <li className="list-group-item bg-dark text-white">
                    <div className="row">
                      <h4 className="col fw-medium">lead</h4>
                      <h4 className="col fw-medium">Sales Agent</h4>
                      <h4 className="col fw-medium">Priority</h4>
                    </div>
                  </li>
                  {filteredLead.map((lead, index) => (
                    <li
                      className={`list-group-item ${
                        (index + 1) % 2 === 0 && "bg-body-secondary"
                      }`}
                    >
                      <div className="row">
                        <div className="col">{lead.name}</div>
                        <div className="col">{lead.salesAgent.name}</div>
                        <div className="col">{lead.priority}</div>
                      </div>
                    </li>
                  ))}
                </ul>
              </section>
              <section className="mb-3">
                <div className="row mb-4">
                  <div className="col form-label">Filters</div>
                  <div className="col">
                    <select
                      className="form-control"
                      onChange={(e) =>
                        setFilter((prev) => ({
                          ...prev,
                          agent: e.target.value,
                        }))
                      }
                    >
                      <option value="" hidden>
                        Select Agent
                      </option>
                      {uniqueSalesAgents(data).map((agent) => (
                        <option value={agent.name}>{agent.name}</option>
                      ))}
                    </select>
                  </div>
                  <div className="col">
                    <select
                      className="form-control"
                      onChange={(e) =>
                        setFilter((prev) => ({
                          ...prev,
                          priority: e.target.value && e.target.value,
                        }))
                      }
                    >
                      <option value="" >
                        Select Priority
                      </option>
                      {uniquePriority(data).map((lead) => (
                        <option value={lead.priority}>{lead.priority}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="row">
                  <div className="col">Sort by Time to Close</div>
                  <div className="col form-check">
                    <input
                      onChange={(e) =>
                        setFilter((prev) => ({
                          ...prev,
                          timeToClose: e.target.value,
                        }))
                      }
                      value="latest"
                      className="form-check-input"
                      type="radio"
                      name="timeToClose"
                      id="latest"
                    />
                    <label className="form-label" htmlFor="latest">
                      Latest
                    </label>
                  </div>
                  <div className="col form-check">
                    <input
                      onChange={(e) =>
                        setFilter((prev) => ({
                          ...prev,
                          timeToClose: e.target.value,
                        }))
                      }
                      value="oldest"
                      className="form-check-input"
                      type="radio"
                      name="timeToClose"
                      id="oldest"
                    />
                    <label className="form-label" htmlFor="oldest">
                      Oldest
                    </label>
                  </div>
                </div>
              </section>
            </>
          )}
        </section>
      </main>
    </>
  );
};

export default Status;
