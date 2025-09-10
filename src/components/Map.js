
import React from 'react';
import { MapContainer, TileLayer, Polyline, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import routeData from '../data/routeData.json';

const Map = () => {
  const position = [42.1830, -76.6946]; // Centered between Toronto and New York

  return (
    <MapContainer center={position} zoom={7} style={{ height: '100vh', width: '100%' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <Polyline pathOptions={{ color: 'blue' }} positions={routeData.routePath}>
        <Popup>
          <h3>{routeData.routeName}</h3>
          <p><strong>Distance:</strong> {routeData.info.distance}</p>
          <p><strong>Estimated Time:</strong> {routeData.info.estimatedTime}</p>
          <p><strong>Cargo:</strong> {routeData.info.cargo}</p>
        </Popup>
      </Polyline>
    </MapContainer>
  );
};

export default Map;
