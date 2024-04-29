import React, { useEffect, useState } from "react";
import { Dialog } from "@headlessui/react";
import { Bars3Icon, XMarkIcon, HomeIcon, UserGroupIcon, CalendarIcon, ClipboardIcon,LockClosedIcon, InformationCircleIcon } from "@heroicons/react/24/solid";
import { Link, useLocation } from "react-router-dom";
import ProfileButton from "../components/ProfileButton";
import { useTranslation } from "react-i18next";
import socket from "../socket";
import MobileMenu from "./MobileMenu";

export const navigation = [
  { name: "Home", to: "/", icon: HomeIcon },
  { name: "Find_teacher", to: "/all-teachers", icon: UserGroupIcon },
  { name: "Events", to: "/event-main-page", icon: CalendarIcon },
  { name: "Posts", to: "/post-page", icon: ClipboardIcon },
  { name: "PRIVACY_POLICY", to: "https://info.golf-encounters.com/%e3%83%97%e3%83%a9%e3%82%a4%e3%83%90%e3%82%b7%e3%83%bc%e3%83%9d%e3%83%aa%e3%82%b7%e3%83%bc/", icon: LockClosedIcon },
  { name: "COMPANY_INFO", to: "https://info.golf-encounters.com/%e7%89%b9%e5%ae%9a%e5%95%86%e5%8f%96%e5%bc%95%e6%b3%95%e3%81%ab%e5%9f%ba%e3%81%a5%e3%81%8f%e8%a1%a8%e8%a8%98/", icon: InformationCircleIcon },
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
          className="flex justify-between  gap-x-12  px-4 py-2  lg:items-center xl:px-12 sm:justify-start"
          aria-label="Global"
        >
          <button onClick={toggleMenu} className="mr-4 lg:hidden">
            {mobileMenuOpen ? <XMarkIcon className="w-6 h-6" /> : <Bars3Icon className="w-6 h-6" />}
          </button>

          <div className="hidden gap-x-6 lg:flex items-center">
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
