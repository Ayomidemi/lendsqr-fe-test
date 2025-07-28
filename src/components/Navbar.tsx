import React, { useState } from "react";
import { SearchIcon, BellIcon, ChevronDownIcon } from "./Icons";
import "../styles/Navbar.scss";

interface NavbarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  user: any;
  onSearch?: (searchTerm: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({
  sidebarOpen,
  setSidebarOpen,
  // user,
  onSearch,
}) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    if (onSearch) {
      onSearch(value);
    }
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(searchTerm);
    }
  };

  return (
    <header className="navbar">
      <div className="navbar-left">
        <button
          className="menu-toggle"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <line
              x1="3"
              y1="6"
              x2="21"
              y2="6"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <line
              x1="3"
              y1="12"
              x2="21"
              y2="12"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <line
              x1="3"
              y1="18"
              x2="21"
              y2="18"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        <div className="logo-section">
          <img src="/logo.svg" alt="Lendsqr" className="navbar-logo" />
        </div>

        <form className="search-container" onSubmit={handleSearchSubmit}>
          <input
            type="text"
            placeholder="Search for anything..."
            className="search-input"
            value={searchTerm}
            onChange={handleSearchChange}
          />
          <button type="submit" className="search-button">
            <SearchIcon />
          </button>
        </form>
      </div>

      <div className="navbar-right">
        <div className="navbar-actions">
          <button className="docs-button">
            <span>Docs</span>
          </button>
          <button className="notification-button">
            <BellIcon />
          </button>
          <div className="user-profile">
            <img
              src="https://ui-avatars.com/api/?name=Adedeji&background=39CDCC&color=fff"
              alt="User"
              className="user-avatar"
            />
            <span className="user-name">Adedeji</span>
            <ChevronDownIcon />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
