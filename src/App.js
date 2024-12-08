// src/App.js
import React, { useEffect, useState } from "react";
import KakaoMap from "./components/KakaoMap";
import axios from "axios";

import stationData from "./data/stationData.json";
import IconSider from "./components/IconSider";
import { Button, Space } from "antd";

const App = () => {
  const [isMobile, setIsMobile] = useState(true);
  // const [stationData, setStationData] = useState([]);

  // useEffect(() => {
  //   const fetchStationData = async () => {
  //     try {
  //       const response = await axios.get(
  //         "http://localhost:8004/api/open-data-portal/station"
  //       );

  //       setStationData(response.data);
  //     } catch (error) {
  //       console.error("Error fetching station data:", error);
  //     }
  //   };

  //   fetchStationData();
  // }, []);
  return (
    <div>
      {!isMobile && <IconSider />}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: isMobile ? 0 : "80px",
          width: "100%",
          height: "100vh",
        }}
      >
        <KakaoMap
          stationData={[
            {
              dmX: "37.523286",
              item: "SO2, CO, O3, NO2, PM10, PM2.5",
              mangName: "도시대기",
              year: "1997",
              addr: "서울 양천구 중앙로52길 56 신정4동 문화센터",
              stationName: "양천구",
              dmY: "126.858689",
              so2Grade: "1",
              coFlag: null,
              khaiValue: "45",
              so2Value: "0.002", // 아황산
              coValue: "0.2", // 일산화
              pm10Flag: null,
              pm10Value: "17", /// 미세
              o3Grade: "1",
              khaiGrade: "1",
              no2Flag: null,
              no2Grade: "1",
              o3Flag: null,
              so2Flag: null,
              pm25Value: "17", // 초미세
              dataTime: "2024-12-08 24:00",
              coGrade: "1",
              no2Value: "0.005", // 이산화
              pm10Grade: "1",
              o3Value: "0.027", // 오존
            },
          ]}
        />
      </div>

      <div
        style={{
          position: "absolute",
          top: "50%",
          right: "10px",
          transform: "translateY(-50%)",
          zIndex: 1,
        }}
      >
        <Space
          style={{
            backgroundColor: "white",
            borderRadius: "10px",
            display: "flex",
            borderRadius: "10px",
            overflow: "hidden",
            flexDirection: "column", // 수직 정렬
            boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.2)",
          }}
        >
          <Button
            size="large"
            style={{ borderRadius: "0", border: "none" }}
            onClick={() => console.log("Button clicked")}
          >
            <div
              style={{
                textAlign: "center",
                textWrap: "nowrap",
              }}
            >
              <div
                style={{ fontSize: "12px", fontWeight: "bold" }}
                onClick={() => console.log("Button clicked")}
              >
                초미세
              </div>
              <div style={{ fontSize: "9px" }}>PM-2.5</div>
            </div>
          </Button>
          <Button size="large" style={{ borderRadius: "0", border: "none" }}>
            <div
              style={{
                textAlign: "center",
                textWrap: "nowrap",
              }}
            >
              <div
                style={{ fontSize: "12px", fontWeight: "bold" }}
                onClick={() => console.log("Button clicked")}
              >
                미세
              </div>
              <div style={{ fontSize: "9px" }}>PM-10</div>
            </div>
          </Button>
          <Button size="large" style={{ borderRadius: "0", border: "none" }}>
            <div
              style={{
                textAlign: "center",
                textWrap: "nowrap",
              }}
            >
              <div
                style={{ fontSize: "12px", fontWeight: "bold" }}
                onClick={() => console.log("Button clicked")}
              >
                오존
              </div>
              <div style={{ fontSize: "9px" }}>
                O<sub>3</sub>
              </div>
            </div>
          </Button>
          <Button
            size="large"
            style={{ borderRadius: "0", border: "none" }}
            onClick={() => console.log("Button clicked")}
          >
            <div
              style={{
                textAlign: "center",
                textWrap: "nowrap",
              }}
            >
              <div style={{ fontSize: "12px", fontWeight: "bold" }}>이산화</div>
              <div style={{ fontSize: "9px" }}>
                NO<sub>2</sub>
              </div>
            </div>
          </Button>
          <Button
            size="large"
            style={{ borderRadius: "0", border: "none" }}
            onClick={() => console.log("Button clicked")}
          >
            <div
              style={{
                textAlign: "center",
                textWrap: "nowrap",
              }}
            >
              <div style={{ fontSize: "12px", fontWeight: "bold" }}>일산화</div>
              <div style={{ fontSize: "9px" }}>CO</div>
            </div>
          </Button>
          <Button size="large" style={{ borderRadius: "0", border: "none" }}>
            <div
              style={{
                textAlign: "center",
                textWrap: "nowrap",
              }}
            >
              <div
                style={{ fontSize: "12px", fontWeight: "bold" }}
                onClick={() => console.log("Button clicked")}
              >
                아황산
              </div>
              <div style={{ fontSize: "9px" }}>
                SO<sub>2</sub>
              </div>
            </div>
          </Button>
        </Space>
      </div>
    </div>
  );
};

export default App;
