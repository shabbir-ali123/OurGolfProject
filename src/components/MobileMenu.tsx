import React, { useEffect } from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { NotificationsContext } from '../contexts/notificationContext';
import ProfileButton from './ProfileButton';
import { navigation } from './Header';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { menuItems } from './SideIconMenu';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onClose }) => {
  const { t } = useTranslation();

  useEffect(() => {
    const closeMenu = (event: MouseEvent) => {
      if (event.target instanceof Node && !document.querySelector('.mobile-menu')?.contains(event.target)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', closeMenu);
    }

    return () => {
      document.removeEventListener('mousedown', closeMenu);
    };
  }, [isOpen, onClose]);

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg absolute h-[100vh] w-2/3 left-0 top-0 mobile-menu">
            <button onClick={onClose} className="absolute right-0 top-8 cursor-pointer">
              <XMarkIcon className="w-6 h-6" />
            </button>
            <NotificationsContext>
              <ProfileButton />
            </NotificationsContext>

            <ul className=''>
              {menuItems.map((item) => (
                <li key={item.name} className='list-none py-3 flex items-center hover:text-[#17b3a6]'>
                  <FontAwesomeIcon icon={item.icon} className="mr-2" />
                  <Link
                    to={item.path}
                    className="text-lg no-underline font-normal leading-6 text-[#717171] hover:text-[#17b3a6] mx-4 "
                    onClick={onClose} 
                  >
                    {t(item.name.toUpperCase())}
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
