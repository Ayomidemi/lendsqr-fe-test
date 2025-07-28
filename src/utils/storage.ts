import type { StoredUserDetails, UserDetailsForm } from '../types';

const USER_DETAILS_KEY = 'lendsqr_user_details';

export const storage = {
  // Save user details to localStorage
  saveUserDetails: (userId: string, details: UserDetailsForm): void => {
    try {
      const storedData: StoredUserDetails = {
        userId,
        details,
        lastUpdated: new Date().toISOString()
      };
      localStorage.setItem(USER_DETAILS_KEY, JSON.stringify(storedData));
    } catch (error) {
      console.error('Error saving user details to localStorage:', error);
    }
  },

  // Get user details from localStorage
  getUserDetails: (userId: string): UserDetailsForm | null => {
    try {
      const stored = localStorage.getItem(USER_DETAILS_KEY);
      if (!stored) return null;

      const data: StoredUserDetails = JSON.parse(stored);
      
      // Check if the stored data is for the requested user
      if (data.userId === userId) {
        return data.details;
      }
      
      return null;
    } catch (error) {
      console.error('Error reading user details from localStorage:', error);
      return null;
    }
  },

  // Update user details
  updateUserDetails: (userId: string, updates: Partial<UserDetailsForm>): void => {
    try {
      const existing = storage.getUserDetails(userId);
      if (existing) {
        const updatedDetails = { ...existing, ...updates };
        storage.saveUserDetails(userId, updatedDetails);
      }
    } catch (error) {
      console.error('Error updating user details:', error);
    }
  },

  // Clear user details
  clearUserDetails: (userId: string): void => {
    try {
      const stored = localStorage.getItem(USER_DETAILS_KEY);
      if (stored) {
        const data: StoredUserDetails = JSON.parse(stored);
        if (data.userId === userId) {
          localStorage.removeItem(USER_DETAILS_KEY);
        }
      }
    } catch (error) {
      console.error('Error clearing user details:', error);
    }
  },

  // Check if user details exist
  hasUserDetails: (userId: string): boolean => {
    return storage.getUserDetails(userId) !== null;
  },

  // Get last updated timestamp
  getLastUpdated: (userId: string): string | null => {
    try {
      const stored = localStorage.getItem(USER_DETAILS_KEY);
      if (!stored) return null;

      const data: StoredUserDetails = JSON.parse(stored);
      if (data.userId === userId) {
        return data.lastUpdated;
      }
      
      return null;
    } catch (error) {
      console.error('Error reading last updated timestamp:', error);
      return null;
    }
  }
}; 