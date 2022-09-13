import Maintenance from "components/Maintenance";
import Head from "next/head";
import Script from "next/script";
import AuthProvider from "providers/AuthProvider";
import { useEffect } from "react";
import { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "styles/globals.css";
import TawkTo from "tawkto-react";

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    var tawk = new TawkTo("62a10e07b0d10b6f3e7662c3", "1g52htkfa");

    tawk.onStatusChange((status) => {
      console.log(status);
    });
  }, []);

  return process.env.NEXT_PUBLIC_MAINTENANCE_MODE == 1 ? (
    <Maintenance />
  ) : (
    <>
      <Head>
        <link
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css"
          rel="stylesheet"
          integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC"
          crossOrigin="anonymous"
        />
        <link
          rel="stylesheet"
          href="https://use.fontawesome.com/releases/v5.15.4/css/all.css"
          integrity="sha384-DyZ88mC6Up2uqS4h/KRgHuoeGwBcD4Ng9SiP4dIRy0EXTlnuz47vAwmeGwVChigm"
          crossOrigin="anonymous"
        />
      </Head>
      <AuthProvider>
        <ToastContainer autoClose={2000} />
        <SkeletonTheme baseColor="#cacaca" highlightColor="#ededed">
          <Component {...pageProps} />
        </SkeletonTheme>
      </AuthProvider>
      <Script
        id="bootstrap-bundle"
        src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js"
        integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM"
        crossOrigin="anonymous"
      />
    </>
  );
}

export default MyApp;
