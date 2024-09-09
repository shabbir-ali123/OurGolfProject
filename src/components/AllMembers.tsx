import React, { useState } from 'react';
import { singleTeamsContextStore } from '../contexts/teamContext';
import { useTranslation } from "react-i18next";
import { singleEventContextStore } from '../contexts/eventContext';
import { approveEvent, fetchSingleEvent } from "../utils/fetchEvents";
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { CheckBadgeIcon, XMarkIcon } from '@heroicons/react/24/solid';
export default function AllMembers() {
  const [visibleCount, setVisibleCount] = useState(5);
  const [activeTab, setActiveTab] = useState('confirmed');
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const { isCreated, singleEvent } = singleEventContextStore();
  const { handleSingleTeam, totalJoinedMembers, teamMembers, isJoined, isLoading, teams, waitingUsers = [], joinedUsers = [], handleIsLoading } = singleTeamsContextStore()
  const loadMore = () => {
    setVisibleCount((prevCount) => prevCount + 5);
  };
  
  const handleTabClick = (tab:any) => {
    setActiveTab(tab);
  };
  const handleApprove = (e: any, id: any) => {
    e.preventDefault();
    handleIsLoading(true);
    const obj = {
      userId: id,
      eventId: singleEvent?.id,
    }
    approveEvent(obj);
    toast.success("Approved Successfully");
    navigate(`/edit-team/${singleEvent?.id}`);

  }
  return (
    <div className="px-4 max-w-6xl mx-auto  sm:px-6 lg:px-8 py-4 rounded-lg my-10">
      <div className="flex flex-col justify-center py-4 px-10 mt-10 shadow-[0px_0px_10px_rgba(0,_0,_0,_0.25)] rounded-lg">
        <div className=" hidden xl:flex gap-2 items-center ">
          <img src="/img/golfplyr.png" alt="" width="40px" />
          <b className="text-xl lg:text-17xl text-darkslateblue-300 leading-[18px] [text-shadow:0px_7px_4px_#ccf2fe]">
            {t("ALL_MEMBERS")}
          </b>
        </div>
        
        <div className="grid grid-cols-2 gap-2 border-b border-gray-200 mb-4 py-6">
          <button
            className={`px-4 py-2 xl:py-4 text-[18px] xl:text-[20px] xl:font-bold  ${activeTab === 'confirmed' ? 'text-white bg-[#17b3a6]' : 'bg-transparent border-2 border-solid border-[#17B3A6] text-[#17B3A6]'}`}
            onClick={() => handleTabClick('confirmed')}
          >
            {t("Confirmed Members")}
          </button>
          <button
            className={`px-4 py-2 xl:py-4 text-[18px] xl:text-[20px] xl:font-bold ${activeTab === 'waiting' ? 'text-white bg-[#17b3a6]' : 'bg-transparent border-2 border-solid border-[#17B3A6] text-[#17B3A6]'}`}
            onClick={() => handleTabClick('waiting')}
          >
            {t("Waiting Members")}
          </button>
        </div>

        {activeTab === 'confirmed' && (
          <div className=" ">
            <table className=" ">
              <tbody className="flex flex-wrap gap-2">
                {joinedUsers.length > 0 ? joinedUsers.map((player:any, index:any) => (
                  <tr key={player.id} className="">
                    <td className="px-3 py-2 text-sm text-gray-500">
                      <div className="text-center">
                        <img className="h-10 w-10 rounded-full" src={player?.imageUrl} alt="" />
                        <div>
                          <div className="text-sm font-medium text-gray-900">{player?.nickName}</div>
                        </div>
                      
                      </div>
                    </td>
                  </tr>
                )) : (
                  <tr>
                    <td className="px-3 py-2 text-lg text-gray-500 text-center">
                      {t("No confirmed members")}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === 'waiting' && (
          <div className=" ">
            <table className=" ">
              <tbody className="flex flex-wrap gap-2">
                {waitingUsers.length > 0 ? waitingUsers.map((player:any, index:any) => (
                  <tr key={player.id} className="">
                    <td className="px-3 py-2 text-sm text-gray-500">
                      <div className="text-center">
                        <img className="h-10 w-10 rounded-full" src={player?.imageUrl} alt="" />
                        <div>
                          <div className="text-sm font-medium text-gray-900">{player?.nickName}</div>
                        </div>
                        {isCreated &&
                                    <div>


                                      <button className="flex items-center gap-1 cursor-pointer bg-[#17b3a6] text-white rounded-lg my-2" onClick={(e) => { handleApprove(e, player.id) }}><CheckBadgeIcon className="w-6 h-6 text-white" />{t("ACCEPT")}</button>
                                      <button className="flex items-center gap-1 cursor-pointer bg-transparent border border-solid border-[#17b3a6]  rounded-lg my-2 py-1 text-[#17b3a6]" onClick={(e) => { }}><XMarkIcon className="w-5 h-5 text-[#17b3a6]" />{t("DECLINE")}</button>
                                    </div>
                                  }
                      </div>
                    </td>
                  </tr>
                )) : (
                  <tr>
                    <td className="px-3 py-2 text-sm text-gray-500 text-center">
                      {t("No waiting members")}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* {(visibleCount < joinedUsers?.length + waitingUsers?.length) && (
        <div className="flex justify-center mt-4">
          <button onClick={loadMore} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            {t("Load More")}
          </button>
        </div>
      )} */}
    </div>
  );
}
