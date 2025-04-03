import { mockProfiles } from './mock-data';

// Get a single profile by ID
export const getProfileById = (id) => {
  // Simulate API delay
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const profile = mockProfiles.find(p => p.id === id);
      if (!profile) {
        reject(new Error('Profile not found'));
      } else {
        resolve(profile);
      }
    }, 500);
  });
};

// Get all profiles
export const getAllProfiles = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockProfiles);
    }, 500);
  });
};