import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { mockApi } from '../services/api';
import { storage } from '../utils/storage';
import type { User, UserDetailsForm } from '../types';
import '../styles/UserDetails.scss';

const UserDetails: React.FC = () => {
  const { userId } = useParams<{ userId: string }>();
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('general');
  const [userDetails, setUserDetails] = useState<UserDetailsForm | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState<UserDetailsForm>({
    firstName: '',
    lastName: '',
    phoneNumber: '',
    email: '',
    address: '',
    bvn: '',
    gender: '',
    maritalStatus: '',
    children: '',
    typeOfResidence: ''
  });

  useEffect(() => {
    // Check authentication
    const token = localStorage.getItem('auth_token');
    if (!token) {
      navigate('/login');
      return;
    }

    if (userId) {
      loadUserDetails();
      loadStoredDetails();
    }
  }, [userId, navigate]);

  const loadUserDetails = async () => {
    if (!userId) return;
    
    setLoading(true);
    try {
      const userData = await mockApi.getUserById(userId);
      setUser(userData);
    } catch (error) {
      setError('Failed to load user details');
      console.error('Error loading user:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadStoredDetails = () => {
    if (!userId) return;
    
    const stored = storage.getUserDetails(userId);
    if (stored) {
      setUserDetails(stored);
      setEditForm(stored);
    }
  };

  const handleEdit = () => {
    if (user) {
      setEditForm({
        firstName: user.profile.firstName,
        lastName: user.profile.lastName,
        phoneNumber: user.profile.phoneNumber,
        email: user.email,
        address: user.profile.address,
        bvn: user.profile.bvn,
        gender: user.profile.gender,
        maritalStatus: 'Single', // Default value
        children: '0', // Default value
        typeOfResidence: 'Own' // Default value
      });
    }
    setIsEditing(true);
  };

  const handleSave = () => {
    if (!userId) return;
    
    storage.saveUserDetails(userId, editForm);
    setUserDetails(editForm);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
    if (userDetails) {
      setEditForm(userDetails);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setEditForm(prev => ({
      ...prev,
      [name]: value
    }));
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



  const tabs = [
    { id: 'general', label: 'General Details' },
    { id: 'documents', label: 'Documents' },
    { id: 'bank', label: 'Bank Details' },
    { id: 'loans', label: 'Loans' },
    { id: 'savings', label: 'Savings' },
    { id: 'app', label: 'App and System' }
  ];

  if (loading) {
    return (
      <div className="user-details-container">
        <div className="loading-spinner">
          <div className="spinner"></div>
          <p>Loading user details...</p>
        </div>
      </div>
    );
  }

  if (error || !user) {
    return (
      <div className="user-details-container">
        <div className="error-message">
          <h2>Error</h2>
          <p>{error || 'User not found'}</p>
          <button onClick={() => navigate('/users')} className="back-button">
            Back to Users
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="user-details-container">
      <header className="user-details-header">
        <div className="header-content">
          <div className="logo-section">
            <img src="/logo.svg" alt="Lendsqr" className="logo" />
          </div>
          
          <div className="user-section">
            <div className="user-info">
              <span className="user-name">Admin User</span>
              <span className="user-email">admin@lendsqr.com</span>
            </div>
            <button onClick={() => navigate('/users')} className="back-button">
              Back to Users
            </button>
          </div>
        </div>
      </header>

      <main className="user-details-main">
        <div className="user-details-content">
          {/* User Header */}
          <div className="user-header">
            <div className="user-basic-info">
              <div className="user-avatar">
                <img src={user.profile.avatar} alt={`${user.profile.firstName} ${user.profile.lastName}`} />
              </div>
              <div className="user-info">
                <h1>{user.profile.firstName} {user.profile.lastName}</h1>
                <p className="user-id">{user.id}</p>
                <div className="user-status">
                  {getStatusBadge(user.status)}
                </div>
              </div>
            </div>
            <div className="user-actions">
              <button className="blacklist-button">BLACKLIST USER</button>
              <button className="activate-button">ACTIVATE USER</button>
            </div>
          </div>

          {/* Tabs */}
          <div className="tabs-container">
            <div className="tabs">
              {tabs.map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`tab-button ${activeTab === tab.id ? 'active' : ''}`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Tab Content */}
          <div className="tab-content">
            {activeTab === 'general' && (
              <div className="general-details">
                <div className="section-header">
                  <h2>Personal Information</h2>
                  {!isEditing && (
                    <button onClick={handleEdit} className="edit-button">
                      Edit
                    </button>
                  )}
                </div>

                {isEditing ? (
                  <div className="edit-form">
                    <div className="form-grid">
                      <div className="form-group">
                        <label>First Name</label>
                        <input
                          type="text"
                          name="firstName"
                          value={editForm.firstName}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className="form-group">
                        <label>Last Name</label>
                        <input
                          type="text"
                          name="lastName"
                          value={editForm.lastName}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className="form-group">
                        <label>Phone Number</label>
                        <input
                          type="tel"
                          name="phoneNumber"
                          value={editForm.phoneNumber}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className="form-group">
                        <label>Email Address</label>
                        <input
                          type="email"
                          name="email"
                          value={editForm.email}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className="form-group">
                        <label>BVN</label>
                        <input
                          type="text"
                          name="bvn"
                          value={editForm.bvn}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className="form-group">
                        <label>Gender</label>
                        <select
                          name="gender"
                          value={editForm.gender}
                          onChange={handleInputChange}
                        >
                          <option value="">Select Gender</option>
                          <option value="Male">Male</option>
                          <option value="Female">Female</option>
                        </select>
                      </div>
                      <div className="form-group">
                        <label>Marital Status</label>
                        <select
                          name="maritalStatus"
                          value={editForm.maritalStatus}
                          onChange={handleInputChange}
                        >
                          <option value="">Select Status</option>
                          <option value="Single">Single</option>
                          <option value="Married">Married</option>
                          <option value="Divorced">Divorced</option>
                          <option value="Widowed">Widowed</option>
                        </select>
                      </div>
                      <div className="form-group">
                        <label>Children</label>
                        <input
                          type="text"
                          name="children"
                          value={editForm.children}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className="form-group">
                        <label>Type of Residence</label>
                        <select
                          name="typeOfResidence"
                          value={editForm.typeOfResidence}
                          onChange={handleInputChange}
                        >
                          <option value="">Select Type</option>
                          <option value="Own">Own</option>
                          <option value="Rent">Rent</option>
                          <option value="Family">Family</option>
                          <option value="Company">Company</option>
                        </select>
                      </div>
                      <div className="form-group full-width">
                        <label>Address</label>
                        <input
                          type="text"
                          name="address"
                          value={editForm.address}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>
                    <div className="form-actions">
                      <button onClick={handleCancel} className="cancel-button">
                        Cancel
                      </button>
                      <button onClick={handleSave} className="save-button">
                        Save
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="info-grid">
                    <div className="info-item">
                      <label>Full Name</label>
                      <p>{userDetails?.firstName || user.profile.firstName} {userDetails?.lastName || user.profile.lastName}</p>
                    </div>
                    <div className="info-item">
                      <label>Phone Number</label>
                      <p>{userDetails?.phoneNumber || user.profile.phoneNumber}</p>
                    </div>
                    <div className="info-item">
                      <label>Email Address</label>
                      <p>{userDetails?.email || user.email}</p>
                    </div>
                    <div className="info-item">
                      <label>BVN</label>
                      <p>{userDetails?.bvn || user.profile.bvn}</p>
                    </div>
                    <div className="info-item">
                      <label>Gender</label>
                      <p>{userDetails?.gender || user.profile.gender}</p>
                    </div>
                    <div className="info-item">
                      <label>Marital Status</label>
                      <p>{userDetails?.maritalStatus || 'Single'}</p>
                    </div>
                    <div className="info-item">
                      <label>Children</label>
                      <p>{userDetails?.children || '0'}</p>
                    </div>
                    <div className="info-item">
                      <label>Type of Residence</label>
                      <p>{userDetails?.typeOfResidence || 'Own'}</p>
                    </div>
                    <div className="info-item full-width">
                      <label>Address</label>
                      <p>{userDetails?.address || user.profile.address}</p>
                    </div>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'bank' && (
              <div className="bank-details">
                <h2>Bank Details</h2>
                <div className="info-grid">
                  <div className="info-item">
                    <label>Bank Name</label>
                    <p>{user.bank.name}</p>
                  </div>
                  <div className="info-item">
                    <label>Account Number</label>
                    <p>{user.bank.accountNumber}</p>
                  </div>
                  <div className="info-item">
                    <label>Account Name</label>
                    <p>{user.bank.accountName}</p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'loans' && (
              <div className="loans-details">
                <h2>Loan Information</h2>
                <div className="info-grid">
                  <div className="info-item">
                    <label>Loan Repayment</label>
                    <p>{user.education.loanRepayment}</p>
                  </div>
                  <div className="info-item">
                    <label>Monthly Income</label>
                    <p>{user.education.monthlyIncome.join(' - ')}</p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'savings' && (
              <div className="savings-details">
                <h2>Savings Information</h2>
                <p>No savings information available</p>
              </div>
            )}

            {activeTab === 'documents' && (
              <div className="documents-details">
                <h2>Documents</h2>
                <p>No documents uploaded</p>
              </div>
            )}

            {activeTab === 'app' && (
              <div className="app-details">
                <h2>App and System</h2>
                <div className="info-grid">
                  <div className="info-item">
                    <label>Employment Status</label>
                    <p>{user.education.employmentStatus}</p>
                  </div>
                  <div className="info-item">
                    <label>Sector</label>
                    <p>{user.education.sector}</p>
                  </div>
                  <div className="info-item">
                    <label>Duration</label>
                    <p>{user.education.duration}</p>
                  </div>
                  <div className="info-item">
                    <label>Office Email</label>
                    <p>{user.education.officeEmail}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default UserDetails; 