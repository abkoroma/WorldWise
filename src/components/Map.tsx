import { useNavigate, /*useSearchParams*/ } from 'react-router-dom';
import { MapContainer, Marker, Popup, TileLayer, useMap, useMapEvents } from 'react-leaflet';
import styles from './Map.module.css';
import { useContext, useEffect, useState } from 'react';
import { CitiesContext } from '../contexts/CitiesContext';
import { LatLngExpression } from 'leaflet';
import { useGeolocation } from '../hooks/useGeolocation';
import Button from './Button';
import { useUrlPosition } from '../hooks/useUrlPosition';


export default function Map() {
  //const [searchParams] = useSearchParams();
  const [mapPosition, setMapPosition] = useState<LatLngExpression>([40, 0]);
  const { 
    isLoading: isLoadingPostion, 
    position: geolocationPosition,
    getPosition 
  } = useGeolocation();
  const [mapLat, mapLng] = useUrlPosition();

  const { cities } = useContext(CitiesContext);

  //const mapLat = searchParams.get("lat");
  //const mapLng = searchParams.get("lng");

  useEffect(() => {
    if (mapLat && mapLng)  {
      setMapPosition([Number(mapLat), Number(mapLng)]);
    }
  }, [mapLat, mapLng]);

  useEffect(() => {
    if (geolocationPosition) {
      setMapPosition([geolocationPosition.lat, geolocationPosition.lng])
    }
  }, [geolocationPosition]);

  return (
    <div className={styles.mapContainer}>
      {
        !geolocationPosition && (
          <Button 
            children={isLoadingPostion ? "Loading..." : "Use your position"} 
            onClick={getPosition} 
            type="position" 
          />
        )
      }
      <MapContainer 
        center={mapPosition} zoom={6} 
        scrollWheelZoom={true} className={styles.map}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">
          OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        />
        {
          cities.map((city) => (
            <Marker position={[city.position.lat, city.position.lng]} key={city.id}>
              <Popup>
                <span>{city.cityName}</span>
              </Popup>
            </Marker>
          ))
        }

        <ChangeMapCenter position={mapPosition} />
        <DetectClick />
      </MapContainer>
    </div>
  )
}

function ChangeMapCenter(props: {position: LatLngExpression }) {
  const map = useMap();

  map.setView(props.position);

  return null;
}


function DetectClick() {
  const navigate = useNavigate();
    useMapEvents({
      click: (e) => {
        navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`);
    },
  })
}