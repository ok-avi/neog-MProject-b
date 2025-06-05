import { Link, useHref } from "react-router-dom";

const Sidebar = () => {
  const pathname = useHref();
  return (
    <div className="d-flex flex-column " style={{ minHeight: "80vh" }}>
      <>
        {pathname !== "/" && (
          <Link to="/" className="mb-3 btn btn-danger px-5 py-2">
            Dashboard
          </Link>
        )}
        <Link to="/leads" className="mb-3 btn btn-secondary px-5 py-2">
          Leads
        </Link>
        <Link to="/sales-agent" className="mb-3 btn btn-secondary px-5 py-2">
          {" "}
          Agents
        </Link>
        {/* <Link to="/agents" className="mb-3 btn btn-secondary px-5 py-2">Agents</Link> */}
        <Link to="/reports" className="mb-3 btn btn-secondary px-5 py-2">
          Reports
        </Link>
        <Link to="/settings" className="mb-3 btn btn-secondary px-5 py-2">
          Settings
        </Link>
      </>
    </div>
  );
};

export default Sidebar;
