import { Link } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import useFetch from "../useFetch";
import "../index.css";
import Loading from "../components/Loading";

const SalesAgentList = () => {
  const { data, loading, error } = useFetch(
    "https://neog-m-project-b-backend.vercel.app/api/v1/agents"
  );
  // console.log(data && data);
  return (
    <>
      <header className="border-bottom border-3 text-center py-3">
        <h1>Sales Agent Management </h1>
      </header>
      <main className="row">
        <section className=" py-4 px-5">
          {loading && <Loading />}
          {data && data.length > 0 && (
            <>
              <section className="mb-4 d-md-flex align-items-center justify-content-between">
                <h2 className="">Sales Agent List</h2>
                <section>
                  <Link
                    to="/sales-agent/form"
                    className="btn btn-outline-danger px-4"
                  >
                    Create Agent
                  </Link>
                </section>
              </section>
              <section className="mb-4">
                <div className="row">
                  {data.map((agent) => (
                    <div
                      key={agent._id}
                      className="col-lg-4 col-md-4 col mb-3"
                      style={{ minWidth: "200px" }}
                    >
                      <div className="card ">
                        <Link
                          to={`/sales-agent/${agent._id}`}
                          className="card-body nav-link"
                        >
                          <h4 className="card-title">{agent.name}</h4>
                          <div className="card-text">{agent.email}</div>
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            </>
          )}
        </section>
      </main>
    </>
  );
};

export default SalesAgentList;
