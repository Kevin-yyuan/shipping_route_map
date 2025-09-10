
export function getCurvedPath(start, end) {
  const lat1 = start[0];
  const lng1 = start[1];
  const lat2 = end[0];
  const lng2 = end[1];

  const midpoint_lat = (lat1 + lat2) / 2;
  const midpoint_lng = (lng1 + lng2) / 2;

  const dx = lng2 - lng1;
  const dy = lat2 - lat1;

  const perpendicular_dx = -dy;
  const perpendicular_dy = dx;

  // Adjust the curviness factor
  const curviness = 0.2;
  const control_lat = midpoint_lat + perpendicular_dy * curviness;
  const control_lng = midpoint_lng + perpendicular_dx * curviness;

  const points = [];
  for (let t = 0; t <= 1; t += 0.05) { // 20 segments
    const lat = (1 - t) * (1 - t) * lat1 + 2 * (1 - t) * t * control_lat + t * t * lat2;
    const lng = (1 - t) * (1 - t) * lng1 + 2 * (1 - t) * t * control_lng + t * t * lng2;
    points.push([lat, lng]);
  }
  return points;
}
