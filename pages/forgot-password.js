import axios from "apis/axios";
import Footer from "components/Footer";
import Navbar from "components/Navbar";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

export default function ForgotPassword() {
  const [linkSent, setLinkSent] = useState(false);
  const [sendingLink, setSendingLink] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    setSendingLink(true);
    axios
      .post("/forgot-password", data)
      .then((res) => {
        setLinkSent(true);
        setSendingLink(false);
      })
      .catch((err) => {
        toast.error("Something went wrong");
        setSendingLink(false);
      });
  };

  return (
    <>
      <Navbar />
      <div className="row justify-content-center py-5">
        <div className="col-11 col-md-8 col-lg-6">
          <h3>Forgot password?</h3>
          {!linkSent && (
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="input-group">
                <input
                  className="form-control"
                  {...register("email", { required: true })}
                  type="email"
                  placeholder="Enter your email"
                />
                <input
                  disabled={sendingLink}
                  className="btn btn-green"
                  type="submit"
                  value={sendingLink ? "Sending..." : "Send link"}
                />
              </div>
            </form>
          )}
          {linkSent && (
            <div className="alert alert-success">
              Password reset link sent to your email
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}
