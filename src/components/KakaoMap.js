import React, { useEffect, useRef, useState } from "react";

const KakaoMap = () => {
  const mapContainer = useRef(null);
  const [location, setLocation] = useState(null);
  const [scriptLoaded, setScriptLoaded] = useState(false); // 맵 스크립트 로드 상태

  useEffect(() => {
    // 카카오맵 API 로드
    const loadKakaoMapScript = () => {
      const script = document.createElement("script");
      script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.REACT_APP_KAKAO_APP_KEY}&autoload=false`;
      script.async = true;
      script.onload = () => {
        setScriptLoaded(true); // 스크립트가 로드되면 상태 업데이트
      };
      document.head.appendChild(script);
    };

    loadKakaoMapScript();
  }, []); // 빈 배열로 한번만 실행

  useEffect(() => {
    if (scriptLoaded && location !== null) {
      // 카카오맵 로드 후 위치가 설정되면 맵 초기화
      window.kakao.maps.load(() => {
        const container = mapContainer.current;
        const options = {
          center: new window.kakao.maps.LatLng(location.lat, location.lng), // 사용자 위치
          level: 12, // 확대 수준
        };

        const map = new window.kakao.maps.Map(container, options);

        // 마커 추가
        const markerPosition = new window.kakao.maps.LatLng(
          location.lat,
          location.lng
        );
        const marker = new window.kakao.maps.Marker({
          position: markerPosition,
        });
        marker.setMap(map);
      });
    }
  }, [scriptLoaded, location]); // 스크립트 로드 후, 위치가 변경될 때만 실행

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
  }, []); // 위치는 한 번만 가져오기

  return (
    <div
      ref={mapContainer}
      style={{
        width: "100%",
        height: "100vh", // 페이지 전체 크기
        position: "absolute",
        top: 0,
        left: 0,
      }}
    ></div>
  );
};

export default KakaoMap;
