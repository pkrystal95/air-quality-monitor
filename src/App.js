// src/App.js
import React, { useEffect, useState } from "react";
import KakaoMap from "./components/KakaoMap";
import axios from "axios";

// import stationData from "./data/stationData.json";

const App = () => {
  const [stationData, setStationData] = useState([]);

  useEffect(() => {
    const fetchStationData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8004/api/open-data-portal/station"
        );

        setStationData(response.data);
      } catch (error) {
        console.error("Error fetching station data:", error);
      }
    };

    fetchStationData();
  }, []);
  return (
    <div>
      <KakaoMap stationData={stationData} />
    </div>
  );
};

export default App;
