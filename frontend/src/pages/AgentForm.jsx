import { useState } from "react";
import Sidebar from "../components/Sidebar";

const AgentForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
  });
  const [alertMsg, setAlertMsg] = useState(false);
  function formHandler(e) {
    e.preventDefault();
    if ((!formData.name, !formData.email)) {
      // console.log("empty")
      return;
    }
    fetch("https://neog-m-project-b-backend.vercel.app/api/v1/agents", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: formData.name,
        email: formData.email,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setAlertMsg(true);
        setTimeout(() => {
          setAlertMsg(false);
        }, 3000);
      })
      .catch((error) => console.log(error));
  }
  return (
    <>
      <header className="border-bottom border-3 text-center py-3">
        <h1>Add New Sales Agent </h1>
      </header>
      <main className="row">
        <section className=" py-4 px-5 ">
          <form onSubmit={formHandler}>
            <div className="mb-3">
              <label className="form-label" htmlFor="name">
                Agent Name
              </label>
              <input
                className="form-control"
                type="text"
                id="name"
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, name: e.target.value }))
                }
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label" htmlFor="address">
                Email Address
              </label>
              <input
                className="form-control"
                type="email"
                id="address"
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, email: e.target.value }))
                }
                required
              />
            </div>
            <button className="btn btn-outline-danger px-4" type="submit">
              Create
            </button>
          </form>
          {alertMsg && (
            <div className="my-3 alert alert-info">
              Sales Agent Created Successfully!!
            </div>
          )}
        </section>
      </main>
    </>
  );
};

export default AgentForm;
