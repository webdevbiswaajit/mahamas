import axios from "apis/axios";
import HousingModelCard from "components/HousingModelCard";
import React, { useState } from "react";

export default function HousingModels() {
  const [housingModels, setHousingModels] = useState(null);

  useState(() => {
    axios.get("/housing_models").then((res) => {
      setHousingModels(res.data.data.splice(0, 4));
    });
  });

  return (
    <div className="py-5" style={{ background: "#d7f5ed" }}>
      <div className="container">
        <div className="text-center">
          <h3>Housing Models</h3>
          <p>Check out some of our latest homes.</p>
        </div>
        {housingModels && (
          <div className="row  pt-3">
            {housingModels.map((housingModel) => (
              <div
                key={housingModel.id}
                className="col-12 col-md-6 col-xl-4 p-5 d-flex justify-content-center d-md-block"
              >
                <HousingModelCard data={housingModel} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
