import axios from "apis/axios";
import HousingModelCard from "components/HousingModelCard";
import React, { useEffect, useState } from "react";

export default function HousingModelCards({ count }) {
  const [housingModels, setHousingModels] = useState(null);

  useEffect(() => {
    axios.get("/housing_models").then((res) => {
      setHousingModels(res.data.data.splice(0, count));
    });
  }, []);

  return (
    <div>
      {housingModels
        ? housingModels.map((housingModel, index) => (
            <div className="mb-3" key={index}>
              <HousingModelCard key={index} data={housingModel} />
            </div>
          ))
        : Array.from(Array(count)).map((_, index) => (
            <div className="mb-3" key={index}>
              <HousingModelCard key={index} data={null} />
            </div>
          ))}
    </div>
  );
}
