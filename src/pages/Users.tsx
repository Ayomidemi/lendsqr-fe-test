import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { mockApi } from '../services/api';
import type { User, UserFilters } from '../types';
import '../styles/Users.scss';

const Users: React.FC = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalUsers, setTotalUsers] = useState(0);
  const [filters, setFilters] = useState<UserFilters>({});
  const [showFilters, setShowFilters] = useState(false);

  const itemsPerPage = 10;

  useEffect(() => {
    // Check authentication
    const token = localStorage.getItem('auth_token');
    if (!token) {
      navigate('/login');
      return;
    }

    loadUsers();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, filters, navigate]);

  const loadUsers = async () => {
    setLoading(true);
    try {
      const response = await mockApi.getUsers(currentPage, itemsPerPage, filters);
      setUsers(response.data);
      setTotalPages(response.totalPages);
      setTotalUsers(response.total);
    } catch (error) {
      console.error('Error loading users:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (key: keyof UserFilters, value: string) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
    setCurrentPage(1); // Reset to first page when filters change
  };

  const clearFilters = () => {
    setFilters({});
    setCurrentPage(1);
  };

  const handleUserClick = (userId: string) => {
    navigate(`/users/${userId}`);
  };

  const getStatusBadge = (status: User['status']) => {
    const statusConfig = {
      active: { color: '#39CD62', bg: 'rgba(57, 205, 98, 0.1)' },
      inactive: { color: '#545F7D', bg: 'rgba(84, 95, 125, 0.1)' },
      pending: { color: '#E9B200', bg: 'rgba(233, 178, 0, 0.1)' },
      blacklisted: { color: '#E4033B', bg: 'rgba(228, 3, 59, 0.1)' }
    };

    const config = statusConfig[status];
    return (
      <span 
        className="status-badge"
        style={{ 
          color: config.color, 
          backgroundColor: config.bg,
          border: `1px solid ${config.color}`
        }}
      >
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="users-container">
      <header className="users-header">
        <div className="header-content">
          <div className="logo-section">
            <img src="/logo.svg" alt="Lendsqr" className="logo" />
          </div>
          
          <div className="user-section">
            <div className="user-info">
              <span className="user-name">Admin User</span>
              <span className="user-email">admin@lendsqr.com</span>
            </div>
            <button onClick={() => navigate('/dashboard')} className="back-button">
              Back to Dashboard
            </button>
          </div>
        </div>
      </header>

      <main className="users-main">
        <div className="users-content">
          <div className="users-header-section">
            <h1 className="users-title">Users</h1>
            <p className="users-subtitle">Manage your users and their information</p>
          </div>

          {/* Filters Section */}
          <div className="filters-section">
            <div className="filters-header">
              <button 
                onClick={() => setShowFilters(!showFilters)}
                className="filter-toggle"
              >
                {showFilters ? 'Hide' : 'Show'} Filters
              </button>
              {Object.keys(filters).length > 0 && (
                <button onClick={clearFilters} className="clear-filters">
                  Clear Filters
                </button>
              )}
            </div>

            {showFilters && (
              <div className="filters-form">
                <div className="filters-grid">
                  <div className="filter-group">
                    <label>Organization</label>
                    <input
                      type="text"
                      value={filters.organization || ''}
                      onChange={(e) => handleFilterChange('organization', e.target.value)}
                      placeholder="Filter by organization"
                    />
                  </div>

                  <div className="filter-group">
                    <label>Username</label>
                    <input
                      type="text"
                      value={filters.username || ''}
                      onChange={(e) => handleFilterChange('username', e.target.value)}
                      placeholder="Filter by username"
                    />
                  </div>

                  <div className="filter-group">
                    <label>Email</label>
                    <input
                      type="email"
                      value={filters.email || ''}
                      onChange={(e) => handleFilterChange('email', e.target.value)}
                      placeholder="Filter by email"
                    />
                  </div>

                  <div className="filter-group">
                    <label>Phone Number</label>
                    <input
                      type="text"
                      value={filters.phoneNumber || ''}
                      onChange={(e) => handleFilterChange('phoneNumber', e.target.value)}
                      placeholder="Filter by phone number"
                    />
                  </div>

                  <div className="filter-group">
                    <label>Status</label>
                    <select
                      value={filters.status || ''}
                      onChange={(e) => handleFilterChange('status', e.target.value)}
                    >
                      <option value="">All Status</option>
                      <option value="active">Active</option>
                      <option value="inactive">Inactive</option>
                      <option value="pending">Pending</option>
                      <option value="blacklisted">Blacklisted</option>
                    </select>
                  </div>

                  <div className="filter-group">
                    <label>Date</label>
                    <input
                      type="date"
                      value={filters.date || ''}
                      onChange={(e) => handleFilterChange('date', e.target.value)}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Users Table */}
          <div className="users-table-container">
            {loading ? (
              <div className="loading-spinner">
                <div className="spinner"></div>
                <p>Loading users...</p>
              </div>
            ) : (
              <>
                <div className="table-header">
                  <h3>Users ({totalUsers.toLocaleString()})</h3>
                </div>

                <div className="table-container">
                  <table className="users-table">
                    <thead>
                      <tr>
                        <th>Organization</th>
                        <th>Username</th>
                        <th>Email</th>
                        <th>Phone Number</th>
                        <th>Date Joined</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {users.map((user) => (
                        <tr 
                          key={user.id} 
                          className="user-row"
                          onClick={() => handleUserClick(user.id)}
                        >
                          <td>{user.orgName}</td>
                          <td>{user.userName}</td>
                          <td>{user.email}</td>
                          <td>{user.phoneNumber}</td>
                          <td>{formatDate(user.createdAt)}</td>
                          <td>{getStatusBadge(user.status)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="pagination">
                    <button
                      onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                      disabled={currentPage === 1}
                      className="pagination-button"
                    >
                      Previous
                    </button>

                    <div className="page-numbers">
                      {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                        const page = i + 1;
                        return (
                          <button
                            key={page}
                            onClick={() => setCurrentPage(page)}
                            className={`page-button ${currentPage === page ? 'active' : ''}`}
                          >
                            {page}
                          </button>
                        );
                      })}
                    </div>

                    <button
                      onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                      disabled={currentPage === totalPages}
                      className="pagination-button"
                    >
                      Next
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Users; 