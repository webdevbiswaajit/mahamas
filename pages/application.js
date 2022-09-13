import { ErrorMessage } from "@hookform/error-message";
import axios from "apis/axios";
import { getProfileData } from "apis/profile";
import Footer from "components/Footer";
import HousingModelCards from "components/HousingModelCards";
import LearnMore from "components/LearnMore";
import Navbar from "components/Navbar";
import ProfileCard from "components/ProfileCard";
import withAuth from "HOC/withAuth";
import Link from "next/link";
import React, { useEffect, useState } from "react";
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
const industries = [
  "Banking",
  "Insurance",
  "Tourism",
  "Retail",
  "Customs",
  "Defence Force",
  "Immigration",
  "Public Service",
  "Police",
];

function Application() {
  const [profile, setProfile] = useState(null);
  const [subdivisions, setSubdivisions] = useState([]);
  const [housingModels, setHousingModels] = useState([]);
  const [canSubmit, setCanSubmit] = useState(null);
  const [deps, setDeps] = useState(0);
  const [submitting, setSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    if (!data.accept) {
      toast.error("You must accept the terms and conditions");
      return;
    }

    const formData = new FormData();
    Object.keys(data).forEach((key) => {
      formData.append(key, data[key]);
    });

    if (data.passport_photo.length > 0) {
      formData.append("passport_photo", data.passport_photo[0]);
    } else {
      formData.delete("passport_photo");
    }
    formData.append("nib_photo", data.nib_photo[0]);
    formData.append(
      "pre_approved_letter_photo",
      data.pre_approved_letter_photo[0]
    );
    formData.append("job_letter_document", data.job_letter_document[0]);

    try {
      setSubmitting(true);
      const res = await axios.post("/apply", formData);
      toast.success("Application submitted successfully");
      setDeps(Math.random());
      setSubmitting(false);
    } catch (err) {
      setSubmitting(false);
      toast.error("Check your inputs and try again");
      errorify(err.response.data.errors);
    }
  };

  const errorify = (err) => {
    Object.entries(err).forEach(([key, value]) => {
      setError(
        key,
        { type: "custom", message: value[0] },
        { shouldFocus: true }
      );
    });
  };

  const showError = (fieldName) => {
    return (
      <ErrorMessage
        errors={errors}
        name={fieldName}
        render={({ message }) => (
          <small className="text-danger">{message}</small>
        )}
      />
    );
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const getProfile = await getProfileData();
        setProfile(getProfile);
        const canSubmit = await axios.get("/can-submit-application");
        setCanSubmit(canSubmit.data.canSubmit);
        const subdivisions = await axios.get("/subdivisions/for-application");
        setSubdivisions(subdivisions.data);
        const housingModels = await axios.get(
          "/housing_models/for-application"
        );
        setHousingModels(housingModels.data);
      } catch (err) {}
    }
    fetchData();
  }, [deps]);

  return (
    <>
      <Navbar />

      <div className="bg-light">
        <div className="container py-5">
          <div className="row">
            <div className="col-12 col-lg-8">
              <ProfileCard />
              {canSubmit !== null && (
                <div className="card card-shadow p-3">
                  <div className="card-body">
                    <h3 className="card-title text-center color-dark">
                      Application Form
                    </h3>

                    {profile && canSubmit && (
                      <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="p-3">
                          <h6 className="color-green">Personal Information</h6>
                          <div className="form-group">
                            <label className="text-muted">First Name</label>
                            <input
                              type="text"
                              className={`form-control border-0 bg-light ${
                                errors.fname && "invalid"
                              }`}
                              defaultValue={profile.fname}
                              {...register("fname", {
                                required: "First Name is required!",
                              })}
                            />
                            {showError("fname")}
                          </div>
                          <div className="form-group mt-3">
                            <label className="text-muted">Last Name</label>
                            <input
                              type="text"
                              className={`form-control border-0 bg-light ${
                                errors.lname && "invalid"
                              }`}
                              defaultValue={profile.lname}
                              {...register("lname", {
                                required: "Last Name is required!",
                              })}
                            />
                            {showError("lname")}
                          </div>
                          <div className="form-group mt-3">
                            <label className="text-muted">NIB Number</label>
                            <input
                              type="text"
                              className={`form-control border-0 bg-light ${
                                errors.nib_no && "invalid"
                              }`}
                              defaultValue={profile.nib}
                              {...register("nib_no", {
                                required: "NIB no. is required!",
                              })}
                            />
                            {showError("nib_no")}
                          </div>

                          <div className="form-group mt-3">
                            <label className="text-muted">Email</label>
                            <input
                              type="email"
                              className={`form-control border-0 bg-light ${
                                errors.email && "invalid"
                              }`}
                              defaultValue={profile.email}
                              {...register("email", {
                                required: "Email is required!",
                              })}
                            />
                            {showError("email")}
                          </div>

                          <div className="form-group mt-3">
                            <label className="text-muted">Date of Birth</label>
                            <input
                              type="date"
                              className={`form-control border-0 bg-light ${
                                errors.dob && "invalid"
                              }`}
                              defaultValue={profile.dob}
                              {...register("dob", {
                                required: "Date of birth is required!",
                              })}
                            />
                            {showError("dob")}
                          </div>

                          <div className="form-group mt-3">
                            <label className="text-muted">Gender</label>
                            <select
                              {...register("gender", {
                                required: "Gender is required!",
                              })}
                              defaultValue={profile.gender}
                              className={`form-control border-0 bg-light ${
                                errors.gender && "invalid"
                              }`}
                            >
                              <option value="">Select Gender</option>
                              <option value="male">Male</option>
                              <option value="female">Female</option>
                              <option value="other">Other</option>
                            </select>
                            {showError("gender")}
                          </div>

                          <div className="form-group mt-3">
                            <label className="text-muted">
                              Country of Birth
                            </label>

                            <select
                              {...register("country_of_birth", {
                                required: "Country of birth is required!",
                              })}
                              defaultValue={profile.country_of_birth}
                              className={`form-control border-0 bg-light ${
                                errors.country_of_birth && "invalid"
                              }`}
                            >
                              <option value="">Select Country</option>
                              {countries.map((country, index) => (
                                <option key={index} value={country}>
                                  {country}
                                </option>
                              ))}
                            </select>
                            {showError("country_of_birth")}
                          </div>

                          <div className="form-group mt-3">
                            <label className="text-muted">
                              Island of Birth
                            </label>

                            <select
                              {...register("island_of_birth", {
                                required: "Islan of birth is required!",
                              })}
                              defaultValue={profile.island_of_birth}
                              className={`form-control border-0 bg-light ${
                                errors.island_of_birth && "invalid"
                              }`}
                            >
                              <option value="">Select Island</option>
                              {islands.map((island, index) => (
                                <option key={index} value={island}>
                                  {island}
                                </option>
                              ))}
                            </select>
                            {showError("island_of_birth")}
                          </div>

                          <div className="form-group mt-3">
                            <label className="text-muted">
                              Country of Citizenship
                            </label>

                            <select
                              {...register("country_of_citizenship", {
                                required: "Country of citizenship is required!",
                              })}
                              defaultValue={profile.country_of_citizenship}
                              className={`form-control border-0 bg-light ${
                                errors.country_of_citizenship && "invalid"
                              }`}
                            >
                              <option value="">Select Country</option>
                              {countries.map((country, index) => (
                                <option key={index} value={country}>
                                  {country}
                                </option>
                              ))}
                            </select>
                            {showError("country_of_citizenship")}
                          </div>

                          <div className="form-group mt-3">
                            <label className="text-muted">Phone</label>
                            <input
                              {...register("phone", {
                                required: "Phone is required!",
                              })}
                              defaultValue={profile.phone}
                              className={`form-control border-0 bg-light ${
                                errors.phone && "invalid"
                              }`}
                              type="text"
                              placeholder="Type here..."
                            />
                            {showError("phone")}
                          </div>
                        </div>
                        <div className="p-3">
                          <h6 className="color-green">Home Address</h6>
                          <div className="form-group mt-3">
                            <label className="text-muted">House No.</label>

                            <input
                              {...register("house_no", {
                                required: "House no. is required!",
                              })}
                              className={`form-control border-0 bg-light ${
                                errors.house_no && "invalid"
                              }`}
                              type="text"
                              placeholder="Type here..."
                            />
                            {showError("house_no")}
                          </div>

                          <div className="form-group mt-3">
                            <label className="text-muted">Street Address</label>

                            <input
                              {...register("street_address", {
                                required: "Street address is required!",
                              })}
                              className={`form-control border-0 bg-light ${
                                errors.street_address && "invalid"
                              }`}
                              type="text"
                              placeholder="Type here..."
                            />
                            {showError("street_address")}
                          </div>

                          <div className="form-group mt-3">
                            <label className="text-muted">P.O Box</label>

                            <input
                              {...register("po_box", {
                                required: "P.O box is required!",
                              })}
                              className={`form-control border-0 bg-light ${
                                errors.po_box && "invalid"
                              }`}
                              type="text"
                              placeholder="Type here..."
                            />
                            {showError("po_box")}
                          </div>

                          <div className="form-group mt-3">
                            <label className="text-muted">Island</label>

                            <select
                              {...register("island", {
                                required: "Island is required!",
                              })}
                              className={`form-control border-0 bg-light ${
                                errors.island && "invalid"
                              }`}
                            >
                              <option value="">Select Island</option>
                              {islands.map((island, index) => (
                                <option key={index} value={island}>
                                  {island}
                                </option>
                              ))}
                            </select>
                            {showError("island")}
                          </div>

                          <div className="form-group mt-3">
                            <label className="text-muted">Country</label>

                            <select
                              {...register("country", {
                                required: "Country is required!",
                              })}
                              className={`form-control border-0 bg-light ${
                                errors.country && "invalid"
                              }`}
                            >
                              <option value="">Select Country</option>
                              {countries.map((country, index) => (
                                <option key={index} value={country}>
                                  {country}
                                </option>
                              ))}
                            </select>
                            {showError("country")}
                          </div>

                          <div className="form-group mt-3">
                            <label className="text-muted">Home Phone</label>

                            <input
                              {...register("home_phone", {
                                required: "Home phone is requried!",
                              })}
                              className={`form-control border-0 bg-light ${
                                errors.home_phone && "invalid"
                              }`}
                              type="text"
                              placeholder="Type here..."
                            />
                            {showError("home_phone")}
                          </div>
                        </div>
                        <div className="p-3">
                          <h6 className="color-green">
                            Identification Information
                          </h6>
                          <div className="form-group mt-3">
                            <label className="text-muted">Passport No.</label>
                            <input
                              {...register("passport_no")}
                              className={`form-control border-0 bg-light ${
                                errors.passport_no && "invalid"
                              }`}
                              type="text"
                              placeholder="Type here..."
                            />
                            {showError("passport_no")}
                          </div>

                          <div className="form-group mt-3">
                            <label className="text-muted">
                              Passport Expiration Date
                            </label>
                            <input
                              {...register("passport_expiry")}
                              className={`form-control border-0 bg-light ${
                                errors.passport_expiry && "invalid"
                              }`}
                              type="date"
                            />
                            {showError("passport_expiry")}
                          </div>

                          <div className="form-group mt-3">
                            <label className="text-muted">
                              Driving Licence No.
                            </label>

                            <input
                              {...register("driving_licence_no")}
                              className={`form-control border-0 bg-light ${
                                errors.driving_licence_no && "invalid"
                              }`}
                              type="text"
                              placeholder="Type here..."
                            />
                            {showError("driving_licence_no")}
                          </div>
                          <div className="form-group mt-3">
                            <label className="text-muted">
                              Upload NIB Photo
                            </label>

                            <input
                              className={`custom-file-upload form-control bg-light border-0 ${
                                errors.nib_photo && "invalid"
                              }`}
                              type="file"
                              {...register("nib_photo", {
                                required: "NIB photo is required!",
                              })}
                            />
                            {showError("nib_photo")}
                          </div>

                          <div className="form-group mt-3">
                            <label className="text-muted">
                              Upload Passport Photo
                            </label>

                            <input
                              className={`custom-file-upload form-control bg-light border-0 ${
                                errors.passport_photo && "invalid"
                              }`}
                              type="file"
                              {...register("passport_photo")}
                            />
                            {showError("passport_photo")}
                          </div>
                        </div>
                        <div className="p-3">
                          <h6 className="color-green">
                            Subdivision & Housing Model
                          </h6>
                          <div className="form-group mt-3">
                            <label className="text-muted">Subdivision</label>

                            <select
                              {...register("subdivision_id", {
                                required: "Subdivision is required!",
                              })}
                              defaultValue=""
                              className={`form-control bg-light border-0 ${
                                errors.subdivision_id && "invalid"
                              }`}
                            >
                              <option value="">Select Subdivision</option>
                              {subdivisions.map((subdivision) => (
                                <option
                                  key={subdivision.id}
                                  value={subdivision.id}
                                >
                                  {subdivision.heading}
                                </option>
                              ))}
                            </select>
                            {showError("subdivision_id")}
                          </div>
                          <div className="form-group mt-3">
                            <label className="text-muted">Housing Model</label>

                            <select
                              {...register("housing_model_id", {
                                required: "Housing model is required!",
                              })}
                              defaultValue=""
                              className={`form-control bg-light border-0 ${
                                errors.housing_model_id && "invalid"
                              }`}
                            >
                              <option value="">Select housing model</option>
                              {housingModels.map((housingModel) => (
                                <option
                                  key={housingModel.id}
                                  value={housingModel.id}
                                >
                                  {housingModel.heading}
                                </option>
                              ))}
                            </select>
                            {showError("housing_model_id")}
                          </div>
                        </div>
                        <div className="p-3">
                          <h6 className="color-green">
                            Employment Information
                          </h6>
                          <div className="form-group mt-3">
                            <label className="text-muted">Employer</label>

                            <input
                              {...register("employer", {
                                required: "Employer is required!",
                              })}
                              className={`form-control bg-light border-0 ${
                                errors.employer && "invalid"
                              }`}
                              type="text"
                              placeholder="Type here..."
                            />
                            {showError("employer")}
                          </div>

                          <div className="form-group mt-3">
                            <label className="text-muted">Industry</label>

                            <select
                              {...register("industry", {
                                required: "Industry is required!",
                              })}
                              defaultValue={profile.industry}
                              className={`form-control bg-light border-0 ${
                                errors.industry && "invalid"
                              }`}
                            >
                              <option value="">Select Industry</option>
                              {industries.map((industry, index) => (
                                <option key={index} value={industry}>
                                  {industry}
                                </option>
                              ))}
                            </select>
                            {showError("industry")}
                          </div>

                          <div className="form-group mt-3">
                            <label className="text-muted">Position</label>

                            <input
                              {...register("position", {
                                required: "Position is required!",
                              })}
                              className={`form-control bg-light border-0 ${
                                errors.position && "invalid"
                              }`}
                              type="text"
                              placeholder="Type here..."
                            />
                            {showError("position")}
                          </div>

                          <div className="form-group mt-3">
                            <label className="text-muted">Work Phone</label>

                            <input
                              {...register("work_phone", {
                                required: "Work phone is required!",
                              })}
                              className={`form-control bg-light border-0 ${
                                errors.work_phone && "invalid"
                              }`}
                              type="text"
                              placeholder="Type here..."
                            />
                            {showError("work_phone")}
                          </div>

                          <div className="form-group mt-3">
                            <label className="text-muted">
                              Upload Pre-Approved Letter
                            </label>

                            <input
                              className={`custom-file-upload form-control bg-light border-0 ${
                                errors.pre_approved_letter_photo && "invalid"
                              }`}
                              type="file"
                              {...register("pre_approved_letter_photo", {
                                required:
                                  "Pre-approved letter photo is required!",
                              })}
                            />
                            {showError("pre_approved_letter_photo")}
                          </div>

                          <div className="form-group mt-3">
                            <label className="text-muted">
                              Upload Job Letter Document
                            </label>

                            <input
                              className={`custom-file-upload form-control bg-light border-0 ${
                                errors.job_letter_document && "invalid"
                              }`}
                              type="file"
                              {...register("job_letter_document", {
                                required: "Job letter document is required!",
                              })}
                            />
                            {showError("job_letter_document")}
                          </div>

                          <div className="d-flex mt-3">
                            <input
                              {...register("accept")}
                              className="me-3"
                              type="checkbox"
                            />
                            <small className="color-green">
                              Accept{" "}
                              <Link href="/tnc">
                                <a>
                                  <u>Terms and Conditions</u>
                                </a>
                              </Link>
                            </small>
                          </div>
                        </div>
                        <div className="text-center">
                          <input
                            disabled={submitting}
                            className="btn btn-green"
                            type="submit"
                            value={submitting ? "Submitting..." : "Submit"}
                          />
                        </div>
                      </form>
                    )}
                    {profile && !canSubmit && (
                      <p className="lead text-muted mt-3 text-center">
                        Application already submitted <br />
                        <Link href="/application-status">
                          <a>
                            <u>Click here to view application status</u>
                          </a>
                        </Link>
                      </p>
                    )}
                  </div>
                </div>
              )}
            </div>
            <div className="d-none d-lg-block col-lg-4">
              <LearnMore />
              <br />
              <HousingModelCards count={2} />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default withAuth(Application);
