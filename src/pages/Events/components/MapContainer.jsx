import React, { useState, useEffect } from "react";
import {
  GoogleMap,
  LoadScript,
  Marker,
  StandaloneSearchBox,
} from "@react-google-maps/api";

import images from "src/assets/images";

MapContainer.MAP_LIBRARIES = ["places"];

function MapContainer(props) {
  const {
    latitude,
    setLatitude,
    longitude,
    setLongitude,
    location,
    setLocation,
  } = props;

  const [searchBox, setSearchBox] = useState(null);
  const [center, setCenter] = useState({
    lat: latitude, // 위도
    lng: longitude, // 경도
  });

  const containerStyle = {
    width: "1496px",
    height: "475px",
  };

  const onSearchBoxLoad = (ref) => {
    setSearchBox(ref);
  };

  const onPlacesChanged = () => {
    // places 배열에 선택된 장소 정보가 포함됩니다.
    const places = searchBox.getPlaces();

    const lat = places[0].geometry.location.lat();
    const lng = places[0].geometry.location.lng();
    setCenter({ lat: lat, lng: lng });
    setLatitude(lat);
    setLongitude(lng);
  };

  useEffect(() => {
    fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${process.env.REACT_APP_GOOGLE_MAP_API_KEY}`
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.status === "OK") {
          setLocation(data.results[0].formatted_address);
        }
      });
    setCenter({ lat: latitude, lng: longitude });
  }, [latitude, longitude]);

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault(); // Enter 키 이벤트를 무시하도록 기본 동작을 막음
    }
  };

  return (
    <LoadScript
      googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAP_API_KEY}
      libraries={MapContainer.MAP_LIBRARIES}
    >
      <div className="EventLocationInput">
        <div className="ArticleTitle">Location</div>
        <div className="EventLocationSearch">
          <StandaloneSearchBox
            onLoad={onSearchBoxLoad}
            onPlacesChanged={onPlacesChanged}
          >
            <input
              type="text"
              placeholder="Text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              onKeyDown={handleKeyDown}
            />
          </StandaloneSearchBox>
          <img src={images.search} />
        </div>
        <div className="EventMapContainer">
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={16}
          >
            {/* 여기에 지도 내용을 추가하세요. */}

            <Marker
              // title={"Daegu, Korea"}
              // name={"Daegu, Korea"}
              position={center}
            />
          </GoogleMap>
        </div>
      </div>
    </LoadScript>
  );
}

export default MapContainer;
