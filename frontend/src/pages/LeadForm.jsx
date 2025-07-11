import { useState } from "react";
import Sidebar from "../components/Sidebar";
import useFetch from "../useFetch";

function postFormData(leadForm, setAlertMsg) {
  const localServer = "http://localhost:3000"
  const liveServer = "https://neog-m-project-b-backend.vercel.app"
  fetch(`${liveServer}/api/v1/leads`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: leadForm.leadName,
      source: leadForm.leadSource,
      salesAgent: leadForm.agentId,
      status: leadForm.leadStatus,
      priority: leadForm.priority,
      timeToClose: leadForm.timeToClose,
      tags: leadForm.tags,
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      if(!data.error){
        setAlertMsg(true);
        setTimeout(() => {
          setAlertMsg(false);
        }, 3000);

      }
      // console.log(data,data.hasOwnProperty("error"))
    })
    .catch((error) => console.error(error));
}

const LeadForm = () => {
  const [tags, setTags] = useState([]);
  const [alertMsg, setAlertMsg] = useState(false);
  const [leadForm, setLeadForm] = useState({
    leadName: "",
    leadSource: "",
    salesAgent: "",
    agentId: "",
    leadStatus: "",
    priority: "",
    timeToClose: "",
    tags: [],
  });
  const { data, loading, error } = useFetch("https://neog-m-project-b-backend.vercel.app/api/v1/agents");
  // const { data, loading, error } = useFetch("http://localhost:3000/api/v1/agents");
  // console.log(data)
  function tagHandler(e) {
    const { value } = e.target;
    // setTags((prev) => {
    //   if (!prev.includes(value)) {
    //     return [...prev, value];
    //   }
    //   return [...prev];
    // });
    setLeadForm((prev) => ({
      ...prev,
      tags: !prev.tags.includes(value) ? [...prev.tags, value] : [...prev.tags],
    }));
  }
  function formHandler(e) {
    e.preventDefault();
    if (
      !leadForm.leadName &&
      !leadForm.leadSource &&
      !leadForm.salesAgent &&
      !leadForm.leadStatus &&
      !leadForm.priority &&
      !leadForm.timeToClose &&
      !leadForm.tags.length
    ) {
      return;
    }
    // console.log("it's empty", leadForm);
    postFormData(leadForm, setAlertMsg);
  }
  return (
    <>
      <header className="border-bottom border-3 text-center py-3">
        <h1>Lead Form </h1>
      </header>
      <main className="row">

        <section className=" py-4 px-5">
          <section className="mb-4">
            <form onSubmit={formHandler}>
              <div className="mb-2 row">
                <label className="col form-label" htmlFor="leadName">
                  Lead Name:
                </label>
                <input
                  className="col form-control "
                  placeholder="Enter lead name"
                  type="text"
                  id="leadName"
                  required
                  onChange={(e) =>
                    setLeadForm((prev) => ({
                      ...prev,
                      leadName: e.target.value,
                    }))
                  }
                />
              </div>
              <div className="mb-2 row">
                <label className="col form-label" htmlFor="source">
                  Lead Source:
                </label>
                <select
                  name=""
                  id="source"
                  className="col form-control "
                  required
                  onChange={(e) =>
                    setLeadForm((prev) => ({
                      ...prev,
                      leadSource: e.target.value,
                    }))
                  }
                >
                  <option value="">Select Source</option>
                  <option value="Website" >
                    Website
                  </option>
                  <option value="Referral">Referral</option>
                  <option value="Advertisement">Advertisement</option>
                  <option value="Email">Email</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div className="mb-2 row">
                <label className="col form-label" htmlFor="agent">
                  Sales Agent
                </label>
                <select
                  className="col form-control"
                  required
                  onChange={(e) =>
                    setLeadForm((prev) => ({
                      ...prev,
                      salesAgent: e.target.value,
                      agentId:
                        e.target.selectedOptions[0].getAttribute("data-id"),
                    }))
                  }
                >
                  <option value="" data-id="">Select agent</option>
                  {data &&
                    data.map((agent,index) => (
                      <option
                        value={agent.name}
                        data-id={agent._id}
                        key={agent._id}
                      >
                        {agent.name}
                      </option>
                    ))}
                </select>
              </div>
              <div className="mb-2 row">
                <label className="col form-label" htmlFor="status">
                  Lead Status
                </label>
                <select
                  className="col form-control"
                  id="status"
                  // defaultValue={"New"}
                  required
                  onChange={(e) =>
                    setLeadForm((prev) => ({
                      ...prev,
                      leadStatus: e.target.value,
                    }))
                  }
                >
                  <option value="">Select Status</option>
                  <option value="New">New</option>
                  <option value="Contacted">Contacted</option>
                  <option value="Qualified">Qualified</option>
                  <option value="Closed">Closed</option>
                  <option value="Proposal Sent">Proposal Sent</option>
                </select>
              </div>
              <div className="mb-2 row">
                <label className="col form-label" htmlFor="priority">
                  Priority
                </label>
                <select
                  className="col form-control"
                  id="priority"
                  required
                  onChange={(e) =>
                    setLeadForm((prev) => ({
                      ...prev,
                      priority: e.target.value,
                    }))
                  }
                >
                  <option value="">Select priority</option>
                  <option value="High">High</option>
                  <option value="Medium">Medium</option>
                  <option value="Low">Low</option>
                </select>
              </div>
              <div className="mb-2 row">
                <label className="col form-label" htmlFor="timeToClose">
                  Time to Close
                </label>
                <input
                  className="col form-control"
                  min={1}
                  type="number"
                  id="timeToClose"
                  required
                  onChange={(e) =>
                    setLeadForm((prev) => ({
                      ...prev,
                      timeToClose: e.target.value,
                    }))
                  }
                />
              </div>
              <div className="mb-2 row">
                <label className="col form-label" htmlFor="tags">
                  Tags
                </label>

                <select
                  style={{ height: "70px" }}
                  onChange={tagHandler}
                  multiple
                  className="col form-control"
                  id="tags"
                  required
                >
                  <option value="High Value">High Value</option>
                  <option value="Follow up">Follow-up</option>
                </select>
              </div>
              <button type="submit" className="btn btn-outline-danger px-5">
                Create
              </button>
            </form>
          </section>
          {alertMsg && (
            <section className="row">
              <div class="col-12 col-lg-6 alert alert-info m" role="alert">
                Lead created Successfully
              </div>
            </section>
          )}
        </section>
      </main>
    </>
  );
};

export default LeadForm;
