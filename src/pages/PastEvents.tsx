import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_ENDPOINTS } from "../appConfig";
import { formatDate } from "../utils/getStartedDate";
import {
  ChatBubbleBottomCenterIcon,
  HandThumbUpIcon,
  MapPinIcon,
  PlusIcon,
  ShareIcon,
} from "@heroicons/react/24/outline";
import EventMap from "../components/EventMap";
import Pagination from "../components/Pagination"
interface Event {
  accountHolderName: string;
  eventStartTime: string;
  eventStartDate: string;
  eventName: string;
  eventDetails: string;
  type: string;
  place: string;
  imageUrl: string;
}

const PastEvents: React.FC = () => {
  const [pastevents, setPastEvents] = useState<Event[]>([]);
  const pageSize = 5;
  const [currentPage, setCurrentPage] = useState(1);

  const fetchpastevents = async (page: any) => {
    try {
      const currentDate = new Date();
      const token = localStorage.getItem("token");
  
      if (!token) {
        console.error("User not authenticated");
        return;
      }
  
      const response = await axios.get(API_ENDPOINTS.GETALLEVENT, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          pageSize,
          page,
          status:"past"
        },
      });
  
      setPastEvents(response.data.events);
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };
  
  useEffect(() => {
    fetchpastevents(currentPage);
  }, [currentPage]);

  const totalEvents = pastevents.length;
  const totalPages = Math.ceil(totalEvents / pageSize);


  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = Math.min(startIndex + pageSize, totalEvents);

  const visibleEvents = pastevents.slice(startIndex, endIndex);
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      <div className="col-span-3">
        <div className="animate__animated animate__fadeInLeft">
          <div className="mt-2 flow-root">
            <div className=" -my-2 overflow-x-auto">
              <div className="inline-block min-w-full py-0 align-middle ">
                <div className="overflow-hidden  sm:rounded-lg">
                  <table
                    className="min-w-full divide-y divide-gray-300"
                    style={{
                      borderCollapse: "separate",
                      borderSpacing: "0 10px",
                    }}
                  >
                    <thead className="bg-[#006800] text-white ">
                      <tr>
                        <th
                          scope="col"
                          className="py-2 pl-4 pr-3 text-left text-lg font-semibold sm:pl-6"
                        >
                          Organizer
                        </th>
                        <th
                          scope="col"
                          className="px-3 py-2 text-left text-lg font-semibold"
                        >
                          Time
                        </th>
                        <th
                          scope="col"
                          className="px-3 py-2 text-left text-lg font-semibold"
                        >
                          Date
                        </th>
                        <th
                          scope="col"
                          className="px-3 py-2 text-left text-lg font-semibold"
                        >
                          Event Name
                        </th>

                        <th
                          scope="col"
                          className="px-3 py-2 text-left text-lg font-semibold"
                        >
                          Short Notes
                        </th>

                        <th
                          scope="col"
                          className="px-3 py-2 text-left text-lg font-semibol"
                        >
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 bg-white ">
                    {visibleEvents.map((event, index) => (
                        
                        <tr
                          key={index}
                          className={`rounded-sm ${
                            index % 2 === 0
                              ? "bg-[#3A66C0] text-white shadow-[-3.9px_3.9px_3.12px_#0052fb]"
                              : "bg-[#D3DAFF] text-black"
                          }`}
                          style={{
                            width: "100%",
                            borderRadius: "4px",
                            border: "none",
                          }}
                        >
                          <td className="flex items-center  mt-[0px] ">
                            <div
                              className={` -rotate-90 px-1 py-2    text-white  text-sm my-6 ml-[-30px] mt-[40px] flex  items-center ${
                                event.type !== "full"
                                  ? "bg-[#78ff4e]"
                                  : "opacity-0"
                              }`}
                            >
                             Completed
                            </div>
                            <div className={`flex items-center gap-x-4`}>
                              <img
                                src={JSON.parse(event.imageUrl)[0]}
                                alt=""
                                className="h-12 w-12   rounded-full bg-gray-800 "
                              />
                              <div className="truncate text-lg font-medium leading-6  ">
                                {event.accountHolderName}
                              </div>
                            </div>
                          </td>
                          <td className="whitespace-nowrap px-3 py-0 text-lg">
                            {event.eventStartTime}
                          </td>
                          <td className="whitespace-nowrap px-3 py-0  text-lg">
                            {event.eventStartDate}
                          </td>
                          <td className="flex justify-between items-center text-center ml-2 whitespace-pre-wrap xl:text-left text-lg  font-semibold ">
                            <div className="flex flex-col">
                              {event.eventName}
                              <span className="flex items-center gap-1 font-normal ">
                                <MapPinIcon
                                  className={`-mr-0.5 h-5 w-5 ${
                                    event.type !== "full" && "text-[#33333]"
                                  }`}
                                  aria-hidden="true"
                                />

                                {event.place}
                              </span>
                            </div>

                      
                          </td>
                          <td className="whitespace-nowrap px-3 py-0 text-lg">
                            {event.eventDetails}
                          </td>
                          <td className="flex  gap-1 whitespace-nowrap px-3 py-0 text-lg ">
                            <div className="flex  gap-1 flex-col items-center">
                              <div className="flex bg-[#17B3A6] cursor-pointer p-1 rounded-md ">
                                <HandThumbUpIcon className="h-3 w-3 text-white" />
                              </div>
                              <div className="flex bg-[#17B3A6]  cursor-pointer text-center justify-center h-3 w-3 p-1 rounded-md">
                                <div className="text-[10px] text-white ">
                                  12
                                </div>
                              </div>
                            </div>
                            <div className="flex  gap-1 flex-col items-center">
                              <div className="flex bg-[#17B3A6] cursor-pointer p-1 rounded-md">
                                <ChatBubbleBottomCenterIcon className="h-3 w-3 text-white" />
                              </div>
                              <div className="flex bg-[#17B3A6]  cursor-pointer text-center justify-center h-3 w-3 p-1 rounded-md">
                                <div className="text-[10px] text-white">20</div>
                              </div>
                            </div>
                            <div className="flex  gap-1 flex-col items-center">
                              <div className="flex bg-[#17B3A6] cursor-pointer p-1 rounded-md">
                                <PlusIcon className="h-3 w-3 text-white" />
                              </div>
                              <div className="flex bg-[#17B3A6]  cursor-pointer text-center justify-center h-3 w-3 p-1 rounded-md">
                                <ShareIcon className="h-3 w-3 text-white" />
                              </div>
                            </div>
                          </td>
                          <div className="flex justify-start items-center my-1 ml-4">
                            <button className="bg-[#52FF86] hover:bg-blue-700 text-white font-bold py-1 px-4 rounded">
                              View
                            </button>
                          </div>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={(page: any) => setCurrentPage(page)}
          pageSize={pageSize}
        />
      </div>

      <div >
        <EventMap />
      </div>
    </div>
  );
};
export default PastEvents;
