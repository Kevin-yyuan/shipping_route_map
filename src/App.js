import React, { useState } from 'react';
import './App.css';
import Map from './components/Map';
import Filters from './components/filters/Filters';
import DriverStats from './components/driver_stats/DriverStats';
import routeData from './data/routeData.json';

function App() {
  const [selectedDay, setSelectedDay] = useState('All');
  const [selectedOrigin, setSelectedOrigin] = useState('All');
  const [selectedDestination, setSelectedDestination] = useState('All');

  const days = [...new Set(routeData.trips.map(trip => trip.day))];
  const origins = [...new Set(routeData.trips.map(trip => trip.startPoint.name))];
  const destinations = [...new Set(routeData.trips.map(trip => trip.endPoint.name))];

  const filteredTrips = routeData.trips.filter(trip => {
    return (selectedDay === 'All' || trip.day === selectedDay) &&
           (selectedOrigin === 'All' || trip.startPoint.name === selectedOrigin) &&
           (selectedDestination === 'All' || trip.endPoint.name === selectedDestination);
  });

  return (
    <div className="App">
      <Filters
        days={days}
        origins={origins}
        destinations={destinations}
        onDayChange={setSelectedDay}
        onOriginChange={setSelectedOrigin}
        onDestinationChange={setSelectedDestination}
      />
      <DriverStats filteredTrips={filteredTrips} />
      <Map filteredTrips={filteredTrips} />
    </div>
  );
}

export default App;