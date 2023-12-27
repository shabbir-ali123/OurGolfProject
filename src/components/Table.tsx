import { MouseEvent } from "react";
import axios from "axios";
import { formatDate } from "../utils/getStartedDate";
import { Link, useNavigate } from "react-router-dom";
import React, { useEffect, useState, useRef } from "react";
import { API_ENDPOINTS } from "../appConfig";
import {
  ChatBubbleBottomCenterIcon,
  HandThumbUpIcon,
  MapPinIcon,
  PlusIcon,
  ShareIcon,
} from "@heroicons/react/24/outline";
import CommentModel from "./CommentModel";
import { count } from "console";

interface TableProps {
  events: Array<{
    id: string;
    accountHolderName: string;
    eventStartTime: string;
    eventStartDate: string;
    eventName: string;
    eventDetails: string;
    type: string;
    place: string;
    imageUrl: string;
    likes?: any[];
  }>;
}

const Table: React.FunctionComponent<TableProps> = ({ events }) => {
  const router = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [localEvents, setLocalEvents] = useState<any>([]);
  if (!Array.isArray(events)) {
    // You can provide a fallback or return null, depending on your use case
    return null;
  }
  const handleTableRowClick = (
    clickEvent: React.MouseEvent<HTMLTableRowElement>,
    eventStartDate: string
  ) => {
    // Your logic here
    const currentDate = new Date();

    console.log(eventStartDate < formatDate(currentDate));
    if (eventStartDate === formatDate(currentDate)) {
      router("/ongoing-indiviual-score");
    } else if (eventStartDate < formatDate(currentDate)) {
      router("/score-board");
    }
  };
  const handleComment = (
    commentEvent: React.MouseEvent<HTMLDivElement>,
    eventId: string
  ) => {
    console.log(eventId, "event comment");
    setShowModal(true);
  };

  useEffect(() => {
    console.log("showModal after update:", showModal);
  }, [showModal]);

  const closeModal = () => {
    setShowModal(false);
    console.log("showModal after close:", showModal);
  };

  useEffect(() => {
    setLocalEvents(events);
  }, [events]);

  const handleLike = async (event:any) => {
    try {
      const loggedInUser = JSON.parse(localStorage.getItem("id") || "");
      const likes = event?.likes || [];
      const userEvent = likes.find((like:any) => like.userId === loggedInUser);
      const newCounter = userEvent?.counter === 0 ? 1 : 0;
  
      const response = await axios.post(
        API_ENDPOINTS.ADDLIKE,
        { eventId: event.id, Count: newCounter, userId: loggedInUser },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
  
      // Update the likes in the state
      setLocalEvents((prev:any) =>
        prev.map((e:any) =>
          e.id === event.id
            ? {
                ...e,
                likes: likes.map((like:any) =>
                  like.userId === loggedInUser
                    ? { ...like, counter: newCounter }
                    : like
                ),
              }
            : e
        )
      );
    } catch (error) {
      console.error("Error updating like:", error);
    }
  };
  

  return (
    <div className="animate__animated animate__fadeInLeft">
      <div className="mt-2 flow-root">
        <div className=" -my-2 overflow-x-auto">
          <div className="inline-block min-w-full py-0 align-middle ">
            <div className="overflow-hidden  sm:rounded-lg">
              <table
                className="min-w-full divide-y divide-gray-300"
                style={{ borderCollapse: "separate", borderSpacing: "0 10px" }}
              >
                <thead className="bg-[#006800] text-white ">
                  <tr>
                    <th
                      scope="col"
                      className="py-2 pl-4 pr-3 text-left text-sm font-semibold sm:pl-6"
                    >
                      Organizer
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-2 text-left text-sm font-semibold"
                    >
                      Time
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-2 text-left text-sm font-semibold"
                    >
                      Date
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-2 text-left text-sm font-semibold"
                    >
                      Event Name
                    </th>

                    <th
                      scope="col"
                      className="px-3 py-2 text-left text-sm font-semibold"
                    >
                      Short Notes
                    </th>

                    <th
                      scope="col"
                      className="px-3 py-2 text-left text-sm font-semibol"
                    >
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white ">
                  {localEvents.map((event: any, index: number) => (
                    <tr
                      // onClick={(clickEvent) => handleTableRowClick(clickEvent, event.eventStartDate)}

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
                          className={` -rotate-90 px-4 py-2    text-white  text-sm my-6 ml-[-19px] flex  items-center ${
                            event?.type !== "full"
                              ? "bg-[#CF4E4E]"
                              : "opacity-0"
                          }`}
                        >
                          FULL
                        </div>
                        <div className={`flex items-center gap-x-4`}>
                          <img
                            src={JSON.parse(event.imageUrl)[0]}
                            alt=""
                            className="h-12 w-12  rounded-full bg-gray-800 "
                          />
                          <div className="truncate font-medium leading-6 text-lg  ">
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
                      <td className="flex justify-between items-center text-center ml-2 whitespace-pre-wrap xl:text-left text-sm  font-semibold ">
                        <div className="flex flex-col ">
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

                        <span
                          className={`md:whitespace-nowrap px-2 text-white py-0 text-sm mx-0  sm:mx-2 cursor-pointer    ${
                            event.type === "full"
                              ? "bg-[#006800] cursor-pointer py-0 mt-[-10px]  animate__animated animate__heartBeat animate__repeat-3 hover:animate-bounce h-full "
                              : "bg-[#006800] py-0 mt-[10px]  animate__animated animate__heartBeat  hover:animate-bounce h-[100%]"
                          }`}
                        >
                          <Link to="/pay-now" className="text-white">
                            <p className="rotate-45 sm:text-lg xl:text-x  ">
                              Join
                            </p>
                          </Link>
                        </span>
                      </td>
                      <td className="whitespace-nowrap px-3 py-0 text-sm">
                        {event.eventDetails}
                      </td>
                      <td className="flex  gap-1 whitespace-nowrap px-3 py-0 text-sm ">
                        <div className="flex  gap-1 flex-col items-center">
                          <div
                            onClick={(likeEvent) => handleLike(event)}
                            className="flex bg-[#17B3A6] cursor-pointer p-1 rounded-md "
                          >
                            <HandThumbUpIcon className="h-3 w-3 text-white" />
                          </div>
                          <div className="flex bg-[#17B3A6]  cursor-pointer text-center justify-center h-3 w-3 p-1 rounded-md">
                            <div className="text-[10px] text-white ">
                              {
                                (event?.likes || []).filter(
                                  (like: any) => like.counter
                                ).length
                              }
                            </div>
                          </div>
                        </div>
                        <div className="flex  gap-1 flex-col items-center">
                          <div
                            onClick={(commentEvent) =>
                              handleComment(commentEvent, event.id)
                            }
                            className="flex bg-[#17B3A6] cursor-pointer p-1 rounded-md"
                          >
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
                      {showModal && (
                        <tr>
                          <CommentModel
                            closeModal={closeModal}
                            eventId={event.id}
                          />
                        </tr>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
Table.defaultProps = {
  events: [],
};
export default Table;
