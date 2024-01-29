import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import {
  ChatBubbleBottomCenterIcon,
  HandThumbUpIcon,
  MapPinIcon,
  ShareIcon,
} from "@heroicons/react/24/solid";
import CommentModel from "./CommentModel";
import { API_ENDPOINTS } from "../appConfig";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import { ToastConfig, toastProperties } from "../constants/toast";

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
    comments: [];
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
  handleLike?: (event: any) => void;
  handleFavorite?: (eventId: string) => void;
}

const Table: React.FunctionComponent<TableProps> = ({ events }) => {
  const { t, i18n } = useTranslation();
  document.body.dir = i18n.dir();
  const [showModal, setShowModal] = useState(false);
  const [user, setUser] = useState<UserData | null>(null);
  const [selectedEvent, setSelectedEvent] = useState<string | null>(null);
  const [localEvents, setLocalEvents] = useState<any>([]);

  const handleComment = (eventId: string) => {
    setSelectedEvent(eventId);
    setShowModal(!showModal);
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
    setSelectedEvent(null);
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
      toast.error(
        `Error updating likes : ${error}`,
        toastProperties as ToastConfig
      );
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
      toast.error(
        `Please Login`,
        toastProperties as ToastConfig
      );
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

  const handleJoinClick = (e: any) => {
    localStorage.setItem('selectedEventId', e.id)
  }

  return (
    <div className="animate__animated animate__fadeInLeft">
      {localEvents.length === 0 ? (
        <div className="p-5 text-center">
          <span className="text-lg font-medium">No events yet</span>
        </div>
      ) : (
        <div className="flow-root mt-2">
          <div className="-my-2 overflow-x-auto ">
            <div className="inline-block min-w-full py-0 align-middle ">
              <div className="overflow-hidden sm:rounded-lg">
                <table
                  className="relative min-w-full divide-y divide-gray-300 z-9"
                  style={{ borderCollapse: "separate", borderSpacing: "0 10px" }}
                >
                  <thead className="bg-[#006800] text-white ">
                    <tr>
                      <th
                        scope="col"
                        className="py-2 pl-4 pr-3 text-sm font-semibold text-left sm:pl-6"
                      >
                        Organizer
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-2 text-sm font-semibold text-left"
                      >
                        Time
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-2 text-sm font-semibold text-left"
                      >
                        Date
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-2 text-sm font-semibold text-left"
                      >
                        Event Name
                      </th>

                      <th
                        scope="col"
                        className="px-3 py-2 text-sm font-semibold text-left"
                      >
                        Short Notes
                      </th>

                      <th
                        scope="col"
                        className="px-3 py-2 text-sm text-left font-semibol"
                      >
                        Actions
                      </th>
                    </tr>
                  </thead>

                  {localEvents.map((event: any, index: number) => {
                    const likes = event.likes || [];
                    const isFavorite = event.isFavorite || false;
                    const liked = likes.find(
                      (like: any) =>
                        parseInt(`${like.userId}`) === parseInt(`${userId}`)
                    )?.counter;

                    return (
                      <React.Fragment key={index}>
                        <tr
                          className={`rounded-lg    ${index % 2 === 0
                            ? "text-black   "
                            : "bg-[#D3DAFF] text-black"
                            }`}
                          style={{
                            width: "100%",
                            borderRadius: "10px",
                            border: "none",
                            boxShadow: "rgba(0, 0, 0, 0.16) 0px 10px 36px 0px, rgba(0, 0, 0, 0.06) 0px 0px 0px 1px"
                          }}
                        >
                          <td className="flex items-center mt-0">
                            <div className="flex items-center gap-x-4">
                              <img
                                src={
                                  Array.isArray(event.imageUrl)
                                    ? event.imageUrl[0]
                                    : event.imageUrl
                                }
                                alt=""
                                className="w-12 h-12 bg-gray-800 rounded-full"
                              />
                              <div className="text-lg font-medium leading-6 truncate tableText">
                                {event.creator && event.creator.nickName
                                  ? event.creator.nickName
                                  : "N/A"}
                              </div>
                            </div>
                          </td>

                          <td className="px-3 py-0 text-sm whitespace-nowrap">
                            {event.eventStartTime}
                          </td>
                          <td className="px-3 py-0 text-sm whitespace-nowrap">
                            {event.eventStartDate}
                          </td>
                          <td className="flex items-center justify-between ml-2 text-sm font-semibold text-center whitespace-pre-wrap xl:text-left">
                            <div className="flex flex-col text-2xl font-bold capitalize">
                              {event.eventName}
                              <span className="flex items-center gap-1 font-normal ">
                                <MapPinIcon
                                  className={`-mr-0.5 h-4 w-4 ${event.type !== "full" && "text-[#33333]"
                                    }`}
                                  aria-hidden="true"
                                />
                                {event.place}
                              </span>
                            </div>

                            <span
                              className={`md:whitespace-nowrap px-2 text-white py-0 text-sm mx-0  sm:mx-2 cursor-pointer    ${event.type === "full"
                                ? "bg-[#006800] cursor-pointer py-0 mt-[-10px]  animate__animated animate__heartBeat animate__repeat-3 hover:animate-bounce h-full "
                                : "bg-[#006800] py-0 mt-[10px]  animate__animated animate__heartBeat  hover:animate-bounce h-[100%]"
                                }`}
                            >
                              <Link
                                to={user ? "/pay-now" : "/login-page"}
                                className={`md:whitespace-nowrap px-2 text-white py-0 text-sm mx-0 sm:mx-2 cursor-pointer ${event.type === "full"
                                  ? "bg-[#006800] cursor-pointer py-0 mt-[-10px] animate__animated animate__heartBeat animate__repeat-3 hover:animate-bounce h-full"
                                  : "bg-[#006800] py-0 mt-[10px] animate__animated animate__heartBeat  hover:animate-bounce h-[100%]"
                                  }`}
                                onClick={() => handleJoinClick(event)}
                              >
                                <p className="rotate-45 sm:text-lg xl:text-x">
                                  Join
                                </p>
                              </Link>
                            </span>
                          </td>
                          <td className="px-3 py-0 text-sm whitespace-nowrap">
                            {event.eventDetails}
                          </td>
                          <td className="flex gap-1 px-3 py-0 text-sm whitespace-nowrap ">
                            <div className="flex flex-col items-center gap-1">
                              <div
                                className={`flex bg-${liked ? "green" : "[#17B3A6]"
                                  } cursor-pointer p-1 rounded-md`}
                                onClick={() => handleLike(event)}
                              >
                                <HandThumbUpIcon className="w-3 h-3 text-white" />
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
                            <div className="flex flex-col items-center gap-1">
                              <div
                                onClick={() => handleComment(event.id)}
                                className="flex bg-[#17B3A6] cursor-pointer p-1 rounded-md"
                              >
                                <ChatBubbleBottomCenterIcon className="w-3 h-3 text-white" />
                              </div>
                              <div className="flex bg-[#17B3A6]  cursor-pointer text-center justify-center h-3 w-3 p-1 rounded-md">
                                <div className="text-[10px] text-white">
                                  {event.comments.length}
                                </div>
                              </div>
                            </div>
                            <div className="flex flex-col items-center gap-1">
                              <div
                                className={`flex bg-${isFavorite ? "[#006800]" : "[#17B3A6]"
                                  } cursor-pointer p-1 rounded-md`}
                                onClick={() => handleFavoriteClick(event.id)}
                              >
                                <FontAwesomeIcon
                                  icon={faHeart}
                                  className={`h-3 w-3 text-white`}
                                />
                              </div>
                              <div className="flex bg-[#17B3A6]  cursor-pointer text-center justify-center h-3 w-3 p-1 rounded-md">
                                <ShareIcon className="w-3 h-3 text-white" />
                              </div>
                            </div>
                          </td>
                          <div className="flex items-center justify-start my-1 ml-4">
                            <button
                              className="bg-[#52FF86] hover:bg-blue-700 text-white font-bold py-1 px-4 rounded"
                              onClick={() => handleComment(event)}
                            >
                              View
                            </button>
                          </div>
                        </tr>

                        {selectedEvent === event.id && (
                          <tr>
                            <CommentModel
                              closeModal={closeModal}
                              eventId={selectedEvent}
                            />
                          </tr>
                        )}
                      </React.Fragment>
                    );
                  })}
                </table>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

Table.defaultProps = {
  events: [],
};

export default Table;
