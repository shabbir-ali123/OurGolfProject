import ChampionShipName from "../components/ChampionShipName";
import { FunctionComponent, useEffect, useRef, useState } from "react";
import Player from "../components/Player";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { useTranslation } from "react-i18next";
const EditTeamPage: FunctionComponent = () => {
  const { t, i18n } = useTranslation();
  document.body.dir = i18n.dir();
  const shouldOpenDialog = localStorage.getItem("showDialog") === "true";
  const [open, setOpen] = useState(shouldOpenDialog);

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
  return (
    <div className="h-[100vh]   text-left text-lg text-white font-poppins mt-20 [background:linear-gradient(180deg,_#edfffd,_#f2fffa)]  ">
      <ChampionShipName />

      <div className="px-3 py-8 mx-40 ">
        <div>
          <img src="/img/golfplyr.png" alt="" width="40px" />
          <b className=" text-17xl text-darkslateblue-300 leading-[18px] [text-shadow:0px_7px_4px_#ccf2fe]">
            Edit Teams
          </b>
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
              <th className="pl-4 py-3  leading-[10.25px] font-medium">
                {t("ACTIONS")}
              </th>
            </tr>
          </thead>
          <tbody className="text-left text-black ">
            <tr className="bg-[#ffc1c5] shadow-[0px_0px_10px_rgba(0,_0,_0,_0.25)]  h-[69px]   font-medium">
              <td className="whitespace-nowrap pl-1 relative top-1 tracking-[1.45px] leading-[9.22px] flex items-center justify-between min-w-[182px] rounded-s-[3px] ">
                <div
                  className={`w-[156px] relative pl-1  rounded text-base h-[58px] flex items-center font-semibold leading-5 text-white`}
                  style={{ backgroundColor: "#00BF9E" }}
                >
                  <h4>Fore Friends</h4>
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
                <Player showNumber={false} name="Ryan" />
              </td>
              <td className="py-4 pl-4 ">
                {" "}
                <Player showNumber={false} name="Leo" />
              </td>
              <td className="py-4 pl-4 ">
                {" "}
                <Player showNumber={false} name="Isaac" />
              </td>
              <td className="py-4 pl-4 ">
                {" "}
                <Player showNumber={false} name="Jacob" />
              </td>
              <td className="py-4 pl-4">
                {" "}
                <Player showNumber={false} name="David" />
              </td>
              <td className="pl-4 py-4 tracking-[1.45px] leading-[9.22px] ">
                <div className="flex gap-4">
                  <svg
                    onClick={() => setEditOpen(true)}
                    width="20"
                    height="20"
                    className="cursor-pointer"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M14.0602 5.33409L10.3942 1.70604L11.6018 0.496696C11.9325 0.165565 12.3388 0 12.8207 0C13.3026 0 13.7085 0.165565 14.0386 0.496696L15.2463 1.70604C15.5769 2.03717 15.7494 2.43683 15.7638 2.90502C15.7782 3.37321 15.62 3.77259 15.2894 4.10314L14.0602 5.33409ZM12.8094 6.60822L3.666 15.7647H0V12.0935L9.14344 2.93699L12.8094 6.60822Z"
                      fill="#268D61"
                    />
                  </svg>

                  <svg
                    onClick={() => setOpen(true)}
                    width="21"
                    height="20"
                    className="cursor-pointer"
                    viewBox="0 0 17 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M1.74324 14.0131C1.74324 14.9765 2.75668 15.7647 3.99534 15.7647H13.0037C14.2424 15.7647 15.2558 14.9765 15.2558 14.0131V5.2549C15.2558 4.2915 14.2424 3.50327 13.0037 3.50327H3.99534C2.75668 3.50327 1.74324 4.2915 1.74324 5.2549V14.0131ZM15.2558 0.875817H12.4407L11.6412 0.253987C11.4385 0.0963398 11.1458 0 10.853 0H6.1461C5.85332 0 5.56055 0.0963398 5.35786 0.253987L4.55836 0.875817H1.74324C1.12391 0.875817 0.617188 1.26993 0.617188 1.75163C0.617188 2.23333 1.12391 2.62745 1.74324 2.62745H15.2558C15.8752 2.62745 16.3819 2.23333 16.3819 1.75163C16.3819 1.26993 15.8752 0.875817 15.2558 0.875817Z"
                      fill="#CC0025"
                    />
                  </svg>
                </div>
              </td>
            </tr>
            <tr className="shadow-[0px_4px_10px_rgba(0,_0,_0,_0.25)] bg-[#b8e4fc]  h-[69px]   font-medium">
              <td className="whitespace-nowrap pl-1 relative top-1 tracking-[1.45px] leading-[9.22px] flex items-center justify-between min-w-[182px] rounded-s-[3px] ">
                <div
                  className={`w-[156px] relative pl-1  rounded text-base h-[58px] flex items-center font-semibold leading-5 text-white`}
                  style={{ backgroundColor: "#011F3B" }}
                >
                  <h4>Fore Friends</h4>
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
                <Player showNumber={false} name="Ethan" />
              </td>
              <td className="py-4 pl-4 ">
                {" "}
                <Player showNumber={false} name="Noah" />
              </td>
              <td className="py-4 pl-4 ">
                {" "}
                <Player showNumber={false} name="Liam" />
              </td>
              <td className="py-4 pl-4 ">
                {" "}
                <Player showNumber={false} name="Aiden" />
              </td>
              <td className="py-4 pl-4">
                {" "}
                <Player showNumber={false} name="Gabriel" />
              </td>
              <td className="pl-4 py-4 tracking-[1.45px] leading-[9.22px] ">
                <div className="flex gap-4">
                  <svg
                    width="20"
                    height="20"
                    className="cursor-pointer"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M14.0602 5.33409L10.3942 1.70604L11.6018 0.496696C11.9325 0.165565 12.3388 0 12.8207 0C13.3026 0 13.7085 0.165565 14.0386 0.496696L15.2463 1.70604C15.5769 2.03717 15.7494 2.43683 15.7638 2.90502C15.7782 3.37321 15.62 3.77259 15.2894 4.10314L14.0602 5.33409ZM12.8094 6.60822L3.666 15.7647H0V12.0935L9.14344 2.93699L12.8094 6.60822Z"
                      fill="#268D61"
                    />
                  </svg>

                  <svg
                    onClick={() => setOpen(true)}
                    width="21"
                    height="20"
                    className="cursor-pointer"
                    viewBox="0 0 17 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M1.74324 14.0131C1.74324 14.9765 2.75668 15.7647 3.99534 15.7647H13.0037C14.2424 15.7647 15.2558 14.9765 15.2558 14.0131V5.2549C15.2558 4.2915 14.2424 3.50327 13.0037 3.50327H3.99534C2.75668 3.50327 1.74324 4.2915 1.74324 5.2549V14.0131ZM15.2558 0.875817H12.4407L11.6412 0.253987C11.4385 0.0963398 11.1458 0 10.853 0H6.1461C5.85332 0 5.56055 0.0963398 5.35786 0.253987L4.55836 0.875817H1.74324C1.12391 0.875817 0.617188 1.26993 0.617188 1.75163C0.617188 2.23333 1.12391 2.62745 1.74324 2.62745H15.2558C15.8752 2.62745 16.3819 2.23333 16.3819 1.75163C16.3819 1.26993 15.8752 0.875817 15.2558 0.875817Z"
                      fill="#CC0025"
                    />
                  </svg>
                </div>
              </td>
            </tr>
            <tr className="shadow-[0px_4px_10px_rgba(0,_0,_0,_0.25)] bg-[#AFFFAF]  h-[69px]   font-medium">
              <td className="whitespace-nowrap pl-1 relative top-1 tracking-[1.45px] leading-[9.22px] flex items-center justify-between min-w-[182px] rounded-s-[3px] ">
                <div
                  className={`w-[156px] relative pl-1  rounded text-base h-[58px] flex items-center font-semibold leading-5 text-white`}
                  style={{ backgroundColor: "#1E264E" }}
                >
                  <h4>Fore Friends</h4>
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
                <Player showNumber={false} name="Lucas" />
              </td>
              <td className="py-4 pl-4 ">
                {" "}
                <Player showNumber={false} name="Oliver" />
              </td>
              <td className="py-4 pl-4 ">
                {" "}
                <Player showNumber={false} name="Samuel" />
              </td>
              <td className="py-4 pl-4 ">
                {" "}
                <Player showNumber={false} name="Daniel" />
              </td>
              <td className="py-4 pl-4">
                {" "}
                <Player showNumber={false} name="Benjamin" />
              </td>
              <td className="pl-4 py-4 tracking-[1.45px] leading-[9.22px] ">
                <div className="flex gap-4">
                  <svg
                    width="20"
                    height="20"
                    className="cursor-pointer"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M14.0602 5.33409L10.3942 1.70604L11.6018 0.496696C11.9325 0.165565 12.3388 0 12.8207 0C13.3026 0 13.7085 0.165565 14.0386 0.496696L15.2463 1.70604C15.5769 2.03717 15.7494 2.43683 15.7638 2.90502C15.7782 3.37321 15.62 3.77259 15.2894 4.10314L14.0602 5.33409ZM12.8094 6.60822L3.666 15.7647H0V12.0935L9.14344 2.93699L12.8094 6.60822Z"
                      fill="#268D61"
                    />
                  </svg>

                  <svg
                    onClick={() => setOpen(true)}
                    width="21"
                    height="20"
                    className="cursor-pointer"
                    viewBox="0 0 17 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M1.74324 14.0131C1.74324 14.9765 2.75668 15.7647 3.99534 15.7647H13.0037C14.2424 15.7647 15.2558 14.9765 15.2558 14.0131V5.2549C15.2558 4.2915 14.2424 3.50327 13.0037 3.50327H3.99534C2.75668 3.50327 1.74324 4.2915 1.74324 5.2549V14.0131ZM15.2558 0.875817H12.4407L11.6412 0.253987C11.4385 0.0963398 11.1458 0 10.853 0H6.1461C5.85332 0 5.56055 0.0963398 5.35786 0.253987L4.55836 0.875817H1.74324C1.12391 0.875817 0.617188 1.26993 0.617188 1.75163C0.617188 2.23333 1.12391 2.62745 1.74324 2.62745H15.2558C15.8752 2.62745 16.3819 2.23333 16.3819 1.75163C16.3819 1.26993 15.8752 0.875817 15.2558 0.875817Z"
                      fill="#CC0025"
                    />
                  </svg>
                </div>
              </td>
            </tr>
            <tr className="shadow-[0px_4px_10px_rgba(0,_0,_0,_0.25)] bg-[#FFD98C]  h-[69px]   font-medium">
              <td className="whitespace-nowrap pl-1 relative top-1 tracking-[1.45px] leading-[9.22px] flex items-center justify-between min-w-[182px] rounded-s-[3px] ">
                <div
                  className={`w-[156px] relative pl-1  rounded text-base h-[58px] flex items-center font-semibold leading-5 text-white`}
                  style={{ backgroundColor: "#74B96A" }}
                >
                  <h4>Fore Friends</h4>
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
                <Player showNumber={false} name="James" />
              </td>
              <td className="py-4 pl-4 ">
                {" "}
                <Player showNumber={false} name="Matthew" />
              </td>
              <td className="py-4 pl-4 ">
                {" "}
                <Player showNumber={false} name="Alexander" />
              </td>
              <td className="py-4 pl-4 ">
                {" "}
                <Player showNumber={false} name="Henry" />
              </td>
              <td className="py-4 pl-4">
                {" "}
                <Player showNumber={false} name="Michael" />
              </td>
              <td className="pl-4 py-4 tracking-[1.45px] leading-[9.22px] ">
                <div className="flex gap-4">
                  <svg
                    width="20"
                    height="20"
                    className="cursor-pointer"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M14.0602 5.33409L10.3942 1.70604L11.6018 0.496696C11.9325 0.165565 12.3388 0 12.8207 0C13.3026 0 13.7085 0.165565 14.0386 0.496696L15.2463 1.70604C15.5769 2.03717 15.7494 2.43683 15.7638 2.90502C15.7782 3.37321 15.62 3.77259 15.2894 4.10314L14.0602 5.33409ZM12.8094 6.60822L3.666 15.7647H0V12.0935L9.14344 2.93699L12.8094 6.60822Z"
                      fill="#268D61"
                    />
                  </svg>

                  <svg
                    onClick={() => setOpen(true)}
                    width="21"
                    height="20"
                    className="cursor-pointer"
                    viewBox="0 0 17 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M1.74324 14.0131C1.74324 14.9765 2.75668 15.7647 3.99534 15.7647H13.0037C14.2424 15.7647 15.2558 14.9765 15.2558 14.0131V5.2549C15.2558 4.2915 14.2424 3.50327 13.0037 3.50327H3.99534C2.75668 3.50327 1.74324 4.2915 1.74324 5.2549V14.0131ZM15.2558 0.875817H12.4407L11.6412 0.253987C11.4385 0.0963398 11.1458 0 10.853 0H6.1461C5.85332 0 5.56055 0.0963398 5.35786 0.253987L4.55836 0.875817H1.74324C1.12391 0.875817 0.617188 1.26993 0.617188 1.75163C0.617188 2.23333 1.12391 2.62745 1.74324 2.62745H15.2558C15.8752 2.62745 16.3819 2.23333 16.3819 1.75163C16.3819 1.26993 15.8752 0.875817 15.2558 0.875817Z"
                      fill="#CC0025"
                    />
                  </svg>
                </div>
              </td>
            </tr>
            <tr className="shadow-[0px_4px_10px_rgba(0,_0,_0,_0.25)] bg-[#CDD5FF]  h-[69px]   font-medium">
              <td className="whitespace-nowrap pl-1 relative top-1 tracking-[1.45px] leading-[9.22px] flex items-center justify-between min-w-[182px] rounded-s-[3px] ">
                <div
                  className={`w-[156px] relative pl-1  rounded text-base h-[58px] flex items-center font-semibold leading-5 text-white`}
                  style={{ backgroundColor: "#1D3D86" }}
                >
                  <h4>Fore Friends</h4>
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
                <Player showNumber={false} name="Mason" />
              </td>
              <td className="py-4 pl-4 ">
                {" "}
                <Player showNumber={false} name="Jack" />
              </td>
              <td className="py-4 pl-4 ">
                {" "}
                <Player showNumber={false} name="Dylan" />
              </td>
              <td className="py-4 pl-4 ">
                {" "}
                <Player showNumber={false} name="Max" />
              </td>
              <td className="py-4 pl-4">
                {" "}
                <Player showNumber={false} name="Ryan" />
              </td>
              <td className="pl-4 py-4 tracking-[1.45px] leading-[9.22px] ">
                <div className="flex gap-4">
                  <svg
                    width="20"
                    height="20"
                    className="cursor-pointer"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M14.0602 5.33409L10.3942 1.70604L11.6018 0.496696C11.9325 0.165565 12.3388 0 12.8207 0C13.3026 0 13.7085 0.165565 14.0386 0.496696L15.2463 1.70604C15.5769 2.03717 15.7494 2.43683 15.7638 2.90502C15.7782 3.37321 15.62 3.77259 15.2894 4.10314L14.0602 5.33409ZM12.8094 6.60822L3.666 15.7647H0V12.0935L9.14344 2.93699L12.8094 6.60822Z"
                      fill="#268D61"
                    />
                  </svg>

                  <svg
                    onClick={() => setOpen(true)}
                    width="21"
                    height="20"
                    className="cursor-pointer"
                    viewBox="0 0 17 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M1.74324 14.0131C1.74324 14.9765 2.75668 15.7647 3.99534 15.7647H13.0037C14.2424 15.7647 15.2558 14.9765 15.2558 14.0131V5.2549C15.2558 4.2915 14.2424 3.50327 13.0037 3.50327H3.99534C2.75668 3.50327 1.74324 4.2915 1.74324 5.2549V14.0131ZM15.2558 0.875817H12.4407L11.6412 0.253987C11.4385 0.0963398 11.1458 0 10.853 0H6.1461C5.85332 0 5.56055 0.0963398 5.35786 0.253987L4.55836 0.875817H1.74324C1.12391 0.875817 0.617188 1.26993 0.617188 1.75163C0.617188 2.23333 1.12391 2.62745 1.74324 2.62745H15.2558C15.8752 2.62745 16.3819 2.23333 16.3819 1.75163C16.3819 1.26993 15.8752 0.875817 15.2558 0.875817Z"
                      fill="#CC0025"
                    />
                  </svg>
                </div>
              </td>
            </tr>
          </tbody>
        </table>

        <div className="flex justify-end ">
          <button className="px-4 py-4 text-xl font-bold text-white bg-blue-500 rounded cursor-pointer hover:bg-blue-700">
            Update Team
          </button>
        </div>
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
                              Are you sure you want to delete the team?
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
                        Delete
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
                              name="Player!"
                              id="teamname"
                              placeholder="Player 1"
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
                            className="font-semibold text-center text-white font-helvetica "
                          >
                            {t("PLAYER")} 1
                          </label>

                          <div className="relative flex items-center w-full">
                            <img
                              src="/img/ellipse-13@2x.png"
                              alt="Team Logo"
                              className="absolute w-10 h-10 transform -translate-y-1/2 rounded-full left-2 top-1/2"
                            />

                            <input
                              type="text"
                              name="teamname"
                              id="teamname"
                              placeholder="Fore Friend"
                              className="w-full py-3 text-gray-900 border-none rounded-md pl-14 bg-gray-50 sm:text-sm"
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
                            className="font-semibold text-center text-white font-helvetica "
                          >
                            {t("PLAYER")} 2
                          </label>

                          <div className="relative flex items-center w-full">
                            <img
                              src="/img/ellipse-131@2x.png"
                              alt="Team Logo"
                              className="absolute w-10 h-10 transform -translate-y-1/2 rounded-full left-2 top-1/2"
                            />

                            <input
                              type="text"
                              name="teamname"
                              id="teamname"
                              placeholder="Fore Friend"
                              className="w-full py-3 text-gray-900 border-none rounded-md pl-14 bg-gray-50 sm:text-sm"
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
                            className="font-semibold text-center text-white font-helvetica "
                          >
                            {t("PLAYER")} 3
                          </label>

                          <div className="relative flex items-center w-full">
                            <img
                              src="/img/ellipse-132@2x.png"
                              alt="Team Logo"
                              className="absolute w-10 h-10 transform -translate-y-1/2 rounded-full left-2 top-1/2"
                            />

                            <input
                              type="text"
                              name="teamname"
                              id="teamname"
                              placeholder="Fore Friend"
                              className="w-full py-3 text-gray-900 border-none rounded-md pl-14 bg-gray-50 sm:text-sm"
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
                            className="font-semibold text-center text-white font-helvetica "
                          >
                            {t("PLAYER")} 4
                          </label>

                          <div className="relative flex items-center w-full">
                            <img
                              src="/img/ellipse-133@2x.png"
                              alt="Team Logo"
                              className="absolute w-10 h-10 transform -translate-y-1/2 rounded-full left-2 top-1/2"
                            />

                            <input
                              type="text"
                              name="teamname"
                              id="teamname"
                              placeholder="Fore Friend"
                              className="w-full py-3 text-gray-900 border-none rounded-md pl-14 bg-gray-50 sm:text-sm"
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
                            className="font-semibold text-center text-white font-helvetica "
                          >
                            {t("PLAYER")} 5
                          </label>

                          <div className="relative flex items-center w-full">
                            <img
                              src="/img/ellipse-134@2x.png"
                              alt="Team Logo"
                              className="absolute w-10 h-10 transform -translate-y-1/2 rounded-full left-2 top-1/2"
                            />

                            <input
                              type="text"
                              name="teamname"
                              id="teamname"
                              placeholder="Fore Friend"
                              className="w-full py-3 text-gray-900 border-none rounded-md pl-14 bg-gray-50 sm:text-sm"
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
