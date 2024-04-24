import React, { useEffect, useState } from "react";
import { Dialog } from "@headlessui/react";
import { Bars3Icon, XMarkIcon, HomeIcon, UserGroupIcon, CalendarIcon, ClipboardIcon } from "@heroicons/react/24/solid";
import { Link, useLocation } from "react-router-dom";
import ProfileButton from "../components/ProfileButton";
import { useTranslation } from "react-i18next";
import socket from "../socket";
import MobileMenu from "./MobileMenu";

export const navigation = [
  { name: "Home", to: "/home-page", icon: HomeIcon },
  { name: "Find_teacher", to: "/all-teachers", icon: UserGroupIcon },
  { name: "Events", to: "/event-main-page", icon: CalendarIcon },
  { name: "Posts", to: "/post-page", icon: ClipboardIcon },
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
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };


  return (
    <div>
      <header className="mx-4 sm:mx-20 my-4 overflow-hidden text-[#717171] bg-white shadow-[0px_0px_13px_rgba(0,_0,_0,_0.25)]">
        <nav
          className="flex justify-between px-4 py-2  lg:items-center xl:px-32 sm:justify-start"
          aria-label="Global"
        >
          <button onClick={toggleMenu} className="mr-4 lg:hidden">
            {mobileMenuOpen ? <XMarkIcon className="w-6 h-6" /> : <Bars3Icon className="w-6 h-6" />}
          </button>

          <div className="hidden gap-x-6 lg:flex items-center xl:gap-x-16">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.to}
                className={`flex items-center text-2xl list-none no-underline font-normal leading-6 text-[#717171] hover:text-teal-400 ${isActive(item.to) ? "active" : ""}`}
                style={isActive(item.to) ? {
                  background: "rgb(67 188 176)",
                  color: "#ffffff",
                  fontWeight: "400",
                  borderRadius: "5px",
                  padding: "2px 6px",
                } : {}}
              >
                <item.icon className="w-6 h-6 mr-2" />
                {t(item.name.toLocaleUpperCase())}
              </Link>
            ))}
          
          </div>
          <div className="hidden lg:block lg:flex-1 lg:justify-end">
            <ProfileButton />
          </div>

          <MobileMenu isOpen={isMenuOpen} onClose={toggleMenu} />
        </nav>
      </header>
    </div>
  );
};

export default Header;
