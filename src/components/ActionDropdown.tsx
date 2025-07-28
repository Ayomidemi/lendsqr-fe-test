import React from "react";
import { ViewIcon, UsersIcon, DeleteIcon } from "./Icons";
import "../styles/ActionDropdown.scss";

interface ActionDropdownProps {
  isOpen: boolean;
  onClose: () => void;
  position: { x: number; y: number };
  onViewDetails: () => void;
  onBlacklistUser: () => void;
  onActivateUser: () => void;
}

const ActionDropdown: React.FC<ActionDropdownProps> = ({
  isOpen,
  onClose,
  position,
  onViewDetails,
  onBlacklistUser,
  onActivateUser,
}) => {
  if (!isOpen) return null;

  return (
    <div className="action-dropdown-overlay" onClick={onClose}>
      <div
        className="action-dropdown"
        style={{ left: position.x, top: position.y }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="action-item" onClick={onViewDetails}>
          <ViewIcon className="action-icon" />
          <span className="action-text">View Details</span>
        </div>

        <div className="action-item" onClick={onBlacklistUser}>
          <DeleteIcon className="action-icon" />
          <span className="action-text">Blacklist User</span>
        </div>

        <div className="action-item" onClick={onActivateUser}>
          <UsersIcon className="action-icon" />
          <span className="action-text">Activate User</span>
        </div>
      </div>
    </div>
  );
};

export default ActionDropdown;
