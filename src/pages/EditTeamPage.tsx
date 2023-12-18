import ChampionShipName from "../components/ChampionShipName";
import { FunctionComponent } from "react";
import Player from "../components/Player";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useRef, useState } from "react";
const EditTeamPage: FunctionComponent = () => {
  const [open, setOpen] = useState(true);

  const cancelButtonRef = useRef(null);
  return (
    <div className="h-[100vh]   text-left text-lg text-white font-poppins mt-20 [background:linear-gradient(180deg,_#edfffd,_#f2fffa)]  ">
      <ChampionShipName />

      <div className="px-3 mx-40 py-8 ">
        <div>
          <img src="/img/golfplyr.png" alt="" width="40px" />
          <b className=" text-17xl text-darkslateblue-300 leading-[18px] [text-shadow:0px_7px_4px_#ccf2fe]">
            Edit Teams
          </b>
        </div>
        <table className="w-full  border-spacing-y-5 ">
          <thead className=" text-left text-whitesmoke-100">
            <tr className="shadow-[0px_4px_10px_rgba(0,_0,_0,_0.25)] bg-lightseagreen-200  h-[55px] text-xl ">
              <th className="pl-4 py-3 whitespace-nowrap rounded-s-[3px]  leading-[10.25px] font-medium ">
                Team Name
              </th>
              <th className="pl-4 py-3  leading-[10.25px] font-medium">
                Player1
              </th>
              <th className="pl-4 py-3  leading-[10.25px] font-medium">
                Player2
              </th>
              <th className="pl-4 py-3  leading-[10.25px] font-medium">
                Player3
              </th>
              <th className="pl-4 py-3  leading-[10.25px] font-medium">
                Player4
              </th>
              <th className="pl-4 py-3  leading-[10.25px] font-medium">
                Player5
              </th>
              <th className="pl-4 py-3  leading-[10.25px] font-medium">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className=" text-left text-black">
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
              <td className="pl-4 py-4 whitespace-nowrap">
                {" "}
                <Player showNumber={false} />
              </td>
              <td className="pl-4 py-4 ">
                {" "}
                <Player showNumber={false} />
              </td>
              <td className="pl-4 py-4 ">
                {" "}
                <Player showNumber={false} />
              </td>
              <td className="pl-4 py-4 ">
                {" "}
                <Player showNumber={false} />
              </td>
              <td className="pl-4 py-4">
                {" "}
                <Player showNumber={false} />
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
              <td className="pl-4 py-4 whitespace-nowrap">
                {" "}
                <Player showNumber={false} />
              </td>
              <td className="pl-4 py-4 ">
                {" "}
                <Player showNumber={false} />
              </td>
              <td className="pl-4 py-4 ">
                {" "}
                <Player showNumber={false} />
              </td>
              <td className="pl-4 py-4 ">
                {" "}
                <Player showNumber={false} />
              </td>
              <td className="pl-4 py-4">
                {" "}
                <Player showNumber={false} />
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
              <td className="pl-4 py-4 whitespace-nowrap">
                {" "}
                <Player showNumber={false} />
              </td>
              <td className="pl-4 py-4 ">
                {" "}
                <Player showNumber={false} />
              </td>
              <td className="pl-4 py-4 ">
                {" "}
                <Player showNumber={false} />
              </td>
              <td className="pl-4 py-4 ">
                {" "}
                <Player showNumber={false} />
              </td>
              <td className="pl-4 py-4">
                {" "}
                <Player showNumber={false} />
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
              <td className="pl-4 py-4 whitespace-nowrap">
                {" "}
                <Player showNumber={false} />
              </td>
              <td className="pl-4 py-4 ">
                {" "}
                <Player showNumber={false} />
              </td>
              <td className="pl-4 py-4 ">
                {" "}
                <Player showNumber={false} />
              </td>
              <td className="pl-4 py-4 ">
                {" "}
                <Player showNumber={false} />
              </td>
              <td className="pl-4 py-4">
                {" "}
                <Player showNumber={false} />
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
              <td className="pl-4 py-4 whitespace-nowrap">
                {" "}
                <Player showNumber={false} />
              </td>
              <td className="pl-4 py-4 ">
                {" "}
                <Player showNumber={false} />
              </td>
              <td className="pl-4 py-4 ">
                {" "}
                <Player showNumber={false} />
              </td>
              <td className="pl-4 py-4 ">
                {" "}
                <Player showNumber={false} />
              </td>
              <td className="pl-4 py-4">
                {" "}
                <Player showNumber={false} />
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
          <button className="bg-blue-500 hover:bg-blue-700 text-white text-xl font-bold py-4 px-4 rounded cursor-pointer">
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
              <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
            </Transition.Child>

            <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
              <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                  enterTo="opacity-100 translate-y-0 sm:scale-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                  leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                >
                  <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                    <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                      <div className="sm:flex sm:items-start">
                        <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10"></div>
                        <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                          <Dialog.Title
                            as="h3"
                            className="text-base font-semibold leading-6 text-gray-900"
                          >
                            Delete Team
                          </Dialog.Title>
                          <div className="mt-2">
                            <p className="text-sm text-gray-500">
                              Are you sure you want to deactivate your account?
                              All of your data will be permanently removed. This
                              action cannot be undone.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                      <button
                        type="button"
                        className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                        onClick={() => setOpen(false)}
                      >
                        Delete
                      </button>
                      <button
                        type="button"
                        className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
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
      </div>
    </div>
  );
};

export default EditTeamPage;
