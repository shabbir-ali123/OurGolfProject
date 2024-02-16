import React, { useState } from "react";
import { Dialog } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { Link, useLocation } from "react-router-dom";
import ProfileButton from "../components/ProfileButton";
import { useTranslation } from "react-i18next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell, faCalendar } from "@fortawesome/free-solid-svg-icons";

const navigation = [
  { name: "Home", to: "/score-board" },
  { name: "Find_teacher", to: "/student-page" },
  { name: "Events", to: "/event-main-page" },
  { name: "Posts", to: "/post-page" },
];

const sideMenuItems = [
  { name: "Notifications", to: "/notification", icon: faBell },
  { name: "Calendar", to: "/calendar-page", icon: faCalendar },
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


  const isActive = (path:any) => {
    return location.pathname === path;
  };

  return (
    <div>
      <header className="mx-20 my-4 overflow-hidden text-black bg-white shadow">
        <nav className="flex items-center justify-between py-2 lg:px-32" aria-label="Global">
          <div className="flex lg:flex-1">
            <Link to="/event-main-page" className="-m-1.5 p-1">
             
            </Link>
          </div>
          <div className="flex lg:hidden">
            <button
              type="button"
              className="inline-flex items-center justify-center p-1 mr-2 text-gray-700 rounded-md"
              onClick={() => setMobileMenuOpen(true)}
            >
              <span className="sr-only">Open main menu</span>
              <Bars3Icon className="w-6 h-6" aria-hidden="true" />
            </button>
          </div>
          <div className="hidden lg:flex lg:gap-x-12">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.to}
                className={`text-2xl list-none no-underline font-normal leading-6 text-black hover:text-teal-400 ${isActive(item.to) ? "active" : ""}`}
                style={isActive(item.to) ? { background: "rgb(67 188 176)", color: "#ffffff", fontWeight: "400", borderRadius: "5px", padding: "2px 6px" } : {}}
              >
                {t(item.name.toLocaleUpperCase())}
              </Link>
            ))}
          </div>
          <div className="hidden lg:flex lg:flex-1 lg:justify-end">
            <ProfileButton />
          </div>
        </nav>
        <Dialog as="div" className="lg:hidden" open={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)}>
          <div className="fixed inset-0 z-10" />
          <Dialog.Panel className="fixed inset-y-0 right-0 z-10 w-full px-6 py-6 overflow-y-auto bg-white sm:max-w-sm sm:ring-1 sm:ring-gray-900/10 lg:hidden">
            <div className="flex items-center justify-between">
              <Link to="/" className="ml-10 lg:ml-0 md:ml-0 p-1.5">
                {/* Your logo here */}
              </Link>
              <button
                type="button"
                className="-m-2.5 rounded-md p-2.5 text-gray-700"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="sr-only">Close menu</span>
                <XMarkIcon className="w-6 h-6" aria-hidden="true" />
              </button>
            </div>
            <div className="flow-root mt-6 ml-14 lg:ml-0 md:ml-0">
              <div className="-my-6 divide-y divide-gray-500/10">
                <div className="py-6 space-y-2">
                  {navigation.concat(sideMenuItems).map((item) => (
                    <Link
                      key={item.name}
                      to={item.to}
                      className={`-mx-3 block text-2xl list-none no-underline font-normal leading-6 text-black ${isActive(item.to) ? "active" : ""}`}
                    >
                      
                      {item.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </Dialog.Panel>
        </Dialog>
      </header>
    </div>
  );
};

export default Header;
