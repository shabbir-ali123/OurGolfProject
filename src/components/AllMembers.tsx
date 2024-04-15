import React, { useState } from 'react';
import { singleTeamsContextStore } from '../contexts/teamContext';
import { useTranslation } from "react-i18next";
const people = [
    {
      name: 'Lindsay Walton',
      title: 'Front-end Developer',
      department: 'Optimization',
      email: 'lindsay.walton@example.com',
      role: 'Member',
      image:
        'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
    {
        name: 'Lindsay Walton',
        title: 'Front-end Developer',
        department: 'Optimization',
        email: 'lindsay.walton@example.com',
        role: 'Member',
        image:
          'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      },
   
   
    
      {
        name: 'Lindsay Walton',
        title: 'Front-end Developer',
        department: 'Optimization',
        email: 'lindsay.walton@example.com',
        role: 'Member',
        image:
          'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      },
 
  ]
  
  export default function AllMembers() {
    const [visibleCount, setVisibleCount] = useState(5);
    const {waitingUsers, joinedUsers } = singleTeamsContextStore();
    const { t, i18n } = useTranslation();
    const loadMore = () => {
        setVisibleCount((prevCount) => prevCount + 5);
      };
    return (
      <div className="px-4 max-w-5xl mx-auto sm:px-6 lg:px-8 py-4  rounded-lg my-10">
         <div className=" flex flex-col justify-center py-4 px-10 mt-10 shadow-[0px_0px_10px_rgba(0,_0,_0,_0.25)] rounded-lg">
              <div className="flex gap-2 ">
                <div>
                  <img src="/img/golfplyr.png" alt="" width="40px" />
                  <b className="text-xl lg:text-17xl text-darkslateblue-300 leading-[18px] [text-shadow:0px_7px_4px_#ccf2fe]">
                    {t("ALL_MEMBERS")}
                  </b>
                </div>
              </div>
              <div className="">

                <div className=" ">
                  <div className="bg-[#0d7168] text-white rounded-sm ">
                    <h4 className="p-2">{t("Confirmed Members")}</h4>
                  </div>
                  <table className=" ">

                    <tbody className="flex flex-wrap gap-2  ">
                      {joinedUsers?.length && joinedUsers?.map((player: any, index: any) => (
                        <tr key={player.id} className="">
                          <td className="px-3 py-2 text-sm text-gray-500">
                            <div className="text-center">
                              <img className="h-10 w-10 rounded-full" src={player.imageUrl} alt="" />
                              <div>
                                <div className="text-sm font-medium text-gray-900">{player.nickName}</div>

                              </div>
                            </div>
                          </td>



                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className=" ">
                  <div className="bg-[#17b3a6] text-white rounded-sm ">
                    <h4 className="p-2">{t("Waiting Members")}</h4>
                  </div>
                  <table className=" ">

                    <tbody className="flex flex-wrap gap-2 ">
                      {waitingUsers?.length && waitingUsers?.map((player: any, index: any) => (

                        <tr key={player.id} className="">
                          <td className="px-3 py-2 text-sm text-gray-500">
                            <div className="text-center">
                              <img className="h-10 w-10 rounded-full" src={player.imageUrl} alt="" />
                              <div>
                                <div className="text-sm font-medium text-gray-900">{player.nickName}</div>
                                {/* {isCreated &&
                                <div>
                                  
                                  
                                  <button className="flex items-center gap-1 cursor-pointer bg-[#17b3a6] text-white rounded-lg my-2" onClick={(e)=>{handleApprove(e, player.id)}}><CheckBadgeIcon className="w-6 h-6 text-white"/>{t("ACCEPT")}</button>
                                <button className="flex items-center gap-1 cursor-pointer bg-transparent border border-solid border-[#17b3a6]  rounded-lg my-2 py-1 text-[#17b3a6]" onClick={(e)=>{}}><XMarkIcon className="w-5 h-5 text-[#17b3a6]"/>{t("DECLINE")}</button>
                                </div>
                                } */}

                              </div>
                            </div>
                          </td>


                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              {/* <div className=" ">
                <div className="bg-[#17b3a6] text-white rounded-sm ">
                  <h4 className="p-2">{t("Bookedmark Members")}</h4>
                </div>
                <table className=" ">

                  <tbody className="flex flex-wrap gap-2 ">
                    {waitingUsers?.length && waitingUsers?.map((player: any, index: any) => (
                      <tr key={player.id} className="">
                        <td className="px-3 py-2 text-sm text-gray-500">
                          <div className="text-center">
                            <img className="h-10 w-10 rounded-full" src={player.imageUrl} alt="" />
                            <div>
                              <div className="text-sm font-medium text-gray-900">{player.nickName}</div>

                            </div>
                          </div>
                        </td>



                      </tr>
                    ))}
                  </tbody>
                </table>
              </div> */}
            </div>
        {visibleCount < people.length && (
        <div className="flex justify-center mt-4">
          <button onClick={loadMore} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Load More
          </button>
        </div>
      )}
      </div>
    )
  }
  