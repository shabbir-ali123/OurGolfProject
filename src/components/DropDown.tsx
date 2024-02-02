
import { Fragment, useState, useEffect } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import { useTranslation } from 'react-i18next';

interface DropDownProps {
  timeSlots?: any;
}

function DropDown({ timeSlots }: DropDownProps) {
  console.log(timeSlots);
  const [selectedOption, setSelectedOption] = useState(timeSlots ? timeSlots[0] : '');

  console.log(timeSlots, "sajid")
  useEffect(() => {
    if (timeSlots) {
      setSelectedOption(timeSlots[0]);
    }
  }, [timeSlots]);

  return (
    <Menu as={Fragment}>
      <div className="flex items-center gap-2">
        <label htmlFor="" className="font-sans font-bold text-black text-md">
          Day
        </label>
        <Menu.Button
          className="flex w-full justify-center items-center gap-x-1.5 rounded-full bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
          data-state={selectedOption}
        >
          {selectedOption}
          <ChevronDownIcon
            className="w-5 h-5 -mr-1 text-gray-400 cursor-pointer"
            aria-hidden="true"
          />
        </Menu.Button>
      </div>

      <Transition
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 z-10 w-56 mt-2 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1 cursor-pointer flex flex-col">
            {timeSlots ? (
              timeSlots.map((slot: any, index: any) => (
                <Menu.Item key={index}>
                  {({ active }) => (
                    <a
                      className={
                        active
                          ? 'bg-gray-100 text-gray-900 p-2'
                          : 'text-gray-700 p-2'
                      }
                      onClick={() => setSelectedOption(slot)}
                    >
                      {slot}
                    </a>
                  )}
                </Menu.Item>
              ))
            ) : (
              <Menu.Item>
                <div className="block px-4 py-2 text-sm text-gray-700">
                  No available time slots
                </div>
              </Menu.Item>
            )}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}

export default DropDown;
