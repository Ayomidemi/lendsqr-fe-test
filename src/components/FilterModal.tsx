import React, { useState } from "react";
import { ChevronDownIcon, CalendarIcon } from "./Icons";
import "../styles/FilterModal.scss";

interface FilterModalProps {
  isOpen: boolean;
  onClose: () => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onFilter: (filters: any) => void;
  onReset: () => void;
  position: { x: number; y: number };
}

const FilterModal: React.FC<FilterModalProps> = ({
  isOpen,
  onClose,
  onFilter,
  onReset,
  position,
}) => {
  const [filters, setFilters] = useState({
    organization: "",
    username: "",
    email: "",
    dateJoined: "",
    phoneNumber: "",
    status: "",
  });

  const statusOptions = [
    { value: "", label: "Select" },
    { value: "active", label: "Active" },
    { value: "inactive", label: "Inactive" },
    { value: "pending", label: "Pending" },
    { value: "blacklisted", label: "Blacklisted" },
  ];

  const handleInputChange = (field: string, value: string) => {
    setFilters((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleFilter = () => {
    onFilter(filters);
    onClose();
  };

  const handleReset = () => {
    setFilters({
      organization: "",
      username: "",
      email: "",
      dateJoined: "",
      phoneNumber: "",
      status: "",
    });
    onReset();
  };

  if (!isOpen) return null;

  return (
    <div className="filter-modal-overlay" onClick={onClose}>
      <div
        className="filter-modal"
        style={{ left: position.x, top: position.y }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="filter-content">
          {/* Organization */}
          <div className="filter-field">
            <label className="filter-label">Organization</label>
            <div className="filter-input-container">
              <input
                type="text"
                placeholder="Organization"
                value={filters.organization}
                onChange={(e) =>
                  handleInputChange("organization", e.target.value)
                }
                className="filter-input"
              />
            </div>
          </div>

          {/* Username */}
          <div className="filter-field">
            <label className="filter-label">Username</label>
            <div className="filter-input-container">
              <input
                type="text"
                placeholder="User"
                value={filters.username}
                onChange={(e) => handleInputChange("username", e.target.value)}
                className="filter-input"
              />
            </div>
          </div>

          {/* Email */}
          <div className="filter-field">
            <label className="filter-label">Email</label>
            <div className="filter-input-container">
              <input
                type="text"
                placeholder="Email"
                value={filters.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                className="filter-input"
              />
            </div>
          </div>

          {/* Date */}
          <div className="filter-field">
            <label className="filter-label">Date</label>
            <div className="filter-input-container">
              <input
                type="date"
                placeholder="Date"
                value={filters.dateJoined}
                onChange={(e) =>
                  handleInputChange("dateJoined", e.target.value)
                }
                className="filter-input"
              />
              <CalendarIcon className="filter-calendar-icon" />
            </div>
          </div>

          {/* Phone Number */}
          <div className="filter-field">
            <label className="filter-label">Phone Number</label>
            <div className="filter-input-container">
              <input
                type="text"
                placeholder="Phone Number"
                value={filters.phoneNumber}
                onChange={(e) =>
                  handleInputChange("phoneNumber", e.target.value)
                }
                className="filter-input"
              />
            </div>
          </div>

          {/* Status */}
          <div className="filter-field">
            <label className="filter-label">Status</label>
            <div className="filter-input-container">
              <select
                value={filters.status}
                onChange={(e) => handleInputChange("status", e.target.value)}
                className="filter-input"
              >
                {statusOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              <ChevronDownIcon className="filter-dropdown-icon" />
            </div>
          </div>

          {/* Buttons */}
          <div className="filter-buttons">
            <button className="reset-button" onClick={handleReset}>
              Reset
            </button>
            <button className="filter-button" onClick={handleFilter}>
              Filter
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterModal;
