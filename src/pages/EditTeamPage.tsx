import { FunctionComponent, useEffect, useRef, useState } from "react";
import Player from "../components/Player";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { useTranslation } from "react-i18next";
import { API_ENDPOINTS } from "../appConfig";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { fetchTeams } from "../utils/fetchTeams";
import { fetchSingleEvent } from "../utils/fetchEvents";
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import EditTeamScore from "../components/EditTeamScore";
import SliderStyles from "../components/sliderStyles";
import { singleEventContextStore } from "../contexts/eventContext";
import { singleTeamsContextStore } from "../contexts/teamContext";
import CommentModel from "../components/CommentModel";

interface Team {
  id: string;
  name: string;
  imageUrl?: string;
  members: Members[];
}
interface Members {
  imageUrl: string | undefined;
  nickName: string;
  userId: string;
  teamId: any;
}
interface SingleEvent {
  id: string;
  creator: {
    nickName: string;
  };
  isFavorite: Boolean;
  comments: [];
  accountHolderName: string;
  eventStartTime: string;
  eventStartDate: string;
  eventEndTime: string;
  eventEndDate: string;
  eventDeadlineDate: string;
  eventName: string;
  eventDetails: string;
  address: string;
  eventType: string;
  place: string;
  imageUrl: [0];
  count: any;
  teamSize: any;
  capacity: any;
  scoringType: string;
  shotsPerHoles: any;
  selectedHoles: any;
  participationFee: any

}

