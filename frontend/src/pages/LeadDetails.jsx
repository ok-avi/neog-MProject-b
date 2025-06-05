import { useState } from "react";
import Sidebar from "../components/Sidebar";
import useFetch from "../useFetch.js";
import { useParams } from "react-router-dom";

function updateLead(lead, data, leadId) {
  const obj = {
    name: lead.name === "" ? data.name : lead.name,
    source: lead.source === "" ? data.source : lead.source,
    salesAgent: {
      _id: data.salesAgent._id,
      name:
        lead.salesAgentName === "" ? data.salesAgent.name : lead.salesAgentName,
    }, // Sales Agent ID
    status: lead.status === "" ? data.status : lead.status,
    timeToClose: lead.timeToClose == "" ? data.timeToClose : lead.timeToClose,
    priority: lead.priority === "" ? data.priority : lead.priority,
  };

  fetch(`http://localhost:3000/api/v1/leads/${leadId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    /*
      body: JSON.stringify({
        name: lead.name===""?data.name:lead.name,
        source: lead.source===""?data.source:lead.source,
        salesAgent: {
          _id:data.salesAgent._id,
          name:lead.salesAgentName===""?data.salesAgent.name:lead.salesAgentName
        }, // Sales Agent ID
        status: lead.status===""?data.status:lead.status,
        timeToClose: lead.timeToClose==""?data.timeToClose:lead.timeToClose,
        priority: lead.priority===""?data.priority:lead.priority,
      }),
      */

    body: JSON.stringify(obj),
  })
    .then((res) => res.json())
    .then((datas) => console.log())
    .catch((error) => console.error(error));
  return obj;
}

function getComments(leadId, setComments) {
  fetch(`http://localhost:3000/api/v1/leads/${leadId}/comments`)
    .then((res) => res.json())
    .then((data) => setComments(data))
    .catch((error) => console.log(error));
}

function createNewComment(leadId, newComment) {
  // console.log("worked");
  if (!newComment) return;
  // console.log("not worked");
  fetch(`http://localhost:3000/api/v1/leads/${leadId}/comments`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      commentText: newComment,
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      document.forms["commentForm"].reset();
    })
    .catch((error) => console.error("error while creating comment", error));
}

