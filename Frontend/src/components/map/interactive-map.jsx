// Core React imports
import { useEffect, useState, useMemo } from "react";

// UI Components
import { Button } from "@/components/ui/button";

// Map utilities and constants
import { DEFAULT_CENTER, OSM_URL, OSM_ATTRIBUTION, formatAddress } from "@/lib/mapbox";
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Leaflet marker icon configuration
// These URLs are required to prevent 404 errors in production builds
const LEAFLET_ICONS = {
  default: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  retina: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  shadow: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png'
};

// Configure Leaflet default icon settings
// Required for proper marker display in bundled applications
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: LEAFLET_ICONS.default,
  iconRetinaUrl: LEAFLET_ICONS.retina,
  shadowUrl: LEAFLET_ICONS.shadow
});

/**
 * MapController Component
 * Handles map view manipulation including:
 * - Flying to selected profile locations
 * - Resetting map view to default position
 * - Smooth transitions between views
 */
const MapController = ({ selectedProfile, resetView }) => {
  const map = useMap();
  
  useEffect(() => {
    if (selectedProfile) {
      map.flyTo(
        [parseFloat(selectedProfile.latitude), parseFloat(selectedProfile.longitude)],
        12,
        { duration: 1.5 }
      );
    }
  }, [selectedProfile, map]);
  
  useEffect(() => {
    if (resetView) {
      map.flyTo(
        [DEFAULT_CENTER.latitude, DEFAULT_CENTER.longitude],
        DEFAULT_CENTER.zoom,
        { duration: 1.5 }
      );
    }
  }, [resetView, map]);
  
  return null;
};

/**
 * Creates a custom map marker based on professional role
 * @param {string} professionalRole - The professional role to determine marker style
 * @returns {L.DivIcon} A styled Leaflet marker icon
 */
const createProfessionalMarker = (professionalRole) => {
  // Choose a color that represents each professional category
  let markerColor = '#2563eb'; // Default color for professionals
  if (professionalRole && typeof professionalRole === 'string') {
    const role = professionalRole.toLowerCase();
    if (role.includes('design')) markerColor = '#3b82f6'; // Design professionals
    if (role.includes('engineer')) markerColor = '#ec4899'; // Engineering professionals
    if (role.includes('scientist')) markerColor = '#10b981'; // Science professionals
    if (role.includes('product')) markerColor = '#f59e0b'; // Product professionals
  }
  
  // Create a visually appealing marker icon
  return L.divIcon({
    html: `<div style="color:${markerColor};"><span class="material-icons" style="font-size:32px;">location_on</span></div>`,
    className: 'custom-div-icon',
    iconSize: [30, 30],
    iconAnchor: [15, 30]
  });
};

/**
 * InteractiveMap Component
 * A user-friendly map interface that displays professional profiles geographically
 * Features include:
 * - Custom markers for different professional roles
 * - Interactive popups with profile information
 * - Zoom and navigation controls
 * - Automatic view updates for selected profiles
 */
const InteractiveMap = ({ profiles, selectedProfile }) => {
  const [shouldResetMapView, setShouldResetMapView] = useState(false);
  const [mapControl, setMapControl] = useState(null);
  
  /**
   * Map Navigation Controls
   * Provides user-friendly map interaction functions
   */
  const mapControls = {
    zoomIn: () => mapControl?.zoomIn(),
    zoomOut: () => mapControl?.zoomOut(), 
    resetView: () => setShouldResetMapView(prev => !prev)
  };
  
  /**
   * Generate map markers for each profile
   * Memoized to prevent unnecessary re-renders
   * Creates interactive markers with profile information popups
   */
  const locationMarkers = useMemo(() => profiles.map(profile => {
    const { id, name, title, imageUrl, location } = profile;
    const markerIcon = createProfessionalMarker(title || 'default');
    
    // Extract coordinates with fallback to default center
    const coordinates = {
      lat: location?.lat ?? DEFAULT_CENTER.latitude,
      lng: location?.lng ?? DEFAULT_CENTER.longitude
    };
    
    return (
      <Marker 
        key={id}
        position={[coordinates.lat, coordinates.lng]}
        icon={markerIcon}
      >
        <Popup closeButton={false}>
          <div className="p-2">
            <div className="flex items-center space-x-2 mb-2">
              <img 
                src={imageUrl} 
                alt={name} 
                className="w-8 h-8 rounded-full object-cover" 
              />
              <div>
                <h4 className="font-medium text-sm">{name}</h4>
                <p className="text-xs text-slate-500">{title}</p>
              </div>
            </div>
            <p className="text-xs text-slate-700 mb-1.5">
              {formatAddress(profile)}
            </p>
            <a 
              href={`/profile/${id}`} 
              className="block text-xs bg-primary hover:bg-primary-dark text-white text-center py-1 rounded-md transition duration-200"
            >
              View Profile
            </a>
          </div>
        </Popup>
      </Marker>
    );
  }), [profiles]);


  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden relative">
      {/* Map Navigation Controls */}
      <nav className="border-b border-slate-200 px-4 py-3 flex justify-end items-center relative z-[2]">
        <div className="flex space-x-2">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={mapControls.zoomIn}
            className="p-1.5 text-slate-500 hover:text-primary hover:bg-slate-50 rounded-md"
            title="Zoom in"
          >
            <span className="material-icons text-xl">zoom_in</span>
          </Button>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={mapControls.zoomOut}
            className="p-1.5 text-slate-500 hover:text-primary hover:bg-slate-50 rounded-md"
            title="Zoom out"
          >
            <span className="material-icons text-xl">zoom_out</span>
          </Button>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={mapControls.resetView}
            className="p-1.5 text-slate-500 hover:text-primary hover:bg-slate-50 rounded-md"
            title="Reset view"
          >
            <span className="material-icons text-xl">my_location</span>
          </Button>
        </div>
      </nav>
          
      {/* Interactive Map Container */}
      <div className="h-[500px] lg:h-[700px] relative">
        <MapContainer 
          center={[DEFAULT_CENTER.latitude, DEFAULT_CENTER.longitude]} 
          zoom={DEFAULT_CENTER.zoom}
          style={{ height: "100%", width: "100%" }}
          whenReady={(e) => setMapControl(e.target)}
          className="z-[1]"
          attributionControl={true}
          zoomControl={false} // We use custom zoom controls
        >
          <TileLayer
            attribution={OSM_ATTRIBUTION}
            url={OSM_URL}
          />
          {locationMarkers}
          <MapController 
            selectedProfile={selectedProfile} 
            resetView={shouldResetMapView}
          />
        </MapContainer>
      </div>
    </div>
  );
};

export default InteractiveMap;