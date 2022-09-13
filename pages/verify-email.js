import axios from "axios";
import Footer from "components/Footer";
import Navbar from "components/Navbar";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { toast } from "react-toastify";
import store from "store";

export default function VerifyEmail() {
  const router = useRouter();
  const { url } = router.query;
  const token = store.get("token");

  useEffect(() => {
    url &&
      token &&
      axios
        .get(url, { headers: { Authorization: `Bearer ${token}` } })
        .then((res) => {
          toast.success("Email verified successfully");
          router.replace("/");
        });
  }, [url, token]);

  return (
    <>
      <Navbar />
      <div className="container">
        <div className="row py-5">
          <h3 className="text-center">Verifying your email...</h3>
        </div>
      </div>
      <Footer />
    </>
  );
}