const LeadDetails = () => {
  const [disable, setDisable] = useState(true);
  const [lead, setLead] = useState({
    name: "",
    salesAgentName: "",
    source: "",
    status: "",
    priority: "",
    timeToClose: "",
  });
  const [comments, setComments] = useState();
  const [newComment, setNewComment] = useState("");
  const { id } = useParams();
  const leadId = "682aea83991fbf98d2868884";
  const { data, loading, error } = useFetch(
    `http://localhost:3000/api/v1/leads/${id}`
  );
  //   console.log(data && data, "data");
  // console.log(lead, "data");
  getComments(leadId, setComments);
  function updateLeadHandler() {
    console.log("lead name", lead.name);
    setDisable((prev) => !prev);
    if (!disable) {
      console.log("Disable false", disable);
      console.log(updateLead(lead, data, leadId));
    }
  }
  function submitFormHandler(e) {
    e.preventDefault();
    createNewComment(leadId, newComment);
  }
  return (
    <>
      <header className="border-bottom border-3 text-center py-3">
        <h1>Lead Management: {data && data.name}</h1>
      </header>
      <main className="row ">
        <section
          style={{ height: "" }}
          className="py-4 col-4 col-lg-3 px-5   border-end  border-3 d-flex flex-column align-items-center "
        >
          <Sidebar />
        </section>
        <section className="col-8 col-lg-9 py-4 px-5">
          <section className="mb-3">
            <h2 className="text-center">Lead Details</h2>
          </section>
          <section className="mb-3 row mx-0">
            <ul className="list-group col-lg-6 col-md-12">
              <li className="list-group-item">
                <div className="row">
                  <div className="col-6 col-lg-4 d-flex align-items-center">
                    <span>Lead Name:</span>
                  </div>
                  {/* <div className="col-6 col-lg-5">{data && data.name}</div> */}
                  <div className="px-0 col-6 col-lg-5 ">
                    <input
                      className={` m-0  form-control  ${
                        disable
                          ? "bg-transparent border-0"
                          : " bg-secondary-subtle"
                      } `}
                      type="text"
                      name="status"
                      defaultValue={data && data.name}
                      onChange={(e) =>
                        setLead((prev) => ({ ...prev, name: e.target.value }))
                      }
                      disabled={disable}
                    />
                  </div>
                </div>
              </li>
              <li className="list-group-item">
                <div className="row">
                  <div className="col-6 col-lg-4 d-flex align-items-center">
                    <span>Sales Agent:</span>
                  </div>
                  {/* <div className="col-6 col-lg-5">
                    {data && data.salesAgent.name}
                  </div> */}
                  <div className="px-0 col-6 col-lg-5 ">
                    <input
                      className={` m-0  form-control  ${
                        disable
                          ? "bg-transparent border-0"
                          : " bg-secondary-subtle"
                      } `}
                      type="text"
                      name="status"
                      defaultValue={data && data.salesAgent.name}
                      onChange={(e) =>
                        setLead((prev) => ({
                          ...prev,
                          salesAgentName: e.target.value,
                        }))
                      }
                      disabled={disable}
                    />
                  </div>
                </div>
              </li>
              <li className="list-group-item">
                <div className="row">
                  <div className="col-6 col-lg-4 d-flex align-items-center">
                    <span>Lead Source:</span>
                  </div>
                  {/* <div className="col-6 col-lg-5">{data && data.source}</div> */}
                  <div className="px-0 col-6 col-lg-5 ">
                    <select
                      name=""
                      id=""
                      className={` m-0  form-control  ${
                        disable
                          ? "bg-transparent border-0"
                          : " bg-secondary-subtle"
                      } `}
                      onChange={(e) =>
                        setLead((prev) => ({ ...prev, source: e.target.value }))
                      }
                      disabled={disable}
                    >
                      {data && (
                        <option value={data.source} selected hidden>
                          {data.source}
                        </option>
                      )}
                      {/* <option value="Website" >{data&& data.source}</option> */}
                      <option value="Website">Website</option>
                      <option value="Referral">Referral</option>
                      <option value="Cold Call">Cold Call</option>
                      <option value="Advertisement">Advertisement</option>
                      <option value="Email">Email</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>
              </li>
              <li className="list-group-item">
                <div className="row">
                  <div className="col-6 col-lg-4 d-flex align-items-center">
                    <span>Lead Status:</span>
                  </div>
                  {/* <div className="col-6 col-lg-5">{data && data.status}</div> */}
                  <div className="px-0 col-6 col-lg-5 ">
                    <select
                      className={` m-0  form-control  ${
                        disable
                          ? "bg-transparent border-0"
                          : " bg-secondary-subtle"
                      } `}
                      onChange={(e) =>
                        setLead((prev) => ({ ...prev, status: e.target.value }))
                      }
                      disabled={disable}
                    >
                      {data && (
                        <option value={data.source} selected hidden>
                          {data.status}
                        </option>
                      )}
                      <option value="New">New</option>
                      <option value="Qualified">Qualified</option>
                      <option value="Proposal Sent">Proposal Sent</option>
                      <option value="Closed">Closed</option>
                    </select>
                  </div>
                </div>
              </li>
              <li className="list-group-item">
                <div className="row">
                  <div className="col-6 col-lg-4 d-flex align-items-center">
                    <span>Priority:</span>
                  </div>
                  <div className="px-0 col-6 col-lg-5 ">
                    {/* {data && data.priority} */}

                    <select
                      id=""
                      className={` m-0  form-control  ${
                        disable
                          ? "bg-transparent border-0"
                          : " bg-secondary-subtle"
                      } `}
                      onChange={(e) =>
                        setLead((prev) => ({
                          ...prev,
                          priority: e.target.value,
                        }))
                      }
                      disabled={disable}
                    >
                      {data && (
                        <option value={data.priority} selected hidden>
                          {data.priority}
                        </option>
                      )}
                      <option value="High">High</option>
                      <option value="Medium">Medium</option>
                      <option value="Low">Low</option>
                    </select>
                  </div>
                </div>
              </li>
              <li className="list-group-item">
                <div className="row">
                  <div className="col-6 col-lg-4 d-flex align-items-center">
                    <span>Time to Close:</span>
                  </div>
                  <div className="px-0 col-6 col-lg-5 d-flex align-items-center">
                    {/* {data && data.timeToClose}  */}
                    <input
                      style={{ width: `${disable ? "70px" : "100%"}` }}
                      className={` m-0  form-control  ${
                        disable
                          ? "bg-transparent border-0"
                          : " bg-secondary-subtle"
                      } `}
                      type="number"
                      name="timeToClose"
                      defaultValue={data && data.timeToClose}
                      onChange={(e) => {
                        const { value } = e.target;
                        setLead((prev) => ({
                          ...prev,
                          timeToClose: Number(value) === 0 ? 1 : value,
                        }));
                      }}
                      disabled={disable}
                    />{" "}
                    {disable && <span>Days</span>}
                  </div>
                </div>
              </li>
            </ul>
          </section>
          <section className="mb-3">
            <button
              onClick={updateLeadHandler}
              type="button"
              className="px-4 btn btn-danger"
            >
              {disable ? "Edit Lead Details" : "Save"}
            </button>
          </section>
          <section className="mb-3">
            {comments && comments.length>0&& (
              <>
                <h2 className="text-center">Comments </h2>

                <section className="mb-2">
                  {comments &&
                    comments.map((comment) => (
                      <div className="my-2">
                        <div>
                          <span className="fs-5">{comment.author.name}</span>
                          <span className="small mx-2">
                            {comment &&
                              new Date(
                                comment.createdAt
                              ).toLocaleDateString()}{" "}
                          </span>
                          <span className="small">
                            {" "}
                            {comment &&
                              new Date(comment.createdAt).toLocaleTimeString()}
                          </span>
                        </div>
                        <div className="">{comment.commentText}</div>
                      </div>
                    ))}
                </section>
              </>
            )}
            <section>
              <h2 className="text-center">Create New Comment</h2>
              <form className="col-lg-6 col-12 " onSubmit={submitFormHandler} name="commentForm">
                <input
                  onChange={(e) => setNewComment(e.target.value)}
                  type="text"
                  className="form-control"
                  placeholder="Write a comment..."
                />
                <button className="btn btn-info mt-3">Submit</button>
              </form>
            </section>
          </section>
        </section>
      </main>
    </>
  );
};

export default LeadDetails;
