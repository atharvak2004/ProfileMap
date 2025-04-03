// Core React imports
import { useState, useEffect } from "react";

// UI Component imports
import { Input } from "@/components/ui/input";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";

/**
 * SearchFilter Component
 * Provides search and location filtering functionality for profiles
 * @param {Function} onSearch - Callback for search text changes
 * @param {Function} onFilterLocation - Callback for location filter changes
 */
const SearchFilter = ({ onSearch, onFilterLocation }) => {
  const [searchText, setSearchText] = useState("");
  const [locationOptions, setLocationOptions] = useState([]);
  
  // Fetch profiles data for location options
  const { data: profiles = [] } = useQuery({
    queryKey: ['/api/profiles'],
  });
  
  /**
   * Extract and process unique locations from profiles
   * Updates location options when profiles data changes
   */
  useEffect(() => {
    if (Array.isArray(profiles) && profiles.length > 0) {
      const locations = new Set(
        profiles.map(profile => `${profile.city}, ${profile.state}`)
      );
      setLocationOptions(Array.from(locations).sort());
    }
  }, [profiles]);
  
  /**
   * Event Handlers
   */
  const handlers = {
    search: (e) => {
      const value = e.target.value;
      setSearchText(value);
      onSearch(value);
    },
    
    location: (value) => {
      onFilterLocation(value);
    },
    
    advancedFilter: () => {
      // Placeholder for advanced filter functionality
      console.log("Advanced filter clicked");
    }
  };

  return (
    <div className="mb-6" role="search">
      <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-4">
        {/* Search Input */}
        <div className="flex-grow">
          <div className="relative">
            <Input
              type="text"
              placeholder="Search profiles..."
              value={searchText}
              onChange={handlers.search}
              className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              aria-label="Search profiles"
            />
            <span 
              className="material-icons absolute left-3 top-2.5 text-slate-400"
              aria-hidden="true"
            >
              search
            </span>
          </div>
        </div>
        
        {/* Filters Section */}
        <div className="flex space-x-2">
          {/* Location Filter */}
          <div className="relative">
            <Select 
              onValueChange={handlers.location}
              aria-label="Filter by location"
            >
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Filter by location" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All locations</SelectItem>
                {locationOptions.map((location) => (
                  <SelectItem 
                    key={location} 
                    value={location}
                  >
                    {location}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          {/* Advanced Filter Button */}
          <Button
            variant="outline"
            size="icon"
            onClick={handlers.advancedFilter}
            className="bg-white hover:bg-slate-50 text-slate-700 px-4 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition duration-200"
            aria-label="Advanced filters"
          >
            <span className="material-icons" aria-hidden="true">tune</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SearchFilter;