import React, { useState } from "react";
import {
  GoogleMap,
  LoadScript,
  Marker,
  StandaloneSearchBox,
} from "@react-google-maps/api";

import images from "src/assets/images";

function MapContainer() {
  const [searchBox, setSearchBox] = useState(null);
  const [center, setCenter] = useState({
    lat: 35.955, // 위도
    lng: 128.5657, // 경도
  });

  const libraries = ["places"];

  const containerStyle = {
    width: "1496px",
    height: "475px",
  };

  const onSearchBoxLoad = (ref) => {
    setSearchBox(ref);
  };

  const onPlacesChanged = () => {
    const places = searchBox.getPlaces();
    // places 배열에 선택된 장소 정보가 포함됩니다.
    console.log(places);
    const lat = places[0].geometry.location.lat();
    const lng = places[0].geometry.location.lng();
    setCenter({ lat: lat, lng: lng });
  };

  return (
    <LoadScript
      googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAP_API_KEY}
      libraries={libraries}
    >
      <div className="EventLocationInput">
        <div className="ArticleTitle">Location</div>
        <div className="EventLocationSearch">
          <StandaloneSearchBox
            onLoad={onSearchBoxLoad}
            onPlacesChanged={onPlacesChanged}
          >
            <input type="text" placeholder="Text" />
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
