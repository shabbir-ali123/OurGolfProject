import { FunctionComponent, useState, useEffect } from "react";
import AllEventContainer from "../components/AllEventContainer";
import SearchEventContainer from "../components/SearchMainEventFilter";
import AllEventTabs from "../components/AllEventTabs";
import EventLocation from "../components/EventLocation";
import Header from "../components/Header";
import {
  PencilIcon,
  PencilSquareIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { Clip } from "../components/Clip";
import Tabs from "../components/Tabs";
import HoverSideMenu from "../components/HoverSideMenu";

const EventMainPage: FunctionComponent = () => {
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const [isDesktop, setIsDesktop] = useState(window.innerWidth > 1280);

  const handleImageClick = () => {
    setIsMenuVisible(!isMenuVisible);
  };

  const handleMenuItemClick = () => {
    setIsMenuVisible(false);
  };

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth > 1280);
    };

    window.addEventListener("resize", handleResize);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="flex flex-col gap-20 overflow-hidden px-10 py-10 mx-0 xl:mx-20">
      <SearchEventContainer />
      <div className="flex flex-wrap justify-between items-center">
        <div className="flex flex-wrap items-end gap-3">
          <div>
            <img
              className="object-cover w-16"
              alt=""
              src="/img/rectangle-1248@2x.png"
            />
          </div>
          <div className="flex flex-wrap items-center gap-4 my-2 xl:m-0">
            <h1 className="text-[#193A8B] text-[3xl] font-semibold">
              EVENTS IN
            </h1>
            <Clip title="Tokyo" />
            <Clip title="Hokkaido" />
          </div>
        </div>
       
      </div>
     
      <Tabs />
      
      {isDesktop && (
        <img
          className="absolute top-[70px] left-[0px] w-20 h-[auto]"
          alt=""
          src="/img/SideMenuicons.svg"
          onClick={handleImageClick}
        />
      )}
      {isMenuVisible && <HoverSideMenu onItemClick={handleMenuItemClick} />}
    </div>
  );
};

export default EventMainPage;
