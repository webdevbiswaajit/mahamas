import TeamCard from "components/TeamCard";
import React from "react";

export default function OurTeam() {
  const data = [
    {
      name: "Ms. Antoinette Thompson, MSc",
      designation: "Permanent Secretary",
      photo: "/img/team/1.jpg",
      email: "antoinettethompson@bahamas.gov.bs",
      phone: "",
    },
    {
      name: "Gaynell Rolle MBA, CRMA",
      designation: "Under Secretary",
      photo: "/img/team/2.jpeg",
      email: "gaynellrolle@bahamas.gov.bs",
      phone: "",
    },

    {
      name: "Mr. Oral Lafleur",
      designation: "Acting Chief Housing Officer",
      photo: "/img/team/3.jpg",
      email: "orallafleur@bahamas.gov.bs",
      phone: "",
    },
    {
      name: "Mr. Thomas Ferguson",
      designation: "Acting Director of Housing",
      photo: "/img/team/4.jpg",
      email: "thomasferguson@bahamas.gov.bs",
      phone: "",
    },
  ];

  return (
    <div className="bg-light py-5">
      <div className="container">
        <div className="text-center">
          <h3>Meet the Executive Team</h3>
          <p>Get in touch with our team</p>
        </div>
        <div className="row mt-5">
          <div className="col-12 col-md-6 col-lg-3 d-flex justify-content-center mb-5">
            <TeamCard
              name={data[0].name}
              designation={data[0].designation}
              photo={data[0].photo}
              email={data[0].email}
              phone={data[0].phone}
            />
          </div>
          <div className="col-12 col-md-6 col-lg-3 d-flex justify-content-center mb-5">
            <TeamCard
              name={data[1].name}
              designation={data[1].designation}
              photo={data[1].photo}
              email={data[1].email}
              phone={data[1].phone}
            />
          </div>
          <div className="col-12 col-md-6 col-lg-3 d-flex justify-content-center mb-5">
            <TeamCard
              name={data[2].name}
              designation={data[2].designation}
              photo={data[2].photo}
              email={data[2].email}
              phone={data[2].phone}
            />
          </div>
          <div className="col-12 col-md-6 col-lg-3 d-flex justify-content-center mb-5">
            <TeamCard
              name={data[3].name}
              designation={data[3].designation}
              photo={data[3].photo}
              email={data[3].email}
              phone={data[3].phone}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
