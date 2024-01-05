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
import { useTranslation } from "react-i18next";
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
  const { t } = useTranslation(); 
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
 
  return (
    <div className="animate__animated animate__fadeInLeft">
      <div className="flow-root mt-2">
        <div className="-my-2 overflow-x-auto ">
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
                      className="py-2 pl-4 pr-3 text-sm font-semibold text-left sm:pl-6"
                    >
                      {t('ORGANIZER')}
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-2 text-sm font-semibold text-left"
                    >
                      {t('TIME')}
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-2 text-sm font-semibold text-left"
                    >
                      {t('DATE')}
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-2 text-sm font-semibold text-left"
                    >
                      {t('EVENTS_NAME')}
                    </th>

                    <th
                      scope="col"
                      className="px-3 py-2 text-sm font-semibold text-left"
                    >
                      {t('SHORT_NOTES')}
                    </th>

                    <th
                      scope="col"
                      className="px-3 py-2 text-sm text-left font-semibol"
                    >
                      {t('ACTIONS')}
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200 ">
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
                              className="w-12 h-12 bg-gray-800 rounded-full "
                            />
                            <div className="text-lg font-medium leading-6 truncate ">
                            {event.organizer && event.organizer.nickName ? event.organizer.nickName : 'N/A'}
                            </div>
                          </div>
                        </td>
                        <td className="px-3 py-0 text-lg whitespace-nowrap">
                          {event.eventStartTime}
                        </td>
                        <td className="px-3 py-0 text-lg whitespace-nowrap">
                          {event.eventStartDate}
                        </td>
                        <td className="flex items-center justify-between ml-2 text-sm font-semibold text-center whitespace-pre-wrap xl:text-left ">
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
                        <td className="px-3 py-0 text-sm whitespace-nowrap">
                          {event.eventDetails}
                        </td>
                        <td className="flex gap-1 px-3 py-0 text-sm whitespace-nowrap ">
                          <div className="flex flex-col items-center gap-1">
                            <div
                              className={`flex bg-${
                                liked ? "green" : "[#17B3A6]"
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
                              <div className="text-[10px] text-white">{event.comments.counter}</div>
                            </div>
                          </div>
                          <div className="flex flex-col items-center gap-1">
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
                              <ShareIcon className="w-3 h-3 text-white" />
                            </div>
                          </div>
                        </td>
                        <div className="flex items-center justify-start my-1 ml-4">
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
