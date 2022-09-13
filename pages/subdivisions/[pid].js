import axios from "apis/axios";
import Footer from "components/Footer";
import Navbar from "components/Navbar";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Lightbox from "react-awesome-lightbox";
import "react-awesome-lightbox/build/style.css";
import Skeleton from "react-loading-skeleton";

export default function Subdivision() {
  const [subdivision, setSubdivision] = useState(null);
  const [showLightbox, setShowLightbox] = useState("");

  const router = useRouter();
  const { pid } = router.query;

  useEffect(() => {
    pid &&
      axios.get(`/subdivisions/${pid}`).then((response) => {
        setSubdivision(response.data);
      });
  }, [pid]);

  return (
    <>
      <Navbar />
      {showLightbox && (
        <Lightbox onClose={() => setShowLightbox("")} image={showLightbox} />
      )}
      <div className="bg-gradient py-5">
        <h3 className="text-center">Government Subdivision and Lots</h3>
      </div>

      <div className="container py-3">
        <div
          id="carouselExampleControls"
          className="carousel slide"
          data-bs-ride="carousel"
        >
          <div className="carousel-inner">
            {subdivision?.gallery ? (
              subdivision.gallery.map((image, index) => (
                <div
                  key={index}
                  className={`carousel-item position-relative hero-img-subdivision ${
                    index == 0 ? "active" : ""
                  }`}
                >
                  <Image
                    onClick={() => setShowLightbox(image.original)}
                    src={image.thumb}
                    layout="fill"
                    alt="..."
                    objectFit="contain"
                  />
                </div>
              ))
            ) : (
              <Skeleton height={700} />
            )}
          </div>
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExampleControls"
            data-bs-slide="prev"
          >
            <span
              className="fas fa-arrow-circle-left fs-2"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#carouselExampleControls"
            data-bs-slide="next"
          >
            <span
              className="fas fa-arrow-circle-right fs-2"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
        <div className="card-shadow mt-3">
          <div className="card-body">
            <h5 className="color-dark">
              {subdivision?.heading || <Skeleton width="50%" />}
            </h5>
            {subdivision?.location ? (
              <div>
                <i className="color-green fas fa-map-marker-alt me-2 " />
                <span className="color-green fw-bold">Location:</span>
                <span className="color-green ms-2">
                  {subdivision?.location}
                </span>
              </div>
            ) : (
              <Skeleton inline={true} />
            )}
            <h6 className="mt-3 color-dark">Description</h6>
            <p className="small color-dark">
              {subdivision?.description || (
                <Skeleton className="mb-2" count={5} />
              )}
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
