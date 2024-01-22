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
import { useTranslation } from "react-i18next";
interface MenuStyles {
  zIndex: string;
  height: string;
  width: string;
  // Add more properties as needed
}

const SideMenu: React.FC = () => {
  const { t, i18n } = useTranslation();
  document.body.dir = i18n.dir();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState("Events");
  const [token, setToken] = useState("");
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
        setIsDropdownOpen(false);
      }
    };

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
    backgroundColor: "#054a51",
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
    fontSize: "20px",
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
    left: "20",
    top: "0",
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
    zIndex: 1000,
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
     
        <div
          style={{
            ...menuStyles,
            ...(window.innerWidth <= 768 && { width: "40px" }),
          }}
          onMouseEnter={handleMenuMouseEnter}
          onMouseLeave={handleMenuMouseLeave}
        >
          <div className="absolute top-[0]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="white"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="white"
              className="w-10 h-10 border border-[#51ff85] p-2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            </svg>
          </div>
          <div className="mt-24" style={{ width: isMenuOpen ? "100%" : "36px" }}>
            <Link to="/score-board" className="w-full ">
              <div
                style={{ ...menuItemStyles, ...(isMenuOpen && menuItemStyles) }}
              >
                <FontAwesomeIcon  icon={faHome} style={iconStyles} />
                <span style={textStyles}>{t("HOME")}</span>
              </div>
            </Link>
            <Link to="/notification" className="w-full ">
              <div
                style={{ ...menuItemStyles, ...(isMenuOpen && menuItemStyles) }}
              >
                <FontAwesomeIcon icon={faBell} style={iconStyles} />
                <span style={textStyles}>{t("NOTIFICATIONS")}</span>
              </div>
            </Link>
            <Link to="/post-page" className="w-full ">
              <div
                style={{ ...menuItemStyles, ...(isMenuOpen && menuItemStyles) }}
              >
                <FontAwesomeIcon icon={faGlobe} style={iconStyles} />
                <span style={textStyles}>{t("POSTS")}</span>
              </div>
            </Link>

            <div style={dropdownStyles} ref={dropdownRef}>
              <div
                style={{
                  ...menuItemStyles,
                  ...dropdownButtonStyles,
                  ...(isMenuOpen && menuItemStyles),
                }}
                onClick={handleDropdownClick}
              >
                <FontAwesomeIcon icon={faHeart} style={iconStyles} />
                <div className="text-center mt-[-4px]">
                  {isMenuOpen && (
                    <div className="flex items-center gap-2">
                      <span style={textStyles}>
                        {" "}
                        {t(selectedItem.toLocaleUpperCase())}
                      </span>
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

                <div className="px-2 py-4" style={dropdownListStyles}>
                  <div
                    className="shadow-md text-start"
                    style={dropdownItemStyles}
                    onClick={() => handleDropdownItemSelect("Created Events")}
                  >
                    {t("CREATED_EVENTS")}
                  </div>
                  <Link to="/joined-events">
                    <div
                      className="shadow-md text-start"
                      style={dropdownItemStyles}
                      onClick={() => handleDropdownItemSelect("Joined Events")}
                    >
                      {t("JOINED_EVENTS")}
                    </div>
                  </Link>
                  <Link to="/booked-mark">
                    <div
                      className="shadow-md text-start"
                      style={dropdownItemStyles}
                      onClick={() =>
                        handleDropdownItemSelect("BookMarked Events")
                      }
                    >
                      {t("BOOKMARKED_EVENTS")}
                    </div>
                  </Link>
                </div>
              </div>
            </div>
            <Link to="/student-page" className="w-full ">
              <div
                style={{ ...menuItemStyles, ...(isMenuOpen && menuItemStyles) }}
              >
                <FontAwesomeIcon icon={faSearch} style={iconStyles} />
                <span className="" style={textStyles}>
                  {t("FIND_TEACHER")}
                </span>
              </div>
            </Link>
            <Link to="/calender" className="w-full ">
              <div
                style={{ ...menuItemStyles, ...(isMenuOpen && menuItemStyles) }}
              >
                <FontAwesomeIcon icon={faCalendar} style={iconStyles} />
                <span style={textStyles}>{t("CALENDER")}</span>
              </div>
            </Link>
            <Link to="/profile-page" className="w-full ">
              <div
                style={{ ...menuItemStyles, ...(isMenuOpen && menuItemStyles) }}
              >
                <FontAwesomeIcon icon={faUser} style={iconStyles} />
                <span style={textStyles}>{t("PROFILE")}</span>
              </div>
            </Link>
            <Link to="/message-page" className="w-full ">
              <div
                style={{ ...menuItemStyles, ...(isMenuOpen && menuItemStyles) }}
              >
                <FontAwesomeIcon icon={faEnvelope} style={iconStyles} />
                <span style={textStyles}>{t("MESSAGE")}</span>
              </div>
            </Link>
            <Link to="/setting-page" className="w-full ">
              <div
                style={{ ...menuItemStyles, ...(isMenuOpen && menuItemStyles) }}
              >
                <FontAwesomeIcon icon={faCog} style={iconStyles} />
                <span style={textStyles}>{t("SETTING")}</span>
              </div>
            </Link>
            <Link to="/logout" className="w-full ">
              <div
                style={{ ...menuItemStyles, ...(isMenuOpen && menuItemStyles) }}
              >
                <FontAwesomeIcon icon={faSignOutAlt} style={iconStyles} />
                <span style={textStyles}>{t("LOGOUT")}</span>
              </div>
            </Link>
          </div>
        </div>
      
    </>
  );
};

export default SideMenu;
