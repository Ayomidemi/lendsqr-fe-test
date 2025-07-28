import React from "react";
import { useNavigate } from "react-router-dom";
import {
  BriefcaseIcon,
  UsersIcon,
  HandshakeIcon,
  SackIcon,
  PiggyBankIcon,
  HandHoldingIcon,
  UserCheckIcon,
  UserXIcon,
  BuildingIcon,
  BankIcon,
  CoinsIcon,
  ReceiptIcon,
  GalaxyIcon,
  UserCogIcon,
  ScrollIcon,
  BarChartIcon,
  SlidersIcon,
  PercentIcon,
  ClipboardIcon,
  LogoutIcon,
  ChevronDownIcon,
  DashboardIcon,
} from "./Icons";
import "../styles/Sidebar.scss";

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ sidebarOpen }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("auth_token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <aside className={`sidebar ${sidebarOpen ? "open" : ""}`}>
      <div className="switch-organization">
        <button className="switch-org-button">
          <BriefcaseIcon />
          <span>Switch Organization</span>
          <ChevronDownIcon />
        </button>

        <button className="switch-org-button">
          <DashboardIcon />
          <span>Dashboard</span>
        </button>
      </div>

      <nav className="sidebar-nav">
        <div className="nav-section">
          <h3 className="section-title">CUSTOMERS</h3>
          <ul className="nav-list">
            <li className="nav-item active">
              <a href="#" className="nav-link">
                <UsersIcon />
                <span>Users</span>
              </a>
            </li>
            <li className="nav-item">
              <a href="#" className="nav-link">
                <HandshakeIcon />
                <span>Guarantors</span>
              </a>
            </li>
            <li className="nav-item">
              <a href="#" className="nav-link">
                <SackIcon />
                <span>Loans</span>
              </a>
            </li>
            <li className="nav-item">
              <a href="#" className="nav-link">
                <HandHoldingIcon />
                <span>Decision Models</span>
              </a>
            </li>
            <li className="nav-item">
              <a href="#" className="nav-link">
                <PiggyBankIcon />
                <span>Savings</span>
              </a>
            </li>
            <li className="nav-item">
              <a href="#" className="nav-link">
                <UserCheckIcon />
                <span>Loan Requests</span>
              </a>
            </li>
            <li className="nav-item">
              <a href="#" className="nav-link">
                <UserXIcon />
                <span>Whitelist</span>
              </a>
            </li>
            <li className="nav-item">
              <a href="#" className="nav-link">
                <GalaxyIcon />
                <span>Karma</span>
              </a>
            </li>
          </ul>
        </div>

        <div className="nav-section">
          <h3 className="section-title">BUSINESSES</h3>
          <ul className="nav-list">
            <li className="nav-item">
              <a href="#" className="nav-link">
                <BuildingIcon />
                <span>Organization</span>
              </a>
            </li>
            <li className="nav-item">
              <a href="#" className="nav-link">
                <BankIcon />
                <span>Loan Products</span>
              </a>
            </li>
            <li className="nav-item">
              <a href="#" className="nav-link">
                <CoinsIcon />
                <span>Savings Products</span>
              </a>
            </li>
            <li className="nav-item">
              <a href="#" className="nav-link">
                <ReceiptIcon />
                <span>Fees and Charges</span>
              </a>
            </li>
            <li className="nav-item">
              <a href="#" className="nav-link">
                <ScrollIcon />
                <span>Transactions</span>
              </a>
            </li>
            <li className="nav-item">
              <a href="#" className="nav-link">
                <BarChartIcon />
                <span>Services</span>
              </a>
            </li>
            <li className="nav-item">
              <a href="#" className="nav-link">
                <SlidersIcon />
                <span>Service Account</span>
              </a>
            </li>
            <li className="nav-item">
              <a href="#" className="nav-link">
                <PercentIcon />
                <span>Settlements</span>
              </a>
            </li>
            <li className="nav-item">
              <a href="#" className="nav-link">
                <ClipboardIcon />
                <span>Reports</span>
              </a>
            </li>
          </ul>
        </div>

        <div className="nav-section">
          <h3 className="section-title">SETTINGS</h3>
          <ul className="nav-list">
            <li className="nav-item">
              <a href="#" className="nav-link">
                <UserCogIcon />
                <span>Preferences</span>
              </a>
            </li>
            <li className="nav-item">
              <a href="#" className="nav-link">
                <PercentIcon />
                <span>Fees and Pricing</span>
              </a>
            </li>
            <li className="nav-item">
              <a href="#" className="nav-link">
                <ScrollIcon />
                <span>Audit Logs</span>
              </a>
            </li>
            <li className="nav-item">
              <a href="#" className="nav-link">
                <SlidersIcon />
                <span>Systems Messages</span>
              </a>
            </li>
          </ul>
        </div>
      </nav>

      <div className="sidebar-footer">
        <button onClick={handleLogout} className="logout-button">
          <LogoutIcon />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
