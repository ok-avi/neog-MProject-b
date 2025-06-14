import { Link } from "react-router-dom";
import useFetch from "../useFetch";
import { useState } from "react";
import Loading from "../components/Loading";

const Dashboard = () => {
  const [filter, setFilter] = useState();
  const { data, loading, error } = useFetch(
    "https://neog-m-project-b-backend.vercel.app/api/v1/leads"
  );
  const leadArray = ["Lead 1", "Lead 2", "Lead 3"];
  const filteredLead = filter
    ? data.filter((lead) => lead.status === filter)
    : data;
  return (
    <section className="">
      {loading && <Loading />}
      {data && data.length > 0 && (
        <>
          <header className="border-bottom border-3 text-center py-3">
            <h1>Anvaya CRM Dashboard</h1>
          </header>
          <section className="py-3 px-4">
            <div className="mt-3 row  justify-content-md-between">
              <h2 className="col-md-4 ">Quick Filters </h2>
              <section className="col-md-4 mb-3  px-md-4 d-flex justify-content-md-end">
                <Link to="/lead/form" className="btn btn-outline-danger px-4">
                  Create Lead
                </Link>
              </section>
            </div>
            <div className="d-flex  flex-wrap  py-2">
              <div className="me-3 mb-3">
                <button
                  onClick={(e) => setFilter(e.target.value)}
                  value="New"
                  className="btn btn-outline-secondary px-4"
                >
                  New
                </button>
              </div>
              <div className="me-3  mb-3">
                <button
                  onClick={(e) => setFilter(e.target.value)}
                  value="Contacted"
                  className="btn btn-outline-secondary px-4"
                >
                  Contacted
                </button>
              </div>
              <div className="me-3 mb-3">
                <button
                  onClick={(e) => setFilter(e.target.value)}
                  value="Qualified"
                  className="btn btn-outline-secondary px-4"
                >
                  Qualified
                </button>
              </div>
              <div className="me-3  mb-3">
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
          <section className="d-flex justify-content-center flex-wrap  pb-3">
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

            <div className="row">
              <div className="col-lg-4 col-sm-6 mb-3">
                <div className="card">
                  <div className="card-body">
                    <h5 className="card-title">New</h5>
                    <div className="display-3 fw-normal">
                      {data.filter((lead) => lead.status === "New").length}
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 col-sm-6 mb-3">
                <div className="card">
                  <div className="card-body">
                    <h5 className="card-title">Contacted</h5>
                    <div className="display-3 fw-normal">
                      {
                        data.filter((lead) => lead.status === "Contacted")
                          .length
                      }
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 col-sm-6 mb-3">
                <div className="card">
                  <div className="card-body">
                    <h5 className="card-title">Qualified</h5>
                    <div className="display-3 fw-normal">
                      {
                        data.filter((lead) => lead.status === "Qualified")
                          .length
                      }
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 col-sm-6 mb-3">
                <div className="card">
                  <div className="card-body">
                    <h5 className="card-title">Proposal Sent</h5>
                    <div className="display-3 fw-normal">
                      {
                        data.filter((lead) => lead.status === "Proposal Sent")
                          .length
                      }
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 col-sm-6 mb-3">
                <div className="card">
                  <div className="card-body">
                    <h5 className="card-title">Closed</h5>
                    <div className="display-3 fw-normal">
                      {data.filter((lead) => lead.status === "Closed").length}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </>
      )}
    </section>
  );
};

export default Dashboard;
