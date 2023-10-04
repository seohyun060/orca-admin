import React from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

const containerStyle = {
  width: "1496px",
  height: "475px",
};

const center = {
  lat: 35.8714, // 위도
  lng: 128.6014, // 경도
};

function MapContainer() {

  console.log(process.env.REACT_APP_GOOGLE_MAP_API_KEY)
  return (
    <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAP_API_KEY}>
      <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={14}>
        {/* 여기에 지도 내용을 추가하세요. */}
        <Marker
          // title={"Daegu, Korea"}
          // name={"Daegu, Korea"}
          position={center}
        />
      </GoogleMap>
    </LoadScript>
  );
}

export default MapContainer;
