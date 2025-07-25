import React, { useRef, useCallback } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import { MapComponentData } from "../model/component-props/google-map.model";

const containerStyle = {
  width: "100%",
  height: "500px",
};

const Map = ({ title, pin_icon, locations }: MapComponentData) => {
  const mLocations = locations.map((loc) => ({
    name: loc.title,
    position: {
      lat: parseFloat(loc.latitude),
      lng: parseFloat(loc.longitude),
    },
  }));
  const mapRef = useRef(null);

  const onLoad = useCallback((map) => {
    const bounds = new window.google.maps.LatLngBounds();
    mLocations.forEach((loc) => bounds.extend(loc.position));
    map.fitBounds(bounds);
    mapRef.current = map;
  }, []);

  return (
    <>
      <div>{title}</div>
      <LoadScript googleMapsApiKey="AIzaSyD_0f6HchBUrvF0JEFRkttlVPPLQTfEdOw">
        <GoogleMap mapContainerStyle={containerStyle} onLoad={onLoad}>
          {mLocations.map((loc, index) => (
            <Marker key={index} position={loc.position} title={loc.name} />
          ))}
        </GoogleMap>
      </LoadScript>
    </>
  );
};

export default Map;
