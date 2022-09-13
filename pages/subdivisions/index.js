import axios from "apis/axios";
import Footer from "components/Footer";
import Navbar from "components/Navbar";
import SubdivisionCard from "components/SubdivisionCard";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

export default function Subdivisions() {
  const [subdivisions, setSubdivisions] = useState(null);
  const [data, setData] = useState(null);
  const [locations, setLocations] = useState([]);
  const [searchLocation, setSearchLocation] = useState("");
  const [searchCategory, setSearchCategory] = useState("");

  const router = useRouter();
  const { paginate, location, category } = router.query;
  const current_page = paginate || 1;
  const current_location = location || "";
  const current_category = category || "";

  const handleSearch = () => {
    router.push(
      `/subdivisions?location=${searchLocation}&category=${searchCategory}`
    );
  };

  useEffect(() => {
    setSubdivisions(null);
    axios
      .get(
        `/subdivisions?page=${current_page}&location=${current_location}&category=${current_category}`
      )
      .then((response) => {
        setSubdivisions(response.data.data);
        setData(response.data);
      });

    axios.get("/subdivisions/get-locations").then((response) => {
      setLocations(response.data);
    });
    setSearchLocation(current_location);
    setSearchCategory(current_category);
  }, [current_page, current_location, current_category]);

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
                value={searchCategory}
                onChange={(e) => setSearchCategory(e.target.value)}
                className="form-control"
                id="exampleFormControlSelect1"
              >
                <option value="">Select Category</option>
                <option value="featured">Featured</option>
                <option value="new_arrival">New Arrivals</option>
              </select>
            </div>

            <div className="col text-center bg-white card-shadow py-2">
              <select
                value={searchLocation}
                onChange={(e) => setSearchLocation(e.target.value)}
                className="form-control"
                id="exampleFormControlSelect1"
              >
                <option value="">Select Location</option>
                {locations.map((location, index) => (
                  <option key={index} value={location}>
                    {location.charAt(0).toUpperCase() + location.slice(1)}
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
            {subdivisions ? (
              subdivisions.length == 0 ? (
                <div className="col text-center">
                  <h3 className="text-muted my-5 py-5">
                    No Subdivisions Found
                  </h3>
                </div>
              ) : (
                subdivisions.map((subdivision) => (
                  <div
                    key={subdivision.id}
                    className="col-12 col-md-6 col-xl-4 p-5 d-flex justify-content-center d-md-block"
                  >
                    <SubdivisionCard subdivision={subdivision} />
                  </div>
                ))
              )
            ) : (
              Array.from(Array(12)).map((subdivision, index) => (
                <div
                  key={index}
                  className="col-12 col-md-6 col-xl-4 p-5 d-flex justify-content-center d-md-block"
                >
                  <SubdivisionCard subdivision={subdivision} />
                </div>
              ))
            )}
          </div>
          <div className="d-flex justify-content-center pb-3">
            {data && data.prev_page_url && (
              <Link
                href={`/subdivisions?paginate=${
                  data.current_page - 1
                }&location=${current_location}&category=${current_category}`}
              >
                <a className="btn btn-green me-3">{"<Prev"}</a>
              </Link>
            )}
            {data && data.next_page_url && (
              <Link
                href={`/subdivisions?paginate=${
                  data.current_page + 1
                }&location=${current_location}&category=${current_category}`}
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
