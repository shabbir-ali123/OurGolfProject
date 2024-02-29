import React, { useEffect, useState } from "react";
import { Dialog } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { Link, useLocation } from "react-router-dom";
import ProfileButton from "../components/ProfileButton";
import { useTranslation } from "react-i18next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell, faCalendar } from "@fortawesome/free-solid-svg-icons";
import socket from "../socket";
import { NotificationsContext } from "../contexts/notification";

const navigation = [
  { name: "Home", to: "/score-board" },
  { name: "Find_teacher", to: "/student-page" },
  { name: "Events", to: "/event-main-page" },
  { name: "Posts", to: "/post-page" },
];

const sideMenuItems = [
  { name: "Notifications", to: "/notification", icon: faBell },
  { name: "Calendar", to: "/Schedule-page", icon: faCalendar },
  { name: "Message", to: "/notification", icon: faBell },
  { name: "Profile", to: "/calendar-page", icon: faCalendar },
  { name: "Setting", to: "/setting-page", icon: faBell },
  { name: "Logout", to: "/logout", icon: faCalendar },
];

const Header: React.FC = () => {
  const { t, i18n } = useTranslation();
  document.body.dir = i18n.dir();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: any) => {
    return location.pathname === path;
  };

  return (
    <div>
      <header className="mx-20 my-4 overflow-hidden text-black bg-white shadow-[0px_0px_13px_rgba(0,_0,_0,_0.25)]">
        <nav
          className="flex items-center justify-between py-2 lg:px-32"
          aria-label="Global"
        >
          <div className="flex lg:flex-1">
            <Link to="/event-main-page" className="-m-1.5 p-1"></Link>
          </div>

          <div className="flex gap-x-12">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.to}
                className={`text-2xl list-none no-underline font-normal leading-6 text-black hover:text-teal-400 ${
                  isActive(item.to) ? "active" : ""
                }`}
                style={
                  isActive(item.to)
                    ? {
                        background: "rgb(67 188 176)",
                        color: "#ffffff",
                        fontWeight: "400",
                        borderRadius: "5px",
                        padding: "2px 6px",
                      }
                    : {}
                }
              >
                {t(item.name.toLocaleUpperCase())}
              </Link>
            ))}
          </div>
          <div className=" lg:flex lg:flex-1 lg:justify-end">
            <NotificationsContext>
              <ProfileButton />
            </NotificationsContext>
          </div>
        </nav>
      </header>
    </div>
  );
};

export default Header;
