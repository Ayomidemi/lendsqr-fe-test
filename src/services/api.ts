import { allUsers, type User } from "../data/mockUsers";

export interface DashboardStats {
  totalUsers: number;
  activeUsers: number;
  usersWithLoans: number;
  usersWithSavings: number;
}

export interface UsersResponse {
  users: User[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface UsersFilters {
  organization?: string;
  status?: string;
  dateJoined?: string;
  search?: string;
}

// Simulate API delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const mockApi = {
  // Login API
  async login(email: string, password: string) {
    await delay(1000);

    if (email === "admin@lendsqr.com" && password === "password") {
      const token = "mock_jwt_token_" + Date.now();
      const user = {
        id: "1",
        name: "Adedeji",
        email: "admin@lendsqr.com",
        role: "admin",
      };

      return { token, user };
    } else {
      throw new Error("Invalid credentials");
    }
  },

  // Dashboard Stats API
  async getDashboardStats(): Promise<DashboardStats> {
    await delay(800);

    const totalUsers = allUsers.length;
    const activeUsers = allUsers.filter(
      (user) => user.status === "active"
    ).length;
    const usersWithLoans = Math.floor(totalUsers * 0.8); // 80% have loans
    const usersWithSavings = Math.floor(totalUsers * 0.9); // 90% have savings

    return {
      totalUsers,
      activeUsers,
      usersWithLoans,
      usersWithSavings,
    };
  },

  // Users API with filtering, pagination, and search
  async getUsers(
    page: number = 1,
    limit: number = 10,
    filters: UsersFilters = {}
  ): Promise<UsersResponse> {
    await delay(600);

    let filteredUsers = [...allUsers];

    // Apply filters
    if (filters.organization) {
      filteredUsers = filteredUsers.filter((user) =>
        user.organization
          .toLowerCase()
          .includes(filters.organization!.toLowerCase())
      );
    }

    if (filters.status) {
      filteredUsers = filteredUsers.filter(
        (user) => user.status === filters.status
      );
    }

    if (filters.dateJoined) {
      filteredUsers = filteredUsers.filter((user) =>
        user.dateJoined.includes(filters.dateJoined!)
      );
    }

    if (filters.search) {
      const searchTerm = filters.search.toLowerCase();
      filteredUsers = filteredUsers.filter(
        (user) =>
          user.username.toLowerCase().includes(searchTerm) ||
          user.email.toLowerCase().includes(searchTerm) ||
          user.organization.toLowerCase().includes(searchTerm) ||
          user.phoneNumber.includes(searchTerm)
      );
    }

    // Calculate pagination
    const total = filteredUsers.length;
    const totalPages = Math.ceil(total / limit);
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedUsers = filteredUsers.slice(startIndex, endIndex);

    return {
      users: paginatedUsers,
      total,
      page,
      limit,
      totalPages,
    };
  },

  // Get single user by ID
  async getUserById(id: string): Promise<User | null> {
    await delay(500);

    const user = allUsers.find((user) => user.id === id);
    return user || null;
  },

  // Get organizations for filter dropdown
  async getOrganizations(): Promise<string[]> {
    await delay(300);

    const organizations = [
      ...new Set(allUsers.map((user) => user.organization)),
    ];
    return organizations.sort();
  },

  // Get statuses for filter dropdown
  async getStatuses(): Promise<string[]> {
    await delay(300);

    const statuses = [...new Set(allUsers.map((user) => user.status))];
    return statuses.sort();
  },
};
