import axios from "apis/axios";
import Footer from "components/Footer";
import Navbar from "components/Navbar";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

export default function ResetPassword() {
  const [resetting, setResetting] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const router = useRouter();
  const { token, email } = router.query;

  const onSubmit = (data) => {
    if (data.password !== data.conf_password) {
      toast.error("Password does not match!");
      return;
    }
    setResetting(true);
    axios
      .post("/reset-password", {
        token,
        email,
        password: data.password,
      })
      .then((res) => {
        setResetting(false);
        toast.success("Password reset successfully!");
        router.push("/login");
      })
      .catch((err) => {
        setResetting(false);
        toast.error("Something went wrong!");
      });
  };

  return (
    <>
      <Navbar />
      <div className="row justify-content-center py-5">
        <div className="col-11 col-md-8 col-lg-6">
          <h3>Reset password?</h3>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-group">
              <label>New Password</label>
              <input
                className="form-control"
                {...register("password", { required: true })}
                type="password"
                placeholder="Type your new password"
              />
            </div>
            <div className="form-group mt-3">
              <label>Cofirm Password</label>
              <input
                className="form-control"
                {...register("conf_password", { required: true })}
                type="password"
                placeholder="Confirm your password"
              />
            </div>
            <div className="form-group mt-3">
              <input
                disabled={resetting}
                className="btn btn-green"
                type="submit"
                value={resetting ? "Resetting..." : "Reset password"}
              />
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
}
