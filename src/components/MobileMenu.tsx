import { XMarkIcon } from '@heroicons/react/24/outline';
import React, { useState } from 'react';
import { NotificationsContext } from '../contexts/notificationContext';
import ProfileButton from './ProfileButton';
import { navigation } from './Header';
import { Link } from 'react-router-dom';
import { t } from 'i18next';
import { menuItems } from './SideIconMenu';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onClose }) => {
  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 ">
          <div className="bg-white p-6 rounded-lg absolute h-[100vh] w-2/3 left-0 top-0">
          <button onClick={onClose} className="absolute right-0 top-8 cursor-pointer">
              <XMarkIcon className="w-6 h-6" /> 
            </button>
            <NotificationsContext>
              <ProfileButton />
            </NotificationsContext>


            <ul>
            {navigation.map((item) => (
            <li className='list-none py-1'>
                    <Link
                    key={item.name}
                    to={item.to}
                    className={`text-xl list-none no-underline font-normal leading-6 text-black hover:text-teal-400 mb-4 `}
                  >
                    {t(item.name.toLocaleUpperCase())}
                  </Link>
            </li>
                ))}
    {menuItems.map((item) => (
            <li className='list-none py-1'>
                    <Link
                    key={item.name}
                    to={item.path}
                    className={`text-xl list-none no-underline font-normal leading-6 text-black hover:text-teal-400 mb-4 `}
                  >
                    
                    {t(item.name.toLocaleUpperCase())}
                  </Link>
            </li>
                ))}


            </ul>
         
          </div>
        </div>
      )}
    </>
  );
};

export default MobileMenu;
