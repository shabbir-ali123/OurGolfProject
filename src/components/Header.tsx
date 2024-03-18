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
import MobileMenu from "./MobileMenu";

export const navigation = [
  { name: "Home", to: "/score-board" },
  { name: "Find_teacher", to: "/all-teachers" },
  { name: "Events", to: "/event-main-page" },
  { name: "Posts", to: "/post-page" },
];

const Header: React.FC = () => {
  const { t, i18n } = useTranslation();
  document.body.dir = i18n.dir();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  let userId = localStorage.getItem('id');
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

  const [eventJoined, setEventJoined] = useState<any>()
  useEffect(() => {
    const handleJoinEvent = (data: any) => {
      console.log(data, 'daya for sockets')
      if (data?.organizerId === userId) {
        setEventJoined(data); 

    }
    };
    socket.on('joinRequest', handleJoinEvent);

    return () => {
      socket.off('joinRequest', handleJoinEvent);
    };
  }, []); 

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
            
         

          <div className="hidden gap-x-6 lg:flex xl:gap-x-16">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.to}
                className={`text-2xl list-none no-underline font-normal leading-6 text-[#717171] hover:text-teal-400 ${
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
            {eventJoined !== undefined &&
              <p className="sdc">{eventJoined.organizerId}</p>
            }
          </div>
          <div className="hidden lg:block lg:flex-1 lg:justify-end">
              <ProfileButton />
          </div>

          <MobileMenu isOpen={isMenuOpen} onClose={toggleMenu} />

          {/* {mobileMenuOpen && (
            <div className="lg:hidden">
              <div className="flex flex-col items-center p-4">
              <div className="">
              <button onClick={toggleMenu}>
menu
              </button>

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
          )} */}
        </nav>
      </header>
    </div>
  );
};

export default Header;
