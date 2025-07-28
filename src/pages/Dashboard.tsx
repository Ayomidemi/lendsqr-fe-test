import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { mockApi } from '../services/api';
import type { DashboardStats } from '../types';
import '../styles/Dashboard.scss';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    // Check if user is authenticated
    const token = localStorage.getItem('auth_token');
    const userData = localStorage.getItem('user');
    
    if (!token) {
      navigate('/login');
      return;
    }

    if (userData) {
      setUser(JSON.parse(userData));
    }

    // Load dashboard stats
    const loadStats = async () => {
      try {
        const dashboardStats = await mockApi.getDashboardStats();
        setStats(dashboardStats);
      } catch (error) {
        console.error('Error loading dashboard stats:', error);
      } finally {
        setLoading(false);
      }
    };

    loadStats();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  const handleNavigateToUsers = () => {
    navigate('/users');
  };

  if (loading) {
    return (
      <div className="dashboard-container">
        <div className="loading-spinner">
          <div className="spinner"></div>
          <p>Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <div className="header-content">
          <div className="logo-section">
            <img src="/logo.svg" alt="Lendsqr" className="logo" />
          </div>
          
          <div className="user-section">
            <div className="user-info">
              <span className="user-name">{user?.name || 'Admin User'}</span>
              <span className="user-email">{user?.email || 'admin@lendsqr.com'}</span>
            </div>
            <button onClick={handleLogout} className="logout-button">
              Logout
            </button>
          </div>
        </div>
      </header>

      <main className="dashboard-main">
        <div className="dashboard-content">
          <div className="dashboard-header-section">
            <h1 className="dashboard-title">Dashboard</h1>
            <p className="dashboard-subtitle">Welcome to your admin dashboard</p>
          </div>

          {stats && (
            <div className="stats-grid">
              <div className="stat-card">
                <div className="stat-icon users-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M16 7C16 9.20914 14.2091 11 12 11C9.79086 11 8 9.20914 8 7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7Z" stroke="currentColor" strokeWidth="2"/>
                    <path d="M12 14C8.13401 14 5 17.134 5 21H19C19 17.134 15.866 14 12 14Z" stroke="currentColor" strokeWidth="2"/>
                  </svg>
                </div>
                <div className="stat-content">
                  <h3 className="stat-title">Total Users</h3>
                  <p className="stat-value">{stats.totalUsers.toLocaleString()}</p>
                </div>
              </div>

              <div className="stat-card">
                <div className="stat-icon active-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" strokeWidth="2"/>
                  </svg>
                </div>
                <div className="stat-content">
                  <h3 className="stat-title">Active Users</h3>
                  <p className="stat-value">{stats.activeUsers.toLocaleString()}</p>
                </div>
              </div>

              <div className="stat-card">
                <div className="stat-icon loans-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2"/>
                    <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2"/>
                    <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2"/>
                  </svg>
                </div>
                <div className="stat-content">
                  <h3 className="stat-title">Users with Loans</h3>
                  <p className="stat-value">{stats.usersWithLoans.toLocaleString()}</p>
                </div>
              </div>

              <div className="stat-card">
                <div className="stat-icon savings-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M12 2L13.09 8.26L20 9L13.09 9.74L12 16L10.91 9.74L4 9L10.91 8.26L12 2Z" stroke="currentColor" strokeWidth="2"/>
                  </svg>
                </div>
                <div className="stat-content">
                  <h3 className="stat-title">Users with Savings</h3>
                  <p className="stat-value">{stats.usersWithSavings.toLocaleString()}</p>
                </div>
              </div>
            </div>
          )}

          <div className="quick-actions">
            <h2 className="section-title">Quick Actions</h2>
            <div className="actions-grid">
              <button 
                onClick={handleNavigateToUsers}
                className="action-card"
              >
                <div className="action-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M16 7C16 9.20914 14.2091 11 12 11C9.79086 11 8 9.20914 8 7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7Z" stroke="currentColor" strokeWidth="2"/>
                    <path d="M12 14C8.13401 14 5 17.134 5 21H19C19 17.134 15.866 14 12 14Z" stroke="currentColor" strokeWidth="2"/>
                  </svg>
                </div>
                <div className="action-content">
                  <h3>View Users</h3>
                  <p>Browse and manage all users</p>
                </div>
              </button>

              <button className="action-card">
                <div className="action-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" strokeWidth="2"/>
                  </svg>
                </div>
                <div className="action-content">
                  <h3>Analytics</h3>
                  <p>View detailed analytics</p>
                </div>
              </button>

              <button className="action-card">
                <div className="action-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M12 2L13.09 8.26L20 9L13.09 9.74L12 16L10.91 9.74L4 9L10.91 8.26L12 2Z" stroke="currentColor" strokeWidth="2"/>
                  </svg>
                </div>
                <div className="action-content">
                  <h3>Reports</h3>
                  <p>Generate reports</p>
                </div>
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard; 