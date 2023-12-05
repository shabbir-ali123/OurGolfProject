import React, { useState } from "react";
import { Dialog } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { Link, useLocation } from "react-router-dom";
import ProfileButton from "../components/ProfileButton";
import { motion } from "framer-motion"

const navigation = [
  { name: "Home", to: "/", active: false },
  { name: "Posts", to: "#", active: false },
  { name: "Events", to: "/event-main-page", active: false },
  { name: "Find a teacher", to: "/student-page", active: false },
  
];

export default function Example() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const location = useLocation();

  // Update the active property based on the current route
  navigation.forEach((item) => {
    item.active = item.to === location.pathname;
  });

  return (
    <header className="bg-[#17B3A6] overflow-hidden ">
      <nav
        className="flex items-center justify-between p-0 lg:px-32 "
        aria-label="Global"
      >
        <div className="flex lg:flex-1 ">
          <Link to="/" className="-m-1.5 p-1">
            <span className="sr-only">Your Company</span>
            <img className="h-16 w-auto animate-pulse" src="./img/logo.png" alt="" />
          </Link>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            className="mr-2 inline-flex items-center justify-center rounded-md p-1 text-gray-700"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        <div className="hidden lg:flex lg:gap-x-12">
        {navigation.map((item) => (
          <Link
            key={item.name}
            to={item.to}
            className={`text-2xl list-none no-underline font-normal leading-6 text-white ${
              item.active ? "active" : ""
            }`}
            style={item.active ? { borderBottom: "3px solid #fff" ,borderRadius:'2px'  } : {}}
          >
            {item.name}
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
        <Dialog.Panel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <Link to="/" className="ml-10 lg:ml-0 md:ml-0 p-1.5">
              <img className="h-8 w-auto" src="./img/logo.png" alt="" />
            </Link>
            <button
              type="button"
              className="-m-2.5 rounded-md p-2.5 text-gray-700 "
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="mt-6 flow-root ml-14 lg:ml-0 md:ml-0">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
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
  );
}
