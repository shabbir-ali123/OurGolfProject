import { Fragment, useState } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import { t } from 'i18next';
import { useTranslation } from 'react-i18next';

function classNames(...classes: (string | boolean | undefined | null)[]): string {
    return classes.filter(Boolean).join(' ');
  }

export default function Example() {
  const {t, i18n} = useTranslation();
  document.body.dir = i18n.dir(); 
  const [selectedOption, setSelectedOption] = useState('29-10-2023');

  return (
    <Menu as="div" className="relative inline-block text-left ">
      <div className='flex items-center gap-2'>
        <label htmlFor="" className='font-sans font-bold text-black text-md'>{t('DATE')}</label>
        <Menu.Button
          className="flex w-full justify-center items-center gap-x-1.5 rounded-full bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
          data-state={selectedOption}
        >
          {selectedOption}
          <ChevronDownIcon className="w-5 h-5 -mr-1 text-gray-400 cursor-pointer" aria-hidden="true" />
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 z-10 w-56 mt-2 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1 cursor-pointer">
            <Menu.Item >
              {({ active }) => (
                <a
                  
                  className={classNames(
                    active ? 'bg-gray-100 text-gray-900 ' : 'text-gray-700',
                    'block px-4 py-2 text-sm'
                  )}
                  onClick={() => setSelectedOption('29-10-2023')}
                >
                  29-10-2023
                </a>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <a
                  
                  className={classNames(
                    active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                    'block px-4 py-2 text-sm'
                  )}
                  onClick={() => setSelectedOption('30-10-2023')}
                >
                 30-10-2023
                </a>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <a
                  
                  className={classNames(
                    active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                    'block px-4 py-2 text-sm'
                  )}
                  onClick={() => setSelectedOption('31-10-2023')}
                >
                 31-10-2023
                </a>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <a
                  
                  className={classNames(
                    active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                    'block px-4 py-2 text-sm'
                  )}
                  onClick={() => setSelectedOption('01-11-2023')}
                >
                 01-11-2023
                </a>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <a
                  
                  className={classNames(
                    active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                    'block px-4 py-2 text-sm'
                  )}
                  onClick={() => setSelectedOption('02-11-2023')}
                >
                 02-11-2023
                </a>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  )
}
