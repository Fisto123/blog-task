import React from "react";
import Recent from "../../components/recent/Recent";
import Nature from "../../components/nature/Nature";
import Cars from "../../components/cars/Cars";
import Sport from "../../components/sport/Sport";

const Home = () => {
  return (
    <div>
      <Recent />
      <Nature />
      <Cars />
      <Sport />
    </div>
  );
};

export default Home;
