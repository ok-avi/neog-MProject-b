import Sidebar from "../components/Sidebar";

const Setting = () => {
  return (
    <>
      <header className="border-bottom border-3 text-center py-3">
        <h1>Lead List </h1>
      </header>
      <div className="row">
                <section
          style={{ height: "" }}
          className="py-4 col-4 col-lg-3 px-5   border-end  border-3 d-flex flex-column align-items-center"
        >
          <Sidebar />
        </section>
        <section className="col-8 col-lg-9 py-4 px-5"></section>
      </div>
    </>
  );
};

export default Setting;
