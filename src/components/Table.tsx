import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  ChatBubbleBottomCenterIcon,
  HandThumbUpIcon,
  MapPinIcon,
  PlusIcon,
  ShareIcon,
} from "@heroicons/react/24/outline";
import CommentModel from "./CommentModel";
import { formatDate } from "../utils/getStartedDate";
import { API_ENDPOINTS } from "../appConfig";
import { faHome, faGlobe, faHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
interface UserData {
  nickName: string;
  email: string;
  token: string;
}

interface TableProps {
  events: Array<{
    id: string;
    creator: {
      nickName: any;
    };
    comments:[];
    accountHolderName: string;
    eventStartTime: string;
    eventStartDate: string;
    eventName: string;
    eventDetails: string;
    type: string;
    place: string;
    imageUrl: string;
    isFavorite: Boolean;
    likes?: any[];
    Favorite?: any[];
  }>;
  handleLike: (event: any) => void;
  handleFavorite?: (eventId: string) => void;
}

const Table: React.FunctionComponent<TableProps> = ({ events }) => {
  const router = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [user, setUser] = useState<UserData | null>(null);
  const [selectedEventId, setSelectedEventId] = useState<string | null>(null);
  const [localEvents, setLocalEvents] = useState<any>([]);
  const handleTableRowClick = (eventStartDate: string) => {
    const currentDate = new Date();

    if (eventStartDate === formatDate(currentDate)) {
      router("/ongoing-indiviual-score");
    } else if (eventStartDate < formatDate(currentDate)) {
      router("/score-board");
    }
  };

  const handleComment = (eventId: string) => {
    console.log(eventId, "handleevent");
    setSelectedEventId(eventId);
    setShowModal(true);
  };
  const handleFavoriteClick = async (eventId: string) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.patch(
        `${API_ENDPOINTS.MARKASFAVORITE}${eventId}`,
        null,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        setLocalEvents((prevs: any) =>
          prevs.map((e: any) =>
            e.id === eventId
              ? {
                  ...e,
                  isFavorite: !e.isFavorite,
                }
              : e
          )
        );
      }
    } catch (error) {
      console.error("Error marking as favorite:", error);
    }
  };
  const closeModal = () => {
    setSelectedEventId(null);
    setShowModal(false);
  };
  const handleLike = async (event: any) => {
    try {
      const loggedInUser = JSON.parse(localStorage.getItem("id") || "");
      const likes = event?.likes || [];
      const userEvent = likes.find((like: any) => like.userId === loggedInUser);
      const newCounter = userEvent?.counter === 1 ? 0 : 1;

      const response = await axios.post(
        API_ENDPOINTS.ADDLIKE,
        { eventId: event.id, Count: newCounter, userId: loggedInUser },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.status === 200) {
        setLocalEvents((prev: any) =>
          prev.map((e: any) =>
            e.id === event.id
              ? {
                  ...e,
                  likes: userEvent
                    ? likes.map((like: any) =>
                        like.userId === loggedInUser
                          ? { ...like, counter: newCounter }
                          : like
                      )
                    : [
                        ...likes,
                        {
                          counter: newCounter,
                          userId: loggedInUser,
                          id: Math.floor(Math.random() * 10),
                        },
                      ],
                }
              : e
          )
        );
      }
    } catch (error) {
      console.error("Error updating like:", error);
    }
  };
  const getUser = async (userId: any) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`${API_ENDPOINTS.GET_USER}${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return response.data;
    } catch (error) {
      console.error("Error fetching user:", error);
      throw error;
    }
  };

  const userId = localStorage.getItem("id");
  useEffect(() => {
    getUser(userId)
      .then((userData) => {
        setUser(userData.user);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

  useEffect(() => {
    setLocalEvents(events);
  }, [events]);
  // const getCommentsCount = async (eventId: string) => {
  //   try {
  //     const token = localStorage.getItem("token");
  //     const response = await axios.get(
  //       `${API_ENDPOINTS.GET_COMMENTS_COUNT}${eventId}`,
  //       {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       }
  //     );

  //     return response.data.count;
  //   } catch (error) {
  //     console.error("Error fetching comments count:", error);
  //     throw error;
  //   }
  // };

  // const fetchCommentsCount = async () => {
  //   const updatedEvents = await Promise.all(
  //     localEvents.map(async (event: any) => {
  //       const commentsCount = await getCommentsCount(event.id);
  //       return {
  //         ...event,
  //         commentsCount,
  //       };
  //     })
  //   );

  //   setLocalEvents(updatedEvents);
  // };

  // useEffect(() => {
  //   fetchCommentsCount();
  // }, []);

  return (
    <div className="animate__animated animate__fadeInLeft">
      <div className="mt-2 flow-root">
        <div className=" -my-2 overflow-x-auto">
          <div className="inline-block min-w-full py-0 align-middle ">
            <div className="overflow-hidden sm:rounded-lg">
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
                  {localEvents.map((event: any, index: number) => {
                    const likes = event.likes || [];
                    const isFavorite = event.isFavorite || false;
                    const liked = likes.find(
                      (like: any) =>
                        parseInt(`${like.userId}`) === parseInt(`${userId}`)
                    )?.counter;
                    return (
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
                              src={
                                Array.isArray(event.imageUrl)
                                  ? event.imageUrl[0]
                                  : event.imageUrl
                              }
                              alt=""
                              className="h-12 w-12  rounded-full bg-gray-800 "
                            />
                            <div className="truncate font-medium leading-6 text-lg  ">
                            {event.organizer && event.organizer.nickName ? event.organizer.nickName : 'N/A'}
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
                            <Link
                              to={user ? "/pay-now" : "/login-page"}
                              className={`md:whitespace-nowrap px-2 text-white py-0 text-sm mx-0 sm:mx-2 cursor-pointer ${
                                event.type === "full"
                                  ? "bg-[#006800] cursor-pointer py-0 mt-[-10px] animate__animated animate__heartBeat animate__repeat-3 hover:animate-bounce h-full"
                                  : "bg-[#006800] py-0 mt-[10px] animate__animated animate__heartBeat  hover:animate-bounce h-[100%]"
                              }`}
                            >
                              <p className="rotate-45 sm:text-lg xl:text-x">
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
                              className={`flex bg-${
                                liked ? "green" : "[#17B3A6]"
                              } cursor-pointer p-1 rounded-md`}
                              onClick={() => handleLike(event)}
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
                              onClick={() => handleComment(event.id)}
                              className="flex bg-[#17B3A6] cursor-pointer p-1 rounded-md"
                            >
                              <ChatBubbleBottomCenterIcon className="h-3 w-3 text-white" />
                            </div>
                            <div className="flex bg-[#17B3A6]  cursor-pointer text-center justify-center h-3 w-3 p-1 rounded-md">
                              <div className="text-[10px] text-white">{event.comments.counter}</div>
                            </div>
                          </div>
                          <div className="flex  gap-1 flex-col items-center">
                            <div
                              className={`flex bg-${
                                isFavorite ? "[#006800]" : "[#17B3A6]"
                              } cursor-pointer p-1 rounded-md`}
                              onClick={() => handleFavoriteClick(event.id)}
                            >
                              <FontAwesomeIcon
                                icon={faHeart}
                                className={`h-3 w-3 text-white`}
                              />
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
                              eventId={selectedEventId}
                            />
                          </tr>
                        )}
                      </tr>
                    );
                  })}
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
