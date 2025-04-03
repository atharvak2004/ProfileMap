import { useRoute, Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { getStaticMapUrl, formatAddress } from "@/lib/mapbox";
import { getProfileById } from "@/lib/profile-service";

export default function ProfileDetails() {
  // Get profile ID from URL
  const [match, params] = useRoute("/profile/:id");
  const id = parseInt(params?.id);

  // Fetch profile data
  const { data: profile, isLoading, error } = useQuery({
    queryKey: ["profile", id],
    queryFn: () => getProfileById(id),
    enabled: !!id,
    retry: false
  });

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary mx-auto"></div>
      </div>
    );
  }

  if (error || !profile) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-3xl font-bold text-slate-900 mb-4">
          Error Loading Profile
        </h1>
        <p className="text-slate-600 mb-8">
          The profile you're looking for could not be found.
        </p>
        <Link href="/">
          <Button className="mx-auto">
            <span className="material-icons mr-2">arrow_back</span>
            Back to Profiles
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Back button */}
      <div className="mb-8">
        <Link href="/">
          <Button variant="outline" size="sm">
            <span className="material-icons mr-2">arrow_back</span>
            Back to Profiles
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Profile info */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex flex-col md:flex-row md:items-center mb-6">
              <div className="flex-shrink-0 mb-4 md:mb-0 md:mr-6">
                <div className="w-24 h-24 rounded-full overflow-hidden bg-slate-200">
                  {profile.imageUrl ? (
                    <img
                      src={profile.imageUrl}
                      alt={profile.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-primary text-white text-2xl">
                      {profile.name.charAt(0)}
                    </div>
                  )}
                </div>
              </div>
              <div>
                <h1 className="text-3xl font-bold text-slate-900 mb-2">
                  {profile.name}
                </h1>
                <div className="flex items-center mb-2">
                  <span className="inline-block px-3 py-1 bg-slate-100 text-slate-700 rounded-full text-sm font-medium">
                    {profile.role}
                  </span>
                </div>
                <div className="flex items-start">
                  <span className="material-icons text-slate-400 text-base mr-2 mt-0.5">location_on</span>
                  <span className="text-slate-600">{formatAddress(profile)}</span>
                </div>
              </div>
            </div>

            <div className="border-t border-slate-200 pt-6">
              <h2 className="text-xl font-semibold text-slate-800 mb-4">About</h2>
              <p className="text-slate-600 mb-6">
                {profile.bio || "No bio available."}
              </p>

              <h2 className="text-xl font-semibold text-slate-800 mb-4">Skills</h2>
              <div className="flex flex-wrap gap-2 mb-6">
                {profile.skills && profile.skills.length > 0 ? (
                  profile.skills.map((skill, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm"
                    >
                      {skill}
                    </span>
                  ))
                ) : (
                  <span className="text-slate-500">No skills listed</span>
                )}
              </div>

              <h2 className="text-xl font-semibold text-slate-800 mb-4">Contact Information</h2>
              <div className="space-y-3">
                {profile.email && (
                  <div className="flex items-start">
                    <span className="material-icons text-slate-400 text-base mr-2 mt-0.5">email</span>
                    <span className="text-slate-600">{profile.email}</span>
                  </div>
                )}
                {profile.phone && (
                  <div className="flex items-start">
                    <span className="material-icons text-slate-400 text-base mr-2 mt-0.5">phone</span>
                    <span className="text-slate-600">{profile.phone}</span>
                  </div>
                )}
                {profile.website && (
                  <div className="flex items-start">
                    <span className="material-icons text-slate-400 text-base mr-2 mt-0.5">language</span>
                    <a
                      href={profile.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline"
                    >
                      {profile.website}
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Map and additional info */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-xl font-semibold text-slate-800 mb-4">Location</h2>
            <div className="aspect-square overflow-hidden rounded-md mb-4">
              {profile.latitude && profile.longitude ? (
                <img
                  src={getStaticMapUrl(profile.latitude, profile.longitude)}
                  alt={`Map showing location of ${profile.name}`}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-slate-100 text-slate-400 text-sm">
                  No location data available
                </div>
              )}
            </div>
            <p className="text-slate-600 text-sm">
              {formatAddress(profile)}
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-slate-800 mb-4">Additional Information</h2>
            <div className="space-y-4">
              {profile.company && (
                <div>
                  <h3 className="text-sm font-medium text-slate-500">Company</h3>
                  <p className="text-slate-700">{profile.company}</p>
                </div>
              )}
              {profile.availability && (
                <div>
                  <h3 className="text-sm font-medium text-slate-500">Availability</h3>
                  <p className="text-slate-700">{profile.availability}</p>
                </div>
              )}
              {profile.experience && (
                <div>
                  <h3 className="text-sm font-medium text-slate-500">Experience</h3>
                  <p className="text-slate-700">{profile.experience} years</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}