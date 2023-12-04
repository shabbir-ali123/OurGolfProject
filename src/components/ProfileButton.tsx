import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function ProfileButton() {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleDotClick = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <div className="hidden lg:flex lg:flex-1 lg:justify-end">
      <div className="relative block flex-shrink-0">
        <div className=" flex items-center">
          <div>
            <img
              className="inline-block h-12 w-12 rounded-full"
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
              alt=""
            />
          </div>
          <div className="ml-3">
            <p className="text-base font-medium text-white group-hover:text-gray-900 m-0">
              Esther Howard
            </p>
          </div>
          <button onClick={handleDotClick} className="relative px-1 focus:outline-none bg-transparent">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="white"
              className="w-6 h-6 cursor-pointer"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </button>
        </div>
        {/* Dropdown */}
        {dropdownOpen && (
          <div className="absolute right-0  mt-2 bg-white rounded-md shadow-lg">
            {/* Dropdown content goes here */}
            <ul className="py-1">
              <li className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                <Link to="/profile">Profile</Link>
              </li>
              <li className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                <Link to="/signout">Sign Out</Link>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
