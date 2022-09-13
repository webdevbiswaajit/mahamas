import Footer from "components/Footer";
import Navbar from "components/Navbar";

export default function TnC() {
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
                <span className="ms-3">Permissions</span>
              </div>
              <div className="d-flex align-items-center my-3">
                <span className="badge-number-rounded bg-white color-green fw-bold">
                  2
                </span>
                <span className="ms-3">Security</span>
              </div>
              <div className="d-flex align-items-center my-3">
                <span className="badge-number-rounded bg-white color-green fw-bold">
                  3
                </span>
                <span className="ms-3">Age</span>
              </div>
              <div className="d-flex align-items-center my-3">
                <span className="badge-number-rounded bg-white color-green fw-bold">
                  4
                </span>
                <span className="ms-3">Submission of Information</span>
              </div>
              <div className="d-flex align-items-center my-3">
                <span className="badge-number-rounded bg-white color-green fw-bold">
                  5
                </span>
                <span className="ms-3">Conduct</span>
              </div>
              <div className="d-flex align-items-center my-3">
                <span className="badge-number-rounded bg-white color-green fw-bold">
                  6
                </span>
                <span className="ms-3">Laws</span>
              </div>
            </div>
          </div>
          <div className="col-12 col-lg-8 p-4">
            <h3 className="text-dark">Terms and conditions</h3>
            <small>
              By using this site, you agree to these terms and conditions:{" "}
            </small>
            <h5 className="liner">Permissions</h5>
            <small>
              The Government of The Bahamas is given permission to use your
              personal information provided at this site, and any information
              submitted to other Government sources necessary to process any
              application requested on this site.
            </small>
            <h5 className="liner">Security</h5>
            <small>
              By registering at this site, you are responsible for maintaining
              the confidentiality of your account and password, and for ensuring
              that the computer you use to access this site is secure.
            </small>
            <h5 className="liner">Age</h5>
            <small>
              Persons under the age of 18 may register at this site only with
              the consent of a parent or legal guardian.
            </small>
            <h5 className="liner">Submission of Information</h5>
            <small>
              You will not impersonate any person or present false information
              to register at this site, and you are responsible for the accuracy
              of the information you provide.
            </small>
            <h5 className="liner">Conduct</h5>
            <small>
              Any content posted at this site must not be illegal, obscene,
              threatening or defamatory.
            </small>
            <h5 className="liner">Laws</h5>
            <small>
              All transactions on this site will be logged and audited, and are
              bound by the laws of The Bahamas.
            </small>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
