import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ProfileForm from "./profile-form";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { Pencil, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const AdminPanel = ({ open, onClose }) => {
  const [activeTab, setActiveTab] = useState("profiles");
  const [editProfile, setEditProfile] = useState(null);
  const [isNewProfile, setIsNewProfile] = useState(false);
  const queryClient = useQueryClient();
  const { toast } = useToast();
  
  const { data: profiles = [], isLoading } = useQuery({
    queryKey: ['/api/profiles'],
  });
  
  const handleAddNewProfile = () => {
    setEditProfile(null);
    setIsNewProfile(true);
  };
  
  const handleEditProfile = (profile) => {
    setEditProfile(profile);
    setIsNewProfile(false);
  };
  
  const handleDeleteProfile = async (id) => {
    try {
      await apiRequest("DELETE", `/api/profiles/${id}`);
      queryClient.invalidateQueries({ queryKey: ['/api/profiles'] });
      toast({
        title: "Profile Deleted",
        description: "The profile has been deleted successfully.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete profile. Please try again.",
        variant: "destructive",
      });
    }
  };
  
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-slate-800">Admin Panel</DialogTitle>
        </DialogHeader>
        
        <Tabs defaultValue="profiles" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-6 border-b border-slate-200 w-full justify-start">
            <TabsTrigger value="profiles">Profiles</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>
          
          <TabsContent value="profiles">
            <div>
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium text-slate-800">Manage Profiles</h3>
                <Button onClick={handleAddNewProfile} className="flex items-center">
                  <span className="material-icons mr-1">add</span>
                  Add New Profile
                </Button>
              </div>
              
              {isLoading ? (
                <div className="text-center py-4">
                  <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-primary border-r-transparent align-[-0.125em]"></div>
                  <p className="mt-2 text-sm text-slate-600">Loading profiles...</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="min-w-full bg-white border border-slate-200">
                    <thead>
                      <tr className="bg-slate-50">
                        <th className="px-4 py-3 text-left text-xs font-semibold text-slate-700 uppercase border-b">Name</th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-slate-700 uppercase border-b">Role</th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-slate-700 uppercase border-b">Location</th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-slate-700 uppercase border-b">Email</th>
                        <th className="px-4 py-3 text-center text-xs font-semibold text-slate-700 uppercase border-b">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200">
                      {profiles.map((profile) => (
                        <tr key={profile.id}>
                          <td className="px-4 py-3">
                            <div className="flex items-center">
                              <img 
                                src={profile.image} 
                                alt={profile.name} 
                                className="w-8 h-8 rounded-full mr-2 object-cover"
                              />
                              <span className="font-medium text-slate-700">{profile.name}</span>
                            </div>
                          </td>
                          <td className="px-4 py-3 text-slate-700">{profile.role}</td>
                          <td className="px-4 py-3 text-slate-700">{profile.city}, {profile.state}</td>
                          <td className="px-4 py-3 text-slate-700">{profile.email}</td>
                          <td className="px-4 py-3">
                            <div className="flex justify-center space-x-2">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleEditProfile(profile)}
                                className="text-primary hover:text-primary-dark"
                              >
                                <Pencil size={18} />
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleDeleteProfile(profile.id)}
                                className="text-red-500 hover:text-red-700"
                              >
                                <Trash2 size={18} />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
              
              {/* Profile Form */}
              {(isNewProfile || editProfile) && (
                <div className="mt-8 border-t border-slate-200 pt-6">
                  <h3 className="text-lg font-medium text-slate-800 mb-4">
                    {isNewProfile ? "Add New Profile" : "Edit Profile"}
                  </h3>
                  <ProfileForm 
                    profile={editProfile} 
                    isNew={isNewProfile}
                    onSuccess={() => {
                      setEditProfile(null);
                      setIsNewProfile(false);
                    }}
                    onCancel={() => {
                      setEditProfile(null);
                      setIsNewProfile(false);
                    }}
                  />
                </div>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="settings">
            <div className="text-center py-10 text-slate-500">
              <span className="material-icons text-4xl mb-2">settings</span>
              <h3 className="text-lg font-medium mb-2">Settings</h3>
              <p>Settings panel is under development.</p>
            </div>
          </TabsContent>
          
          <TabsContent value="analytics">
            <div className="text-center py-10 text-slate-500">
              <span className="material-icons text-4xl mb-2">insights</span>
              <h3 className="text-lg font-medium mb-2">Analytics</h3>
              <p>Analytics panel is under development.</p>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default AdminPanel;