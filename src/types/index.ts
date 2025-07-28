// User related types
export interface User {
  id: string;
  orgName: string;
  userName: string;
  email: string;
  phoneNumber: string;
  createdAt: string;
  status: 'active' | 'inactive' | 'pending' | 'blacklisted';
  profile: {
    firstName: string;
    lastName: string;
    phoneNumber: string;
    avatar: string;
    gender: string;
    bvn: string;
    address: string;
    currency: string;
  };
  guarantor: {
    firstName: string;
    lastName: string;
    phoneNumber: string;
    gender: string;
    address: string;
    relationship: string;
  };
  socials: {
    facebook: string;
    instagram: string;
    twitter: string;
  };
  education: {
    level: string;
    employmentStatus: string;
    sector: string;
    duration: string;
    officeEmail: string;
    monthlyIncome: string[];
    loanRepayment: string;
  };
  bank: {
    name: string;
    accountNumber: string;
    accountName: string;
  };
}

// API Response types
export interface ApiResponse<T> {
  data: T;
  status: string;
  message: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

// Filter and search types
export interface UserFilters {
  organization?: string;
  username?: string;
  email?: string;
  phoneNumber?: string;
  date?: string;
  status?: string;
}

// Dashboard stats
export interface DashboardStats {
  totalUsers: number;
  activeUsers: number;
  usersWithLoans: number;
  usersWithSavings: number;
}

// Navigation types
export interface NavItem {
  id: string;
  title: string;
  path: string;
  icon?: string;
  children?: NavItem[];
}

// Form types
export interface LoginForm {
  email: string;
  password: string;
}

export interface UserDetailsForm {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  address: string;
  bvn: string;
  gender: string;
  maritalStatus: string;
  children: string;
  typeOfResidence: string;
}

// Local storage types
export interface StoredUserDetails {
  userId: string;
  details: UserDetailsForm;
  lastUpdated: string;
} 