import { storage } from '../storage';

// Mock localStorage
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
};
Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
});

describe('Storage Utils', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('saveUserDetails', () => {
    it('should save user details to localStorage', () => {
      const userId = 'user-123';
      const details = {
        firstName: 'John',
        lastName: 'Doe',
        phoneNumber: '+1234567890',
        email: 'john@example.com',
        address: '123 Main St',
        bvn: '12345678901',
        gender: 'Male',
        maritalStatus: 'Single',
        children: '0',
        typeOfResidence: 'Own'
      };

      storage.saveUserDetails(userId, details);

      expect(localStorageMock.setItem).toHaveBeenCalledWith(
        'lendsqr_user_details',
        expect.stringContaining('"userId":"user-123"')
      );
    });
  });

  describe('getUserDetails', () => {
    it('should return user details from localStorage', () => {
      const userId = 'user-123';
      const mockData = {
        userId,
        details: {
          firstName: 'John',
          lastName: 'Doe',
          phoneNumber: '+1234567890',
          email: 'john@example.com',
          address: '123 Main St',
          bvn: '12345678901',
          gender: 'Male',
          maritalStatus: 'Single',
          children: '0',
          typeOfResidence: 'Own'
        },
        lastUpdated: '2024-01-01T00:00:00.000Z'
      };

      localStorageMock.getItem.mockReturnValue(JSON.stringify(mockData));

      const result = storage.getUserDetails(userId);

      expect(result).toEqual(mockData.details);
      expect(localStorageMock.getItem).toHaveBeenCalledWith('lendsqr_user_details');
    });

    it('should return null if no data exists', () => {
      localStorageMock.getItem.mockReturnValue(null);

      const result = storage.getUserDetails('user-123');

      expect(result).toBeNull();
    });

    it('should return null if data is for different user', () => {
      const mockData = {
        userId: 'user-456',
        details: { firstName: 'Jane' },
        lastUpdated: '2024-01-01T00:00:00.000Z'
      };

      localStorageMock.getItem.mockReturnValue(JSON.stringify(mockData));

      const result = storage.getUserDetails('user-123');

      expect(result).toBeNull();
    });
  });

  describe('hasUserDetails', () => {
    it('should return true if user details exist', () => {
      const userId = 'user-123';
      const mockData = {
        userId,
        details: { firstName: 'John' },
        lastUpdated: '2024-01-01T00:00:00.000Z'
      };

      localStorageMock.getItem.mockReturnValue(JSON.stringify(mockData));

      const result = storage.hasUserDetails(userId);

      expect(result).toBe(true);
    });

    it('should return false if user details do not exist', () => {
      localStorageMock.getItem.mockReturnValue(null);

      const result = storage.hasUserDetails('user-123');

      expect(result).toBe(false);
    });
  });

  describe('updateUserDetails', () => {
    it('should update existing user details', () => {
      const userId = 'user-123';
      const existingDetails = {
        firstName: 'John',
        lastName: 'Doe',
        phoneNumber: '+1234567890',
        email: 'john@example.com',
        address: '123 Main St',
        bvn: '12345678901',
        gender: 'Male',
        maritalStatus: 'Single',
        children: '0',
        typeOfResidence: 'Own'
      };

      const mockData = {
        userId,
        details: existingDetails,
        lastUpdated: '2024-01-01T00:00:00.000Z'
      };

      localStorageMock.getItem.mockReturnValue(JSON.stringify(mockData));

      const updates = { firstName: 'Jane' };

      storage.updateUserDetails(userId, updates);

      expect(localStorageMock.setItem).toHaveBeenCalledWith(
        'lendsqr_user_details',
        expect.stringContaining('"firstName":"Jane"')
      );
    });
  });

  describe('clearUserDetails', () => {
    it('should clear user details for specific user', () => {
      const userId = 'user-123';
      const mockData = {
        userId,
        details: { firstName: 'John' },
        lastUpdated: '2024-01-01T00:00:00.000Z'
      };

      localStorageMock.getItem.mockReturnValue(JSON.stringify(mockData));

      storage.clearUserDetails(userId);

      expect(localStorageMock.removeItem).toHaveBeenCalledWith('lendsqr_user_details');
    });

    it('should not clear if data is for different user', () => {
      const mockData = {
        userId: 'user-456',
        details: { firstName: 'Jane' },
        lastUpdated: '2024-01-01T00:00:00.000Z'
      };

      localStorageMock.getItem.mockReturnValue(JSON.stringify(mockData));

      storage.clearUserDetails('user-123');

      expect(localStorageMock.removeItem).not.toHaveBeenCalled();
    });
  });
}); 