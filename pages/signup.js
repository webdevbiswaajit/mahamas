import { yupResolver } from "@hookform/resolvers/yup";
import { signup } from "apis/auth";
import Footer from "components/Footer";
import Navbar from "components/Navbar";
import { errorify } from "helpers";
import Link from "next/link";
import Router from "next/router";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as yup from "yup";

export default function Signup() {
  //confirm password validation
  const schema = yup.object().shape({
    fname: yup.string().required("First name is required"),
    lname: yup.string().required("Last name is required"),
    email: yup
      .string()
      .email("Invalid email address")
      .required("Email is required"),
    phone: yup
      .string()
      .required("Phone number is required")
      .matches(/^\d+$/, "Found invalid characters"),
    password: yup.string().required("Password is required"),
    cpassword: yup
      .string()
      .oneOf([yup.ref("password"), null], "Passwords doesn't match")
      .required("Confirm Password is required"),
    terms: yup.bool().oneOf([true], "Please Select Term and Conditions"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = async (data) => {
    try {
      await signup(data);
      toast.success("Your account has been created successfully");
      reset();
      Router.push("/login");
    } catch (err) {
      errorify(err);
    }
  };
  return (
    <>
      <Navbar />
      <div className="container-fluid">
        <div className="row">
          <div className="d-none d-lg-block col-lg-6 p-0">
            <div
              className="card h-100 w-100 text-white"
              style={{
                backgroundImage: "url('/img/slides/slide-2.jpg')",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <div className="card-img-overlay d-flex align-items-center bg-overlay p-0">
                <div className="p-5 m-5">
                  <h3>WELCOME</h3>
                  <p>
                    Welcome to the ministry of the Transport and Housing’s home
                    ownership application database. On this website you are able
                    to apply for home ownership, view our housing models and
                    floor plans and confirm the status of your application.{" "}
                  </p>
                  <p>
                    We hope that your experience here is a pleasent and fruitful
                    one.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="col-12 col-lg-6 d-flex justify-content-center align-items-center bg-light py-5">
            <div className="card card-shadow px-2 py-3" style={{ width: 500 }}>
              <div className="card-body">
                <h2 className="text-center color-dark fw-bold py-3">Sign Up</h2>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <input
                    {...register("fname")}
                    className={`form-control ${
                      errors.fname ? "invalid" : ""
                    } mb-3 bg-light border-0 color-dark`}
                    placeholder="First Name"
                    type="text"
                  />
                  {errors.fname && (
                    <p className="small text-danger">{errors.fname.message}</p>
                  )}
                  <input
                    {...register("lname")}
                    className={`form-control ${
                      errors.lname ? "invalid" : ""
                    } mb-3 bg-light border-0 color-dark`}
                    placeholder="Last Name"
                    type="text"
                  />
                  {errors.lname && (
                    <p className="small text-danger">{errors.lname.message}</p>
                  )}
                  <input
                    {...register("email")}
                    className={`form-control ${
                      errors.email ? "invalid" : ""
                    } mb-3 bg-light border-0 color-dark`}
                    placeholder="Email Address"
                    type="email"
                  />
                  {errors.email && (
                    <p className="small text-danger">{errors.email.message}</p>
                  )}
                  <input
                    {...register("phone")}
                    className={`form-control ${
                      errors.phone ? "invalid" : ""
                    } mb-3 bg-light border-0 color-dark`}
                    placeholder="Phone Number"
                    type="text"
                  />
                  {errors.phone && (
                    <p className="small text-danger">{errors.phone.message}</p>
                  )}
                  <input
                    {...register("nib")}
                    className={`form-control ${
                      errors.nib ? "invalid" : ""
                    } mb-3 bg-light border-0 color-dark`}
                    placeholder="NIB Number"
                    type="text"
                  />
                  {errors.nib && (
                    <p className="small text-danger">{errors.nib.message}</p>
                  )}
                  <input
                    {...register("password", { required: true })}
                    className={`form-control ${
                      errors.password ? "invalid" : ""
                    } mb-3 bg-light border-0 color-dark`}
                    placeholder="Password"
                    type="password"
                  />
                  {errors.password && (
                    <p className="small text-danger">
                      {errors.password.message}
                    </p>
                  )}
                  <input
                    {...register("cpassword", { required: true })}
                    className={`form-control ${
                      errors.cpassword ? "invalid" : ""
                    } mb-3 bg-light border-0 color-dark`}
                    placeholder="Confirm Password"
                    type="password"
                  />
                  {errors.cpassword && (
                    <p className="small text-danger">
                      {errors.cpassword.message}
                    </p>
                  )}
                  <div className="mb-3">
                    <div className="d-flex">
                      <input
                        {...register("terms", { required: true })}
                        className={`me-3 ${errors.terms ? "invalid" : ""}`}
                        type="checkbox"
                      />
                      <p>
                        <span>Accept </span>
                        <Link href="tnc">
                          <a>
                            <u>Terms and Conditions</u>
                          </a>
                        </Link>
                      </p>
                    </div>

                    {errors.terms && (
                      <p className="small text-danger">
                        {errors.terms.message}
                      </p>
                    )}
                  </div>

                  <div className="text-center">
                    <input
                      className="btn bg-green bg-danger text-white px-4"
                      type="submit"
                      value="Submit"
                    />
                  </div>
                </form>

                <p className="mt-3 text-center">
                  <span className="me-2">Already have an account? </span>
                  <Link href="/login">
                    <a>
                      <u>Login here</u>
                    </a>
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
