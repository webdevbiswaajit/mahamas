import Footer from "components/Footer";
import HousingModelCards from "components/HousingModelCards";
import Navbar from "components/Navbar";
import Link from "next/link";
import React from "react";

export default function Download() {
  return (
    <>
      <Navbar />
      <div className="container-fluid">
        <div className="row">
          <h3 className="bg-gradient py-5 text-light text-center mb-0">
            Download
          </h3>
        </div>
        <div className="container py-5">
          <div className="row">
            <div className="col-12 col-lg-8">
              <div className="card">
                <div className="card-body">
                  <div>
                    <h5 className="color-green">Housing Act</h5>
                    <hr />
                    <p>
                      An Act to consolidate and amend the law relating to the
                      housing department; the promotion of construction of new
                      dwelling houses for persons of moderate means; insurance
                      of mortgages and purposes connected therewith.
                    </p>
                    <p>- Commencement 9th January, 1968</p>
                    <Link href="/docs/HousingAct.pdf">
                      <a className="btn btn-green text-white">Download</a>
                    </Link>
                  </div>
                  <div className="mt-5">
                    <h5 className="color-green">Housing Regulations</h5>
                    <hr />
                    <p>
                      (SECTION 26)
                      <br /> Commencement 6th December, 1983
                    </p>
                    <p>
                      1. These Regulations may be cited as the Housing
                      Regulations.
                    </p>
                    <p>2. In these regulations —</p>
                    <p>
                      “Area Engineer” means the person designated by the
                      Minister responsible for Buildings Regulation for the
                      purpose of carry ing out the function of the Buildings
                      Control Officer in Grand Bahama outside of the Port Area;
                    </p>
                    <Link href="/docs/HousingRegulations.pdf">
                      <a className="btn btn-green text-white">Download</a>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4 d-none d-lg-block">
              <div className="row">
                <HousingModelCards count={2} />
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
