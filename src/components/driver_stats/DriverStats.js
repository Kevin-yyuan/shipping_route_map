import React, { useState, useMemo } from 'react';
import './DriverStats.css';

const DriverStats = ({ filteredTrips }) => {
  const [sortConfig, setSortConfig] = useState({ key: 'tripCount', direction: 'descending' });

  const driverStats = useMemo(() => {
    const stats = {};
    filteredTrips.forEach(trip => {
      if (!stats[trip.truck]) {
        stats[trip.truck] = {
          tripCount: 0,
          totalDistance: 0,
          totalHours: 0,
        };
      }
      stats[trip.truck].tripCount++;
      stats[trip.truck].totalDistance += trip.distance;
      stats[trip.truck].totalHours += trip.timeTaken;
    });
    return stats;
  }, [filteredTrips]);

  const sortedDrivers = useMemo(() => {
    let sortableDrivers = Object.keys(driverStats);
    if (sortConfig !== null) {
      sortableDrivers.sort((a, b) => {
        if (driverStats[a][sortConfig.key] < driverStats[b][sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (driverStats[a][sortConfig.key] > driverStats[b][sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableDrivers;
  }, [driverStats, sortConfig]);

  const requestSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  const getSortIndicator = (key) => {
    if (sortConfig.key === key) {
      return sortConfig.direction === 'ascending' ? ' ▲' : ' ▼';
    }
    return null;
  };

  return (
    <div className="driver-stats-container">
      <h4>Driver Stats</h4>
      <table>
        <thead>
          <tr>
            <th onClick={() => requestSort('driver')}>Driver{getSortIndicator('driver')}</th>
            <th onClick={() => requestSort('tripCount')}>Trips{getSortIndicator('tripCount')}</th>
            <th onClick={() => requestSort('totalDistance')}>Distance (km){getSortIndicator('totalDistance')}</th>
            <th onClick={() => requestSort('totalHours')}>Hours{getSortIndicator('totalHours')}</th>
          </tr>
        </thead>
        <tbody>
          {sortedDrivers.map(driver => (
            <tr key={driver}>
              <td>{driver}</td>
              <td>{driverStats[driver].tripCount}</td>
              <td>{driverStats[driver].totalDistance}</td>
              <td>{driverStats[driver].totalHours.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DriverStats;