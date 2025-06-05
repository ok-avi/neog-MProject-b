import { Link } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import useFetch from "../useFetch";
import "../index.css"

const SalesAgentList = () => {
  const { data, loading, error } = useFetch("http://localhost:3000/api/v1/agents");
  // console.log(data && data);
  return (
    <>
      <header className="border-bottom border-3 text-center py-3">
        <h1>Sales Agent Management </h1>
      </header>
      <main className="row">
        <section
          style={{ height: "" }}
          className="py-4 col-4 col-lg-3 px-5   border-end  border-3 d-flex flex-column align-items-center"
        >
          <Sidebar />
        </section>
        <section className="col-8 col-lg-9 py-4 px-5">
          {loading && <div className="text-center display-4">Loading...</div>}
          {data && data.length > 0 && (
            <>
              <section className="mb-4">
                <h2 className="text-center">Sales Agent List</h2>
              </section>
              <section className="mb-4">
                <div className="row">
                  <div className="col fw-medium text-secondary">Agent name</div>
                  <div className="col fw-medium text-secondary">Email</div>
                </div>
                {data.map((agent) => (
                  <div className="row" key={agent._id}>
                    <div className="col">
                      <Link
                        to={`/sales-agent/${agent._id}`}
                        className="nav-link link-hover  d-inline"
                      >
                        {agent.name}
                      </Link>
                    </div>
                    <div className="col">{agent.email}</div>
                  </div>
                ))}
              </section>
              <section className="mb-3">
                <Link
                  to="/sales-agent/form"
                  className="btn btn-outline-danger px-4"
                >
                  Create Agent
                </Link>
              </section>
            </>
          )}
        </section>
      </main>
    </>
  );
};

export default SalesAgentList;
