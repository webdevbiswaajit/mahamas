import axios from "apis/axios";
import Link from "next/link";
import React, { useState } from "react";
import Skeleton from "react-loading-skeleton";

export default function HousingModelSidebar() {
  const [housingModels, setHousingModels] = useState(null);

  useState(() => {
    axios.get("/housing_models").then((res) => {
      setHousingModels(res.data.data.splice(0, 7));
    });
  }, []);

  return housingModels ? (
    <div className="card card-shadow">
      <div className="card-header bg-green text-center">
        <h6 className="text-white">Housing Models</h6>
      </div>
      <div className="card-body">
        {housingModels &&
          housingModels.map((housingModel) => (
            <Link
              key={housingModel.id}
              href={`/housing-models/${housingModel.id}`}
            >
              <a className="d-block py-1">
                <strong>{housingModel.heading}</strong>
                <br />
                <small>
                  {housingModel.bedrooms &&
                    `${housingModel.bedrooms} Bedrooms, `}
                  {housingModel.bathrooms &&
                    `${housingModel.bathrooms} Bathrooms, `}
                  {housingModel.width && `${housingModel.width} Sqft.`}
                </small>
              </a>
            </Link>
          ))}
      </div>
    </div>
  ) : (
    <div className="card card-shadow">
      <div className="card-header bg-green text-center">
        <h6 className="text-white">Housing Models</h6>
      </div>
      <div className="card-body">
        {Array.from(Array(7)).map((_, index) => (
          <Skeleton className="mb-3" key={index} />
        ))}
      </div>
    </div>
  );
}
