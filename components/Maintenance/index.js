import React from "react";

export default function Maintenance() {
  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <h5>The site is currently under maintenance.</h5>
      <h5>Please check back later.</h5>
    </div>
  );
}
