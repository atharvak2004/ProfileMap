// Default map center (Maharashtra, India)
export const DEFAULT_CENTER = {
  latitude: 19.7515,
  longitude: 75.7139,
  zoom: 7
};

// OpenStreetMap attribution and URL
export const OSM_ATTRIBUTION = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';
export const OSM_URL = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';

// Get Mapbox token from environment (for optional Mapbox usage)
export const getMapboxToken = () => {
  return import.meta.env.VITE_MAPBOX_TOKEN || '';
};

// Generate static map URL for previews
export const getStaticMapUrl = (latitude, longitude, zoom = 14, width = 400, height = 300) => {
  // Using OpenStreetMap as fallback
  return `https://maps.geoapify.com/v1/staticmap?style=osm-bright&width=${width}&height=${height}&center=lonlat:${longitude},${latitude}&zoom=${zoom}`;
};

// Format address for display
export const formatAddress = (profile) => {
  const { address, city, state, zipCode } = profile;
  return `${address}, ${city}, ${state} ${zipCode}`;
};