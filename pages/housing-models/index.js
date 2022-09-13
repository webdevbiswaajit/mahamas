import axios from "apis/axios";
import Footer from "components/Footer";
import HousingModelCard from "components/HousingModelCard";
import Navbar from "components/Navbar";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

export default function HousingModels() {
  const [housingModels, setHousingModels] = useState(null);
  const [data, setData] = useState(null);
  const [queries, setQueries] = useState(null);
  const [searchQueries, setSearchQueries] = useState({
    location: "",
    bedrooms: "",
    bathrooms: "",
  });

  const router = useRouter();
  const { paginate, location, bedrooms, bathrooms } = router.query;
  const current_page = paginate || 1;
  const current_location = location || "";
  const current_bedrooms = bedrooms || "";
  const current_bathrooms = bathrooms || "";

  const handleSearch = () => {
    router.push(
      `/housing-models?location=${searchQueries.location}&bedrooms=${searchQueries.bedrooms}&bathrooms=${searchQueries.bathrooms}`
    );
  };

  useEffect(() => {
    setHousingModels(null);
    axios
      .get(
        `/housing_models?page=${current_page}&location=${current_location}&&bedrooms=${current_bedrooms}&bathrooms=${current_bathrooms}`
      )
      .then((response) => {
        setHousingModels(response.data.data);
        setData(response.data);
      });
    axios.get("/housing_models/get-queries").then((response) => {
      setQueries(response.data);
    });

    setSearchQueries({
      location: current_location,
      bedrooms: current_bedrooms,
      bathrooms: current_bathrooms,
    });
  }, [current_page, current_location, current_bedrooms, current_bathrooms]);

  return (
    <>
      <Navbar />
      <div className="container-fluid bg-light">
        <div className="row bg-gradient py-5">
          <h3 className="text-center">Government Subdivisions and Lots</h3>
        </div>
        <div className="container">
          <div className="row mb-5" style={{ marginTop: "-30px" }}>
            <div className="col text-center bg-white card-shadow py-2">
              <select
                value={searchQueries.location}
                onChange={(e) =>
                  setSearchQueries({
                    ...searchQueries,
                    location: e.target.value,
                  })
                }
                className="form-control"
                id="exampleFormControlSelect1"
              >
                <option value="">Select Location</option>
                {queries &&
                  queries.locations.map((location, index) => (
                    <option key={index} value={location}>
                      {location.charAt(0).toUpperCase() + location.slice(1)}
                    </option>
                  ))}
              </select>
            </div>
            <div className="col text-center bg-white card-shadow py-2">
              <select
                value={searchQueries.bedrooms}
                onChange={(e) =>
                  setSearchQueries({
                    ...searchQueries,
                    bedrooms: e.target.value,
                  })
                }
                className="form-control"
                id="exampleFormControlSelect1"
              >
                <option value="">Select Bedrooms</option>
                {queries &&
                  queries.bedrooms.map((bedroom, index) => (
                    <option key={index} value={bedroom}>
                      {bedroom}
                    </option>
                  ))}
              </select>
            </div>
            <div className="col text-center bg-white card-shadow py-2">
              <select
                value={searchQueries.bathrooms}
                onChange={(e) =>
                  setSearchQueries({
                    ...searchQueries,
                    bathrooms: e.target.value,
                  })
                }
                className="form-control"
                id="exampleFormControlSelect1"
              >
                <option value="">Select Bathrooms</option>
                {queries &&
                  queries.bathrooms.map((bathroom, index) => (
                    <option key={index} value={bathroom}>
                      {bathroom}
                    </option>
                  ))}
              </select>
            </div>
            <div
              onClick={handleSearch}
              className="col text-center card-shadow cursor-pointer btn-green py-3"
            >
              Search
            </div>
          </div>

          <div className="row mt-5">
            {housingModels
              ? housingModels.map((housingModel) => (
                  <div
                    key={housingModel.id}
                    className="col-12 col-md-6 col-xl-4 p-5 d-flex justify-content-center d-md-block"
                  >
                    <HousingModelCard data={housingModel} />
                  </div>
                ))
              : Array.from(Array(12)).map((housingModel, index) => (
                  <div
                    key={index}
                    className="col-12 col-md-6 col-xl-4 p-5 d-flex justify-content-center d-md-block"
                  >
                    <HousingModelCard data={housingModel} />
                  </div>
                ))}
          </div>
          <div className="d-flex justify-content-center pb-3">
            {data && data.prev_page_url && (
              <Link
                href={`/housing-models?paginate=${
                  data.current_page - 1
                }&location=${current_location}&bedrooms=${current_bedrooms}&bathrooms=${current_bathrooms}`}
              >
                <a className="btn btn-green me-3">{"<Prev"}</a>
              </Link>
            )}
            {data && data.next_page_url && (
              <Link
                href={`/housing-models?paginate=${
                  data.current_page + 1
                }&location=${current_location}&bedrooms=${current_bedrooms}&bathrooms=${current_bathrooms}`}
              >
                <a className="btn btn-green">{"Next>"}</a>
              </Link>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
