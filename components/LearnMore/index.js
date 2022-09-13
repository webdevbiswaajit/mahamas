import Link from "next/link";
import React from "react";

export default function LearnMore() {
  return (
    <div className="card card-shadow">
      <div className="card-header bg-green text-center">
        <h6 className="text-white">Learn More</h6>
      </div>
      <div className="card-body">
        <p>
          Please learn more about our Housing Act and Housing Regulations, which
          has been given below.
        </p>
        <Link href="/download">
          <a className="btn btn-sm btn-green mb-3">Housing Act</a>
        </Link>
        <br />
        <Link href="/download">
          <a className="btn btn-sm btn-green">Housing Regulations</a>
        </Link>
      </div>
    </div>
  );
}