const EditTeamPage: FunctionComponent = () => {
  const params = useParams<{ id?: string }>();
  const teamId = params.id;
  const { isCreated, singleEvent } = singleEventContextStore();
  console.log(singleEvent, 'sE')
  const { handleSingleTeam, totalJoinedMembers, teamMembers, isJoined, isLoading, teams } = singleTeamsContextStore()

  const router = useNavigate();
  const { t, i18n } = useTranslation();
  document.body.dir = i18n.dir();



  function CustomNextArrow(props: any) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, position: 'absolute', right: '300px' }}
        onClick={onClick}
      />
    );
  }

  function CustomPrevArrow(props: any) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, position: 'absolute', left: '340px' }}
        onClick={onClick}
      />
    );
  }

  const settings = {
    nextArrow: <CustomNextArrow />,
    prevArrow: <CustomPrevArrow />,
    dots: true,
    infinite: true,
    centerMode: true,
    centerPadding: '0px',
    className: "center",
    slidesToShow: 3,
    speed: 500,
    afterChange: (index: any) => {
      setCenterIndex(index);
    }
  };

  const data = [
    {
      position: 1,
      change: '+3',
      playerName: 'Esther Howard',
      teamName: 'Team 1',
      totalPar: 78,
      scoredPar: 71,
      score: 210,
    },
    {
      position: 1,
      change: '+3',
      playerName: 'Esther Howard',
      teamName: 'Team 1',
      totalPar: 78,
      scoredPar: 71,
      score: 210,
    },
    {
      position: 1,
      change: '+3',
      playerName: 'Esther Howard',
      teamName: 'Team 1',
      totalPar: 78,
      scoredPar: 71,
      score: 210,
    },
    {
      position: 1,
      change: '+3',
      playerName: 'Esther Howard',
      teamName: 'Team 1',
      totalPar: 78,
      scoredPar: 71,
      score: 210,
    },
    {
      position: 1,
      change: '+3',
      playerName: 'Esther Howard',
      teamName: 'Team 1',
      totalPar: 78,
      scoredPar: 71,
      score: 210,
    },
    {
      position: 1,
      change: '+3',
      playerName: 'Esther Howard',
      teamName: 'Team 1',
      totalPar: 78,
      scoredPar: 71,
      score: 210,
    },
    {
      position: 1,
      change: '+3',
      playerName: 'Esther Howard',
      teamName: 'Team 1',
      totalPar: 78,
      scoredPar: 71,
      score: 210,
    },
    {
      position: 1,
      change: '+3',
      playerName: 'Esther Howard',
      teamName: 'Team 1',
      totalPar: 78,
      scoredPar: 71,
      score: 210,
    },
    {
      position: 1,
      change: '+3',
      playerName: 'Esther Howard',
      teamName: 'Team 1',
      totalPar: 78,
      scoredPar: 71,
      score: 210,
    },
    {
      position: 1,
      change: '+3',
      playerName: 'Esther Howard',
      teamName: 'Team 1',
      totalPar: 78,
      scoredPar: 71,
      score: 210,
    },
  ];

  const [open, setOpen] = useState(false);
  const [selectedPlayerNickname, setSelectedPlayerNickname] = useState("");
  const [selectedTeamName, setSelectedTeamName] = useState("");
  const [currentTeamSize, setCurrentTeamSize] = useState(singleEvent?.teamSize);
  const [capacity, setCapacity] = useState(singleEvent?.capacity);
  const [selectedTeamId, setSelectedTeamId] = useState("");
  const [selectedUserId, setSelectedUserId] = useState<any>([]);
  const [showPlayerList, setShowPlayerList] = useState(false);
  const navigate = useNavigate();
  const playerList = [
    { name: "John Doe" },
    { name: "Jane Smith" },
    { name: "Mike Johnson" },
  ];

  const teamCapacity = singleEvent?.capacity;

  // const [totalJoinedMembers, setTotalJoinedMembers] = useState("");
  const updateTeamLocal = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    handleSingleTeam((prev: Team[]) => {
      let newState = [...prev].map((team: any) => {
        console.log({ team });
        if (team.id == selectedTeamId && team.members.length < teamCapacity) {
          return {
            ...team,
            members: [
              ...team.members,
              {
                nickName: selectedPlayerNickname,
                teamId: selectedTeamId,
                userId: selectedUserId,
              },
            ],
          };
        } else {
          return {
            ...team,
            members: team.members.filter(
              (member: any) => member.userId !== selectedUserId
            ),
          };
        }
      });

      return [...newState];
    });
  };
  const [centerIndex, setCenterIndex] = useState(0);
  console.log(centerIndex, "cc")
  const updateTeams = async (event: any) => {
    event.preventDefault();
    const uId = selectedUserId.toString();
    const initialTeamSize = singleEvent?.teamSize;
    const initialCapacity = singleEvent?.capacity;
    const initialMembers = teamMembers;

    const hasCapacityChanged = capacity !== initialCapacity;
    const hasTeamSizeChanged = currentTeamSize !== initialTeamSize;
    const hasMembersChanged =
      JSON.stringify(teamMembers) !== JSON.stringify(initialMembers);

    if (!hasCapacityChanged && !hasTeamSizeChanged && !hasMembersChanged) {
      toast.error("Please make changes before updating.");
      return;
    }


    const formDataObj = {
      eventId: singleEvent?.id,
      teamSize:
        currentTeamSize == undefined
          ? singleEvent?.teamSize
          : Number(currentTeamSize),
      capacity: capacity === undefined ? totalCapacity : Number(capacity),
      teams,
    };

    try {
      const response = await axios.put(
        API_ENDPOINTS.UPDATETEAMMEMBER,
        JSON.stringify(formDataObj),
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.status !== 200) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      toast.success(response.data.message);
      window.location.reload();
    } catch (error) {
      console.error("Error updating team:", error);
      toast.error("Please make changes before updating.");
    }
  };
  let previousIndex = centerIndex - 1;
  let nextIndex = centerIndex + 2;


  // useEffect(() => {
  //   const fetchAndUpdateTeams = async () => {
  //     setIsLoading(true); 
  //     await fetchTeams(setTeams, teamId, setTeamMembers, setTotalJoinedMembers);
  //     setShouldRefetchTeams(false);

  //     setIsLoading(false);
  //   };
  //   fetchAndUpdateTeams();
  // }, [teamId]);

  // useEffect(() => {
  //   handleEventId(teamId)
  // }, [])

  useEffect(() => {
    localStorage.setItem("showEditTeamDialog", open.toString());
  }, [open]);
  const [opens, setEditOpen] = useState(false);
  useEffect(() => {
    localStorage.setItem("showEditTeamDialog", opens.toString());
  }, [open]);

  const cancelButtonRef = useRef(null);
  const totalCapacity = singleEvent?.capacity * singleEvent?.teamSize;
  const handleOpenPlayerList = () => {
    setShowPlayerList(true);
  };

  const generateTableHeaders = () => {
    const headers = [];
    for (let i = 1; i <= teamCapacity; i++) {
      headers.push(
        <th key={i} className="pl-4 py-3 leading-[10.25px] font-medium">
          {t("PLAYER")}
          {i}
        </th>
      );
    }
    return headers;
  };
  if (isLoading) {
    return <div className="flex justify-center items-center h-[100vh]">
      <div>

        <img className="w-10 h-10 animate__animated animate__bounce animate__infinite " src="/img/golfball.jpg" alt="" />
        <p>loading...</p>
      </div>

    </div>;
  }
  const handleNavigateHome = () => {
    navigate('/add-score-page/' + singleEvent?.id);
  };
  return (
    <>
      <SliderStyles />
      <div className="py-10 ml-12 ">
        <div className=" max-w-[1200px] mx-auto  text-left text-lg font-poppins  ">
          <div className="flex justify-around   mx-5  rounded-lg bg-white shadow-[0px_0px_13px_rgba(0,_0,_0,_0.25)] p-5  text-left text-3xl text-white font-body-b2">
            <div className="flex justify-around w-full">
              <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-[24px]">
                <img
                  className="w-[123px] h-[123px] object-cover rounded-[100%] text-center md:text-start"
                  alt="Event"
                  src={singleEvent?.imageUrl ? singleEvent?.imageUrl[0] : "/img/BG-GOLF.jpg"}
                />

                <div className="flex flex-col items-start justify-center gap-4">
                  <div className="text-white bg-[#17b3a6]  rounded-lg">
                    <p className="p-1 px-2 m-0">{t('EVENT_DETAILS')}</p>
                  </div>
                  <div className="uppercase relative text-2xl md:text-2xl tracking-[-0.17px] lg:text-16xl leading-[40px] font-semibold text-black">
                    {singleEvent?.eventName}
                  </div>
                  <div className="flex flex-row items-center justify-start gap-2 text-base md:text-xl text-darkslategray-300">
                    <img
                      className="w-[22.5px] h-6"
                      alt=""
                      src="/img/group-1000008655.svg"
                    />
                    <div className="relative  leading-[18px]">
                      {singleEvent?.eventStartDate || "Default Date"}
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2 md:text-5xl lg:text-darkgray-400">
                <img
                  className="w-[23px] h-[27.9px]"
                  alt=""
                  src="/img/group-1000008649.svg"
                />
                <div className="flex flex-col items-start justify-center gap-4">
                  <div className="relative text-base md:text-xl leading-[18px]">
                    {singleEvent?.place || t("NO_LOCATION")}
                  </div>
                  <div className="relative text-base md:text-xl  leading-[18px] text-lightseagreen-200">
                    {singleEvent?.address || t("NO_ADDRESS")}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div id="my-slider-container" className="mx-auto my-6 max-w-7xl slider-container">
            {singleEvent && singleEvent.imageUrl?.length > 1 && (
              <Slider {...settings}>
                {singleEvent.imageUrl.slice(0, 3).map((item: any, index: any) => {

                  console.log(index, index === nextIndex, "next");

                  return <div key={index} className="w-full">
                    <img
                      className={`w-full h-[220px] object-cover  rounded-lg ${index === centerIndex ? "slick-center" : ""}`}
                      src={item || ""}
                      alt={`Event Image ${index + 1}`}
                      style={{
                        boxShadow: index === centerIndex ? '0px 0px 10px rgba(0, 0, 0, 0.25)' : 'none',
                        backgroundColor: index === centerIndex ? 'white' : 'transparent',
                        borderRadius: index === centerIndex + 1 ? '10px' : '0',
                        display: index === previousIndex || index === nextIndex ? 'none' : 'block',

                      }}
                    />
                  </div>
                }

                )}
              </Slider>
            )}
          </div>
          <div className="mr-4  lg:mr-0 lg:w-full flex flex-col justify-center py-4 px-10 mt-10 shadow-[0px_0px_10px_rgba(0,_0,_0,_0.25)] rounded-lg">
            <div className="flex items-center gap-10">
              <div className="relative w-[90.5px] h-[147.5px]">
                <img
                  className="absolute top-[60px] left-[0px] w-[90.5px] h-[87.5px]"
                  alt=""
                  src="/img/ellipse-2303.svg"
                />
                <img
                  className="absolute top-[0px] left-[22.5px] w-[58px] h-[108px] object-cover"
                  alt=""
                  src="/img/rectangle-1249@2x.png"
                />
              </div>
              <h2 className="tracking-[0.04em] leading-[18px] font-semibold  [text-shadow:0px_7px_4px_#17b3a6] text-xl  xl:text-21xl"> {t('ABOUT_EVENT')}</h2>
              <h2 className=" text-lightseagreen-200 text-21xl">{singleEvent?.eventName}</h2>
            </div>

            <div className="grid grid-cols-1 gap-0 py-4 ">
              <div className=" items-center gap-10  ">
                <div className="text-white basis-[200px] basis-4 bg-[#17b3a6]  p-2"> {t('DATE')}</div>
                <p className="py-0 text-lg capitalize text-lightseagreen-200"><span className="text-gray-500 basis-[200px] font-bold">Event date :</span> {singleEvent?.eventStartDate} {t('START_FROM')} {singleEvent?.eventStartTime} {t('TO')} {singleEvent?.
                  eventEndTime
                }</p>
                <p className="py-0 text-lg capitalize text-lightseagreen-200"><span className="text-gray-500 basis-[200px] font-bold">Deadline :</span> {singleEvent?.eventEndDate}</p>
              </div>
              <div className=" items-center gap-10  ">
                <div className="text-white basis-[200px] basis-4 bg-[#17b3a6]  p-2"> {t('EVENT_LOCATION')}</div>
                <p className="py-0 text-lg font-bold capitalize text-lightseagreen-200"><span className="text-gray-500 basis-[200px]">{t('LOCATION')} :</span> {singleEvent?.place}</p>
                <div className="flex items-center gap-10  ">

                  <p className="py-0 text-lg capitalize rounded-sm text-lightseagreen-200 "><span className="text-gray-500 basis-[200px] font-bold">{t('EVENT_ADDRESS')} :</span>{singleEvent?.address}</p>
                </div>
                <div className=" col-span-12 mx-4 sm:mx-16 md:col-span-8 lg:col-span-8 ">
                  <iframe
                    className="col-span-4 sm:col-span-4 rounded-2xl"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d8181116.269949623!2d130.64039243803072!3d36.56179855912495!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x34674e0fd77f192f%3A0xf54275d47c665244!2sJapan!5e0!3m2!1sen!2s!4v1700468556527!5m2!1sen!2s"
                    width="100%"
                    height="350px"
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  ></iframe>


                </div>
              </div>
              <div className=" items-center gap-10  ">
                <div className="text-white basis-[200px] basis-4 bg-[#17b3a6]  p-2"> {t('EVENT_DETAILS')}</div>
                <p className="py-0 text-lg font-medium capitalize text-lightseagreen-200"><span className="text-gray-500 basis-[200px] font-bold">About Event :</span> {singleEvent?.eventDetails}</p>
                <div className="flex items-center gap-10  ">

                  <p className="py-0 text-lg capitalize rounded-sm text-lightseagreen-200 "><span className="text-gray-500 basis-[200px] font-bold">{t('EVENT_TYPE')}  :</span> {singleEvent?.
                    eventType}</p>
                </div>

              </div>
              {/* <div className=" items-center gap-10  w-full">
                <div className="text-white basis-[200px] basis-4 bg-[#17b3a6] w-full p-2"> {t('TOTAL_PARTICIPANT')}</div>
                <p className="py-0 text-lg font-bold capitalize text-lightseagreen-200"><span className="text-gray-500 basis-[200px] font-bold">{t('TOTAL_PARTICIPANT')} : </span> {totalJoinedMembers}/{singleEvent?.capacity * singleEvent?.teamSize}</p>
                <div className="flex items-center   ">

                  <p className="py-0 text-lg capitalize rounded-sm text-lightseagreen-200 ">  <span className="text-gray-500 basis-[200px] font-bold">{t('TEAM_SIZE')} :</span>{singleEvent?.teamSize}</p>
                </div>
              </div> */}



              <div className="flex items-center gap-10  ">

                <p className="py-0 text-lg capitalize rounded-sm text-lightseagreen-200 "><span className="text-gray-500 basis-[200px] font-bold">{t('JOINED_MEMBER')} :</span> {totalJoinedMembers}</p>
              </div>
            </div>

            <div className=" items-center gap-10  ">
              <div className="text-white basis-[200px] basis-4 bg-[#17b3a6]  p-2"> {t('PRICE')}</div>
              <p className="py-0 text-lg font-bold capitalize text-lightseagreen-200"><span className="text-gray-500 basis-[200px] font-bold">{t('PARTICIPATION_FEE')} :</span>{singleEvent?.participationFee}</p>
            </div>
            <div className=" items-center gap-10  ">
              <div className="text-white basis-[200px] basis-4 bg-[#17b3a6]  p-2"> {t('Cancel')}</div>
              <p className="py-0 text-lg font-bold capitalize text-lightseagreen-200">No Cancellation Fee</p>
            </div>
          </div>
          <div className="mr-4  lg:mr-0 lg:w-full flex flex-col justify-center py-4 px-10 mt-10 shadow-[0px_0px_10px_rgba(0,_0,_0,_0.25)] rounded-lg">
            <div className="flex gap-2 ">
              <div>
                <img src="/img/golfplyr.png" alt="" width="40px" />
                <b className="text-xl lg:text-17xl text-darkslateblue-300 leading-[18px] [text-shadow:0px_7px_4px_#ccf2fe]">
                  Members
                </b>
              </div>
            </div>
            <div className="">

              <div className=" ">
                <div className="bg-[#0d7168] text-white rounded-sm ">
                  <h4 className="p-2">Confirmed Members</h4>
                </div>
                <table className=" ">

                  <tbody className="flex flex-wrap gap-2 p-1 py-2 shadow-[0px_0px_10px_rgba(0,_0,_0,_0.25)] ">
                    {data.map((player, index) => (
                      <tr key={index} className="">
                        <td className="px-3 py-2 text-sm text-gray-500">
                          <div className="text-center">
                            <img className="h-10 w-10 rounded-full" src="/img/BG-GOLF.jpg" alt="" />
                            <div>
                              <div className="text-sm font-medium text-gray-900">{player.playerName}</div>

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
                  <h4 className="p-2">Waiting Members</h4>
                </div>
                <table className=" ">

                  <tbody className="flex flex-wrap gap-2 p-1 py-2 shadow-[0px_0px_10px_rgba(0,_0,_0,_0.25)]">
                    {data.map((player, index) => (
                      <tr key={index} className=" ">
                        <td className="px-3 py-2 text-sm text-gray-500">
                          <div className="text-center">
                            <img className="h-10 w-10 rounded-full" src="/img/BG-GOLF.jpg" alt="" />
                            <div>
                              <div className="text-sm font-medium text-gray-900">{player.playerName}</div>

                            </div>
                          </div>
                        </td>



                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <div className="w-full ">
              <div className="bg-[#17b3a6] text-white rounded-sm ">
                <h4 className="p-2">BookMarked Members</h4>
              </div>
              <table className="shadow-[0px_0px_10px_rgba(0,_0,_0,_0.25)] w-full ">

                <tbody className="flex flex-wrap gap-4 p-1 py-2 ">
                  {data.map((player, index) => (
                    <tr key={index} className=" ">
                      <td className="px-3 py-2 text-sm text-gray-500">
                        <div className=" text-center ">
                          <img className="h-10 w-10 rounded-full" src="/img/BG-GOLF.jpg" alt="" />
                          <div>
                            <div className="text-sm font-medium text-gray-900">{player.playerName}</div>

                          </div>
                        </div>
                      </td>



                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="flex items-end gap-40">
            {isCreated ? (
              <>

              </>
            ) : isJoined ? (
              <>

              </>
            ) : (
              <>
                <div className="flex justify-center text-center w-full ">
                  <button
                    className="py-4  lg:text-[30px]  lg:py-8 w-[200px] mt-10 lg:w-[450px] font-medium  text-white uppercase bg-blue-500 rounded cursor-pointer hover:bg-blue-700"
                    onClick={() => router(`/pay-now/${singleEvent?.id}`)}
                  >
                    {t('JOIN_NOW')}
                  </button>
                </div>

              </>
            )}
          </div>

          <div className="mr-4 lg:mr-0 lg:w-full  mt-10 ">
            <div className="xl:flex items-center   gap-40">
              {isCreated ? (
                <>
                  <div className="flex gap-2 m-4 xl:m-0">
                    <div>
                      <img src="/img/golfplyr.png" alt="" width="40px" />
                      <b className="text-xl lg:text-17xl text-darkslateblue-300 leading-[18px] [text-shadow:0px_7px_4px_#ccf2fe]">
                        Edit Teams
                      </b>
                    </div>
                  </div>
                  <div className="xl:flex gap-2 place-self-end">
                    <div className="flex-wrap  xl:flex items-center gap-2 m-4 xl:m-0">
                      <label
                        className="block mb-2 text-xs font-normal tracking-wide text-black capitalize"
                        htmlFor="teamSize"
                      >
                        {t('CAPACITY')}
                      </label>
                      <input
                        className="appearance-none block w-[80px] bg-gray-200 text-green border border-[#51ff85] bg-transparent hover:animate-bounce rounded py-2 px-2 mb-0 leading-tight focus:outline-none "
                        id="teamSize"
                        type="number"
                        name="teamSize"
                        value={capacity === undefined ? totalCapacity : capacity}
                        onChange={(e) => setCapacity(e.target.value)}
                        min="0"
                      />
                    </div>
                    <div className="flex-wrap xl:flex items-center gap-2 m-4 xl:m-0">
                      <label
                        className="block mb-2 text-xs font-normal tracking-wide text-black capitalize"
                        htmlFor="teamSize"
                      >
                        {t('TEAM_SIZE')}
                      </label>
                      <input
                        className="appearance-none block w-[80px] bg-gray-200 text-green border border-[#51ff85] bg-transparent hover:animate-bounce rounded py-2 px-2 mb-0 leading-tight focus:outline-none "
                        id="teamSize"
                        type="number"
                        name="teamSize"
                        value={
                          currentTeamSize == undefined
                            ? singleEvent?.teamSize
                            : currentTeamSize
                        }
                        onChange={(e) => setCurrentTeamSize(e.target.value)}
                        min="0"
                      />
                    </div>
                    <button
                      className="px-2 py-1 font-normal text-white bg-blue-500 rounded hover:bg-blue-700 m-4 xl:m-0"
                      onClick={handleOpenPlayerList}
                    >
                      Remove Players List
                    </button>
                    <button
                      className="px-2 py-1 font-normal text-white bg-blue-500 rounded hover:bg-blue-700"
                      onClick={handleNavigateHome}
                    >
                      Add Players Score
                    </button>
                  </div>
                </>
              ) : isJoined ? (
                <>
                  {/* Content for when isCreated is false and isJoined is true */}
                  <div className="flex items-center gap-4">
                    {/* Your content here */}
                  </div>
                  <div className="flex justify-end w-full">
                    <button
                      className="p-4 font-normal text-white uppercase bg-blue-500 rounded cursor-pointer hover:bg-blue-700"
                      onClick={() => router(`/add-score-page/${singleEvent?.id}`)}
                    >
                      {t('Add Score')}
                    </button>
                  </div>

                </>
              ) : (
                <>

                  {/* <div className="flex items-center gap-4">
                    <div>
                      <img src="/img/golfplyr.png" alt="" width="40px" />
                      <b className=" text-xl lg:text-17xl text-darkslateblue-300 leading-[18px] [text-shadow:0px_7px_4px_#ccf2fe]">
                        {t("TEAM_MEMBERS")}
                      </b>

                    </div>
                  </div> */}

                  {/* <button
                    className="p-4 px-10 w-[250px] font-normal text-white uppercase bg-blue-500 rounded cursor-pointer hover:bg-blue-700"
                    onClick={() => router(`/pay-now/${singleEvent?.id}`)}
                  >
                    {t('JOIN_NOW')}
                  </button> */}
                </>
              )}
            </div>
            {singleEvent?.eventType !== 'individual' && (
              <div className="overflow-x-auto w-full shadow-[0px_0px_10px_rgba(0,_0,_0,_0.25)] px-10">
                <div className="flex items-center gap-4">
                  <div>
                    <img src="/img/golfplyr.png" alt="" width="40px" />
                    <b className="text-xl lg:text-17xl text-darkslateblue-300 leading-[18px] [text-shadow:0px_7px_4px_#ccf2fe]">
                      {t("TEAM_MEMBERS")}
                    </b>
                  </div>
                </div>
                <table className="w-full border-spacing-y-5 px-1 ">
                  <thead className="text-left text-whitesmoke-100">
                    <tr className="shadow-[0px_4px_10px_rgba(0,_0,_0,_0.25)] bg-lightseagreen-200 h-[55px] text-xl ">
                      <th className="pl-4 py-3 whitespace-nowrap rounded-s-[3px] leading-[10.25px] font-medium ">
                        {t('TEAM_NAME')}
                      </th>
                      {generateTableHeaders()}
                    </tr>
                  </thead>
                  <tbody className="text-left text-black ">
                    {teams?.map((team: any, index: any) => (
                      <tr className="shadow-[0px_0px_10px_rgba(0,_0,_0,_0.25)] h-[69px] font-medium">
                        <td className="whitespace-nowrap pl-1 relative top-1 tracking-[1.45px] leading-[9.22px] flex items-center justify-between min-w-[182px] rounded-s-[3px] ">
                          <div className={`w-[156px] relative pl-1 rounded text-base h-[58px] flex items-center font-semibold leading-5 text-black bg-[#e0e0e0]`}>
                            <h4>{team.name}</h4>
                            <div className="absolute top-[50%] z-20 -right-[20px] -translate-y-2/4 h-[58px] w-[58px] overflow-hidden text-lg leading-5 font-semibold">
                              {team.imageUrl ? (
                                <img className="w-full h-full object-cover rounded-[50%]" alt="" src={team.imageUrl} />
                              ) : (
                                <img className="w-full h-full object-cover rounded-[50%]" alt="Default Image" src="/img/BG-GOLF.jpg" />
                              )}
                            </div>
                          </div>
                        </td>
                        {team.members?.map((member: any, memberIndex: any) => (
                          <td className="py-4 pl-4 whitespace-nowrap">
                            <Player
                              isCreator={isCreated}
                              key={memberIndex}
                              showNumber={false}
                              enableHover={true}
                              onEdit={() => {
                                setSelectedPlayerNickname(member.nickName);
                                setSelectedUserId(member.userId);
                                setSelectedTeamName(team.name);
                                setEditOpen(true);
                              }}
                              onDelete={() => setOpen(true)}
                              name={member.nickName}
                              imageUrl={member.imageUrl}
                            />
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}


            {isCreated && (
              <div className="flex justify-end my-10">
                <button
                  className="px-4 py-2 m-2 mt-8 xl:m-0 xl:py-4 text-xl font-bold text-white bg-blue-500 rounded cursor-pointer hover:bg-blue-700"
                  onClick={updateTeams}
                >
                  {t('UPDATE_TEAM')}
                </button>
              </div>
            )}
            <Transition.Root show={showPlayerList} as={Fragment}>
              <Dialog
                as="div"
                className="relative z-[9999]"
                onClose={() => setShowPlayerList(false)}
              >
                <div className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75" />
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
                      <Dialog.Panel className="px-4 pt-5 pb-4 overflow-hidden text-left transition-all transform bg-white rounded-lg shadow-xl w-fullrelative sm:my-8 sm:max-w-lg sm:w-full sm:p-6">
                        <div className="flex items-start justify-between">
                          <h3 className="text-lg font-medium leading-6 text-gray-900">
                            Removed Players List
                          </h3>
                          <div className="flex items-start justify-between">
                            <div
                              className="cursor-pointer"
                              onClick={() => setShowPlayerList(false)}
                            >
                              <svg
                                className="w-6 h-6 text-gray-900"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M6 18L18 6M6 6l12 12"
                                />
                              </svg>
                            </div>
                          </div>
                        </div>
                        <div className="mt-2">
                          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                              <tr>
                                <th scope="col" className="px-6 py-3">
                                  Player Name
                                </th>
                                <th scope="col" className="px-6 py-3">
                                  Action
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              {playerList.map((player: any, index: any) => (
                                <tr
                                  key={index}
                                  className={`bg-white border-b dark:bg-gray-900 dark:border-gray-700`}
                                >
                                  <th
                                    scope="row"
                                    className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap"
                                  >
                                    {player.name}
                                  </th>
                                  <td className="px-6 py-4">
                                    <button className="px-2 py-1 text-white bg-blue-500 rounded-full cursor-pointer hover:bg-blue-700 font-xs">
                                      Add To Team
                                    </button>
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
                          <form className="px-8" onSubmit={updateTeamLocal}>
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
                                  id="teamname"
                                  className="w-full py-4 text-gray-900 border-none rounded-md pl-14 bg-gray-50 sm:text-sm"
                                  value={selectedTeamName}
                                  onChange={(e) =>
                                    setSelectedTeamName(e.target.value)
                                  }
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

                              <div className="relative flex items-center w-full gap-2">
                                <img
                                  src="/img/ellipse-13@2x.png"
                                  alt="Team Logo"
                                  className="absolute w-10 h-10 transform -translate-y-1/2 rounded-full left-2 top-1/2"
                                />

                                <input
                                  type="text"
                                  id="playerName"
                                  placeholder="Player 1"
                                  className="w-full py-3 text-gray-900 border-none rounded-md pl-14 bg-gray-50 sm:text-sm"
                                  value={selectedPlayerNickname}
                                  onChange={(e) =>
                                    setSelectedPlayerNickname(e.target.value)
                                  }
                                />
                                <input
                                  type="hidden"
                                  name="userId"
                                  id="playerName"
                                  placeholder="Player 1"
                                  className="w-full py-3 text-gray-900 border-none rounded-md pl-14 bg-gray-50 sm:text-sm"
                                  value={selectedUserId}
                                  onChange={(e) =>
                                    setSelectedUserId(e.target.value)
                                  }
                                />
                                <select
                                  name="teamId"
                                  id="teamSelect"
                                  className="w-1/2 py-3 text-gray-900 border-none rounded-md bg-gray-50 sm:text-sm"
                                  onChange={(e) =>
                                    setSelectedTeamId(e.target.value)
                                  }
                                >
                                  <option value="" disabled selected>
                                    Select a Team
                                  </option>
                                  {teams?.map((team: any) => (
                                    <option key={team.id} value={team.id}>
                                      {team.name}
                                    </option>
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
                                type="submit"
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
          <table className="w-full mt-8 mb-4">
          <CommentModel eventId={singleEvent?.id} closeModal={()=>{} } />

          </table>
        </div>
      </div>
    </>
  );
};

export default EditTeamPage;
