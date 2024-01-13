import React, { useEffect, useState } from "react";
import { Dialog } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { Link, useLocation, useNavigate } from "react-router-dom";
import ProfileButton from "../components/ProfileButton";
import { useTranslation } from "react-i18next";

const navigation = [
  { name: "Home", to: "/score-board", active: false },
  { name: "Posts", to: "/post-page", active: false },
  { name: "Events", to: "/event-main-page", active: false },
  { name: "Find_teacher", to: "/student-page", active: false },
];

const Header: React.FC = () => {
  const [token, setToken] = useState("");
  const history = useNavigate();
  const { t, i18n } = useTranslation();
  document.body.dir = i18n.dir();
  useEffect(() => {
    const storedToken = localStorage.getItem("token");

    if (storedToken) {
      setToken(storedToken);
    }
  });
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const teacher_id = localStorage.getItem("teacher_id");

  const location = useLocation();

  navigation.forEach((item) => {
    if (item.to === "/event-main-page" || item.to === "/create-event") {
      item.active =
        location.pathname.startsWith("/event") ||
        location.pathname.startsWith("/create-event") ||
        location.pathname === "/";
    } else if (item.to === "/student-page" || item.to === "/teacher-page") {
      item.active =
        location.pathname.startsWith("/student-page") ||
        location.pathname.startsWith("/teacher-page");
    } else {
      item.active = item.to === location.pathname;
    }
  });
  const findTeacherItem = navigation.find(
    (item) => item.name === "Find_teacher"
  );
  if (findTeacherItem) {
    if (findTeacherItem.active) {
      if (teacher_id) {
        findTeacherItem.to = "/teacher-page";
      } else {
        findTeacherItem.to = "/student-page";
      }
    }
  }

  return (
    <div>
      {token ? (
        <header className="bg-[#1AA75D] overflow-hidden ">
          <nav
            className="flex items-center justify-between py-2 lg:px-32 "
            aria-label="Global"
          >
            <div className="flex lg:flex-1 ">
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
                  className={`text-2xl list-none no-underline font-normal leading-6 text-white hover:animate-bounce hover:text-[#ffe000] hover:text-xl ${
                    item.active ? "active" : ""
                  }`}
                  style={
                    item.active
                      ? {
                          borderBottom: "3px solid #51ff85",
                          color: "#51ff85",
                          fontWeight: "900",
                          borderRadius: "2px",
                        }
                      : {}
                  }
                >
                  {t(item.name.toLocaleUpperCase())}
                </Link>
              ))}
            </div>
            <div className="hidden lg:flex lg:flex-1 lg:justify-end">
              <ProfileButton />
            </div>
          </nav>
          <Dialog
            as="div"
            className="lg:hidden"
            open={mobileMenuOpen}
            onClose={() => setMobileMenuOpen(false)}
          >
            <div className="fixed inset-0 z-10" />
            <Dialog.Panel className="fixed inset-y-0 right-0 z-10 w-full px-6 py-6 overflow-y-auto bg-white sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
              <div className="flex items-center justify-between">
                <Link to="/" className="ml-10 lg:ml-0 md:ml-0 p-1.5">
                  <img className="w-auto h-8" src="./img/logo.png" alt="" />
                </Link>
                <button
                  type="button"
                  className="-m-2.5 rounded-md p-2.5 text-gray-700 "
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <span className="sr-only">Close menu</span>
                  <XMarkIcon className="w-6 h-6" aria-hidden="true" />
                </button>
              </div>
              <div className="flow-root mt-6 ml-14 lg:ml-0 md:ml-0">
                <div className="-my-6 divide-y divide-gray-500/10">
                  <div className="py-6 space-y-2">
                    {navigation.map((item) => (
                      <Link
                        key={item.name}
                        to={item.to}
                        className={`-mx-3 block text-2xl list-none no-underline font-normal leading-6 text-black ${
                          item.active ? "active" : ""
                        }`}
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
      ) : (
        <header className="bg-[#1AA75D] overflow-hidden ">
          <nav
            className="flex items-center justify-between py-2 lg:px-32 "
            aria-label="Global"
          >
            <div className="flex lg:flex-1 ">
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
            <div className="hidden lg:flex lg:gap-x-12"></div>
            <div className="hidden lg:flex lg:flex-1 lg:justify-end">
              <ProfileButton />
            </div>
          </nav>
          <Dialog
            as="div"
            className="lg:hidden"
            open={mobileMenuOpen}
            onClose={() => setMobileMenuOpen(false)}
          >
            <div className="fixed inset-0 z-10" />
            <Dialog.Panel className="fixed inset-y-0 right-0 z-10 w-full px-6 py-6 overflow-y-auto bg-white sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
              <div className="flex items-center justify-between">
                <Link to="/" className="ml-10 lg:ml-0 md:ml-0 p-1.5">
                  <img className="w-auto h-8" src="./img/logo.png" alt="" />
                </Link>
                <button
                  type="button"
                  className="-m-2.5 rounded-md p-2.5 text-gray-700 "
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <span className="sr-only">Close menu</span>
                  <XMarkIcon className="w-6 h-6" aria-hidden="true" />
                </button>
              </div>
              <div className="flow-root mt-6 ml-14 lg:ml-0 md:ml-0">
                <div className="-my-6 divide-y divide-gray-500/10">
                  <div className="py-6 space-y-2">
                    {navigation.map((item) => (
                      <Link
                        key={item.name}
                        to={item.to}
                        className={`-mx-3 block text-2xl list-none no-underline font-normal leading-6 text-black ${
                          item.active ? "active" : ""
                        }`}
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
      )}
    </div>
  );
};
export default Header;
