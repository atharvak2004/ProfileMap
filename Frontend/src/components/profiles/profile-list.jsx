import { useState } from "react";
import ProfileCard from "./profile-card";
import { Button } from "@/components/ui/button";
import { mockProfiles } from "@/lib/mock-data";

const ProfileList = ({ onShowOnMap, searchQuery, locationFilter }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 4;
  const profiles = mockProfiles;

  const filteredProfiles = profiles.filter(profile => {
    const searchTerm = searchQuery?.toLowerCase() || "";
    const locationTerm = locationFilter?.toLowerCase() || "";

    const matchesSearch = !searchQuery || [
      profile.name,
      profile.description,
      profile.role
    ].some(field => field.toLowerCase().includes(searchTerm));

    const matchesLocation = !locationFilter ||
      locationFilter === "all" ||
      `${profile.city}, ${profile.state}`.toLowerCase().includes(locationTerm);

    return matchesSearch && matchesLocation;
  });

  const paginationData = {
    totalPages: Math.ceil(filteredProfiles.length / ITEMS_PER_PAGE),
    startIndex: (currentPage - 1) * ITEMS_PER_PAGE,
    get endIndex() { return this.startIndex + ITEMS_PER_PAGE },
    get currentProfiles() {
      return filteredProfiles.slice(this.startIndex, this.endIndex);
    }
  };

  /**
   * Navigate to a specific page
   * @param {number} page - The target page number
   */
  const goToPage = (page) => {
    if (page >= 1 && page <= paginationData.totalPages) {
      setCurrentPage(page);
    }
  };



  return (
    <section className="bg-white rounded-lg shadow-sm p-4 mb-4">
      <header className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-slate-800">User Profiles</h2>
        <span className="text-sm text-slate-500">
          {filteredProfiles.length} profile{filteredProfiles.length === 1 ? '' : 's'} found
        </span>
      </header>

      {filteredProfiles.length > 0 ? (
        <>
          <div className="space-y-4">
            {paginationData.currentProfiles.map((profile) => (
              <ProfileCard
                key={profile.id}
                profile={profile}
                onShowOnMap={onShowOnMap}
              />
            ))}
          </div>

          {/* Pagination Navigation */}
          {paginationData.totalPages > 1 && (
            <nav className="flex justify-center mt-6" aria-label="Profile list pagination">
              <div className="flex items-center space-x-1">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => goToPage(currentPage - 1)}
                  disabled={currentPage === 1}
                  aria-label="Previous page"
                >
                  <span className="material-icons text-sm">chevron_left</span>
                </Button>

                {[...Array(paginationData.totalPages)].map((_, index) => {
                  const pageNumber = index + 1;
                  return (
                    <Button
                      key={pageNumber}
                      variant={currentPage === pageNumber ? "default" : "ghost"}
                      size="sm"
                      onClick={() => goToPage(pageNumber)}
                      aria-label={`Page ${pageNumber}`}
                      aria-current={currentPage === pageNumber ? "page" : undefined}
                    >
                      {pageNumber}
                    </Button>
                  );
                })}

                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => goToPage(currentPage + 1)}
                  disabled={currentPage === paginationData.totalPages}
                  aria-label="Next page"
                >
                  <span className="material-icons text-sm">chevron_right</span>
                </Button>
              </div>
            </nav>
          )}
        </>
      ) : (
        <div className="py-10 text-center text-slate-500" role="alert">
          <span className="material-icons mb-2 text-3xl" aria-hidden="true">search_off</span>
          <p>No profiles found matching your criteria</p>
        </div>
      )}
    </section>
  );
};

export default ProfileList;