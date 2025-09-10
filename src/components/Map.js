import React from 'react';
import { MapContainer, TileLayer, Polyline, CircleMarker, Popup, Tooltip } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { getCurvedPath } from '../utils/curves';
import { getColorForCustomer } from '../utils/color';

const Map = ({ filteredTrips }) => {
  const position = [45.5017, -93.5673]; // Centered for the new routes

  const routeInfo = {};
  const startPointCounts = {};
  const endPointCounts = {};

  filteredTrips.forEach(trip => {
    const routeKey = `${trip.startPoint.name}-${trip.endPoint.name}-${trip.customer}`;
    if (!routeInfo[routeKey]) {
      routeInfo[routeKey] = {
        count: 0,
        totalTime: 0,
        distance: trip.distance,
        startPoint: trip.startPoint,
        endPoint: trip.endPoint,
        customer: trip.customer
      };
    }
    routeInfo[routeKey].count++;
    routeInfo[routeKey].totalTime += trip.timeTaken;

    startPointCounts[trip.startPoint.name] = (startPointCounts[trip.startPoint.name] || 0) + 1;
    endPointCounts[trip.endPoint.name] = (endPointCounts[trip.endPoint.name] || 0) + 1;
  });

  const uniqueRoutes = Object.values(routeInfo);

  const uniqueStartPoints = [...new Set(filteredTrips.map(trip => trip.startPoint.name))].map(name => {
    const trip = filteredTrips.find(t => t.startPoint.name === name);
    return {
      ...trip.startPoint,
      count: startPointCounts[name]
    };
  });

  const uniqueEndPoints = [...new Set(filteredTrips.map(trip => trip.endPoint.name))].map(name => {
    const trip = filteredTrips.find(t => t.endPoint.name === name);
    return {
      ...trip.endPoint,
      count: endPointCounts[name]
    };
  });

  return (
    <MapContainer center={position} zoom={4} style={{ height: '100vh', width: '100%' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {uniqueRoutes.map(route => {
        const averageTime = route.totalTime / route.count;
        const curvedPath = getCurvedPath(route.startPoint.coords, route.endPoint.coords);
        return (
          <Polyline
            key={`${route.startPoint.name}-${route.endPoint.name}-${route.customer}`}
            positions={curvedPath}
            pathOptions={{ color: getColorForCustomer(route.customer), weight: route.count * 2 }}
          >
            <Tooltip>
              <strong>Customer:</strong> {route.customer}<br />
              <strong>From:</strong> {route.startPoint.name}<br />
              <strong>To:</strong> {route.endPoint.name}<br />
              <strong>Trip Counts:</strong> {route.count}<br />
              <strong>Distance:</strong> {route.distance} km<br />
              <strong>Average Time:</strong> {averageTime.toFixed(2)} hours
            </Tooltip>
          </Polyline>
        );
      })}

      {uniqueStartPoints.map(point => (
        <CircleMarker
          key={point.name}
          center={point.coords}
          pathOptions={{ color: 'green'}}
          radius={5 + point.count * 2}
        >
          <Tooltip>{point.name}<br />Starts: {point.count}</Tooltip>
        </CircleMarker>
      ))}

      {uniqueEndPoints.map(point => (
        <CircleMarker
          key={point.name}
          center={point.coords}
          pathOptions={{ color: 'red' }}
          radius={5 + point.count * 2}
        >
          <Tooltip>{point.name}<br />Ends: {point.count}</Tooltip>
        </CircleMarker>
      ))}
    </MapContainer>
  );
};

export default Map;