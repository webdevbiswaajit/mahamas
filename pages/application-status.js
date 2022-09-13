import axios from "apis/axios";
import Footer from "components/Footer";
import HousingModelCards from "components/HousingModelCards";
import LearnMore from "components/LearnMore";
import Navbar from "components/Navbar";
import ProfileCard from "components/ProfileCard";
import withAuth from "HOC/withAuth";
import React, { useEffect, useState } from "react";

function ApplicationStatus() {
  const [status, setStatus] = useState(null);
  const [comments, setComments] = useState(null);

  useEffect(() => {
    axios
      .get("/get-application-status")
      .then((res) => {
        setStatus(res.data.status);
        setComments(res.data.comments);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      <Navbar />
      <div className="bg-light">
        <div className="container py-5">
          <div className="row">
            <div className="col-12 col-lg-8">
              <ProfileCard />
              {status && (
                <div className="card card-shadow p-3 py-5">
                  <div className="card-body">
                    <h5 className="color-dark text-center mb-5">
                      Application Status
                    </h5>
                    {status == "undefined" ? (
                      <>
                        <p className="lead text-center text-muted">
                          You haven&apos;t submitted an application yet!
                        </p>
                      </>
                    ) : status == "submitted" ? (
                      <div className="d-flex align-items-center my-3">
                        <span className="badge-number-rounded bg-green text-light fw-bold">
                          1
                        </span>
                        <span className="ms-3 color-green fw-bold">
                          Application Submitted
                        </span>
                      </div>
                    ) : status == "reviewing" ? (
                      <>
                        <div className="d-flex align-items-center my-3">
                          <span className="badge-number-rounded bg-green text-light fw-bold">
                            1
                          </span>
                          <span className="ms-3 color-green fw-bold">
                            Application Submitted
                          </span>
                        </div>
                        <div className="d-flex align-items-center my-3">
                          <span className="badge-number-rounded bg-green text-light fw-bold">
                            2
                          </span>
                          <span className="ms-3 color-green fw-bold">
                            Application Under Review
                          </span>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="d-flex align-items-center my-3">
                          <span className="badge-number-rounded bg-green text-light fw-bold">
                            1
                          </span>
                          <span className="ms-3 color-green fw-bold">
                            Application Submitted
                          </span>
                        </div>
                        <div className="d-flex align-items-center my-3">
                          <span className="badge-number-rounded bg-green text-light fw-bold">
                            2
                          </span>
                          <span className="ms-3 color-green fw-bold">
                            Application Under Review
                          </span>
                        </div>
                        {status == "approved" && (
                          <div className="d-flex align-items-center my-3">
                            <span className="badge-number-rounded bg-green text-light fw-bold">
                              3
                            </span>
                            <span className="ms-3 color-green fw-bold">
                              Application Approved
                            </span>
                          </div>
                        )}
                        {status == "resubmit" && (
                          <div className="d-flex align-items-center my-3">
                            <span className="badge-number-rounded bg-warning text-light fw-bold">
                              3
                            </span>
                            <span className="ms-3 text-warning fw-bold">
                              Application Resubmission
                            </span>
                          </div>
                        )}
                        {status == "declined" && (
                          <div className="d-flex align-items-center my-3">
                            <span className="badge-number-rounded bg-danger text-light fw-bold">
                              3
                            </span>
                            <span className="ms-3 text-danger fw-bold">
                              Application Declined
                            </span>
                          </div>
                        )}
                      </>
                    )}
                    {comments && (
                      <div className="bg-warning p-3">
                        <p>{comments}</p>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
            <div className="d-none d-lg-block col-lg-4">
              <LearnMore />
              <br />
              <HousingModelCards count={2} />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default withAuth(ApplicationStatus);
