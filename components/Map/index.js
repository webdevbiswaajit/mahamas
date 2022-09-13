import React from "react";
import {
  GoogleMap,
  Marker,
  withGoogleMap,
  withScriptjs,
} from "react-google-maps";

function Map() {
  return (
    <div>
      <GoogleMap
        defaultZoom={10}
        defaultCenter={{ lat: 25.0772227, lng: -77.3440482 }}
      >
        <Marker
          position={{
            lat: 22.919000074088746,
            lng: 89.49135388384933,
          }}
        />
      </GoogleMap>
    </div>
  );
}

export default withScriptjs(withGoogleMap(Map));
