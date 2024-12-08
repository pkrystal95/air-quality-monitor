import React, { useEffect, useRef, useState } from "react";

const KakaoMap = ({ stationData }) => {
  const mapContainer = useRef(null);
  const [location, setLocation] = useState(null);
  const [scriptLoaded, setScriptLoaded] = useState(false);

  useEffect(() => {
    // 카카오맵 API 로드
    const loadKakaoMapScript = () => {
      const script = document.createElement("script");
      script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.REACT_APP_KAKAO_APP_KEY}&autoload=false`;
      script.async = true;
      script.onload = () => {
        setScriptLoaded(true);
      };
      document.head.appendChild(script);
    };

    loadKakaoMapScript();
  }, []);

  useEffect(() => {
    if (scriptLoaded && location !== null) {
      // 카카오맵 로드 후 지도 초기화
      window.kakao.maps.load(() => {
        const container = mapContainer.current;
        const options = {
          center: new window.kakao.maps.LatLng(location.lat, location.lng), // 사용자 위치
          level: 7, // 기본 확대 수준
        };

        const map = new window.kakao.maps.Map(container, options);

        // 사용자 위치 마커 추가
        // const userMarkerPosition = new window.kakao.maps.LatLng(
        //   location.lat,
        //   location.lng
        // );
        // const userMarker = new window.kakao.maps.Marker({
        //   position: userMarkerPosition,
        // });
        // userMarker.setMap(map);

        console.log("stationData", stationData);

        // 측정소 데이터 마커 추가
        const markers = stationData.map((station) => {
          const position = new window.kakao.maps.LatLng(
            parseFloat(station.dmX),
            parseFloat(station.dmY)
          );
          const marker = new window.kakao.maps.Marker({
            position: position,
          });

          const infoWindowContent = `
            <div style="padding:10px; font-size:12px;">
              <h4>${station.stationName}</h4>
              <p>주소: ${station.addr}</p>
              <p>항목: ${station.item}</p>
              <p>측정망: ${station.mangName}</p>
              <p>설치년도: ${station.year}</p>
            </div>
          `;
          const infowindow = new window.kakao.maps.InfoWindow({
            content: infoWindowContent,
          });

          // 마커 클릭 시 정보창 열기
          window.kakao.maps.event.addListener(marker, "click", () => {
            infowindow.open(map, marker);
          });

          return marker;
        });

        // 확대 레벨 변경 이벤트 등록
        window.kakao.maps.event.addListener(map, "zoom_changed", () => {
          const level = map.getLevel(); // 현재 확대 수준
          markers.forEach((marker) => {
            if (level <= 7) {
              marker.setMap(map); // 확대 수준이 7 이하일 때 마커 표시
            } else {
              marker.setMap(null); // 확대 수준이 8 이상일 때 마커 숨김
            }
          });
        });

        // 초기 상태: 확대 레벨에 따른 마커 표시/숨김
        const initialLevel = map.getLevel();
        markers.forEach((marker) => {
          if (initialLevel <= 7) {
            marker.setMap(map);
          } else {
            marker.setMap(null);
          }
        });
      });
    }
  }, [scriptLoaded, location, stationData]);

  useEffect(() => {
    // 사용자 위치 가져오기
    const getUserLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            setLocation({
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            });
          },
          (error) => {
            console.error("사용자 위치를 가져올 수 없습니다.", error);
            setLocation({
              lat: 37.566535, // 서울시청 위치
              lng: 126.977969,
            });
          }
        );
      } else {
        console.error("Geolocation을 지원하지 않는 브라우저입니다.");
        setLocation({
          lat: 37.566535, // 서울시청 위치
          lng: 126.977969,
        });
      }
    };

    getUserLocation();
  }, []);

  return (
    <div ref={mapContainer} style={{ width: "100%", height: "100vh" }}></div>
  );
};

export default KakaoMap;
