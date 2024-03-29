import React, { useEffect, useState } from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import ProfileButton from './ProfileButton';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { menuItems } from './SideIconMenu';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { NotificationsContext } from '../contexts/notificationContext';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onClose }) => {
  const { t } = useTranslation();
  const [activeSubMenu, setActiveSubMenu] = useState<string | null>(null);

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

  const handleSubItemClick = (itemName: string) => {
    setActiveSubMenu(activeSubMenu === itemName ? null : itemName);
  };


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
                <li key={item.name} className='list-none py-3   items-center hover:text-[#17b3a6]'>
                  <FontAwesomeIcon icon={item.icon} className="mr-2" />
                  <Link
                    to={item.path}
                    className="text-lg no-underline font-normal leading-6 text-[#717171] hover:text-[#17b3a6] mx-4 "
                    onClick={onClose} 
                  >
                    {t(item.name.toUpperCase())}
                  </Link>
                  {item.subItems && (
                    <button onClick={() => handleSubItemClick(item.name)} className="ml-2 bg-transparent">
                      <FontAwesomeIcon icon={activeSubMenu === item.name ? faChevronUp : faChevronDown} />
                    </button>
                  )}
                  {activeSubMenu === item.name && item.subItems && (
                    <ul className="mr-10">
                      {item.subItems.map(subItem => (
                        <li key={subItem.name} className=' p-2 list-none '  style={{
                          boxShadow:
                            "rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset",
                        }}>
                          <Link
                            to={subItem.path}
                            className="text-lg no-underline font-normal leading-6 text-[#717171] hover:text-[#17b3a6] "
                            onClick={onClose}
                          >
                            {t(subItem.name.toUpperCase())}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
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
