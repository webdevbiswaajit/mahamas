import Link from "next/link";
import React from "react";

export default function HomeCTA() {
  return (
    <div className="bg-gradient p-5">
      <div className="container">
        <h5 className="text-start text-md-center">
          If you are a first time applicant and interested in owning a home,
          please sign up by clicking on the link below
        </h5>

        <div className="mt-5 text-center">
          <Link href="/signup">
            <a className="btn btn-light px-4 me-3">Sign Up</a>
          </Link>
          <Link target="_blank" href="/subdivisions">
            <a className="btn btn-outline-light px-4">Browse</a>
          </Link>
        </div>
      </div>
    </div>
  );
}
