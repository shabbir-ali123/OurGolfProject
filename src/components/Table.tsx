import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
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
import { toast } from "react-toastify";
import { ToastConfig, toastProperties } from "../constants/toast";
import { eventContextStore, SingleEventsContext } from "../contexts/eventContext";
import { useTranslation } from "react-i18next";
import { deleteEvent } from "../utils/fetchEvents";
import socket from "../socket";
interface TableProps {
  events?: Array<{
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
  const { eventss, handleEvents } = eventContextStore();
  const router = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<string | null>(null);

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
        handleEvents((prevs: any) =>
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
        handleEvents((prev: any) =>
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
        `Please Login`,
        toastProperties as ToastConfig
      );
    }
  };

  const userId = localStorage.getItem("id");



  return (
    <div className="animate__animated animate__fadeInLeft">
      {(eventss || []).length === 0 ? (
        <div className="p-5 text-center">
          <span className="text-lg font-medium">No events yet</span>
        </div>
      ) : (

        <div className="flow-root  ">
          <div className="-my-2 overflow-x-auto xl:overflow-x-auto ">
            <div className="inline-block min-w-full py-0 align-middle ">
              <div className="overflow-hidden sm:rounded-lg">
                <table
                  className="relative min-w-full px-3 divide-y divide-gray-300 z-9"
                  style={{
                    borderCollapse: "separate",
                    borderSpacing: "0 20px",
                  }}
                >
                  <thead className="bg-[#F5F5F5] text-black  flex-col">
                    <tr>
                      <th
                        scope="col"
                        className="py-2 pl-4 pr-3 text-sm font-semibold text-left sm:pl-6"
                      >
                        {t("ORGANIZER")}
                      </th>
                     
                      <th
                        scope="col"
                        className="px-3 py-2 text-sm font-semibold text-left"
                      >
                        {t("EVENTS_NAME")} / {t("EVENT_DETAILS")}
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-2 text-sm font-semibold text-left"
                      >
                        {t("TIME")}
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-2 text-sm font-semibold text-left"
                      >
                        {t("JOINED_MEMBER")}
                      </th>

                      <th
                        scope="col"
                        className="px-3 py-2 text-sm text-left font-semibol"
                      >
                        {t("ACTIONS")}
                      </th>
                    </tr>
                  </thead>

                  {eventss.map((event: any, index: number) => {
                    const likes = event.likes || [];
                    const isFavorite = event.isFavorite || false;
                    const liked = likes.find(
                      (like: any) =>
                        parseInt(`${like.userId}`) === parseInt(`${userId}`)
                    )?.counter;

                    return (
                      <React.Fragment key={index}>
                        <tr
                          className="mt-4 rounded-lg cursor-pointer text-black hover:rounded-lg hover:bg-[#DDF4F2] hover:text-black"
                          style={{
                            width: "100%",
                            borderRadius: "10px",
                            border: "none",
                            boxShadow:
                              "rgb(253 253 255 / 0%) 0px 0px 0px 0px, rgba(0, 0, 0, 0.3) 0px 1px 11px 1px",
                          }}
                        >
                          <td
                            className=""
                            onClick={() => router(`/edit-team/${event.id}`)}
                          >
                            <div className="flex-wrap text-start items-center justify-start mx-4">
                              <img
                                src={
                                  event.imageUrl[0]
                                    ? event.imageUrl[0]
                                    : "img/BG-GOLF.jpg"
                                }
                                alt=""
                                className="w-16 h-16 border border-indigo-600 border-solid rounded-full "
                              />

                              <div
                                className="text-lg font-medium leading-6 truncate tableText"
                                title={event.creator && event.creator.nickName ? event.creator.nickName : "N/A"}
                              >
                                {event.creator && event.creator.nickName
                                  ? event.creator.nickName.length > 10
                                    ? `${event.creator.nickName.substring(0, 10)}...`
                                    : event.creator.nickName
                                  : "N/A"}
                              </div>

                            </div>
                          </td>
                          <td
                            className="flex items-center justify-between ml-2 text-sm  text-center whitespace-pre-wrap xl:text-left"
                            onClick={() => router(`/edit-team/${event.id}`)}
                          >
                            <div className="flex flex-col ">
                              <p className="font-bold text-2xl  capitalize text-start">{event.eventName}</p>

                              <span className="flex items-center gap-1 font-normal ">
                                <MapPinIcon
                                  className={`-mr-0.5 h-4 w-4 ${event.type !== "full" && "text-[#33333]"
                                    }`}
                                  aria-hidden="true"
                                />
                                {event.place}
                              </span>
                              <p className="text-start m-0 my-1 text-sm ">
                                {event.eventDetails.length > 100 ? `${event.eventDetails.substring(0, 100)}...` : event.eventDetails}
                              </p>
                            </div>

                            
                          </td>
                          <td
                            className="px-3 py-0 text-sm whitespace-nowrap"
                            onClick={() => router(`/edit-team/${event.id}`)}

                          >
                            <p>
                              {event.eventStartDate}
                            </p>

                            {event.eventStartTime}
                          </td>
                         
                          <td
                            className="px-3 py-2 text-sm flex-wrap"
                            onClick={() => router(`/edit-team/${event.id}`)}
                          >
                            <p className="my-1 p-0">
                              <span className="font-bold m-0 p-0"> {t("CONFIRMED")}:</span>  {event.teamMemberCount} / {event.capacity * event.teamSize}
                            </p>
                            <p className="m-0 p-0">
                              <span className="font-bold ">
                                {t("WAITING")}:
                              </span> {event.teamMemberCount} / {event.capacity * event.teamSize}

                            </p>
                            <span className=" px-2 text-[#17B3A6] font-bold py-0 text-sm mx-0  sm:mx-2 cursor-pointer  ">
                            <p className="bg-[#DDF4F2] w-10 px-6 py-2 text-center rounded-lg m-0 hover:bg-black"  style={{
                         
                            boxShadow:
                              "rgb(253 253 255 / 0%) 0px 0px 0px 0px, rgba(0, 0, 0, 0.3) 0px 1px 11px 1px",
                          }} >Join</p>
                            </span>
                          </td>
                          <div className="text-start flex items-center" >
                            <div>
                            <td className="flex gap-3 justify-center items-center py-0 text-sm whitespace-nowrap ">
                            <div className="flex flex-col items-center gap-1 ">
                              <div
                                className={`flex shadow-lg border border-solid bg-white border-[#17B3A6] hover:bg-black bg-${liked ? "green" : "[#17B3A6]"
                                  } cursor-pointer p-1 rounded-md`}
                                onClick={() => handleLike(event)}
                              >
                                <HandThumbUpIcon className="w-4 h-4 text-[#17B3A6]" />
                              </div>
                              <div className="flex bg-white border-[#17B3A6]  cursor-pointer text-center justify-center items-center h-4 w-4 p-1 rounded-md shadow-lg border border-solid border-white ">
                                <div className="text-[12px] text-[#17B3A6]  ">
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
                                className="flex shadow-lg border border-solid bg-white border-[#17B3A6] hover:bg-black p-1 rounded-md"
                              >
                                <ChatBubbleBottomCenterIcon className="w-4 h-4 text-[#17B3A6] " />
                              </div>
                              <div className="flex bg-white border-[#17B3A6]   cursor-pointer text-center justify-center items-center h-4 w-4 p-1 rounded-md shadow-lg border border-solid border-white">
                                <div className="text-[12px] text-[#17B3A6]">
                                  {event.comments?.length}
                                </div>
                              </div>
                            </div>
                            <div className="flex flex-col items-center gap-1">
                              <div
                                className={`flex shadow-lg border border-solid border-[#17B3A6] p-1 hover:bg-black bg-${isFavorite ? "[white]" : "[white]"
                                  }  cursor-pointer p-1 rounded-md`}
                                onClick={() => handleFavoriteClick(event.id)}
                              >
                                <FontAwesomeIcon
                                  icon={faHeart}
                                  className={`h-4 w-4 text-${isFavorite ? "[red]" : "[#17B3A6]"
                                }`}
                                />
                              </div>
                              <div className="flex shadow-lg border border-solid bg-white border-[#17B3A6] p-1 rounded-md">
                                <ShareIcon className="w-4 h-4 text-[#17B3A6]" />
                              </div>
                            </div>
                          </td>
                          <div className="flex items-center justify-center py-2">
                            <button
                              className="bg-[#DDF4F2] hover:bg-black text-[#17B3A6] font-bold py-2 px-8 rounded cursor-pointer"
                              onClick={() => router(`/score-board/${event.id}`)}
                              style={{
                         
                                boxShadow:
                                  "rgb(253 253 255 / 0%) 0px 0px 0px 0px, rgba(0, 0, 0, 0.3) 0px 1px 11px 1px",
                              }}
                            >
                              {t("VIEW")}
                            </button>
                          </div>
                            </div>
                        
                          </div>
                        
                        </tr>

                        {selectedEvent === event.id && (
                          <tr>
                            <SingleEventsContext>
                            <CommentModel
                              closeModal={closeModal}
                              eventId={event.id}
                            />
                            </SingleEventsContext>
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
