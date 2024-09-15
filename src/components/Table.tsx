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
import {
  eventContextStore,
  SingleEventsContext,
} from "../contexts/eventContext";
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
  const { eventss, handleEvents, eventStatus, search } = eventContextStore();
  const router = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const handleComment = (eventId: string) => {
    setSelectedEvent(eventId);
    setShowModal(!showModal);
  };
  const [checkedJoined, setCheckedJoined] = useState(false);

  useEffect(() => {
    if (eventStatus === "joined") {
      setCheckedJoined(true);
    } else {
      setCheckedJoined(false);
    }
    
    console.log(eventStatus);
  }, [checkedJoined, eventStatus]);

  const filteredEvents = eventss?.filter((event:any) =>
    event.eventName.toLowerCase().includes(search.toLowerCase())
  );

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
      toast.error(`Please Login`, toastProperties as ToastConfig);
    }
  };

  const userId = localStorage.getItem("id");

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="animate__animated animate__fadeInLeft">
      {(eventss || []).length === 0 ? (
        <div className="p-5 text-center">
          <span className="text-lg font-medium">No events yet</span>
        </div>
      ) : (
        <div className="flow-root  ">
          <div className="-my-2  ">
            <div className="inline-block min-w-full py-0 align-middle ">
              <div className="sm:rounded-lg">
                {!isMobile ? (
                  <table
                    className="relative min-w-full  divide-y divide-gray-300 z-9"
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

                    {filteredEvents?.map((event: any, index: number) => {
                      const likes = event.likes || [];
                      const isFavorite = event.isFavorite || false;
                      const liked = likes.find(
                        (like: any) =>
                          parseInt(`${like.userId}`) === parseInt(`${userId}`)
                      )?.counter;
                      const isUserIdMatched = event?.teams?.some((team: any) =>
                        team?.members?.some(
                          (member: any) => member.userId == userId
                        )
                      );
                      console.log(isUserIdMatched)
                      const currentDate = new Date();
                      const endDate = new Date(event?.eventEndDate);
                      const deadlineData = new Date(event?.eventDeadlineDate);
                      const isEventOver = currentDate > endDate;
                      const isDeadlineOver = currentDate > deadlineData;
                      // const isJoined = 
                      const n =  parseInt(userId || "");

                      const isUserIdInData = event?.teams?.some((team:any) => 
                        team.members.some((member:any) => member.userId === n)
                    );
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
                                    event?.creator?.imageUrl
                                      ? event?.creator?.imageUrl
                                      : "img/BG-GOLF.jpg"
                                  }
                                  alt=""
                                  className="w-16 h-16 border border-indigo-600 border-solid rounded-full "
                                />

                                <div
                                  className="text-lg font-medium leading-6 truncate tableText"
                                  title={
                                    event.creator && event.creator.nickName
                                      ? event.creator.nickName
                                      : "N/A"
                                  }
                                >
                                  {event.creator && event.creator.nickName
                                    ? event.creator.nickName.length > 10
                                      ? `${event.creator.nickName.substring(
                                        0,
                                        10
                                      )}...`
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
                                <p className="font-bold text-2xl  capitalize text-start">
                                  {event.eventName}
                                </p>

                                <span className="flex items-center gap-1 font-normal ">
                                  <MapPinIcon
                                    className={`-mr-0.5 h-4 w-4 ${event.type !== "full" && "text-[#33333]"
                                      }`}
                                    aria-hidden="true"
                                  />
                                  {event.place}
                                </span>
                                <p className="text-start m-0 my-1 text-sm ">
                                  {event.eventDetails.length > 100
                                    ? `${event.eventDetails.substring(
                                      0,
                                      100
                                    )}...`
                                    : event.eventDetails}
                                </p>
                              </div>
                            </td>
                            <td
                              className="px-3 py-0 text-sm whitespace-nowrap"
                              onClick={() => router(`/edit-team/${event.id}`)}
                            >
                              <p>{event.eventStartDate}</p>

                              {event.eventStartTime}
                            </td>

                            <td className="px-3 py-2 text-sm flex-wrap">
                              <p className="my-1 p-0">
                                <span className="font-bold m-0 p-0">
                                  {" "}
                                  {t("CONFIRMED")}:
                                </span>{" "}
                                {new Set(event.teams?.flatMap((team: any) => team?.members.map((member: any) => member?.userId))).size
                                }                  /              {event?.capacity * event?.teamSize}
                              </p>
                              <p className="m-0 p-0 mb-4">
                                <span className="font-bold ">
                                  {t("WAITING")}:
                                </span>{" "}
                                {event.teamMemberCount} /{" "}
                                {event.capacity * event.teamSize}
                              </p>

                              {/* {checkedJoined &&
                                event.eventType !== "normal" &&
                                !isEventOver ? (
                                <span
                                  className=" w-[30%]  text-[#17B3A6] font-bold py-0 text-sm mx-0  sm:mx-2 cursor-pointer  "
                                  onClick={(e) => {
                                    e.preventDefault();
                                    router("/add-score-page/" + event.id);
                                  }}
                                >
                                  <p
                                    className="bg-[#DDF4F2] py-2 text-center rounded-lg m-0 hover:bg-black"
                                    style={{
                                      boxShadow:
                                        "rgb(253 253 255 / 0%) 0px 0px 0px 0px, rgba(0, 0, 0, 0.3) 0px 1px 11px 1px",
                                    }}
                                  >
                                    {t("ADD_SCORE")}
                                  </p>
                                </span>
                              ) : !isDeadlineOver || !isEventOver ? (
                                <span
                                  className={` ${isUserIdMatched
                                      ? "text-[#fff]"
                                      : "text-[#17B3A6]"
                                    } px-2  font-bold py-0 text-sm mx-0  sm:mx-2 cursor-pointer `}
                                  onClick={() => {
                                    isUserIdMatched &&
                                      event.scoringType != "Normal"
                                      ? router(`/add-score-page/${event.id}`)
                                      : isUserIdMatched &&
                                        event.scoringType == "Normal"
                                        ? router(`/edit-team/${event.id}`)
                                        : !isDeadlineOver && isUserIdMatched
                                          ? router("/pay-now/" + event.id)
                                          : router("/score-board/" + event.id);
                                  }}
                                >
                                  <p
                                    className={` ${isUserIdMatched
                                        ? "bg-[#ff373a]"
                                        : "bg-[#DDF4F2]"
                                      }   w-[70%] px-0 py-2 text-center rounded-lg m-0 hover:bg-black`}
                                    style={{
                                      boxShadow:
                                        "rgb(253 253 255 / 0%) 0px 0px 0px 0px, rgba(0, 0, 0, 0.3) 0px 1px 11px 1px",
                                    }}
                                  >
                                    {isUserIdMatched &&
                                      event.scoringType != "Normal"
                                      ? t("EDITSCORE")
                                      : isUserIdMatched &&
                                        event.scoringType == "Normal"
                                        ? t("hjgj")
                                        : !isDeadlineOver && isUserIdMatched
                                          ? t("JOIN")
                                          : t("VIEW_SCORE")}
                                  </p>
                                </span>
                              ) : (
                                <div
                                  className={` ${isUserIdMatched
                                      ? "text-[#fff]"
                                      : "text-[#17B3A6]"
                                    } px-2  font-bold py-0 text-sm mx-0  sm:mx-2 cursor-pointer `}
                                >
                                  <p
                                    className={` ${isUserIdMatched
                                        ? "bg-[#ff373a]"
                                        : "bg-[#DDF4F2]"
                                      }   w-[70%] px-0 py-2 mt-2 text-center rounded-lg m-0 hover:bg-black`}
                                    style={{
                                      boxShadow:
                                        "rgb(253 253 255 / 0%) 0px 0px 0px 0px, rgba(0, 0, 0, 0.3) 0px 1px 11px 1px",
                                    }}
                                  >
                                    {t("EVENT_END")}
                                  </p>
                                </div>
                              )} */}


                              {/* new one */}
                              {
                                isUserIdInData ?
                                <>
                                {event.eventType !== "normal" && isEventOver ? 
                                  <span className="bg-red text-white p-2 text-center rounded-lg m-0 hover:bg-black hover:text-white" style={{
                                    boxShadow:
                                      "rgb(253 253 255 / 0%) 0px 0px 0px 0px, rgba(0, 0, 0, 0.3) 0px 1px 11px 1px",
                                  }} >{t("EVENT_END")}</span>
                                : event.eventType !== "normal" && !isEventOver  ? <span onClick={(e) => {
                                  e.preventDefault();
                                  router("/edit-team/" + event.id);
                                }} className="bg-red text-white p-2 text-center rounded-lg m-0 hover:bg-black hover:text-white">{t("ADD_SCORE")}</span>
                                :  event.eventType === "normal" && !isEventOver   ? <span>{t("JOINED")}</span>
                                : <span  onClick={(e) => {
                                  e.preventDefault();
                                  router("/edit-team/" + event.id);
                                }}>{t("EVENT_END")}</span>} 
                                </> :
                                <>
                                {
                                  isDeadlineOver ? <span onClick={(e) => {
                                    e.preventDefault();
                                    router("/edit-team/" + event.id);
                                  }} className="bg-[#ddf4f2]  p-2 text-center text-[#17B3A6] rounded-lg m-0 hover:bg-black hover:text-white " style={{
                                    boxShadow:
                                      "rgb(253 253 255 / 0%) 0px 0px 0px 0px, rgba(0, 0, 0, 0.3) 0px 1px 11px 1px",
                                  }}> {t("JOINING_OVER")} </span>:   <span onClick={(e) => {
                                    e.preventDefault();
                                    router("/pay-now/" + event.id);
                                  }} className="bg-white  p-2 text-center rounded-lg m-0 hover:bg-black hover:text-white" style={{
                                    boxShadow:
                                      "rgb(253 253 255 / 0%) 0px 0px 0px 0px, rgba(0, 0, 0, 0.3) 0px 1px 11px 1px",
                                  }}>{t("JOIN_NOW")}</span>
                                }
                                
                               
                                </>
                              }
                            </td>
                            <div className="text-start flex items-center">
                              <div>
                                <td className="flex gap-3 justify-center items-center py-0 text-sm whitespace-nowrap ">
                                  <div className="flex flex-col items-center gap-1 ">
                                    <div
                                      className={`flex shadow-lg border border-solid  border-[#17B3A6] hover:bg-black bg-${liked ? "white" : "[white]"
                                        } cursor-pointer p-1 rounded-md`}
                                      onClick={() => handleLike(event)}
                                    >
                                      <HandThumbUpIcon
                                        className={`w-4 h-4 text-${liked ? "red" : "[#17B3A6]"
                                          } `}
                                      />
                                    </div>
                                    <div className="flex bg-white border border-solid  border-[#17B3A6] p-1 rounded-md   cursor-pointer text-center justify-center items-center h-4 w-4 p-1 rounded-md ">
                                      <div className="text-[12px]  text-[#17B3A6]  ">
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
                                    <div className="flex bg-white border border-solid  border-[#17B3A6] p-1 rounded-md   cursor-pointer text-center justify-center items-center h-4 w-4 p-1 rounded-md ">
                                      <div className="text-[12px] text-[#17B3A6]">
                                        {event.comments?.length}
                                      </div>
                                    </div>
                                  </div>
                                  <div className="flex flex-col items-center gap-1">
                                    <div
                                      className={`flex shadow-lg border border-solid border-[#17B3A6] p-1 hover:bg-black bg-${isFavorite ? "[white]" : "[white]"
                                        }  cursor-pointer p-1 rounded-md`}
                                      onClick={() =>
                                        handleFavoriteClick(event.id)
                                      }
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
                                <div className="flex items-center gap-2 justify-center py-2">
                                  <button
                                    className="bg-[#DDF4F2] hover:bg-black text-[#17B3A6] font-bold py-2 px-2 rounded cursor-pointer"
                                    onClick={() =>
                                      router(`/score-board/${event.id}`)
                                    }
                                    style={{
                                      boxShadow:
                                        "rgb(253 253 255 / 0%) 0px 0px 0px 0px, rgba(0, 0, 0, 0.3) 0px 1px 11px 1px",
                                    }}
                                  >
                                    {t("VIEW")}
                                  </button>
                                  <button
                                    className="bg-[#DDF4F2] hover:bg-black text-[#17B3A6] font-bold py-2 px-2 rounded cursor-pointer"
                                    onClick={() =>
                                      router(`/message-page`)
                                    }
                                    style={{
                                      boxShadow:
                                        "rgb(253 253 255 / 0%) 0px 0px 0px 0px, rgba(0, 0, 0, 0.3) 0px 1px 11px 1px",
                                    }}
                                  >
                                    {t("CHAT")}
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
                                  eventIsd={event.id}
                                />
                              </SingleEventsContext>
                            </tr>
                          )}
                        </React.Fragment>
                      );
                    })}
                  </table>
                ) : (
                  eventss?.map((item: any) => {
                    const likes = item.likes || [];
                    const isFavorite = item.isFavorite || false;
                    const liked = likes.find(
                      (like: any) =>
                        parseInt(`${like.userId}`) === parseInt(`${userId}`)
                    )?.counter;
                    const isUserIdMatched = item?.teams?.some((team: any) =>
                      team?.members?.some(
                        (member: any) => member?.userId == userId
                      )
                    );
                    const currentDate = new Date();
                    const endDate = new Date(item?.eventEndDate);
                    const deadlineData = new Date(item?.eventDeadlineDate);
                    const isEventOver = currentDate > endDate;
                    const isDeadlineOver = currentDate > deadlineData;
                    const n =  parseInt(userId || "");
                    const isUserIdInData = item?.teams?.some((team:any) => 
                      team.members.some((member:any) => member.userId === n)
                  );
                    return (
                      <div className="grid gap-2 px-4 py-1 border border-solid border-[#DCDCDC] mb-2 items-center">
                        <div className="grid grid-cols-2 bg-[#F5F5F5] items-center ">
                          <div className="py-2">
                            <p className="m-0">Organizer</p>
                          </div>
                          <div className="py-2">
                            <p className="m-0 text-start">Event Name/ Detail</p>
                          </div>
                        </div>
                        <div
                          className="grid grid-cols-2 bg-#ffffff  justify-center cursor-pointer"
                          onClick={() => router(`/edit-team/${item.id}`)}
                        >
                          <div className="flex justify-start cursor-pointer h-[50px] w-[50px]">
                            <img
                              src={
                                item.creator?.imageUrl
                                  ? item.creator?.imageUrl
                                  : "img/BG-GOLF.jpg"
                              }
                              alt=""
                              className="w-full h-full border border-indigo-600 border-solid rounded-full "
                            />
                          </div>
                          <div>
                            <p className="capitalize text-justify  p-0 m-0">
                              Event By: <br /> {item.eventName}
                            </p>
                            <p className="text-start m-0 my-1 text-sm ">
                              {item.eventDetails.length > 100
                                ? `${item.eventDetails.substring(0, 100)}...`
                                : item.eventDetails}
                            </p>
                          </div>
                          <div className="text-start">
                            <p className="m-0 ">
                              {item.creator && item.creator.nickName
                                ? item.creator.nickName
                                : "N/A"}
                            </p>
                          </div>
                        </div>

                        <div className="grid grid-cols-3 bg-[#F5F5F5] items-center ">
                          <div className="p-2">Date</div>
                          <div className="p-2">Joined Members</div>
                          <div className="p-2">Actions</div>
                        </div>
                        <div className="grid grid-cols-3 bg-[#ffffff] cursor-pointer">
                          <div
                            className="p-2"
                            onClick={() => router(`/edit-team/${item.id}`)}
                          >
                            {item.eventStartDate}
                          </div>
                          <div
                            className="p-2"
                            onClick={() => router(`/edit-team/${item.id}`)}
                          >
                            <p className="my-1 p-0">
                              <span className="font-bold text-sm m-0 p-0">
                                {t("CONFIRMED")}:
                              </span>
                              <br />
                              {
                                
                                new Set(item?.teams?.map((team: any) => team?.userId)).size
                              } /
                              {item.capacity * item.teamSize}
                            </p>
                            <p
                              className="m-0 p-0  pb-2 "
                              onClick={() => router(`/edit-team/${item.id}`)}
                            >
                              <span className="font-bold text-sm">
                                {t("WAITING")}:
                              </span>{" "}
                              <br /> {item.teamMemberCount} /{" "}
                              {item.capacity * item.teamSize}
                            </p>
                            {
                                isUserIdInData ?
                                <>
                                {item.eventType !== "normal" && isEventOver ? 
                                  <span className="bg-red text-white p-2 text-center rounded-lg m-0 hover:bg-black hover:text-white w-full" style={{
                                    boxShadow:
                                      "rgb(253 253 255 / 0%) 0px 0px 0px 0px, rgba(0, 0, 0, 0.3) 0px 1px 11px 1px",
                                  }} >{t("EVENT_END")}</span>
                                : item.eventType !== "normal" && !isEventOver  ? <span onClick={(e) => {
                                  e.preventDefault();
                                  router("/edit-team/" + item.id);
                                }} className="bg-red text-white p-2 text-center rounded-lg m-0 hover:bg-black hover:text-white">{t("ADD_SCORE")}</span>
                                :  item.eventType === "normal" && !isEventOver   ? <span>{t("JOINED")}</span>
                                : <span  onClick={(e) => {
                                  e.preventDefault();
                                  router("/edit-team/" + item.id);
                                }}>{t("EVENT_END")}</span>} 
                                </> :
                                <>
                                {
                                  isDeadlineOver ? <span onClick={(e) => {
                                    e.preventDefault();
                                    router("/edit-team/" + item.id);
                                  }} className="bg-[#ddf4f2]  p-2 text-center text-[#17B3A6] rounded-lg m-0 hover:bg-black hover:text-white " style={{
                                    boxShadow:
                                      "rgb(253 253 255 / 0%) 0px 0px 0px 0px, rgba(0, 0, 0, 0.3) 0px 1px 11px 1px",
                                  }}> {t("JOINING_OVER")} </span>:   <span onClick={(e) => {
                                    e.preventDefault();
                                    router("/pay-now/" + item.id);
                                  }} className="bg-white  p-2 text-center rounded-lg m-0 hover:bg-black hover:text-white" style={{
                                    boxShadow:
                                      "rgb(253 253 255 / 0%) 0px 0px 0px 0px, rgba(0, 0, 0, 0.3) 0px 1px 11px 1px",
                                  }}>{t("JOIN")}</span>
                                }
                                
                               
                                </>
                              }
                          </div>
                          <div className="p-2">
                            <div className="text-start flex items-center">
                              <div>
                                <td className="flex gap-3 justify-center items-center py-0 text-sm whitespace-nowrap ">
                                  <div className="flex flex-col items-center gap-1 ">
                                    <div
                                      className={`flex shadow-lg border border-solid  border-[#17B3A6] hover:bg-black bg-${liked ? "white" : "[white]"
                                        } cursor-pointer p-1 rounded-md`}
                                      onClick={() => handleLike(item)}
                                    >
                                      <HandThumbUpIcon
                                        className={`w-4 h-4 text-${liked ? "red" : "[#17B3A6]"
                                          } `}
                                      />
                                    </div>
                                    <div className="flex bg-white border border-solid  border-[#17B3A6] p-1 rounded-md   cursor-pointer text-center justify-center items-center h-4 w-4 p-1 rounded-md ">
                                      <div className="text-[12px]  text-[#17B3A6]  ">
                                        {
                                          (item?.likes || []).filter(
                                            (like: any) => like.counter
                                          ).length
                                        }
                                      </div>
                                    </div>
                                  </div>
                                  <div className="flex flex-col items-center gap-1">
                                    <div
                                      onClick={() => handleComment(item.id)}
                                      className="flex shadow-lg border border-solid bg-white border-[#17B3A6] hover:bg-black p-1 rounded-md"
                                    >
                                      <ChatBubbleBottomCenterIcon className="w-4 h-4 text-[#17B3A6] " />
                                    </div>
                                    <div className="flex bg-white border border-solid  border-[#17B3A6] p-1 rounded-md   cursor-pointer text-center justify-center items-center h-4 w-4 p-1 rounded-md ">
                                      <div className="text-[12px] text-[#17B3A6]">
                                        {item.comments?.length}
                                      </div>
                                    </div>
                                  </div>
                                  <div className="flex flex-col items-center gap-1">
                                    <div
                                      className={`flex shadow-lg border border-solid border-[#17B3A6] p-1 hover:bg-black bg-${isFavorite ? "[white]" : "[white]"
                                        }  cursor-pointer p-1 rounded-md`}
                                      onClick={() =>
                                        handleFavoriteClick(item.id)
                                      }
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
                                <div className="flex items-center justify-center py-2 mt-[25px]">
                                  <button
                                    className="bg-[#DDF4F2] hover:bg-black text-[#17B3A6] font-bold py-2 px-8 rounded cursor-pointer"
                                    onClick={() =>
                                      router(`/score-board/${item.id}`)
                                    }
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
                          </div>
                        </div>
                        {selectedEvent === item.id && (
                          <div className="flex justify-center">
                            <SingleEventsContext>
                              <CommentModel
                                closeModal={closeModal}
                                eventIsd={item.id}
                              />
                            </SingleEventsContext>
                          </div>
                        )}
                      </div>
                    );
                  })
                )}
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
