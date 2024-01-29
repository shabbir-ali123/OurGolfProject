import ChampionShipName from "../components/ChampionShipName";
import { FunctionComponent, useEffect, useRef, useState } from "react";
import Player from "../components/Player";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { useTranslation } from "react-i18next";
import { API_ENDPOINTS } from "../appConfig";
interface Team {
  name: string;
}
const EditTeamPage: FunctionComponent = () => {
  const { t, i18n } = useTranslation();
  document.body.dir = i18n.dir();
  const shouldOpenDialog = localStorage.getItem("showDialog") === "true";
  const [open, setOpen] = useState(shouldOpenDialog);
  const [teams, setTeams] = useState<Team[]>([]);
  const [playerList, setPlayerList] = useState([
    { name: "John Doe" },
    { name: "Jane Smith" },
    { name: "Mike Johnson" },
  ]);
  useEffect(() => {
    const fetchTeams = async () => {
      try {
        
        const response = await fetch(API_ENDPOINTS.GETALLTEAMS, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
       
          },
        });
        const data = await response.json();
        setTeams(data.teams);
      } catch (error) {
        console.error("Error fetching teams:", error);
      }
    };
  
    fetchTeams();
  }, []);
  
  const [showPlayerList, setShowPlayerList] = useState(false);
  useEffect(() => {
    localStorage.setItem("showEditTeamDialog", open.toString());
  }, [open]);
  const shouldOpenEditDialog =
    localStorage.getItem("showEditTeamDialog") === "true";
  const [opens, setEditOpen] = useState(shouldOpenEditDialog);

  useEffect(() => {
    localStorage.setItem("showEditTeamDialog", opens.toString());
  }, [open]);
  const cancelButtonRef = useRef(null);
  const handleOpenPlayerList = () => {
    setShowPlayerList(true);
  };
  return (
    <div className="h-[100vh]   text-left text-lg text-white font-poppins mt-20 [background:linear-gradient(180deg,_#edfffd,_#f2fffa)]  ">
      <ChampionShipName />

      <div className="max-w-7xl mx-auto my-4">
        <div className="flex justify-between items-center">
          <div>
            <img src="/img/golfplyr.png" alt="" width="40px" />
            <b className=" text-17xl text-darkslateblue-300 leading-[18px] [text-shadow:0px_7px_4px_#ccf2fe]">
              Edit Teams
            </b>
          </div>
          <div className="mt-10 flex gap-2">
            <div className="flex gap-2 items-center ">
              <label
                className="block mb-2 text-xs font-normal tracking-wide text-black captilize"
                htmlFor="grid-event-name"
              >
                {t('TEAM_SIZE')}
              </label>
              <input
                className="appearance-none block w-[80px] bg-gray-200 text-green border border-[#51ff85] bg-transparent hover:animate-bounce rounded py-2 px-2 mb-0 leading-tight focus:outline-none "
                id="grid-Event-Name"
                type="number"
                name="teamSize"

                min="0"
              />
            </div>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-normal py-1 px-2 rounded" onClick={handleOpenPlayerList}>Remove Players List</button>
          </div>
        </div>
        <table className="w-full border-spacing-y-5 ">
          <thead className="text-left text-whitesmoke-100">
            <tr className="shadow-[0px_4px_10px_rgba(0,_0,_0,_0.25)] bg-lightseagreen-200  h-[55px] text-xl ">
              <th className="pl-4 py-3 whitespace-nowrap rounded-s-[3px]  leading-[10.25px] font-medium ">
                Team Name
              </th>
              <th className="pl-4 py-3  leading-[10.25px] font-medium">
                {t("PLAYER")}1
              </th>
              <th className="pl-4 py-3  leading-[10.25px] font-medium">
                {t("PLAYER")}2
              </th>
              <th className="pl-4 py-3  leading-[10.25px] font-medium">
                {t("PLAYER")}3
              </th>
              <th className="pl-4 py-3  leading-[10.25px] font-medium">
                {t("PLAYER")}4
              </th>
              <th className="pl-4 py-3  leading-[10.25px] font-medium">
                {t("PLAYER")}5
              </th>

            </tr>
          </thead>
          <tbody className="text-left text-black ">
          {teams.map((team, index) => (
            <tr className="bg-[#ffc1c5] shadow-[0px_0px_10px_rgba(0,_0,_0,_0.25)]  h-[69px]   font-medium">
              <td className="whitespace-nowrap pl-1 relative top-1 tracking-[1.45px] leading-[9.22px] flex items-center justify-between min-w-[182px] rounded-s-[3px] ">
                <div
                  className={`w-[156px] relative pl-1  rounded text-base h-[58px] flex items-center font-semibold leading-5 text-white`}
                  style={{ backgroundColor: "#00BF9E" }}
                >
                  <h4>{team.name}</h4>
                  <div className="absolute top-[50%] z-20 -right-[20px] -translate-y-2/4   h-[58px] w-[58px]  overflow-hidden   text-lg  leading-5 font-semibold">
                    <img
                      className="w-full h-full object-cover rounded-[50%] "
                      alt=""
                      src="/img/zozo.png"
                    />
                  </div>
                </div>
              </td>
              <td className="py-4 pl-4 whitespace-nowrap">
                {" "}
                <Player showNumber={false} enableHover={true} onEdit={() => setEditOpen(true)} onDelete={() => setOpen(true)} name="Ryan" />
              </td>
              <td className="py-4 pl-4 ">
                {" "}
                <Player showNumber={false} enableHover={true} onEdit={() => setEditOpen(true)} onDelete={() => setOpen(true)} name="Leo" />
              </td>
              <td className="py-4 pl-4 ">
                {" "}
                <Player showNumber={false} enableHover={true} onEdit={() => setEditOpen(true)} onDelete={() => setOpen(true)} name="Isaac" />
              </td>
              <td className="py-4 pl-4 ">
                {" "}
                <Player showNumber={false} enableHover={true} onEdit={() => setEditOpen(true)} onDelete={() => setOpen(true)} name="Jacob" />
              </td>
              <td className="py-4 pl-4">
                {" "}
                <Player showNumber={false} enableHover={true} onEdit={() => setEditOpen(true)} onDelete={() => setOpen(true)} name="David" />
              </td>

            </tr>
           ))}
          </tbody>
        </table>

        <div className="flex justify-end ">
          <button className="px-4 py-4 text-xl font-bold text-white bg-blue-500 rounded cursor-pointer hover:bg-blue-700">
            Update Team
          </button>
        </div>
        <Transition.Root show={showPlayerList} as={Fragment}>
          <Dialog as="div" className="relative z-[9999]" onClose={() => setShowPlayerList(false)}>
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
            <div className="fixed inset-0 z-10 overflow-y-auto">
              <div className="flex items-end justify-center min-h-full p-4 text-center sm:items-center sm:p-0">
                <Transition.Child
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                  enterTo="opacity-100 translate-y-0 sm:scale-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                  leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                >
                  <Dialog.Panel className="w-fullrelative bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:max-w-lg sm:w-full sm:p-6">
                    <div className="flex items-start justify-between">
                      <h3 className="text-lg leading-6 font-medium text-gray-900">Removed Players List</h3>
                      <div className="flex items-start justify-between">

                        <div className="cursor-pointer" onClick={() => setShowPlayerList(false)}>
                          <svg className="h-6 w-6 text-gray-900" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </div>
                      </div>
                    </div>
                    <div className="mt-2">
                      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                          <tr>
                            <th scope="col" className="px-6 py-3">Player Name</th>
                            <th scope="col" className="px-6 py-3">Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {playerList.map((player: any, index: any) => (
                            <tr key={index} className={`bg-white border-b dark:bg-gray-900 dark:border-gray-700`}>
                              <th scope="row" className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap">
                                {player.name}
                              </th>
                              <td className="px-6 py-4">
                                <button className="bg-blue-500 hover:bg-blue-700 text-white font-xs py-1 px-2 rounded-full cursor-pointer">Add To Team</button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition.Root> 


        <Transition.Root show={open} as={Fragment}>
          <Dialog
            as="div"
            className="relative z-10"
            initialFocus={cancelButtonRef}
            onClose={setOpen}
          >
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75 " />
            </Transition.Child>

            <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
              <div className="flex items-end justify-center min-h-full p-4 text-center sm:items-center sm:p-0">
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                  enterTo="opacity-100 translate-y-0 sm:scale-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                  leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                >
                  <Dialog.Panel className="relative overflow-hidden text-left transition-all transform bg-white rounded-lg shadow-xl sm:my-8 sm:w-full sm:max-w-lg">
                    <div className="bg-[#17B3A6] px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                      <div className="flex justify-center">
                        <div className="flex items-center justify-center w-20 h-20 bg-white rounded-full">
                          <svg
                            width="40"
                            height="54"
                            viewBox="0 0 40 54"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M40 19.5565L37.2164 24.3897L3.45163 4.83325L6.23521 0L14.6973 4.88912L18.483 3.85542L30.5358 10.8399L31.5658 14.6674L40 19.5565ZM0 47.7458V14.2204H14.1127L33.4029 25.3955V47.7458C33.4029 49.2277 32.8164 50.6489 31.7723 51.6968C30.7283 52.7446 29.3123 53.3333 27.8358 53.3333H5.56715C4.09065 53.3333 2.67462 52.7446 1.63058 51.6968C0.586537 50.6489 0 49.2277 0 47.7458Z"
                              fill="#FF292C"
                            />
                          </svg>
                        </div>
                      </div>
                      <div className="flex items-center justify-center">
                        <div className="mt-3 text-center sm:ml-4 sm:mt-0 ">
                          <div className="mt-2">
                            <p className="text-3xl font-medium text-center text-white">
                              Are you sure you want to Remove this Player?
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="bg-[#17B3A6] px-4 py-3 sm:flex justify-center sm:flex-row-reverse sm:px-6">
                      <button
                        type="button"
                        className="cursor-pointer inline-flex w-full justify-center rounded-full bg-[#FF292C] px-4 py-3 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                        onClick={() => setOpen(false)}
                      >
                        Remove
                      </button>
                      <button
                        type="button"
                        className="cursor-pointer mt-3 inline-flex w-full justify-center rounded-full bg-[#00FF92] px-4 py-3 text-sm font-semibold text-gray-900 shadow-sm  hover:bg-gray-50 sm:mt-0 sm:w-auto"
                        onClick={() => setOpen(false)}
                        ref={cancelButtonRef}
                      >
                        Cancel
                      </button>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition.Root>
        <Transition.Root show={opens} as={Fragment}>
          <Dialog
            as="div"
            className="relative z-[9999]"
            initialFocus={cancelButtonRef}
            onClose={setEditOpen}
          >
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75" />
            </Transition.Child>

            <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
              <div className="flex items-end justify-center min-h-full p-4 text-center sm:items-center sm:p-0">
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                  enterTo="opacity-100 translate-y-0 sm:scale-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                  leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                >
                  <Dialog.Panel className="relative overflow-hidden text-left transition-all transform bg-white rounded-lg shadow-xl sm:my-8 sm:w-full sm:max-w-lg">
                    <div className="bg-[#17B3A6] px-4 pb-4 pt-5 ">
                      <form className="px-8">
                        <div className="relative w-full">
                          <label
                            htmlFor="team"
                            className="inline text-2xl font-semibold text-white font-helvetica "
                          >
                            Team Name
                          </label>

                          <div className="relative flex items-center w-full">
                            <img
                              src="/img/ellipse-23087@2x.png"
                              alt="Team Logo"
                              className="absolute w-10 h-10 transform -translate-y-1/2 rounded-full left-2 top-1/2"
                            />

                            <input
                              type="text"
                              name="TeamName"
                              id="teamname"
                              placeholder="Team 1"
                              className="w-full py-4 text-gray-900 border-none rounded-md pl-14 bg-gray-50 sm:text-sm"
                            />

                            <div className="absolute left-8 top-[30px] bg-[#4CAF50] rounded-full w-4 h-4 text-white flex items-center justify-center">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                className="w-3 h-3 cursor-pointer"
                              >
                                <path
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                  stroke-width="2"
                                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                                />
                              </svg>
                            </div>
                          </div>
                        </div>
                        <div className="relative flex items-center justify-start w-full gap-2 mt-3">
                          <label
                            htmlFor="team"
                            className="font-medium text-center text-white font-helvetica "
                          >
                            {t("PLAYER")} Name
                          </label>

                          <div className="relative flex gap-2 items-center w-full">
                            <img
                              src="/img/ellipse-13@2x.png"
                              alt="Team Logo"
                              className="absolute w-10 h-10 transform -translate-y-1/2 rounded-full left-2 top-1/2"
                            />

                            <input
                              type="text"
                              name="playerName"
                              id="playerName"
                              placeholder="Player 1"
                              className="w-full py-3 text-gray-900 border-none rounded-md pl-14 bg-gray-50 sm:text-sm"
                            />
                            <select
                              name="teamSelect"
                              id="teamSelect"
                              className="w-1/2 py-3 text-gray-900 border-none rounded-md bg-gray-50 sm:text-sm"
                            >
                              <option value="" disabled selected>Select a Team</option>
                              {teams.map((team, index) => (
                                <option key={index} value={team.name}>{team.name}</option>
                              ))}
                            </select>

                            <div className="absolute left-8 top-[30px] bg-[#4CAF50] rounded-full w-4 h-4 text-white flex items-center justify-center">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                className="w-3 h-3 cursor-pointer"
                              >
                                <path
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                  stroke-width="2"
                                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                                />
                              </svg>
                            </div>
                          </div>
                        </div>



                        <div className="bg-[#17B3A6]  py-3 flex justify-end gap-0">
                          <button
                            type="button"
                            className="cursor-pointer mt-3 inline-flex w-full justify-center rounded-full bg-[#00FF92] px-4 py-3 text-sm font-semibold text-gray-900 shadow-sm  hover:bg-gray-50 sm:mt-0 sm:w-auto"
                            onClick={() => setEditOpen(false)}
                            ref={cancelButtonRef}
                          >
                            Confirm
                          </button>
                          <button
                            type="button"
                            className="cursor-pointer inline-flex w-full  rounded-full bg-[#FF292C] px-4 py-3 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-2 sm:w-auto"
                            onClick={() => setEditOpen(false)}
                          >
                            Cancel
                          </button>
                        </div>
                      </form>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition.Root> 
      </div>
    </div>
  );
};

export default EditTeamPage;
