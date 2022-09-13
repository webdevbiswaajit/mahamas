import axios from "apis/axios";
import Footer from "components/Footer";
import Navbar from "components/Navbar";
import withAuth from "HOC/withAuth";
import moment from "moment";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

function SupportHistory() {
  const [data, setData] = useState(null);
  const router = useRouter();
  const { register, handleSubmit } = useForm();

  const onSubmit = async (data) => {
    axios
      .get(`/support_conversations/history?id=${data.query}`)
      .then((res) => setData(res.data.data));
  };

  useEffect(() => {
    axios
      .get("/support_conversations/history")
      .then((res) => setData(res.data.data));
  }, []);
  return (
    <>
      <Navbar />
      <div className="container-fluid">
        <div className="row">
          <h3 className="bg-gradient py-4 text-light text-center mb-0">
            Requests
          </h3>
        </div>
        <div className="container">
          <h5 className="py-4">My Requests</h5>
          <div className="card rounded-3 shadow">
            <div className="card-body">
              <div className="row">
                <div className="col-md-6 col-lg-4 ps-0">
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <input
                      className="form-control border-0 bg-light"
                      type="text"
                      placeholder="Search Request"
                      {...register("query")}
                    />
                    <input className="d-none" type="submit" />
                  </form>
                </div>
              </div>
              <div className="row">
                <table className="table table-striped">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Subject</th>
                      <th>Created</th>
                      <th>Last Activity</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data &&
                      data.map((item) => (
                        <tr
                          className="cursor-pointer"
                          onClick={() => router.push(`/support/${item.id}`)}
                          key={item.id}
                        >
                          <td>{item.id}</td>
                          <td>{item.subject}</td>
                          <td>
                            {moment(item.created_at).format("D MMMM YYYY")}
                          </td>
                          <td>{moment(item.updated_at).fromNow()}</td>
                          <td>
                            <small
                              className={`${
                                item.status == "waiting"
                                  ? "bg-blue"
                                  : item.status == "active"
                                  ? "bg-green"
                                  : "bg-purple"
                              } rounded-4 px-2 rounded-3`}
                            >
                              {item.status}
                            </small>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default withAuth(SupportHistory);
