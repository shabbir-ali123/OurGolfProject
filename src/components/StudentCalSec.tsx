import { useState, Fragment, useEffect } from "react";
import {
  CalendarIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  EllipsisHorizontalIcon,
  MapPinIcon,
} from "@heroicons/react/20/solid";
import { Menu, Transition } from "@headlessui/react";
import { addMonths, subMonths, format } from "date-fns";
import { Link, useNavigate } from "react-router-dom";
import { ActivitiesCalender } from "./calender/ActivitiesCalender";
const meetings = [
  {
    id: 1,
    date: "January 10th, 2022",
    datetime: "2022-01-10T17:00",
    name: "9:00AM - 10:00 AM",
    imageUrl:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    location: "Appointment - Leslie",
  },
 
  
];
const days = [
  { date: "2021-12-27" },
  { date: "2021-12-28" },
  { date: "2021-12-29" },
  { date: "2021-12-30" },
  { date: "2021-12-31" },
  { date: "2022-01-01", isCurrentMonth: true },
  { date: "2022-01-02", isCurrentMonth: true },
  { date: "2022-01-03", isCurrentMonth: true },
  { date: "2022-01-04", isCurrentMonth: true },
  { date: "2022-01-05", isCurrentMonth: true },
  { date: "2022-01-06", isCurrentMonth: true },
  { date: "2022-01-07", isCurrentMonth: true },
  { date: "2022-01-08", isCurrentMonth: true },
  { date: "2022-01-09", isCurrentMonth: true },
  { date: "2022-01-10", isCurrentMonth: true },
  { date: "2022-01-11", isCurrentMonth: true },
  { date: "2022-01-12", isCurrentMonth: true, isToday: true },
  { date: "2022-01-13", isCurrentMonth: true },
  { date: "2022-01-14", isCurrentMonth: true },
  { date: "2022-01-15", isCurrentMonth: true },
  { date: "2022-01-16", isCurrentMonth: true },
  { date: "2022-01-17", isCurrentMonth: true },
  { date: "2022-01-18", isCurrentMonth: true },
  { date: "2022-01-19", isCurrentMonth: true },
  { date: "2022-01-20", isCurrentMonth: true },
  { date: "2022-01-21", isCurrentMonth: true },
  { date: "2022-01-22", isCurrentMonth: true, isSelected: true },
  { date: "2022-01-23", isCurrentMonth: true },
  { date: "2022-01-24", isCurrentMonth: true },
  { date: "2022-01-25", isCurrentMonth: true },
  { date: "2022-01-26", isCurrentMonth: true },
  { date: "2022-01-27", isCurrentMonth: true },
  { date: "2022-01-28", isCurrentMonth: true },
  { date: "2022-01-29", isCurrentMonth: true },
  { date: "2022-01-30", isCurrentMonth: true },
  { date: "2022-01-31", isCurrentMonth: true },
  { date: "2022-02-01" },
  { date: "2022-02-02" },
  { date: "2022-02-03" },
  { date: "2022-02-04" },
  { date: "2022-02-05" },
  { date: "2022-02-06" },
];

function classNames(
  ...classes: (string | boolean | undefined | null)[]
): string {
  return classes.filter(Boolean).join(" ");
}

export default function Example({selectedDatee}: any) {
  const [selectedDate, setSelectedDate] = useState<any>(null);
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date());

  const handleDateClick = (date: string) => {
    setSelectedDate(date);
  };

  useEffect(() => {
    selectedDatee(selectedDate);
  }, [selectedDate])
  
  const handleWeekSelected = (date: Date) => {
    setSelectedDate(date);
  };
  
  const handleNextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1));
    setSelectedDate(null);
  };

  const handlePrevMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1));
    setSelectedDate(null);
  };
  
  return (
    <div className="bg-gradient-to-b from-[rgba(167,255,193,0.34)] via-transparent to-transparent h-screen">
       <Link to="/all-teachers" >
            <button className="m-2 cursor-pointer bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-3 mb-4 rounded-full inline-flex items-center hover:animate-bounce">
              <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
              <span>Back</span>
            </button>
          </Link>
      <div className=" lg:grid lg:grid-cols-4 justify-center ">
     
        <div className="lg:col-span-8 xl:col-span-9 px-4 ">
         

          <ActivitiesCalender onWeekSelected={handleWeekSelected} />
        </div>
        {/* <ol className=" mt-4 ml-4 col-san-4 divide-y divide-gray-100 text-sm leading-6 lg:col-span-7 xl:col-span-8  ">
          
          <h3>UpComing Activities</h3>
        
        
          
          <div>
            <div className="flex justify-between items-center">
            <p className="text-[#00A632] font-semibold ">1/24/2023</p>
            <button className=" cursor-pointer bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 mb-4 rounded-md inline-flex items-center hover:animate-bounce">
              <span className="">See All</span>
            </button>
            </div>
            
            {meetings.map((meeting) => (
              <li
                key={meeting.id}
                className="relative flex space-x-6 py-2 xl:static border-solid border-b-2  border-blue-50"
              >
                <img
                  src={meeting.imageUrl}
                  alt=""
                  className="h-10 w-10 flex-none rounded-full"
                />
                <div className="flex-auto">
                  <h3 className="pr-10 font-semibold text-gray-900 xl:pr-0">
                    {meeting.name}
                  </h3>
                  <dl className="mt-2 flex flex-col text-gray-500 xl:flex-row">
                    <div className="flex items-start space-x-3">
                      <dt className="mt-0.5">
                        <span className="sr-only">Date</span>
                        <CalendarIcon
                          className="h-5 w-5 text-gray-400"
                          aria-hidden="true"
                        />
                      </dt>
                      <dd>
                        <time dateTime={meeting.datetime}>{meeting.date}</time>
                      </dd>
                    </div>
                  </dl>
                  <div className="mt-2 flex items-start space-x-3 xl: xl:mt-0 xl:border-l xl:border-gray-400 xl:border-opacity-50 xl:">
                    <dt className="mt-0.5">
                      <span className="sr-only">Location</span>
                      <MapPinIcon
                        className="h-5 w-5 text-gray-400"
                        aria-hidden="true"
                      />
                    </dt>
                    <dd>{meeting.location}</dd>
                  </div>
                </div>
                <Menu
                  as="div"
                  className="absolute right-0 top-6 xl:relative xl:right-auto xl:top-auto xl:self-center"
                >
                  <div>
                    <Menu.Button className=" cursor-pointer mr-12 flex items-center rounded-full p-2 text-gray-500 hover:text-gray-600">
                      <span className="sr-only">Open options</span>
                      <EllipsisHorizontalIcon
                        className="h-5 w-5"
                        aria-hidden="true"
                      />
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
                    <Menu.Items className=" absolute right-0 z-10 mt-2 w-36 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none ">
                      <div className="py-1">
                        <Menu.Item>
                          {({ active }) => (
                            <a
                              href="#"
                              className={classNames(
                                active
                                  ? "bg-gray-100 text-gray-900 cursor-pointer"
                                  : "text-gray-700",
                                "block px-4 py-2 text-sm"
                              )}
                            >
                              Edit
                            </a>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <a
                              href="#"
                              className={classNames(
                                active
                                  ? "bg-gray-100 text-gray-900"
                                  : "text-gray-700",
                                "block px-4 py-2 text-sm"
                              )}
                            >
                              Cancel
                            </a>
                          )}
                        </Menu.Item>
                      </div>
                    </Menu.Items>
                  </Transition>
                  
                </Menu>
              </li>
            ))}
          </div>
         
        </ol> */}
      </div>
    </div>
  );
}
