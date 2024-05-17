import React, { useEffect, useState, useRef } from "react";
import {
  faHome,
  faGlobe,
  faBell,
  faUser,
  faCalendar,
  faUserFriends,
  faMessage,
  faPeopleGroup,
  faSearch,
  faGear,
  faSignOutAlt,
  faChevronDown,
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { notificationsContextStore } from "../contexts/notificationContext";
import socket from "../socket";

export const menuItems: MenuItem[] = [
  {
    name: "HOME",
    icon: faHome,
    path: "/",
    active: false,
  },
  {
    name: "NOTIFICATIONS",
    icon: faBell,
    path: "/notification-page",
    properties: true,
    active: false,
  },
  {
    name: "POSTS",
    icon: faGlobe,
    path: "/post-page",
    active: false,
  },
  {
    name: "EVENTS",
    icon: faPeopleGroup,
    path: "/event-main-page",
    active: false,
    subItems: [
      {
        name: "CREATED_EVENTS",
        icon: faSearch,
        path: "/created-events",
        active: false,
      },
      {
        name: "JOINED_EVENTS",
        icon: faSearch,
        path: "/joined-events",
        active: false,
      },
      {
        name: "COMPLETED_EVENTS",
        icon: faSearch,
        path: "/completed-events",
        active: false,
      },
      {
        name: "BOOKMARKED_EVENTS",
        icon: faSearch,
        path: "/booked-mark",
        active: false,
      },
    ],
  },
  // {
  //   name: "FIND_TEACHER",
  //   icon: faSearch,
  //   path: "/student-page",
  //   active: false,
  // },
  {
    name: "FIND_TEACHER",
    icon: faSearch,
    path: "/all-teachers",
    active: false,
    subItems: [
      {
        name: "TEACHER",
        icon: faSearch,
        path: "/teacher-activities-page",
        active: false,
      },
      {
        name: "STUDENT",
        icon: faSearch,
        path: "/student-activties-page",
        active: false,
      },
      {
        name: "APPOINTMENTS",
        icon: faSearch,
        path: "/appointments",
        active: false,
      },
   
    ],
  },
  // {
  //   name: "CALENDER",
  //   icon: faCalendar,
  //   path: "/activties-page",
  // },
  {
    name: "PROFILE",
    icon: faUser,
    path: "/profile-page",
    active: false,
  },
  {
    name: "MESSAGE",
    icon: faMessage,
    path: "/message-page",
    active: false,
  },
  {
    name: "SETTING",
    icon: faGear,
    path: "/setting-page",
    active: false,
  },
  {
    name: "LOGOUT",
    icon: faSignOutAlt,
    path: "/logout",
    active: false,
  },
];
interface MenuItem {
  name: string;
  icon: any;
  path: string;
  active?: boolean;
  subItems?: Array<MenuItem>;
  properties?: any;
}


const SideMenu: React.FC = () => {
  const { t, i18n } = useTranslation();
  document.body.dir = i18n.dir();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [subMenuVisibility, setSubMenuVisibility] = useState<{
    [key: string]: boolean;
  }>({});
  const [isDesktopScreen, setIsDesktopScreen] = useState(
    window.innerWidth > 768
  );

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

  const handleMenuItemClick = (itemName: string) => {
    setIsDropdownOpen(false);

    Object.keys(subMenuVisibility).forEach((key) => {
      if (key !== itemName) {
        setSubMenuVisibility((prevVisibility) => ({
          ...prevVisibility,
          [key]: false,
        }));
      }
    });

    setSubMenuVisibility((prevVisibility) => ({
      ...prevVisibility,
      [itemName]: !prevVisibility[itemName],
    }));
  };

  const getMenuItemStyles = (
    itemName: string,
    itemPath: string
  ): React.CSSProperties => ({
    display: "flex",
    cursor: "pointer",
    borderBottom: "1px solid #ffff",
    background:
      window.location.pathname === itemPath
        ? "black "
        : "transparent",
    borderRadius: window.location.pathname === itemPath ? "4px" : "",
    boxShadow:
      window.location.pathname === itemPath
        ? "0 0 10px 1px rgb(94 243 231)"
        : "",
    alignItems: "center",
    color: "#fff",
    marginBottom: isMenuOpen && subMenuVisibility[itemName] ? "10px" : "0", // Adjust this value as needed
  });

  const iconStyles = (
    itemName: string,
    itemPath: string
  ): React.CSSProperties => ({
    fontSize: "20px",
    color: window.location.pathname === itemPath ? "#fff" : "#fff",
  });

  const textStyles = (
    itemName: string,
    itemPath: string
  ): React.CSSProperties => ({
    fontSize: "15px",
    color: window.location.pathname === itemPath ? "#fff" : "#fff",
    visibility: isMenuOpen ? "visible" : "hidden",
    transition: "visibility 0.3s ease",
    marginLeft: "10px", // Adjust this value as needed
  });

  const small: any = {
    padding: "20px",
    width: "16px",
    margin: "0px 0px 0px -26px",
    borderRadius: "10px",
  };

  const big: React.CSSProperties = {
    padding: "10px 0px 10px 10px",
    margin: "10px 10px 50px 10px",
  };

  useEffect(() => {
    const handleResize = () => {
      setIsDesktopScreen(window.innerWidth > 1300);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  const { notifications,filteredNotifications } = notificationsContextStore();



  return (
    <>
      <div
        style={{
          zIndex: "10",
          width: isMenuOpen ? "300px" : "50px",
          height: isMenuOpen ? "100vh" : "100vh",
          backgroundColor: "#17b3a6",
          color: "white",
          boxShadow: "0px 0px 13px rgba(0, 0, 0, 0.15)",
          display: isDesktopScreen ? "flex" : "none",
          flexDirection: "column",
          alignItems: "center",
          position: "fixed",
          left: 0,
          top: 0,
          transition: "width 0.3s ease",
          overflowY: isMenuOpen ? "auto" : "hidden",
          overflowX: isMenuOpen ? "hidden" : "hidden",
        }}
        className=""
        onMouseEnter={handleMenuMouseEnter}
        onMouseLeave={handleMenuMouseLeave}
      >
        <div className="absolute top-[0] ">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="white"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="#fff"
            className="w-10 h-10 border border-[#51ff85] p-2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
            />
          </svg>
        </div>
        <div
          className="mt-24 w-full"
          style={{ width: isMenuOpen ? "" : "10px" }}
        >
          {menuItems.map((item) => (
            <ul
              key={item.name}
              className={`p-0 ${item.active ? "active w-full" : ""} ${
                subMenuVisibility ? "mb-0" : ""
              }`}
            >
              <Link
                to={item.path}
                className={`relative ${item.active ? "active" : ""}`}
                style={
                  item.active
                    ? {
                        backgroundColor: "#000",
                        color: "#fff",
                        fontWeight: "900",
                        borderRadius: "2px",
                      }
                    : {}
                }
                onClick={() => handleMenuItemClick(item.name)}
              >
                {item.properties && (
                  <div className="absolute px-1 text-sm text-center text-white bg-teal-500 rounded-full top-[9px] left-1">
                      {/* {n.length > 0 && n.length} */}
                  {filteredNotifications?.length + notifications?.length}
                    <div className="absolute top-0 w-full h-full bg-teal-200 rounded-full start-0 -z-10 animate-ping"></div>
                  </div>
                )}
                <div
                  style={{
                    ...getMenuItemStyles(item.name, item.path),
                    ...(isMenuOpen ? big : small),
                  }}
                >
                  <FontAwesomeIcon
                    icon={item.icon}
                    style={iconStyles(item.name, item.path)}
                  />
                  <span
                    className={` ${isMenuOpen ? "block" : "hidden"}`}
                    style={textStyles(item.name, item.path)}
                  >
                    {t(item.name)}
                  </span>
                  {item.subItems && (
                    <FontAwesomeIcon
                      icon={
                        subMenuVisibility[item.name] && item.subItems
                          ? faChevronDown
                          : faChevronRight
                      }
                      style={iconStyles(item.name, item.path)}
                      className={`h-3 ml-auto mr-6 ${
                        isMenuOpen ? "block" : "hidden"
                      }`}
                    />
                  )}
                </div>
              </Link>
              {subMenuVisibility[item.name] && item.subItems && (
                <div className={`${isMenuOpen ? "block" : "hidden"}`}>
                  {item.subItems.map((subItem) => (
                    <li className="mx-2">
                      <Link
                        to={subItem.path}
                        className="w-full"
                        key={subItem.name}
                      >
                        <div
                          className="bg-white rounded-md shadow-lg mt-2 px-6 py-4 text-[black]"
                          style={{
                            boxShadow:
                              "rgba(14, 30, 37, 0.12) 0px 2px 4px 0px, rgba(14, 30, 37, 0.32) 0px 2px 16px 0px",
                          }}
                        >
                          <span style={{ marginLeft: "30px" }}>
                            {t(subItem.name)}
                          </span>
                        </div>
                      </Link>
                    </li>
                  ))}
                </div>
              )}
            </ul>
          ))}
        </div>
      </div>
    </>
  );
};

export default SideMenu;
