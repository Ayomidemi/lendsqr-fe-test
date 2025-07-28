import axios from 'axios';
import type { User, ApiResponse, PaginatedResponse, DashboardStats } from '../types';

// Mock data for 500 users
const generateMockUsers = (): User[] => {
  const users: User[] = [];
  const organizations = ['Lendsqr', 'Irorun', 'Lendstar'];
  const statuses: User['status'][] = ['active', 'inactive', 'pending', 'blacklisted'];
  const genders = ['Male', 'Female'];
  const sectors = ['FinTech', 'EdTech', 'HealthTech', 'E-commerce', 'Agriculture'];
  const employmentStatuses = ['Employed', 'Unemployed', 'Self-employed'];
  const educationLevels = ['High School', 'Bachelor', 'Master', 'PhD'];


  for (let i = 1; i <= 500; i++) {
    const firstName = `User${i}`;
    const lastName = `Test${i}`;
    const email = `user${i}@example.com`;
    const phoneNumber = `+234${Math.floor(Math.random() * 9000000000) + 1000000000}`;
    const bvn = `${Math.floor(Math.random() * 90000000000) + 10000000000}`;
    const accountNumber = `${Math.floor(Math.random() * 9000000000) + 1000000000}`;

    users.push({
      id: `user-${i}`,
      orgName: organizations[Math.floor(Math.random() * organizations.length)],
      userName: `${firstName.toLowerCase()}.${lastName.toLowerCase()}`,
      email,
      phoneNumber,
      createdAt: new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000).toISOString(),
      status: statuses[Math.floor(Math.random() * statuses.length)],
      profile: {
        firstName,
        lastName,
        phoneNumber,
        avatar: `https://ui-avatars.com/api/?name=${firstName}+${lastName}&background=random`,
        gender: genders[Math.floor(Math.random() * genders.length)],
        bvn,
        address: `${Math.floor(Math.random() * 999) + 1} Main Street, Lagos`,
        currency: 'NGN'
      },
      guarantor: {
        firstName: `Guarantor${i}`,
        lastName: `Test${i}`,
        phoneNumber: `+234${Math.floor(Math.random() * 9000000000) + 1000000000}`,
        gender: genders[Math.floor(Math.random() * genders.length)],
        address: `${Math.floor(Math.random() * 999) + 1} Guarantor Street, Lagos`,
        relationship: 'Sibling'
      },
      socials: {
        facebook: `facebook.com/${firstName.toLowerCase()}`,
        instagram: `instagram.com/${firstName.toLowerCase()}`,
        twitter: `twitter.com/${firstName.toLowerCase()}`
      },
      education: {
        level: educationLevels[Math.floor(Math.random() * educationLevels.length)],
        employmentStatus: employmentStatuses[Math.floor(Math.random() * employmentStatuses.length)],
        sector: sectors[Math.floor(Math.random() * sectors.length)],
        duration: `${Math.floor(Math.random() * 10) + 1} years`,
        officeEmail: `office.${email}`,
        monthlyIncome: [`₦${Math.floor(Math.random() * 500000) + 100000}`, `₦${Math.floor(Math.random() * 500000) + 100000}`],
        loanRepayment: `₦${Math.floor(Math.random() * 100000) + 10000}`
      },
      bank: {
        name: 'Providus Bank',
        accountNumber,
        accountName: `${firstName} ${lastName}`
      }
    });
  }

  return users;
};

const mockUsers = generateMockUsers();

// Create axios instance
const api = axios.create({
  baseURL: 'https://api.lendsqr.com/v1',
  timeout: 10000,
});

// Mock API responses
export const mockApi = {
  // Authentication
  login: async (email: string, password: string): Promise<ApiResponse<{ token: string; user: any }>> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    if (email === 'admin@lendsqr.com' && password === 'password') {
      return {
        data: {
          token: 'mock-jwt-token-12345',
          user: {
            id: 'admin-1',
            email: 'admin@lendsqr.com',
            name: 'Admin User'
          }
        },
        status: 'success',
        message: 'Login successful'
      };
    } else {
      throw new Error('Invalid credentials');
    }
  },

  // Get users with pagination and filters
  getUsers: async (
    page: number = 1,
    limit: number = 10,
    filters?: any
  ): Promise<PaginatedResponse<User>> => {
    await new Promise(resolve => setTimeout(resolve, 500));

    let filteredUsers = [...mockUsers];

    // Apply filters
    if (filters) {
      if (filters.organization) {
        filteredUsers = filteredUsers.filter(user => 
          user.orgName.toLowerCase().includes(filters.organization.toLowerCase())
        );
      }
      if (filters.username) {
        filteredUsers = filteredUsers.filter(user => 
          user.userName.toLowerCase().includes(filters.username.toLowerCase())
        );
      }
      if (filters.email) {
        filteredUsers = filteredUsers.filter(user => 
          user.email.toLowerCase().includes(filters.email.toLowerCase())
        );
      }
      if (filters.phoneNumber) {
        filteredUsers = filteredUsers.filter(user => 
          user.phoneNumber.includes(filters.phoneNumber)
        );
      }
      if (filters.status) {
        filteredUsers = filteredUsers.filter(user => 
          user.status === filters.status
        );
      }
    }

    const total = filteredUsers.length;
    const totalPages = Math.ceil(total / limit);
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedUsers = filteredUsers.slice(startIndex, endIndex);

    return {
      data: paginatedUsers,
      total,
      page,
      limit,
      totalPages
    };
  },

  // Get single user by ID
  getUserById: async (id: string): Promise<User> => {
    await new Promise(resolve => setTimeout(resolve, 300));
    
    const user = mockUsers.find(u => u.id === id);
    if (!user) {
      throw new Error('User not found');
    }
    return user;
  },

  // Get dashboard stats
  getDashboardStats: async (): Promise<DashboardStats> => {
    await new Promise(resolve => setTimeout(resolve, 200));
    
    const activeUsers = mockUsers.filter(user => user.status === 'active').length;
    const usersWithLoans = Math.floor(mockUsers.length * 0.7); // 70% have loans
    const usersWithSavings = Math.floor(mockUsers.length * 0.5); // 50% have savings

    return {
      totalUsers: mockUsers.length,
      activeUsers,
      usersWithLoans,
      usersWithSavings
    };
  }
};

export default api; 