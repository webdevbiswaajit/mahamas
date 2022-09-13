import { login } from "apis/auth";
import Footer from "components/Footer";
import Navbar from "components/Navbar";
import Link from "next/link";
import { useRouter } from "next/router";
import { useAuth } from "providers/AuthProvider";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import store from "store";

export default function Login() {
  const router = useRouter();
  const [loginError, setLoginError] = useState(false);
  const { setUser, setToken } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data) => {
    try {
      const res = await login(data);
      store.set("token", res.token);
      store.set("user", {
        id: res.user.id,
        fname: res.user.fname,
        email: res.user.email,
        phone: res.user.phone,
        photo: res.user.photo,
      });
      setUser(store.get("user"));
      setToken(store.get("token"));
      setLoginError(false);
      router.replace("/");
    } catch (error) {
      setLoginError(true);
    }
  };

  return (
    <>
      <Navbar />
      <div className="container-fluid bg-gradient py-5">
        <div className="row justify-content-center py-5 my-5 px-3">
          <div className="card card-shadow px-2 py-3" style={{ width: 500 }}>
            <div className="card-body py-5">
              <h2 className="text-center color-dark fw-bold mb-5">Login</h2>
              {loginError && (
                <p className="text-danger text-center">
                  Email or Password doesn&apos;t match
                </p>
              )}
              <form onSubmit={handleSubmit(onSubmit)}>
                <input
                  {...register("email", { required: true })}
                  className={`form-control ${
                    errors.email && "invalid"
                  } mb-3 bg-light border-0 color-dark`}
                  placeholder="Email address"
                  type="email"
                />
                {errors.email && (
                  <p className="text-danger">Email is required</p>
                )}
                <input
                  {...register("password", { required: true })}
                  className={`form-control ${
                    errors.password && "invalid"
                  } mb-3 bg-light border-0 color-dark`}
                  placeholder="Password"
                  type="password"
                />
                {errors.password && (
                  <p className="text-danger">Password is required</p>
                )}
                <div className="d-flex mb-3">
                  <input className="me-3" type="checkbox" />
                  <small className="color-green">Remember me</small>
                </div>

                <div className="text-center">
                  <input
                    className="btn bg-green text-white px-4"
                    type="submit"
                    value="Submit"
                  />
                </div>
              </form>
              <p className="mt-3 text-center color-dark">
                <span className="me-2">Don&apos;t have an account?</span>
                <Link href="/signup">
                  <a>
                    <u>Signup</u>
                  </a>
                </Link>
                <br />
                <span>Or you can </span>
                <Link href="/forgot-password">
                  <a>
                    <u className="text-danger">reset your password</u>
                  </a>
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
