import axios from "apis/axios";
import Footer from "components/Footer";
import Navbar from "components/Navbar";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

export default function Contact() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = (data) => {
    axios
      .post("/messages", data)
      .then((res) => {
        toast.success("Message sent successfully!");
        reset();
      })
      .catch((err) => {
        toast.error("Message Not Sent!");
      });
  };

  return (
    <>
      <Navbar />
      <div className="bg-light py-5">
        <div className="container">
          <div className="row">
            <h4 className="text-center text-dark">Visit Our Office Location</h4>
          </div>
          <div className="row mt-5">
            <div className="col-12 col-lg-4 mb-5">
              <div className="card card-shadow" style={{ height: 200 }}>
                <div className="card-body text-center p-0 pb-3">
                  <i
                    className="fas fa-location-arrow bg-green p-4 rounded-circle fs-1 text-white mb-3"
                    style={{ marginTop: "-60px" }}
                  />
                  <br />
                  <span className="color-green fw-bold">Address</span>
                  <br />
                  <span>
                    Charlotte House, Charlotte Street
                    <br />
                    P.O. Box N275
                    <br />
                    Nassau, N.P., The Bahamas
                  </span>
                </div>
              </div>
            </div>
            <div className="col-12 col-lg-4 mb-5">
              <div className="card card-shadow" style={{ height: 200 }}>
                <div className="card-body text-center p-0 pb-3">
                  <i
                    className="fas fa-envelope bg-green p-4 rounded-circle fs-1 text-white mb-3"
                    style={{ marginTop: "-60px" }}
                  />
                  <br />
                  <span className="color-green fw-bold">Email</span>
                  <br />
                  <span>info@dohbahamas.com</span>
                </div>
              </div>
            </div>
            <div className="col-12 col-lg-4 mb-5">
              <div className="card card-shadow" style={{ height: 200 }}>
                <div className="card-body text-center p-0 pb-3">
                  <i
                    className="fas fa-phone-alt bg-green p-4 rounded-circle fs-1 text-white mb-3"
                    style={{ marginTop: "-60px" }}
                  />
                  <br />
                  <span className="color-green fw-bold">Contact Us</span>
                  <br />
                  <span>
                    302-5800
                    <br />
                    302-5822
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container-fluid bg-gradient py-5">
        <div className="row justify-content-center py-5 my-5 px-3">
          <div className="card card-shadow px-2 py-3" style={{ width: 500 }}>
            <div className="card-body py-5">
              <h2 className="text-center color-dark fw-bold mb-5">
                Leave a message
              </h2>
              <form onSubmit={handleSubmit(onSubmit)}>
                <input
                  {...register("name", { required: true })}
                  className="form-control mt-3 bg-light border-0 color-dark"
                  placeholder="Name"
                  type="text"
                />
                {errors.name && (
                  <span className="text-danger">Name is required</span>
                )}
                <input
                  {...register("email", { required: true })}
                  className="form-control mt-3 bg-light border-0 color-dark"
                  placeholder="Email Address"
                  type="email"
                />
                {errors.email && (
                  <span className="text-danger">Email is required</span>
                )}
                <textarea
                  {...register("details", { required: true })}
                  className="form-control mt-3 bg-light border-0 color-dark"
                  placeholder="Start writing..."
                  rows={5}
                />
                {errors.details && (
                  <span className="text-danger">details is required</span>
                )}

                <div className="text-center mt-3">
                  <input
                    className="btn btn-green text-white px-4"
                    type="submit"
                    value="Send"
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
