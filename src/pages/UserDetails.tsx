/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useEffect } from "react";
import { useParams, useNavigate, useSearchParams } from "react-router-dom";
import { mockApi } from "../services/api";
import type { User } from "../data/mockUsers";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import {
  ChevronLeftIcon,
  StarIcon,
  StarOutlineIcon,
  UserIcon,
  UserCheckIcon,
  UserXIcon,
} from "../components/Icons";
import "../styles/UserDetails.scss";

const UserDetails: React.FC = () => {
  const { userId } = useParams<{ userId: string }>();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const activeTab = searchParams.get("tab") || "general";

  // Mock user data for navbar
  const userData = {
    name: "Admin User",
    email: "admin@lendsqr.com",
    avatar: "/avatar.png",
  };

  useEffect(() => {
    const loadUserDetails = async () => {
      if (!userId) {
        setError("User ID is required");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const userData = await mockApi.getUserById(userId);
        setUser(userData);
        setError(null);
      } catch (err) {
        setError("User not found");
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    loadUserDetails();
  }, [userId]);

  const showToastMessage = (message: string) => {
    setToastMessage(message);
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, 3000);
  };

  const handleBackToUsers = () => {
    navigate("/dashboard");
  };

  const handleTabChange = (tab: string) => {
    setSearchParams({ tab });
  };

  const handleBlacklistUser = () => {
    showToastMessage("Blacklist functionality coming soon!");
  };

  const handleActivateUser = () => {
    showToastMessage("Activate user functionality coming soon!");
  };

  const renderUserTier = (tier: number = 1) => {
    const stars = [];
    for (let i = 1; i <= 3; i++) {
      stars.push(
        <span key={i} className="star">
          {i <= tier ? <StarIcon /> : <StarOutlineIcon />}
        </span>
      );
    }
    return <div className="user-tier">{stars}</div>;
  };

  const renderTabContent = () => {
    if (!user) return null;

    switch (activeTab) {
      case "general":
        return <GeneralDetails user={user} />;
      case "documents":
        return <Documents user={user} />;
      case "bank":
        return <BankDetails user={user} />;
      case "loans":
        return <Loans user={user} />;
      case "savings":
        return <Savings user={user} />;
      case "app":
        return <AppAndSystem user={user} />;
      default:
        return <GeneralDetails user={user} />;
    }
  };

  if (loading) {
    return (
      <div className="dashboard-container">
        <Navbar
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
          user={userData}
        />
        <div className="dashboard-layout">
          <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
          <main className="main-content">
            <div className="loading-spinner"></div>
          </main>
        </div>
      </div>
    );
  }

  if (error || !user) {
    return (
      <div className="dashboard-container">
        <Navbar
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
          user={userData}
        />
        <div className="dashboard-layout">
          <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
          <main className="main-content">
            <div className="error-state">
              <h3>User Not Found</h3>
              <p>The user you're looking for doesn't exist.</p>
              <button onClick={handleBackToUsers} className="back-button">
                Back to Users
              </button>
            </div>
          </main>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      <Navbar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        user={userData}
      />
      <div className="dashboard-layout">
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <main className="main-content">
          <div className="user-details-content">
            {/* Header */}
            <div className="page-header">
              <button onClick={handleBackToUsers} className="back-button">
                <ChevronLeftIcon />
                Back to Users
              </button>
              <div className="action-buttons">
                <button onClick={handleBlacklistUser} className="blacklist-btn">
                  <UserXIcon />
                  BLACKLIST USER
                </button>
                <button onClick={handleActivateUser} className="activate-btn">
                  <UserCheckIcon />
                  ACTIVATE USER
                </button>
              </div>
            </div>

            {/* User Summary Card */}
            <div className="user-summary-card">
              <div className="user-avatar">
                <UserIcon />
              </div>
              <div className="user-info">
                <h2 className="user-name">
                  {user.profile.firstName} {user.profile.lastName}
                </h2>
                <p className="user-id">{user.id}</p>
                <div className="user-details">
                  <div className="user-tier-section">
                    <span className="tier-label">User's Tier</span>
                    {renderUserTier(1)}
                  </div>
                  <div className="account-balance">
                    <span className="balance-label">Account Balance</span>
                    <span className="balance-amount">
                      ₦{user.account.accountBalance}
                    </span>
                  </div>
                  <div className="bank-details">
                    <span className="bank-label">Bank Account</span>
                    <span className="bank-account">
                      {user.account.accountNumber}/{user.account.bankName}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Navigation Tabs */}
            <div className="tabs-container">
              {[
                { key: "general", label: "General Details" },
                { key: "documents", label: "Documents" },
                { key: "bank", label: "Bank Details" },
                { key: "loans", label: "Loans" },
                { key: "savings", label: "Savings" },
                { key: "app", label: "App and System" },
              ].map((tab) => (
                <button
                  key={tab.key}
                  className={`tab ${activeTab === tab.key ? "active" : ""}`}
                  onClick={() => handleTabChange(tab.key)}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <div className="tab-content">{renderTabContent()}</div>
          </div>
        </main>
      </div>

      {/* Toast Notification */}
      {showToast && (
        <div className="toast-notification">
          <div className="toast-content">
            <span className="toast-message">{toastMessage}</span>
            <button className="toast-close" onClick={() => setShowToast(false)}>
              ×
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

// Tab Components
const GeneralDetails: React.FC<{ user: User }> = ({ user }) => {
  return (
    <div className="general-details">
      <div className="details-section">
        <h3 className="section-title">Personal Information</h3>
        <div className="details-grid">
          <div className="detail-item">
            <span className="detail-label">Full Name</span>
            <span className="detail-value">
              {user.profile.firstName} {user.profile.lastName}
            </span>
          </div>
          <div className="detail-item">
            <span className="detail-label">Phone Number</span>
            <span className="detail-value">{user.phoneNumber}</span>
          </div>
          <div className="detail-item">
            <span className="detail-label">Email Address</span>
            <span className="detail-value">{user.email}</span>
          </div>
          <div className="detail-item">
            <span className="detail-label">BVN</span>
            <span className="detail-value">{user.profile.bvn}</span>
          </div>
          <div className="detail-item">
            <span className="detail-label">Gender</span>
            <span className="detail-value">{user.profile.gender}</span>
          </div>
          <div className="detail-item">
            <span className="detail-label">Marital Status</span>
            <span className="detail-value">Single</span>
          </div>
          <div className="detail-item">
            <span className="detail-label">Children</span>
            <span className="detail-value">None</span>
          </div>
          <div className="detail-item">
            <span className="detail-label">Type of Residence</span>
            <span className="detail-value">Parent's Apartment</span>
          </div>
        </div>
      </div>

      <div className="details-section">
        <h3 className="section-title">Education and Employment</h3>
        <div className="details-grid">
          <div className="detail-item">
            <span className="detail-label">Level of Education</span>
            <span className="detail-value">{user.education.level}</span>
          </div>
          <div className="detail-item">
            <span className="detail-label">Employment Status</span>
            <span className="detail-value">
              {user.education.employmentStatus}
            </span>
          </div>
          <div className="detail-item">
            <span className="detail-label">Sector of Employment</span>
            <span className="detail-value">{user.education.sector}</span>
          </div>
          <div className="detail-item">
            <span className="detail-label">Duration of Employment</span>
            <span className="detail-value">{user.education.duration}</span>
          </div>
          <div className="detail-item">
            <span className="detail-label">Office Email</span>
            <span className="detail-value">{user.education.officeEmail}</span>
          </div>
          <div className="detail-item">
            <span className="detail-label">Monthly Income</span>
            <span className="detail-value">
              {user.education.monthlyIncome.join(" - ")}
            </span>
          </div>
          <div className="detail-item">
            <span className="detail-label">Loan Repayment</span>
            <span className="detail-value">
              ₦{user.education.loanRepayment}
            </span>
          </div>
        </div>
      </div>

      <div className="details-section">
        <h3 className="section-title">Socials</h3>
        <div className="details-grid">
          <div className="detail-item">
            <span className="detail-label">Twitter</span>
            <span className="detail-value">{user.socials.twitter}</span>
          </div>
          <div className="detail-item">
            <span className="detail-label">Facebook</span>
            <span className="detail-value">{user.socials.facebook}</span>
          </div>
          <div className="detail-item">
            <span className="detail-label">Instagram</span>
            <span className="detail-value">{user.socials.instagram}</span>
          </div>
        </div>
      </div>

      <div className="details-section">
        <h3 className="section-title">Guarantor</h3>
        <div className="details-grid">
          <div className="detail-item">
            <span className="detail-label">Full Name</span>
            <span className="detail-value">
              {user.profile.guarantor.firstName}{" "}
              {user.profile.guarantor.lastName}
            </span>
          </div>
          <div className="detail-item">
            <span className="detail-label">Phone Number</span>
            <span className="detail-value">
              {user.profile.guarantor.phoneNumber}
            </span>
          </div>
          <div className="detail-item">
            <span className="detail-label">Email Address</span>
            <span className="detail-value">
              {user.profile.guarantor.firstName.toLowerCase()}@gmail.com
            </span>
          </div>
          <div className="detail-item">
            <span className="detail-label">Relationship</span>
            <span className="detail-value">Sister</span>
          </div>
        </div>
      </div>
    </div>
  );
};

const Documents: React.FC<{ user: User }> = ({ user }) => {
  return (
    <div className="documents">
      <h3>Documents</h3>
      <p>Document management section - to be implemented</p>
    </div>
  );
};

const BankDetails: React.FC<{ user: User }> = ({ user }) => {
  return (
    <div className="bank-details">
      <h3>Bank Details</h3>
      <div className="details-grid">
        <div className="detail-item">
          <span className="detail-label">Account Number</span>
          <span className="detail-value">{user.account.accountNumber}</span>
        </div>
        <div className="detail-item">
          <span className="detail-label">Bank Name</span>
          <span className="detail-value">{user.account.bankName}</span>
        </div>
        <div className="detail-item">
          <span className="detail-label">Account Name</span>
          <span className="detail-value">{user.account.accountName}</span>
        </div>
      </div>
    </div>
  );
};

const Loans: React.FC<{ user: User }> = ({ user }) => {
  return (
    <div className="loans">
      <h3>Loans</h3>
      <p>Loan history section - to be implemented</p>
    </div>
  );
};

const Savings: React.FC<{ user: User }> = ({ user }) => {
  return (
    <div className="savings">
      <h3>Savings</h3>
      <p>Savings history section - to be implemented</p>
    </div>
  );
};

const AppAndSystem: React.FC<{ user: User }> = ({ user }) => {
  return (
    <div className="app-and-system">
      <h3>App and System</h3>
      <p>App usage and system settings - to be implemented</p>
    </div>
  );
};

export default UserDetails;
