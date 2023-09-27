import React, { useState, useEffect } from "react";
import { Map, GoogleApiWrapper, Marker } from "google-maps-react";

const MapContainer = (props) => {
  const { google } = props;
  const [mapStyle, setMapStyle] = useState({ width: "1496px", height: "475px" });

  useEffect(() => {
  }, []);

  return (
    <Map
      google={google}
      zoom={14}
      style={mapStyle}
      initialCenter={{
        lat: 35.8714, // 위도
        lng: 128.6014, // 경도
      }}
    >
      <Marker
        title={"Daegu, Korea"}
        name={"Daegu, Korea"}
        position={{ lat: 35.8714, lng: 128.6014 }}
      />
    </Map>
  );
};

export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_GOOGLE_MAP_API_KEY, // 여기에 자신의 API 키를 넣어야 합니다.
})(MapContainer);
