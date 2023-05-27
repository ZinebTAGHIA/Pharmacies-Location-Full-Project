import { MapContainer, Marker, TileLayer, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Icon, divIcon, point } from "leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";

function MapComponent(props) {
  const markers = props.pharmacies.map((pharmacie) => ({
    geocode: [pharmacie.Latitude, pharmacie.Longitude],
    popUp: pharmacie.Title,
  }));

  let center = [];
  if (props.center.length > 0) {
    center = props.center;
  } else {
    center = [33.5992, -7.62];
  }

  const custumIcon = new Icon({
    iconUrl: require("../assets/marker.png"),
    iconSize: [30, 30],
  });

  const createCustumClusterIcon = (cluster) => {
    return new divIcon({
      html: `<div class="cluster-icon">${cluster.getChildCount()}</div>`,
      className: "custom-marker-cluster",
      iconSize: point(33, 33, true),
    });
  };
  return (
    <>
      <MapContainer key={`${center[0]}${center[1]}`} center={center} zoom={10}>
        <TileLayer
          attribution='<a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <MarkerClusterGroup
          chunkedLoading
          iconCreateFunction={createCustumClusterIcon}
        >
          {markers.map((marker, index) => (
            <Marker key={index} position={marker.geocode} icon={custumIcon}>
              <Popup>{marker.popUp}</Popup>
            </Marker>
          ))}
        </MarkerClusterGroup>
      </MapContainer>
    </>
  );
}

export default MapComponent;
