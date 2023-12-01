import { useState } from "react";
import { Tab } from "@headlessui/react";
import Calendar from "../components/Calender";
import EventMap from "../components/EventMap";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  MapPinIcon,
  PencilSquareIcon,
} from "@heroicons/react/24/outline";
import Table from "../components/Table";
import { Link, useNavigate } from "react-router-dom";
function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

export default function Example() {
  let [categories] = useState({
    ALL: [
      {
        id: 1,
        title: "Does drinking coffee make you smarter?",
        date: "5h ago",
        commentCount: 5,
        shareCount: 2,
      },
      {
        id: 2,
        title: "So you've bought coffee... now what?",
        date: "2h ago",
        commentCount: 3,
        shareCount: 2,
      },
    ],
    LIVE: [
      {
        id: 1,
        title: "Is tech making coffee better or worse?",
        date: "Jan 7",
        commentCount: 29,
        shareCount: 16,
      },
      {
        id: 2,
        title: "The most innovative things happening in coffee",
        date: "Mar 19",
        commentCount: 24,
        shareCount: 12,
      },
    ],
    PAST: [
      {
        id: 1,
        title: "Ask Me Anything: 10 answers to your questions about coffee",
        date: "2d ago",
        commentCount: 9,
        shareCount: 5,
      },
      {
        id: 2,
        title: "The worst advice we've ever heard about coffee",
        date: "4d ago",
        commentCount: 1,
        shareCount: 2,
      },
    ],
    UPCOMING: [
      {
        id: 1,
        title: "Ask Me Anything: 10 answers to your questions about coffee",
        date: "2d ago",
        commentCount: 9,
        shareCount: 5,
      },
      {
        id: 2,
        title: "The worst advice we've ever heard about coffee",
        date: "4d ago",
        commentCount: 1,
        shareCount: 2,
      },
    ],
  });

  return (
    <div className="flex flex-wrap xl:flex-nowrap">
      <div className=" w-full">
        <Tab.Group>
          <Tab.List className="flex flex-wrap justify-between space-x-4 items-center px-2 rounded-md bg-[#A6FFF8]">
            <div className="flex flex-wrap lg:flex-nowrap gap-4 py-2">
              <div className="md:mx-20 xl:relative w-full">
                <button
                  type="button"
                  className="xl:py-5 rounded-l-md sm:absolute left-[-88px] top-[-16px] py-4 inline-flex items-center gap-x-1.5 text-[18px] px-6 mt-2 bg-[#17B3A6] text-white"
                >
                  <MapPinIcon className="-mr-0.5 h-5 w-5" aria-hidden="true" />
                  Tokyo
                </button>
              </div>

              {Object.keys(categories).map((category) => (
                <Tab
                  key={category}
                  className={({ selected }) =>
                    classNames(
                      "w-full rounded-md py-3 px-10 text-base font-normal leading-5",
                      "ring-white/60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2",
                      selected
                        ? "bg-[#3A66C0]  text-white "
                        : "text-[#17B3A6] bg-white hover:bg-[#3A66C0] hover:text-white"
                    )
                  }
                >
                  {category}
                </Tab>
              ))}
            </div>
            <div>
              <Calendar />
            </div>
          </Tab.List>
          <Tab.Panels>
            <Tab.Panel key="ALL">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                <div className="col-span-3">
                  <Table />
                  <div className="flex items-center justify-between border-t border-gray-950 bg-white px-4 py-3 sm:px-6">
                    <div className="flex flex-1 justify-between sm:hidden">
                      <a
                        href="#"
                        className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                      >
                        Previous
                      </a>
                      <a
                        href="#"
                        className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                      >
                        Next
                      </a>
                    </div>
                    <div className="hidden sm:flex sm:flex-1 sm:items-center justify-center my-6">
                      <div>
                        <nav
                          className="isolate inline-flex -space-x-px rounded-md shadow-sm"
                          aria-label="Pagination"
                        >
                          <a
                            href="#"
                            className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                          >
                            <span className="sr-only">Previous</span>
                            <ChevronLeftIcon
                              className="h-5 w-5"
                              aria-hidden="true"
                            />
                          </a>
                          <a
                            href="#"
                            aria-current="page"
                            className="relative z-10 inline-flex items-center bg-[#17B3A6] px-4 py-2 text-sm font-semibold text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                          >
                            1
                          </a>
                          <a
                            href="#"
                            className="relative inline-flex items-center px-6 py-3  text-sm font-semibold text-[#D0D0D0] ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                          >
                            2
                          </a>
                          <a
                            href="#"
                            className="relative hidden items-center px-6 py-2 text-sm font-semibold text-[#D0D0D0] ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 md:inline-flex"
                          >
                            3
                          </a>
                          <span className="relative inline-flex items-center px-6 py-2 text-sm font-semibold text-[#D0D0D0] ring-1 ring-inset ring-gray-300 focus:outline-offset-0">
                            ...
                          </span>
                          <a
                            href="#"
                            className="relative hidden items-center px-6 py-2 text-sm font-semibold text-[#D0D0D0] ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 md:inline-flex"
                          >
                            8
                          </a>
                          <a
                            href="#"
                            className="relative inline-flex items-center px-6 py-2 text-sm font-semibold text-[#D0D0D0] ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                          >
                            9
                          </a>
                          <a
                            href="#"
                            className="relative inline-flex items-center px-6 py-2 text-sm font-semibold text-[#D0D0D0] ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                          >
                            10
                          </a>
                          <a
                            href="#"
                            className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                          >
                            <span className="sr-only">Next</span>
                            <ChevronRightIcon
                              className="h-5 w-5"
                              aria-hidden="true"
                            />
                          </a>
                        </nav>
                      </div>
                    </div>
                  </div>
                </div>
               <EventMap/>
              </div>
            </Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
      </div>
    </div>
  );
}
