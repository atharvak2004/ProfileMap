import { useState } from "react";
import InteractiveMap from "@/components/map/interactive-map";
import ProfileList from "@/components/profiles/profile-list";
import SearchFilter from "@/components/search/search-filter";
import AdminPanel from "@/components/admin/admin-panel";
import { Button } from "@/components/ui/button";
import { mockProfiles } from "@/lib/mock-data";

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [locationFilter, setLocationFilter] = useState("");
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [adminPanelOpen, setAdminPanelOpen] = useState(false);
  const profiles = mockProfiles; // Use mock data directly

  const handleShowOnMap = (profile) => {
    setSelectedProfile(profile);
    // Scroll to map on mobile
    if (window.innerWidth < 768) {
      document.getElementById("map-section").scrollIntoView({ behavior: "smooth" });
    }
  };

  // Handler for search filter
  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  // Handler for location filter
  const handleFilterLocation = (location) => {
    setLocationFilter(location);
  };

  // Toggle admin panel
  const toggleAdminPanel = () => {
    setAdminPanelOpen(!adminPanelOpen);
  };

  // Close admin panel
  const closeAdminPanel = () => {
    setAdminPanelOpen(false);
  };

  // Custom navigation handler
  const handleViewProfile = (profileId) => {
    window.location.href = `/profile/${profileId}`;
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Main header */}
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold text-slate-900 mb-4">
          Discover Professional Profiles
        </h1>
        <p className="text-slate-600 max-w-2xl mx-auto">
          Browse through our interactive map to find professionals in your area. 
          Filter by location or search for specific expertise to connect with 
          the right people for your needs.
        </p>
      </div>

      {/* Admin button */}
      <div className="mb-8 flex justify-end">
        <Button onClick={toggleAdminPanel} variant="outline">
          <span className="material-icons text-base mr-2">admin_panel_settings</span>
          Admin Panel
        </Button>
      </div>

      {/* Search and filters */}
      <div className="mb-8">
        <SearchFilter
          onSearch={handleSearch}
          onFilterLocation={handleFilterLocation}
        />
      </div>

      {/* Map and List sections */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Profile list section */}
        <div className="lg:col-span-1 order-2 lg:order-1">
          <ProfileList
            onShowOnMap={handleShowOnMap}
            onViewProfile={handleViewProfile} // Pass the handler
            searchQuery={searchQuery}
            locationFilter={locationFilter}
          />
        </div>

        {/* Map section */}
        <div id="map-section" className="lg:col-span-2 order-1 lg:order-2">
          <div className="bg-white rounded-lg shadow-md p-4 h-full">
            <h2 className="text-xl font-semibold text-slate-800 mb-4">Interactive Map</h2>
            <div className="h-[500px]">
              <InteractiveMap
                profiles={profiles}
                selectedProfile={selectedProfile}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Admin panel */}
      <AdminPanel open={adminPanelOpen} onClose={closeAdminPanel} />
    </div>
  );
}