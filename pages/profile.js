import { getProfileData, updateProfileData } from "apis/profile";
import Footer from "components/Footer";
import HousingModelCards from "components/HousingModelCards";
import LearnMore from "components/LearnMore";
import Navbar from "components/Navbar";
import ProfileCard from "components/ProfileCard";
import withAuth from "HOC/withAuth";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

const islands = [
  "Abaco",
  "Acklins",
  "Andros",
  "Berry Islands",
  "Bimini",
  "Cat Island",
  "Crooked Island",
  "Eleuthera",
  "Exuma",
  "Grand Bahama",
  "Inagua",
  "Long Cay",
  "Long Island",
  "Mayaguana",
  "New Providence",
  "Ragged Island",
  "Rum Cay",
  "San Salvador",
];
const countries = [
  "Bahamas",
  "Afghanistan ",
  "Albania",
  "Algeria",
  "Andorra",
  "Angola",
  "Antigua and Barbuda",
  "Argentina",
  "Armenia",
  "Australia",
  "Austria",
  "Azerbaijan",
  "Bahrain",
  "Bangladesh",
  "Barbados",
  "Belarus",
  "Belgium",
  "Belize",
  "Benin",
  "Bhutan",
  "Bolivia",
  "Bosnia and Herzegovina",
  "Botswana",
  "Brazil",
  "Brunei Darussalam",
  "Bulgaria",
  "Burkina Faso",
  "Burundi",
  "Cabo Verde",
  "Cambodia",
  "Cameroon",
  "Canada",
  "Central African Republic",
  "Chad",
  "Chile",
  "China",
  "Colombia",
  "Comoros",
  "Congo",
  "Costa Rica",
  "Côte d'Ivoire",
  "Croatia",
  "Cuba",
  "Cyprus",
  "Czechia",
  "Korea",
  "Congo",
  "Denmark",
  "Djibouti",
  "Dominica",
  "Dominican Republic",
  "Ecuador",
  "Egypt",
  "El Salvador",
  "Equatorial Guinea",
  "Eritrea",
  "Estonia",
  "Eswatini",
  "Ethiopia",
  "Fiji",
  "Finland",
  "France",
  "Gabon",
  "Gambia",
  "Georgia",
  "Germany",
  "Ghana",
  "Greece",
  "Grenada",
  "Guatemala",
  "Guinea",
  "Guinea-Bissau",
  "Guyana",
  "Haiti",
  "Honduras",
  "Hungary",
  "Iceland",
  "India",
  "Indonesia",
  "Iran",
  "Iraq",
  "Ireland",
  "Israel",
  "Italy",
  "Jamaica",
  "Japan",
  "Jordan",
  "Kazakhstan",
  "Kenya",
  "Kiribati",
  "Kuwait",
  "Kyrgyzstan",
  "Lao People's Democratic Republic",
  "Latvia",
  "Lebanon",
  "Lesotho",
  "Liberia",
  "Libya",
  "Liechtenstein",
  "Lithuania",
  "Luxembourg",
  "Madagascar",
  "Malawi",
  "Malaysia",
  "Maldives",
  "Mali",
  "Malta",
  "Marshall Islands",
  "Mauritania",
  "Mauritius",
  "Mexico",
  "Micronesia",
  "Monaco",
  "Mongolia",
  "Montenegro",
  "Morocco",
  "Mozambique",
  "Myanmar",
  "Namibia",
  "Nauru",
  "Nepal",
  "Netherlands",
  "New Zealand",
  "Nicaragua",
  "Niger",
  "Nigeria",
  "North Macedonia",
  "Norway",
  "Oman",
  "Pakistan",
  "Palau",
  "Panama",
  "Papua New Guinea",
  "Paraguay",
  "Peru",
  "Philippines",
  "Poland",
  "Portugal",
  "Qatar",
  "Republic of Korea",
  "Republic of Moldova",
  "Romania",
  "Russian Federation",
  "Rwanda",
  "Saint Kitts and Nevis",
  "Saint Lucia",
  "Saint Vincent and the Grenadines",
  "Samoa",
  "San Marino",
  "Sao Tome and Principe",
  "Saudi Arabia",
  "Senegal",
  "Serbia",
  "Seychelles",
  "Sierra Leone",
  "Singapore",
  "Slovakia",
  "Slovenia",
  "Solomon Islands",
  "Somalia",
  "South Africa",
  "South Sudan",
  "Spain",
  "Sri Lanka",
  "Sudan",
  "Suriname",
  "Sweden",
  "Switzerland",
  "Syrian Arab Republic",
  "Tajikistan",
  "Thailand",
  "Timor-Leste",
  "Togo",
  "Tonga",
  "Trinidad and Tobago",
  "Tunisia",
  "Turkey",
  "Turkmenistan",
  "Tuvalu",
  "Uganda",
  "Ukraine",
  "United Arab Emirates ",
  "United Kingdom",
  "United Republic of Tanzania ",
  "United States of America ",
  "Uruguay",
  "Uzbekistan",
  "Vanuatu",
  "Venezuela",
  "Viet Nam",
  "Yemen",
  "Zambia",
  "Zimbabwe",
  "Holy See",
  "State of Palestine",
  "Cook Islands",
  "Niue",
];

