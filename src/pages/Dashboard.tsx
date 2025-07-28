import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { mockApi } from "../services/api";
import type {
  DashboardStats,
  UsersResponse,
  UsersFilters,
} from "../services/api";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import FilterModal from "../components/FilterModal";
import ActionDropdown from "../components/ActionDropdown";
import {
  FilterIcon,
  MoreVerticalIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  MultipleUsersIcon,
  ActiveUsersIcon,
  UsersWithLoansIcon,
  UsersWithSavingsIcon,
} from "../components/Icons";
import "../styles/Dashboard.scss";

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [users, setUsers] = useState<UsersResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [user, setUser] = useState<any>(null);
  const [filters, setFilters] = useState<UsersFilters>({});
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterModalOpen, setFilterModalOpen] = useState(false);
  const [filterModalPosition, setFilterModalPosition] = useState({
    x: 0,
    y: 0,
  });
  const [actionDropdownOpen, setActionDropdownOpen] = useState(false);
  const [actionDropdownPosition, setActionDropdownPosition] = useState({
    x: 0,
    y: 0,
  });
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("auth_token");
    const userData = localStorage.getItem("user");

    if (!token) {
      navigate("/login");
      return;
    }

    if (userData) {
      setUser(JSON.parse(userData));
    }

    const loadDashboardData = async () => {
      try {
        const [dashboardStats, usersData] = await Promise.all([
          mockApi.getDashboardStats(),
          mockApi.getUsers(currentPage, itemsPerPage, {
            ...filters,
            search: searchTerm,
          }),
        ]);

        setStats(dashboardStats);
        setUsers(usersData);
      } catch (error) {
        console.error("Error loading dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };

    loadDashboardData();
  }, [navigate, currentPage, itemsPerPage, filters, searchTerm]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    setCurrentPage(1);
  };

  const handleFilterClick = (event: React.MouseEvent) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const modalHeight = 620; // Height of the filter modal
    const modalWidth = 300; // Width of the filter modal
    const viewportHeight = window.innerHeight;
    const viewportWidth = window.innerWidth;

    // Calculate initial position - bring it down to middle of screen
    let x = rect.left;
    let y = rect.bottom + 100; // Increased significantly to bring it down more

    // Adjust if modal would go off the right edge
    if (x + modalWidth > viewportWidth) {
      x = viewportWidth - modalWidth - 10;
    }

    // Adjust if modal would go off the bottom edge - but allow it to go down more
    if (y + modalHeight > viewportHeight) {
      y = rect.top - modalHeight - 10; // Increased from 5 to 10
    }

    // Ensure modal doesn't go off the top edge
    if (y < 0) {
      y = 20; // Increased from 10 to 20
    }

    // Ensure modal doesn't go off the left edge
    if (x < 0) {
      x = 10;
    }

    setFilterModalPosition({ x, y });
    setFilterModalOpen(true);
  };

  const handleFilter = (newFilters: UsersFilters) => {
    setFilters(newFilters);
    setCurrentPage(1);
  };

  const handleResetFilters = () => {
    setFilters({});
    setCurrentPage(1);
  };

  const handleActionClick = (event: React.MouseEvent, userId: string) => {
    const rect = event.currentTarget.getBoundingClientRect();
    setActionDropdownPosition({
      x: rect.left - 160, // Position dropdown to the left of the button
      y: rect.bottom + 5,
    });
    setSelectedUserId(userId);
    setActionDropdownOpen(true);
  };

  const handleViewDetails = () => {
    if (selectedUserId) {
      navigate(`/users/${selectedUserId}`);
    }
    setActionDropdownOpen(false);
  };

  const handleBlacklistUser = () => {
    console.log("Blacklist user:", selectedUserId);
    setActionDropdownOpen(false);
  };

  const handleActivateUser = () => {
    console.log("Activate user:", selectedUserId);
    setActionDropdownOpen(false);
  };

  const renderPaginationButtons = () => {
    if (!users) return null;

    const { page, totalPages } = users;
    const buttons = [];

    buttons.push(
      <button
        key="prev"
        className="pagination-button"
        onClick={() => handlePageChange(page - 1)}
        disabled={page === 1}
      >
        <ChevronLeftIcon />
      </button>
    );

    for (let i = 1; i <= totalPages; i++) {
      if (i === 1 || i === totalPages || (i >= page - 1 && i <= page + 1)) {
        buttons.push(
          <button
            key={i}
            className={`pagination-button ${i === page ? "active" : ""}`}
            onClick={() => handlePageChange(i)}
          >
            {i}
          </button>
        );
      } else if (i === page - 2 || i === page + 2) {
        buttons.push(
          <span key={`ellipsis-${i}`} className="pagination-ellipsis">
            ...
          </span>
        );
      }
    }

    buttons.push(
      <button
        key="next"
        className="pagination-button"
        onClick={() => handlePageChange(page + 1)}
        disabled={page === totalPages}
      >
        <ChevronRightIcon />
      </button>
    );

    return buttons;
  };

  const renderEmptyState = () => {
    return (
      <div className="empty-state">
        <div className="empty-state-illustration">
          <svg width="120" height="120" viewBox="0 0 120 120" fill="none">
            <circle
              cx="60"
              cy="60"
              r="50"
              fill="#F5F5F5"
              stroke="#E5E5E5"
              strokeWidth="2"
            />
            <path
              d="M40 60C40 48.954 48.954 40 60 40C71.046 40 80 48.954 80 60C80 71.046 71.046 80 60 80C48.954 80 40 71.046 40 60Z"
              fill="#E5E5E5"
            />
            <path
              d="M50 60C50 54.477 54.477 50 60 50C65.523 50 70 54.477 70 60C70 65.523 65.523 70 60 70C54.477 70 50 65.523 50 60Z"
              fill="#FFFFFF"
            />
            <path
              d="M55 60C55 57.239 57.239 55 60 55C62.761 55 65 57.239 65 60C65 62.761 62.761 65 60 65C57.239 65 55 62.761 55 60Z"
              fill="#545F7D"
            />
            <path
              d="M60 45V55"
              stroke="#545F7D"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <path
              d="M60 65V75"
              stroke="#545F7D"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <path
              d="M45 60H55"
              stroke="#545F7D"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <path
              d="M65 60H75"
              stroke="#545F7D"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </div>
        <h3 className="empty-state-title">No Users Found</h3>
        <p className="empty-state-description">
          {searchTerm ||
          Object.keys(filters).some(
            (key) => filters[key as keyof typeof filters]
          )
            ? "Try adjusting your search criteria or filters to find what you're looking for."
            : "There are currently no users in the system. Users will appear here once they are added."}
        </p>
        {(searchTerm ||
          Object.keys(filters).some(
            (key) => filters[key as keyof typeof filters]
          )) && (
          <button className="empty-state-button" onClick={handleResetFilters}>
            Clear Filters
          </button>
        )}
      </div>
    );
  };

  if (loading) {
    return <div className="loading-spinner"></div>;
  }

  return (
    <div className="dashboard-container">
      <Navbar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        user={user}
        onSearch={handleSearch}
      />

      <div className="dashboard-layout">
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <main className="main-content">
          <div className="dashboard-content">
            <div className="content-header">
              <h1 className="page-title">Users</h1>
            </div>

            {stats && (
              <div className="stats-grid">
                <div className="stat-card">
                  <div className="stat-icon users-icon">
                    <MultipleUsersIcon />
                  </div>
                  <div className="stat-content">
                    <h3 className="stat-title">USERS</h3>
                    <p className="stat-value">
                      {stats.totalUsers.toLocaleString()}
                    </p>
                  </div>
                </div>

                <div className="stat-card">
                  <div className="stat-icon active-icon">
                    <ActiveUsersIcon />
                  </div>
                  <div className="stat-content">
                    <h3 className="stat-title">ACTIVE USERS</h3>
                    <p className="stat-value">
                      {stats.activeUsers.toLocaleString()}
                    </p>
                  </div>
                </div>

                <div className="stat-card">
                  <div className="stat-icon loans-icon">
                    <UsersWithLoansIcon />
                  </div>
                  <div className="stat-content">
                    <h3 className="stat-title">USERS WITH LOANS</h3>
                    <p className="stat-value">
                      {stats.usersWithLoans.toLocaleString()}
                    </p>
                  </div>
                </div>

                <div className="stat-card">
                  <div className="stat-icon savings-icon">
                    <UsersWithSavingsIcon />
                  </div>
                  <div className="stat-content">
                    <h3 className="stat-title">USERS WITH SAVINGS</h3>
                    <p className="stat-value">
                      {stats.usersWithSavings.toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Users Table */}
            {users && (
              <div className="users-section">
                {users.users.length === 0 ? (
                  renderEmptyState()
                ) : (
                  <>
                    <div className="users-table">
                      <div className="table-header">
                        <div className="table-row">
                          <div className="table-cell header-cell">
                            <span>ORGANIZATION</span>
                            <button
                              className="filter-button"
                              onClick={(e) => handleFilterClick(e)}
                            >
                              <FilterIcon />
                            </button>
                          </div>
                          <div className="table-cell header-cell">
                            <span>USERNAME</span>
                            <button
                              className="filter-button"
                              onClick={(e) => handleFilterClick(e)}
                            >
                              <FilterIcon />
                            </button>
                          </div>
                          <div className="table-cell header-cell">
                            <span>EMAIL</span>
                            <button
                              className="filter-button"
                              onClick={(e) => handleFilterClick(e)}
                            >
                              <FilterIcon />
                            </button>
                          </div>
                          <div className="table-cell header-cell">
                            <span>PHONE NUMBER</span>
                            <button
                              className="filter-button"
                              onClick={(e) => handleFilterClick(e)}
                            >
                              <FilterIcon />
                            </button>
                          </div>
                          <div className="table-cell header-cell">
                            <span>DATE JOINED</span>
                            <button
                              className="filter-button"
                              onClick={(e) => handleFilterClick(e)}
                            >
                              <FilterIcon />
                            </button>
                          </div>
                          <div className="table-cell header-cell">
                            <span>STATUS</span>
                            <button
                              className="filter-button"
                              onClick={(e) => handleFilterClick(e)}
                            >
                              <FilterIcon />
                            </button>
                          </div>
                          <div className="table-cell header-cell"></div>
                        </div>
                      </div>

                      <div className="table-body">
                        {users.users.map((user) => (
                          <div key={user.id} className="table-row">
                            <div className="table-cell">
                              {user.organization}
                            </div>
                            <div className="table-cell">{user.username}</div>
                            <div className="table-cell">{user.email}</div>
                            <div className="table-cell">{user.phoneNumber}</div>
                            <div className="table-cell">{user.dateJoined}</div>
                            <div className="table-cell status">
                              <span className={`status-badge ${user.status}`}>
                                {user.status.charAt(0).toUpperCase() +
                                  user.status.slice(1)}
                              </span>
                            </div>
                            <div className="table-cell">
                              <button
                                className="action-button"
                                onClick={(e) => handleActionClick(e, user.id)}
                              >
                                <MoreVerticalIcon />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Pagination */}
                    <div className="pagination-section">
                      <div className="pagination-info">
                        <span>
                          Showing {users.users.length} out of {users.total}
                        </span>
                      </div>
                      <div className="pagination-controls">
                        {renderPaginationButtons()}
                      </div>
                    </div>
                  </>
                )}
              </div>
            )}
          </div>
        </main>
      </div>

      {/* Filter Modal */}
      <FilterModal
        isOpen={filterModalOpen}
        onClose={() => setFilterModalOpen(false)}
        onFilter={handleFilter}
        onReset={handleResetFilters}
        position={filterModalPosition}
      />

      {/* Action Dropdown */}
      <ActionDropdown
        isOpen={actionDropdownOpen}
        onClose={() => setActionDropdownOpen(false)}
        position={actionDropdownPosition}
        onViewDetails={handleViewDetails}
        onBlacklistUser={handleBlacklistUser}
        onActivateUser={handleActivateUser}
      />
    </div>
  );
};

export default Dashboard;
