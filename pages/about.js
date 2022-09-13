import Footer from "components/Footer";
import Navbar from "components/Navbar";
import React from "react";

export default function About() {
  return (
    <>
      <Navbar />
      <div className="container-fluid bg-light">
        <div className="row">
          <div className="col-lg-4 d-none d-lg-flex align-items-center justify-content-center bg-gradient py-3">
            <div>
              <div className="d-flex align-items-center my-3">
                <span className="badge-number-rounded bg-white color-green fw-bold">
                  1
                </span>
                <span className="ms-3">About Us</span>
              </div>
              <div className="d-flex align-items-center my-3">
                <span className="badge-number-rounded bg-white color-green fw-bold">
                  2
                </span>
                <span className="ms-3">Housing Act</span>
              </div>
              <div className="d-flex align-items-center my-3">
                <span className="badge-number-rounded bg-white color-green fw-bold">
                  3
                </span>
                <span className="ms-3">Housing Regulations</span>
              </div>
            </div>
          </div>
          <div className="col-12 col-lg-8 p-4">
            <h3 className="text-dark">About Us</h3>
            <p className="small">
              The Ministry of Housing was established by an act of Parliament
              which commenced on January 9th, 1968. The Housing Act replaced the
              former Housing Corporation which dissolved on January 7th, 1964.
              The Act was established to promote the “construction of new
              dwelling homes for persons of moderate means, insurance of
              mortgages and purposes connected therewith.”
            </p>
            <p className="small">
              According to the act the minister is corporate sole and has powers
              to do the following:
            </p>
            <ul>
              <li>
                <p className="small">
                  Construct dwelling houses upon land owned by the Government or
                  to be acquired for such purposes.
                </p>
              </li>
              <li>
                <p className="small">
                  Acquire dwelling houses, land or housing projects by way of
                  purchase, lease or otherwise.
                </p>
              </li>
              <li>
                <p className="small">
                  Sell, lease, exchange or otherwise dispose of real or personal
                  property acquired by him pursuant to the Act
                </p>
              </li>
              <li>
                <p className="small">
                  Carry out housing development (including the provision of
                  utilities and roads) building, maintenance, repair and
                  operations
                </p>
              </li>
              <li>
                <p className="small">
                  Carry on any business or undertaking in or for the purposes of
                  any housing development
                </p>
              </li>
              <li>
                <p className="small">
                  Grant loans on such terms and conditions as he deems fit to
                  persons of low and middle incomes for the purpose of the
                  rehabilitation and improvement of dwelling houses.
                </p>
              </li>
              <li>
                <p className="small">
                  Promote and encourage the construction of new dwelling houses
                  of sound construction and affording suitable accommodation for
                  families of low or middle incomes and senior citizens
                </p>
              </li>
              <li>
                <p className="small">
                  Promote or encourage the means of financing and construction
                  of dwelling houses for the benefit of persons wishing to own
                  and occupy such houses to such extent as may be necessary to
                  meet the public need in various parts of The Bahamas
                </p>
              </li>
              <li>
                <p className="small">
                  Purchase a mortgage redemption policy of insurance to provide
                  life insurance to approved borrowers
                </p>
              </li>
              <li>
                <p className="small">
                  Promote and encourage the establishment of such projects and
                  facilities as would appear to him to enhance the standard of
                  living, general welfare and well being of person and for those
                  purposes to exercise the powers hereinbefore conferred upon
                  him.
                </p>
              </li>
            </ul>
            <p className="small">
              The ministry through the Department of Housing constructs homes to
              be purchased by low to middle income persons. The purchase of
              these homes is usually financed through mortgages obtained from
              the Bahamas Mortgage Corporation. The ministry also provides
              living accommodations for rent and aids persons with small house
              repairs.
            </p>
            <p className="small">
              The Ministry of Housing and all of its departments was amalgamated
              with the Ministry of Environment following the general elections
              of 2012 to form the new Ministry of the Environment and Housing,
              under the leadership of Min. Kenred M. A. Dorsett. The minister
              has stated that the “merger provided the perfect opportunity for
              the government to achieve balance in its development efforts.”;
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
