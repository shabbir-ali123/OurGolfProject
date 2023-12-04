import React, { useState } from "react";
import {
  faHome,
  faGlobe,
  faHeart,
  faBell,
  faEdit,
  faCog,
  faSignOutAlt,
  faSearch,
  faCalendar,
  faEnvelope,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const SideMenu: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuStyles: React.CSSProperties = {
    height: "100vh",
    width: isMenuOpen ? "150px" : "40px",
    backgroundColor: "#17B3A6",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    position: "fixed",
    left: 0,
    top: 0,
    padding: "40px 0px",
    transition: "width 0.3s ease",
  };
  const mediaQueryStyles: React.CSSProperties = {
    width: "0px", // Set the width to 40px for small screens
  };
  const menuItemStyles: React.CSSProperties = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginBottom: "20px",
    cursor: "pointer",
    borderBottom: "1px solid #ffff",
    width: "100%",
    height: "50px",
  };

  const iconStyles: React.CSSProperties = {
    fontSize: "24px",
    color: "white",
    marginBottom: "5px",
  };

  const textStyles: React.CSSProperties = {
    fontSize: "14px",
    color: "white",
    visibility: isMenuOpen ? "visible" : "hidden",
    transition: "visibility 0.3s ease",
  };

  return (
    <div
      style={{
        ...menuStyles,
        ...(window.innerWidth <= 768 && mediaQueryStyles),
      }}
      onMouseEnter={() => setIsMenuOpen(true)}
      onMouseLeave={() => setIsMenuOpen(false)}
    >
      <div className="absolute top-[8px]">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="white"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="white"
          className="w-12 h-12 border border-[#51ff85] p-2"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
          />
        </svg>
      </div>
      <div style={{ ...menuItemStyles, ...(isMenuOpen && menuItemStyles) }}>
        <FontAwesomeIcon icon={faHome} style={iconStyles} />
        <span style={textStyles}>Home</span>
      </div>
      <div style={{ ...menuItemStyles, ...(isMenuOpen && menuItemStyles) }}>
        <FontAwesomeIcon icon={faBell} style={iconStyles} />
        <span style={textStyles}>Notifications</span>
      </div>
      <div style={{ ...menuItemStyles, ...(isMenuOpen && menuItemStyles) }}>
        <FontAwesomeIcon icon={faGlobe} style={iconStyles} />
        <span style={textStyles}>Posts</span>
      </div>
      <div style={{ ...menuItemStyles, ...(isMenuOpen && menuItemStyles) }}>
        <FontAwesomeIcon icon={faHeart} style={iconStyles} />
        <span style={textStyles}>Events</span>
      </div>
      <div style={{ ...menuItemStyles, ...(isMenuOpen && menuItemStyles) }}>
        <FontAwesomeIcon icon={faSearch} style={iconStyles} />
        <span style={textStyles}>Find a teacher</span>
      </div>
      <div style={{ ...menuItemStyles, ...(isMenuOpen && menuItemStyles) }}>
        <FontAwesomeIcon icon={faCalendar} style={iconStyles} />
        <span style={textStyles}>Calendar</span>
      </div>
      <div style={{ ...menuItemStyles, ...(isMenuOpen && menuItemStyles) }}>
        <FontAwesomeIcon icon={faUser} style={iconStyles} />
        <span style={textStyles}>Profile</span>
      </div>
      <div style={{ ...menuItemStyles, ...(isMenuOpen && menuItemStyles) }}>
        <FontAwesomeIcon icon={faEnvelope} style={iconStyles} />
        <span style={textStyles}>Message</span>
      </div>
      <div style={{ ...menuItemStyles, ...(isMenuOpen && menuItemStyles) }}>
        <FontAwesomeIcon icon={faCog} style={iconStyles} />
        <span style={textStyles}>Setting</span>
      </div>
      <div style={{ ...menuItemStyles, ...(isMenuOpen && menuItemStyles) }}>
        <FontAwesomeIcon icon={faSignOutAlt} style={iconStyles} />
        <span style={textStyles}>Logout</span>
      </div>
    </div>
  );
};

export default SideMenu;
