import React, { useEffect, useState } from "react";
import { Dialog } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { Link, useLocation } from "react-router-dom";
import ProfileButton from "../components/ProfileButton";
import { useTranslation } from "react-i18next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell, faCalendar } from "@fortawesome/free-solid-svg-icons";
import socket from "../socket";
import { NotificationsContext } from "../contexts/notificationContext";

const navigation = [
  { name: "Home", to: "/score-board" },
  { name: "Find_teacher", to: "/student-page" },
  { name: "Events", to: "/event-main-page" },
  { name: "Posts", to: "/post-page" },
];

const Header: React.FC = () => {
  const { t, i18n } = useTranslation();
  document.body.dir = i18n.dir();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: any) => {
    return location.pathname === path;
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <div>
      <header className="mx-4 sm:mx-20 my-4 overflow-hidden text-black bg-white shadow-[0px_0px_13px_rgba(0,_0,_0,_0.25)]">
        <nav
          className="flex justify-between px-4 py-2 sm:items-end lg:items-center sm:px-32"
          aria-label="Global"
        >
          <div className="flex items-center lg:flex-1">
            <button onClick={toggleMobileMenu} className="mr-4 lg:hidden">
              {mobileMenuOpen ? <XMarkIcon className="w-6 h-6" /> : <Bars3Icon className="w-6 h-6" />}
            </button>
            <Link to="/event-main-page" className="-m-1.5 p-1"></Link>
          </div>

          <div className="hidden lg:flex gap-x-12">
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
          <div className="hidden lg:block lg:flex-1 lg:justify-end">
            <NotificationsContext>
              <ProfileButton />
            </NotificationsContext>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="lg:hidden">
              <div className="flex flex-col items-center p-4">
              <div className="">
            <NotificationsContext>
              <ProfileButton />
            </NotificationsContext>
          </div>
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    to={item.to}
                    className={`text-xl list-none no-underline font-normal leading-6 text-black hover:text-teal-400 mb-4 ${
                      isActive(item.to) ? "active" : ""
                    }`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {t(item.name.toLocaleUpperCase())}
                  </Link>
                ))}
               
              </div>
            </div>
          )}
        </nav>
      </header>
    </div>
  );
};

export default Header;
