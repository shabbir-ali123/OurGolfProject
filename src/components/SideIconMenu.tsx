import React, { useEffect, useState, useRef } from "react";
import {
  faHome,
  faGlobe,
  faHeart,
  faBell,
  faCog,
  faSignOutAlt,
  faSearch,
  faCalendar,
  faEnvelope,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useNavigate } from "react-router-dom";
interface MenuStyles {
  zIndex: string;
  height: string;
  width: string;
  // Add more properties as needed
}

interface MenuItemStyles {
  display: string;
  flexDirection: string;
  alignItems: string;
  marginBottom: string;
  cursor: string;
  borderBottom: string;
  width: string;
  height: string;
  // Add more properties as needed
}
const SideMenu: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState("Events");
  const [token, setToken] = useState("");
  const history = useNavigate();
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Check if a token exists in localStorage
    const storedToken = localStorage.getItem("token");

    // If a token exists, set it in the component state
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        // Click occurred outside the dropdown, close it
        setIsDropdownOpen(false);
      }
    };

    // Attach the event listener to the document
    document.addEventListener("mousedown", handleClickOutside);

    // Clean up the event listener when the component is unmounted
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleMenuMouseEnter = () => {
    setIsMenuOpen(true);
  };

  const handleMenuMouseLeave = () => {
    setIsMenuOpen(false);
    setIsDropdownOpen(false);
  };

  const handleDropdownClick = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleDropdownItemSelect = (item: string) => {
    setSelectedItem(item);
    setIsDropdownOpen(false);
  };

  const menuStyles: React.CSSProperties = {
    zIndex: "9999",
    height: "100vh",
    width: isMenuOpen ? "200px" : "40px",
    backgroundColor: "#17B3A6",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    position: "fixed",
    left: 0,
    top: 0,
    padding: "0px 0px",
    transition: "width 0.3s ease",
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

  const dropdownStyles: React.CSSProperties = {
    position: "relative",
    width: "100%",
    marginBottom: "20px",
    left: "20",
    top: "0",
    display: isMenuOpen ? "block" : "none",
  };

  const dropdownButtonStyles: React.CSSProperties = {
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
  };

  const dropdownListStyles: React.CSSProperties = {
    display: isDropdownOpen ? "block" : "none",
    position: "absolute",
    top: "100%",
    left: 0,
    backgroundColor: "white",
    width: "100%",
    border: "1px solid white",
    borderRadius: "5px",
    zIndex: 1000, // Ensure this value is higher than other elements
  };

  const dropdownItemStyles: React.CSSProperties = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    cursor: "pointer",
    width: "100%",
    height: "50px",
    color: "black",
  };

  return (
    <>
      {token ? (
        <div
          style={{
            ...menuStyles,
            ...(window.innerWidth <= 768 && { width: "40px" }),
          }}
          onMouseEnter={handleMenuMouseEnter}
          onMouseLeave={handleMenuMouseLeave}
        >
          <div className="absolute top-[8px] ">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="white"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="white"
              className="w-12 h-12 border border-[#51ff85] p-2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            </svg>
          </div>
          <Link to="/score-board" className="w-full ">
            <div
              style={{ ...menuItemStyles, ...(isMenuOpen && menuItemStyles) }}
            >
              <FontAwesomeIcon icon={faHome} style={iconStyles} />
              <span style={textStyles}>Home</span>
            </div>
          </Link>

          <div style={{ ...menuItemStyles, ...(isMenuOpen && menuItemStyles) }}>
            <FontAwesomeIcon icon={faBell} style={iconStyles} />
            <span style={textStyles}>Notifications</span>
          </div>
          <div style={{ ...menuItemStyles, ...(isMenuOpen && menuItemStyles) }}>
            <FontAwesomeIcon icon={faGlobe} style={iconStyles} />
            <span style={textStyles}>Posts</span>
          </div>
          {isMenuOpen ? ( // Show heart icon only when the menu is open
            <div style={dropdownStyles} ref={dropdownRef}>
              <div
                style={{
                  ...menuItemStyles,
                  ...dropdownButtonStyles,
                  ...(isMenuOpen && menuItemStyles),
                }}
                onClick={handleDropdownClick}
              >
                <div className="flex items-center gap-2">
                  <FontAwesomeIcon icon={faHeart} style={iconStyles} />
                  {isMenuOpen && (
                    <div className="flex gap-2 items-center">
                      <span style={textStyles}> {selectedItem}</span>
                      <svg
                        width="15"
                        height="9"
                        viewBox="0 0 15 9"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M7.29304 9L14.5861 1.71255L12.8723 -4.17232e-07L7.29312 5.56275L1.71417 -4.17232e-07L0.000301675 1.71255L7.29304 9Z"
                          fill="white"
                        />
                        <path
                          d="M7.29304 9L14.5861 1.71255L12.8723 -4.17232e-07L7.29312 5.56275L1.71417 -4.17232e-07L0.000301675 1.71255L7.29304 9Z"
                          fill="white"
                        />
                      </svg>
                    </div>
                  )}
                </div>

                <div className="py-4 px-2" style={dropdownListStyles}>
                  <div
                    className="shadow-md "
                    style={dropdownItemStyles}
                    onClick={() => handleDropdownItemSelect("Created Events")}
                  >
                    Created Events
                  </div>
                  <div
                    className="shadow-md "
                    style={dropdownItemStyles}
                    onClick={() => handleDropdownItemSelect("Joined Events")}
                  >
                    Joined Events
                  </div>
                </div>
              </div>
            </div>
          ) : (
            // Show only the heart icon when the menu is not open
            <div className="flex justify-center items-center border-b-2 border-solid border-white w-full py-2 my-4">
              <FontAwesomeIcon icon={faHeart} style={iconStyles} />
            </div>
          )}
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
      ) : (
        <div
          style={{
            ...menuStyles,
            ...(window.innerWidth <= 768 && { width: "40px" }),
          }}
          onMouseEnter={handleMenuMouseEnter}
          onMouseLeave={handleMenuMouseLeave}
        >
          <div className="absolute top-[8px] ">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="white"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="white"
              className="w-12 h-12 border border-[#51ff85] p-2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            </svg>
          </div>
          <Link to="/score-board" className="w-full ">
            <div
              style={{ ...menuItemStyles, ...(isMenuOpen && menuItemStyles) }}
            >
              <FontAwesomeIcon icon={faHome} style={iconStyles} />
              <span style={textStyles}>Home</span>
            </div>
          </Link>

          <div style={{ ...menuItemStyles, ...(isMenuOpen && menuItemStyles) }}>
            <FontAwesomeIcon icon={faBell} style={iconStyles} />
            <span style={textStyles}>Notifications</span>
          </div>
          <div style={{ ...menuItemStyles, ...(isMenuOpen && menuItemStyles) }}>
            <FontAwesomeIcon icon={faGlobe} style={iconStyles} />
            <span style={textStyles}>Posts</span>
          </div>
          {isMenuOpen ? ( // Show heart icon only when the menu is open
            <div style={dropdownStyles} ref={dropdownRef}>
              <div
                style={{
                  ...menuItemStyles,
                  ...dropdownButtonStyles,
                  ...(isMenuOpen && menuItemStyles),
                }}
                onClick={handleDropdownClick}
              >
                <Link to="/event-main-page" className="-m-1.5 p-1">
                  <div className="flex items-center gap-2">
                    <FontAwesomeIcon icon={faHeart} style={iconStyles} />
                    {isMenuOpen && (
                      <div className="flex gap-2 items-center">
                        <span style={textStyles}> {selectedItem}</span>
                      </div>
                    )}
                  </div>
                </Link>
              </div>
            </div>
          ) : (
            // Show only the heart icon when the menu is not open
            <div className="flex justify-center items-center border-b-2 border-solid border-white w-full py-2 my-4">
              <FontAwesomeIcon icon={faHeart} style={iconStyles} />
            </div>
          )}
          <div style={{ ...menuItemStyles, ...(isMenuOpen && menuItemStyles) }}>
            <FontAwesomeIcon icon={faSearch} style={iconStyles} />
            <span style={textStyles}>Find a teacher</span>
          </div>
          <div style={{ ...menuItemStyles, ...(isMenuOpen && menuItemStyles) }}>
            <FontAwesomeIcon icon={faSignOutAlt} style={iconStyles} />
            <span style={textStyles}>Sign Up</span>
          </div>
        </div>
      )}
    </>
  );
};

export default SideMenu;
