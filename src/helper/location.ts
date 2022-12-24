export const distanceBetween2Location = (
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number,
) => {
  // Degrees to radians.
  lon1 = (lon1 * Math.PI) / 180;
  lon2 = (lon2 * Math.PI) / 180;
  lat1 = (lat1 * Math.PI) / 180;
  lat2 = (lat2 * Math.PI) / 180;
  // Haversine formula
  // dlat: difference of latitude; dlon: difference of longitude
  const dlon = lon2 - lon1;
  const dlat = lat2 - lat1;
  const a =
    Math.pow(Math.sin(dlat / 2), 2) +
    Math.cos(lat1) * Math.cos(lat2) * Math.pow(Math.sin(dlon / 2), 2);
  const c = 2 * Math.asin(Math.sqrt(a));
  // Radius of earth in meters.
  const rEarth = 6371000;
  // Calculate the result.
  return c * rEarth;
};
