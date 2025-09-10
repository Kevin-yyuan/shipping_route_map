
import React from 'react';
import './Filters.css';

const Filters = ({ days, origins, destinations, onDayChange, onOriginChange, onDestinationChange }) => {
  return (
    <div className="filter-container">
      <select onChange={(e) => onDayChange(e.target.value)}>
        <option value="All">All Days</option>
        {days.map(day => <option key={day} value={day}>{day}</option>)}
      </select>
      <select onChange={(e) => onOriginChange(e.target.value)}>
        <option value="All">All Origins</option>
        {origins.map(origin => <option key={origin} value={origin}>{origin}</option>)}
      </select>
      <select onChange={(e) => onDestinationChange(e.target.value)}>
        <option value="All">All Destinations</option>
        {destinations.map(destination => <option key={destination} value={destination}>{destination}</option>)}
      </select>
    </div>
  );
};

export default Filters;
