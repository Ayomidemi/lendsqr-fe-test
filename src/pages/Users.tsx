import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { mockApi } from "../services/api";
import type { User } from "../data/mockUsers";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import FilterModal from "../components/FilterModal";
import ActionDropdown from "../components/ActionDropdown";
import {
  FilterIcon,
  MoreVerticalIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "../components/Icons";
import "../styles/Dashboard.scss";

interface UsersFilters {
  organization?: string;
  username?: string;
  email?: string;
  phoneNumber?: string;
  date?: string;
  status?: string;
}

const Users: React.FC = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState<{
    users: User[];
    total: number;
    totalPages: number;
  }>({ users: [], total: 0, totalPages: 0 });
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState<UsersFilters>({});
  const [searchTerm, setSearchTerm] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(true);
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

  const itemsPerPage = 10;

  // Mock user data for navbar
  const userData = {
    name: "Admin User",
    email: "admin@lendsqr.com",
    avatar: "/avatar.png",
  };

  useEffect(() => {
    // Check authentication
    const token = localStorage.getItem("auth_token");
    if (!token) {
      navigate("/login");
      return;
    }

    loadUsers();
  }, [page, filters, searchTerm, navigate]);

  const loadUsers = async () => {
    setLoading(true);
    try {
      const response = await mockApi.getUsers(page, itemsPerPage, {
        ...filters,
        search: searchTerm,
      });
      setUsers(response);
    } catch (error) {
      console.error("Error loading users:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    setPage(1);
  };

  const handleFilterClick = (event: React.MouseEvent) => {
    const rect = event.currentTarget.getBoundingClientRect();
    setFilterModalPosition({
      x: rect.left,
      y: rect.bottom + window.scrollY,
    });
    setFilterModalOpen(true);
  };

  const handleFilter = (newFilters: UsersFilters) => {
    setFilters(newFilters);
    setPage(1);
    setFilterModalOpen(false);
  };

  const handleResetFilters = () => {
    setFilters({});
    setSearchTerm("");
    setPage(1);
    setFilterModalOpen(false);
  };

  const handleActionClick = (event: React.MouseEvent, userId: string) => {
    event.stopPropagation();
    const rect = event.currentTarget.getBoundingClientRect();
    setActionDropdownPosition({
      x: rect.left,
      y: rect.bottom + window.scrollY,
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
    // TODO: Implement blacklist functionality
    console.log("Blacklist user:", selectedUserId);
    setActionDropdownOpen(false);
  };

  const handleActivateUser = () => {
    // TODO: Implement activate functionality
    console.log("Activate user:", selectedUserId);
    setActionDropdownOpen(false);
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  const renderPaginationButtons = () => {
    const buttons = [];
    const totalPages = users.totalPages;

    // Previous button
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

    // Page numbers
    const startPage = Math.max(1, page - 2);
    const endPage = Math.min(totalPages, page + 2);

    for (let i = startPage; i <= endPage; i++) {
      buttons.push(
        <button
          key={i}
          className={`pagination-button ${i === page ? "active" : ""}`}
          onClick={() => handlePageChange(i)}
        >
          {i}
        </button>
      );
    }

    // Next button
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
    return (
      <div className="loading-spinner" data-testid="loading-spinner"></div>
    );
  }

  return (
    <div className="dashboard-container">
      <Navbar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        user={userData}
        onSearch={handleSearch}
      />
      <div className="dashboard-layout">
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <main className="main-content">
          <div className="content-wrapper">
            <div className="page-header">
              <h1 className="page-title">Users</h1>
            </div>

            {users.users.length === 0 ? (
              renderEmptyState()
            ) : (
              <>
                <div className="users-section">
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
                          <div className="table-cell">{user.organization}</div>
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
                </div>
              </>
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

export default Users;
