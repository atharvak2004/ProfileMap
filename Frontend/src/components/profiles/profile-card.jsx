import { Link } from "wouter";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatAddress } from "@/lib/mapbox";

const getBadgeVariantForRole = (title) => {
  if (!title) return undefined;
  const roleLower = title.toLowerCase();
  if (roleLower.includes("design")) return "designer";
  if (roleLower.includes("develop")) return "developer";
  if (roleLower.includes("market")) return "marketing";
  if (roleLower.includes("product")) return "product";
  return undefined;
};

const ProfileCard = ({ profile, onShowOnMap }) => {
  const badgeVariant = getBadgeVariantForRole(profile.title);
  
  return (
    <div className="profile-card bg-white border border-slate-200 rounded-lg overflow-hidden hover:shadow-md transition-all duration-200">
      <div className="flex">
        <div className="w-24 h-24 flex-shrink-0">
          <img 
            src={profile.imageUrl} 
            alt={profile.name} 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="p-3 flex-grow">
          <div className="flex justify-between items-start">
            <h3 className="font-semibold text-slate-800">{profile.name}</h3>
            <Badge variant={badgeVariant}>{profile.title}</Badge>
          </div>
          <p className="text-sm text-slate-600 mt-1 line-clamp-2">
            {profile.description}
          </p>
          <div className="flex items-center mt-2 text-xs text-slate-500">
            <span className="material-icons text-xs mr-1">location_on</span>
            <span>{profile.city}, {profile.state}</span>
          </div>
          <div className="mt-2 flex justify-end">
            <Link href={`/profile/${profile.id}`}>
              <Button variant="" size="xs" className="mr-2">
                View Details
              </Button>
            </Link>
            <Button 
              size="xs"
              onClick={() => onShowOnMap(profile)}
            >
              Show on Map
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;