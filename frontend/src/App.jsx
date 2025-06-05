import { Link } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import useFetch from "./useFetch";
import { useState } from "react";

const App = () => {
  const [filter, setFilter] = useState();
  const { data, loading, error } = useFetch("https://neog-m-project-b-backend.vercel.app/api/v1/leads");
  const leadArray = ["Lead 1", "Lead 2", "Lead 3"];
  const filteredLead = filter
    ? data.filter((lead) => lead.status === filter)
    : data;
  // console.log(data && data);
  return (
    <>
      <header className="border-bottom border-3 text-center py-3">
        <h1>Anvaya CRM Dashboard</h1>
      </header>
      <main className="row ">
        <section
          style={{ height: "" }}
          className="py-4 col-4 col-lg-3 px-5   border-end  border-3 d-flex flex-column align-items-center justify-content-center"
        >
          <Sidebar />
        </section>
        <section className="col-8 col-lg-9">
          {loading && (
            <p className="text-info text-medium py-5 text-center display-2">
              Loading...
            </p>
          )}
          {data && data.length > 0 && (
            <>
              <section className="py-3 text-center">Main Content</section>
              <section className="d-flex justify-content-center flex-wrap  py-3">
                {/* {leadArray.map((lead) => (
              <div className="border border-2 mx-2 mb-2 px-3 py-1">{lead}</div>
            ))} */}
                {filteredLead.map((lead) => (
                  <div className="border border-2 mx-2 mb-3 px-3 py-1">
                    <Link to={`/lead/${lead._id}`} className="nav-link">
                      {lead.name}
                    </Link>
                  </div>
                ))}
              </section>
              <section className="py-3 px-4">
                <h2>Lead Status</h2>
                <ul className="list-group py-2">
                  <li className="list-group-item w-lg-50">
                    <div className="row">
                      <div className="col-4 text-center">New:</div>
                      <div className="col-2">
                        {data.filter((lead) => lead.status === "New").length}
                      </div>
                      <div className="col-6">
                        {data.filter((lead) => lead.status === "New").length > 1
                          ? "Leads"
                          : "Lead"}
                      </div>
                    </div>
                  </li>
                  <li className="list-group-item w-lg-50">
                    <div className="row">
                      <div className="col-4 text-center">Contacted:</div>
                      <div className="col-2">
                        {
                          data.filter((lead) => lead.status === "Contacted")
                            .length
                        }
                      </div>
                      <div className="col-6 ">
                        {data.filter((lead) => lead.status === "Contacted")
                          .length > 1
                          ? "Leads"
                          : "Lead"}
                      </div>
                    </div>
                  </li>
                  <li className="list-group-item w-lg-50">
                    <div className="row">
                      <div className="col-4 text-center">Qualified:</div>
                      <div className="col-2">
                        {
                          data.filter((lead) => lead.status === "Qualified")
                            .length
                        }
                      </div>
                      <div className="col-6">
                        {data.filter((lead) => lead.status === "Qualified")
                          .length > 1
                          ? "Leads"
                          : "Lead"}
                      </div>
                    </div>
                  </li>
                  <li className="list-group-item w-lg-50">
                    <div className="row">
                      <div className="col-4 text-center">Proposal Sent:</div>
                      <div className="col-2">
                        {
                          data.filter((lead) => lead.status === "Proposal Sent")
                            .length
                        }
                      </div>
                      <div className="col-6">
                        {data.filter((lead) => lead.status === "Proposal Sent")
                          .length > 1
                          ? "Leads"
                          : "Lead"}
                      </div>
                    </div>
                  </li>
                  <li className="list-group-item w-lg-50">
                    <div className="row">
                      <div className="col-4 text-center">Closed:</div>
                      <div className="col-2">
                        {data.filter((lead) => lead.status === "Closed").length}
                      </div>
                      <div className="col-6">
                        {data.filter((lead) => lead.status === "Closed")
                          .length > 1
                          ? "Leads"
                          : "Lead"}
                      </div>
                    </div>
                  </li>
                </ul>
              </section>
              <section className="py-3 px-4">
                <h2>Quick Filters </h2>
                <div className="row  py-2">
                  <div className="col-4 col-lg-3 mb-3">
                    <button
                      onClick={(e) => setFilter(e.target.value)}
                      value="New"
                      className="btn btn-outline-secondary px-4"
                    >
                      New
                    </button>
                  </div>
                  <div className="col col-lg-3 mb-3">
                    <button
                      onClick={(e) => setFilter(e.target.value)}
                      value="Contacted"
                      className="btn btn-outline-secondary px-4"
                    >
                      Contacted
                    </button>
                  </div>
                </div>
                <div className="row ">
                  <div className="col-4 col-lg-3 mb-3">
                    <button
                      onClick={(e) => setFilter(e.target.value)}
                      value="Qualified"
                      className="btn btn-outline-secondary px-4"
                    >
                      Qualified
                    </button>
                  </div>
                  <div className="col col-lg-3 mb-3">
                    <button
                      onClick={(e) => setFilter(e.target.value)}
                      value="Proposal Sent"
                      className="btn btn-outline-secondary px-4"
                    >
                      Proposal Sent
                    </button>
                  </div>
                </div>
              </section>
              <section className="py-3 px-4">
                <Link to="/lead/form" className="btn btn-outline-danger px-4">
                  Create a new Lead
                </Link>
              </section>
            </>
          )}
        </section>
      </main>
    </>
  );
};

export default App;
