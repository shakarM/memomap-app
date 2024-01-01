import { useNavigate } from "react-router-dom";
import styles from "./Map.module.css";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  useMapEvent,
} from "react-leaflet";
import { useEffect, useState } from "react";
import { useCities } from "../contexts/CityContext";
import { useGeolocation } from "./Hooks/useGeolocation";
import Button from "./Button";
import UseUrlLocation from "./Hooks/useUrlLocation";

export default function Map() {
  const { cities } = useCities();

  const [position, setPosition] = useState([40, 0]);
  const [lat, lng] = UseUrlLocation();
  const {
    isLoading: isLoadingPosition,
    position: geoPosition,
    getPosition,
  } = useGeolocation();

  useEffect(
    function () {
      if (geoPosition) setPosition(geoPosition);
    },
    [geoPosition]
  );
  useEffect(
    function () {
      if (lat && lng) setPosition([lat, lng]);
    },
    [lat, lng]
  );
  return (
    <div className={styles.mapContainer}>
      <Button type="position" onClick={getPosition}>
        {isLoadingPosition ? "Loading..." : "Use your location"}
      </Button>
      <MapContainer
        className={styles.map}
        center={position}
        zoom={13}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        />
        {cities.map((city) => (
          <Marker
            position={[city.position.lat, city.position.lng]}
            key={city.id}
          >
            <Popup>
              A pretty CSS3 popup. <br /> Easily customizable.
            </Popup>
          </Marker>
        ))}
        <ChangeCenter position={position} />
        <MapEvent />
      </MapContainer>
    </div>
  );
}

// eslint-disable-next-line react/prop-types
function ChangeCenter({ position }) {
  const map = useMap();
  map.setView(position);
  return null;
}

function MapEvent() {
  const navigate = useNavigate();
  useMapEvent({
    click: (e) => {
      console.log(e);
      navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`);
    },
  });
}
