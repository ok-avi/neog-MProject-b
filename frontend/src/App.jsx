import { Outlet } from "react-router-dom";
import Sidebar from "./components/Sidebar";

import Dashboard from "./pages/Dashboard";

const App = () => {
  return (
      <div className="row " style={{height:"100vh",width:"100vw"}}>
        <section
          style={{height:"100%"}}
          className="col-2 col-md-1      d-flex  h-100 "
        >
            <Sidebar />
        </section>
        <section className="col p-0  h-100" style={{overflowY:"scroll"}}>
            <Outlet />
        </section>
      </div>
  );
};

export default App;