function Profile() {
  const [profile, setProfile] = useState(null);
  const [editing, setEditing] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const res = await updateProfileData(data);
      setProfile(res);
      setEditing(false);
      toast.success("Profile updated");
      location.reload();
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  useEffect(() => {
    async function fetchData() {
      const response = await getProfileData();
      setProfile(response);
    }
    fetchData();
  }, []);

  return (
    <>
      <Navbar />
      <div className="bg-light">
        <div className="container py-5">
          <div className="row">
            <div className="col-12 col-lg-8">
              <ProfileCard />
              {profile && (
                <div className="card card-shadow p-3">
                  <div className="card-body">
                    <h6 className="color-green">Profile</h6>

                    <form onSubmit={handleSubmit(onSubmit)} className="p-3">
                      <div className="input-group mb-3">
                        <div className="input-group-prepend">
                          <span
                            className="input-group-text border-0 bg-light text-secondary"
                            id="basic-addon1"
                          >
                            First Name
                          </span>
                        </div>

                        <input
                          disabled={!editing}
                          defaultValue={profile.fname}
                          {...register("fname")}
                          className="form-control bg-light border-0"
                          type="text"
                          placeholder="First Name"
                        />
                      </div>

                      <div className="input-group mb-3">
                        <div className="input-group-prepend">
                          <span
                            className="input-group-text border-0 bg-light text-secondary"
                            id="basic-addon1"
                          >
                            Last Name
                          </span>
                        </div>

                        <input
                          disabled={!editing}
                          defaultValue={profile.lname}
                          {...register("lname")}
                          className="form-control bg-light border-0"
                          type="text"
                          placeholder="Last Name"
                        />
                      </div>

                      <div className="input-group mb-3">
                        <div className="input-group-prepend">
                          <span
                            className="input-group-text border-0 bg-light text-secondary"
                            id="basic-addon1"
                          >
                            NIB Number
                          </span>
                        </div>

                        <input
                          disabled={!editing}
                          defaultValue={profile.nib}
                          {...register("nib")}
                          className="form-control bg-light border-0 "
                          type="text"
                          placeholder="NIB Number"
                        />
                      </div>
                      <div className="input-group mb-3">
                        <div className="input-group-prepend">
                          <span
                            className="input-group-text border-0 bg-light text-secondary"
                            id="basic-addon1"
                          >
                            Email
                          </span>
                        </div>

                        <input
                          disabled={!editing}
                          defaultValue={profile.email}
                          {...register("email")}
                          className="form-control bg-light border-0"
                          type="text"
                          placeholder="Email"
                        />
                      </div>
                      <div className="input-group mb-3">
                        <div className="input-group-prepend">
                          <span
                            className="input-group-text border-0 bg-light text-secondary"
                            id="basic-addon1"
                          >
                            Phone
                          </span>
                        </div>
                        <input
                          disabled={!editing}
                          defaultValue={profile.phone}
                          {...register("phone")}
                          className="form-control bg-light border-0"
                          type="text"
                          placeholder="phone"
                        />
                      </div>

                      <div className="input-group mb-3">
                        <div className="input-group-prepend">
                          <span
                            className="input-group-text border-0 bg-light text-secondary"
                            id="basic-addon1"
                          >
                            Date of birth
                          </span>
                        </div>
                        <input
                          disabled={!editing}
                          defaultValue={profile.dob}
                          {...register("dob")}
                          className="form-control bg-light border-0"
                          type="date"
                        />
                      </div>
                      <div className="input-group mb-3">
                        <div className="input-group-prepend">
                          <span
                            className="input-group-text border-0 bg-light text-secondary"
                            id="basic-addon1"
                          >
                            Gender
                          </span>
                        </div>

                        <select
                          disabled={!editing}
                          defaultValue={profile.gender}
                          {...register("gender")}
                          className="form-control bg-light border-0"
                        >
                          <option value="">Not Selected</option>
                          <option value="male">Male</option>
                          <option value="female">Female</option>
                          <option value="other">Other</option>
                        </select>
                      </div>

                      <div className="input-group mb-3">
                        <div className="input-group-prepend">
                          <span
                            className="input-group-text border-0 bg-light text-secondary"
                            id="basic-addon1"
                          >
                            Country of Birth
                          </span>
                        </div>

                        <select
                          disabled={!editing}
                          defaultValue={profile.country_of_birth}
                          {...register("country_of_birth")}
                          className="form-control bg-light border-0 "
                        >
                          <option value="">Not Selected</option>
                          {countries.map((country, index) => (
                            <option key={index} value={country}>
                              {country}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="input-group mb-3">
                        <div className="input-group-prepend">
                          <span
                            className="input-group-text border-0 bg-light text-secondary"
                            id="basic-addon1"
                          >
                            Island of Birth
                          </span>
                        </div>

                        <select
                          disabled={!editing}
                          defaultValue={profile.island_of_birth}
                          {...register("island_of_birth")}
                          className="form-control bg-light border-0 "
                        >
                          <option value="">Not Selected</option>
                          {islands.map((island, index) => (
                            <option key={index} value={island}>
                              {island}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className="input-group mb-3">
                        <div className="input-group-prepend">
                          <span
                            className="input-group-text border-0 bg-light text-secondary"
                            id="basic-addon1"
                          >
                            Country of Citizenship
                          </span>
                        </div>

                        <select
                          disabled={!editing}
                          defaultValue={profile.country_of_citizenship}
                          {...register("country_of_citizenship")}
                          className="form-control bg-light border-0 "
                        >
                          <option value="">Not Selected</option>
                          {countries.map((country, index) => (
                            <option key={index} value={country}>
                              {country}
                            </option>
                          ))}
                        </select>
                      </div>
                      <textarea
                        disabled={!editing}
                        defaultValue={profile.description ?? null}
                        {...register("description")}
                        className="form-control bg-light border-0 mb-3"
                        placeholder="Description about yourself"
                        rows={5}
                      />

                      <div className="text-center">
                        {!editing && (
                          <button
                            onClick={() => setEditing(true)}
                            className="btn btn-orange me-3"
                          >
                            Edit Profile
                          </button>
                        )}
                        {editing && (
                          <input
                            className="btn btn-green"
                            type="submit"
                            value="Save changes"
                          />
                        )}
                      </div>
                    </form>
                  </div>
                </div>
              )}
            </div>
            <div className="d-none d-lg-block col-lg-4">
              <LearnMore />
              <br />
              <HousingModelCards count={3} />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default withAuth(Profile);
