import Loading from "../components/Loading";
import Sidebar from "../components/Sidebar";
import useFetch from "../useFetch";
import { Chart as Chartjs } from "chart.js/auto";
import { Bar, Pie } from "react-chartjs-2";

function leadsClosedByAgent(data) {
  let arr = [];

  const agents = data
    ?.map((lead) => lead.salesAgent)
    ?.filter(
      (agent, index, array) =>
        index === array.findIndex((obj) => obj._id === agent._id)
    );

  for (let i = 0; i < agents.length; i++) {
    let count = 0;
    for (let j = 0; j < data.length; j++) {
      if (agents[i]._id === data[j].salesAgent._id) {
        count++;
        // console.log(agents[i])
        if (count > 1) {
          arr.map((item) => {
            // console.log(item,agents[i])
            if (item.name === agents[i].name) {
              item.closed = count;
            }
          });
        } else {
          arr.push({
            name: agents[i].name,
            closed: count,
          });
        }
        // console.log("",data[j].salesAgent.name)
      }
    }
  }
  // console.log(arr);
  return arr;
}

const Reports = () => {
  const { data, loading, error } = useFetch("https://neog-m-project-b-backend.vercel.app/api/v1/leads");
  if (data) {
    // console.log(data)
    // leadsClosedByAgent(data);
  }

  const uniqueClosedLeads = data && leadsClosedByAgent(data);
  // console.log(uniqueSalesAgent)

  const noOfLeadsClosed =
    data && data.filter((lead) => lead.status === "Closed").length;
  const noOfPipelineLeads = data?.filter(
    (lead) => lead.status !== "Closed"
  ).length;

  const noOfNewLeads = data?.filter((lead) => lead.status === "New").length;
  const noOfContactedLeads = data?.filter(
    (lead) => lead.status === "Contacted"
  ).length;
  const noOfQualifiedLeads = data?.filter(
    (lead) => lead.status === "Qualified"
  ).length;
  const noOfProposalsentLeads = data?.filter(
    (lead) => lead.status === "Proposal Sent"
  ).length;

  // console.log(noOfLeadsClosed)
  return (
    <>
      <header className="border-bottom border-3 text-center py-3">
        <h1> Reports</h1>
      </header>
      <main className="row ">
        <section
          style={{ height: "" }}
          className="py-4 col-4 col-lg-3 px-5   border-end  border-3 d-flex flex-column align-items-center "
        >
          <Sidebar />
        </section>
        <section className="col-8 col-lg-9">
          {loading && (
            <Loading />
          )}
          {data && data.length > 0 && (
            <>
              <section className="my-3">
                <h2 className="text-center">Overview</h2>
              </section>
              <div className="row">
                <section className="my-4 col-lg-6">
                  <h3 className="text-center">Total Leads</h3>
                  <div className="mx-auto" style={{ width: "350px" }}>
                    <Pie
                      data={{
                        labels: ["Closed", "InPipeline"],
                        datasets: [
                          {
                            label: "leads",
                            data: [noOfLeadsClosed, noOfPipelineLeads],
                            backgroundColor: ["blue", "grey"],
                          },
                        ],
                      }}
                    />
                  </div>
                </section>
                <section className="my-4 col-lg-6">
                  <h3 className="text-center">Leads Closed by Sales Agents</h3>
                  <div
                    className="mx-auto d-flex align-items-center"
                    style={{ width: "400px", height: "100%" }}
                  >
                    <Bar
                      data={{
                        // labels: ["Agent 1", "Agent 2", "Agent 3"],
                        labels:
                          data && uniqueClosedLeads.map((agent) => agent.name),
                        datasets: [
                          {
                            label: "leads",
                            data:
                              data &&
                              uniqueClosedLeads.map((lead) => lead.closed),
                            // backgroundColor:[
                            //   "blue",
                            //   "orange",
                            //   "red"
                            // ],
                            backgroundColor: uniqueClosedLeads.map(
                              (value) =>
                                "#" +
                                Math.floor(Math.random() * 16777215)
                                  .toString(16)
                                  .padStart(6, "0")
                            ),
                            /**
                             * Math.random() generates a random number between 0 and 1.
                             * Multiplying by 16777215 (the maximum value for a 6-digit hexadecimal color) ensures the number is within the range of valid hex colors.
                             * .toString(16) converts the number to a hexadecimal string.
                             * .padStart(6, '0') ensures the string is always 6 characters long, even if the random number is small.
                             */
                          },
                        ],
                      }}
                    />
                  </div>
                </section>
              </div>
              <section className="my-4">
                <h3 className="text-center">Lead Status Distribution</h3>
                <div className="mx-auto" style={{ width: "350px" }}>
                  <Pie
                    data={{
                      labels: [
                        "New",
                        "Contacted",
                        "Qualified",
                        "Proposal Sent",
                        "Closed",
                      ],
                      datasets: [
                        {
                          label: "status",
                          data: [
                            noOfNewLeads,
                            noOfContactedLeads,
                            noOfQualifiedLeads,
                            noOfProposalsentLeads,
                            noOfLeadsClosed,
                          ],
                          backgroundColor: [
                            "#B07AA1",
                            "#59A14F",
                            "#E15759",
                            "#F28E2B",
                            "#4E79A7",
                          ],
                        },
                      ],
                    }}
                  />
                </div>
              </section>
            </>
          )}
        </section>
      </main>
    </>
  );
};

export default Reports;
