import React, { useEffect, useState } from "react";
import "./styles.css";
import useMoveMarker from "./useMoveMarker";
import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";

// https://www.codexworld.com/google-map-move-marker-smoothly-javascript-api/

function TravellingMarker({ position, ...rest }) {
  let [coordinates, setDestination] = useMoveMarker([
    position.lat,
    position.lng
  ]);

  useEffect(() => {
    setDestination([position.lat, position.lng]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [position]);

  return (
    <Marker
      position={{
        lat: coordinates[0],
        lng: coordinates[1]
      }}
      // {...rest}
    />
  );
}
export default function App() {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: ""
  });

  let [currentCoordinates, setCurrentCoordinates] = useState([
    42.42666395645802,
    -83.29694509506226
  ]);

  return (
    <div className="App">
      <button
        onClick={() => {
          setCurrentCoordinates([42.42495334300206, -83.29203128814697]);
        }}
      >
        Predefined Location
      </button>
      <pre>
        {currentCoordinates[0]}, {currentCoordinates[1]}
      </pre>
      {loadError && <p>{loadError}</p>}
      {!isLoaded && <p>Loading .. </p>}
      {isLoaded && (
        <GoogleMap
          mapContainerStyle={{ width: "100vw", height: "100vh" }}
          zoom={10}
          center={{ lat: 42.42666395645802, lng: -83.29694509506226 }}
          onClick={e => {
            setCurrentCoordinates([e.latLng.lat(), e.latLng.lng()]);
          }}
        >
          <TravellingMarker
            position={{
              lat: currentCoordinates[0],
              lng: currentCoordinates[1]
            }}
          />
        </GoogleMap>
      )}
    </div>
  );
}

/* <GoogleMap
        mapContainerStyle={{ width: "100vw", height: "100vh" }}
        zoom={9}
        center={{ lat: 42.42666395645802, lng: -83.29694509506226 }}
        onClick={e => {
          stCurrentCoordinates([e.latLng.lat(), e.latLng.lng()]);
        }}
      >
        <TravellingMarker
          position={{
            lat: currentCoordinates[0],
            lng: currentCoordinates[1]
          }}
        />
      </GoogleMap> */
