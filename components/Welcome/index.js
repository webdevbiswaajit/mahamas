import Image from "next/image";

export default function Welcome() {
  return (
    <div className="bg-white" style={{ padding: 50 }}>
      <div className="container">
        <div className="row">
          <div className="col-12 col-md-4 d-flex justify-content-center align-items-center mb-3 mb-md-0">
            <Image
              height={300}
              width={200}
              src="/img/team/5.jpg"
              alt="..."
              className="welcome-img rounded-circle border border-5 border-green"
            />
          </div>
          <div className="col-12 col-md-8 d-flex justify-content-center align-items-center">
            <div className="text-start">
              <p className="fs-6 d-lg-none">
                {
                  "Welcome to the Ministry of Transport and Housing new and improved website. We are excited to introduce to you a more user friendly and efficient way of viewing homes and applying online. We have added our new user login interface where persons can create their profile and track their application. My team and I are committed to ensuring that high quality affordable homes are available for all Bahamians throughout The Bahamas."
                }
              </p>
              <p className="fs-5 d-none d-lg-block">
                {
                  "Welcome to the Ministry of Transport and Housing new and improved website. We are excited to introduce to you a more user friendly and efficient way of viewing homes and applying online. We have added our new user login interface where persons can create their profile and track their application. My team and I are committed to ensuring that high quality affordable homes are available for all Bahamians throughout The Bahamas."
                }
              </p>
              <strong className="fs-5">
                Hon. JoBeth L. Coleby-Davis <br />
                Minister of Transport and Housing
              </strong>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
