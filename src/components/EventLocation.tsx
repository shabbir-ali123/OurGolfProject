import { FunctionComponent } from "react";

const EventLocation: FunctionComponent = () => {
  return (
    <div className="absolute top-[273px] left-[103px] w-[427px] h-[106px] text-left text-lg text-white font-poppins">
      <div className="absolute top-[0px] left-[0px] w-[226px] h-[106px] text-13xl text-darkslateblue-300">
        <div className="absolute top-[0px] left-[0px] w-[226px] h-[106px]">
          <img
            className="absolute top-[0px] left-[0px] w-[57px] h-[103px] object-cover"
            alt=""
            src="/img/rectangle-1248@2x.png"
          />
          <b className="absolute top-[58px] left-[58px] uppercase [text-shadow:0px_7px_4px_#ccf2fe]">{`EVENTS  IN `}</b>
        </div>
      </div>
      <div className="absolute top-[63px] left-[229px] w-[98px] h-8">
        <div className="absolute top-[6px] left-[0px] rounded-10xs bg-lightseagreen-200 w-[95px] h-[25px]" />
        <div className="absolute top-[5px] left-[21px] capitalize">Tokyo</div>
        <div className="absolute top-[0px] left-[84px] rounded-[50%] bg-lightseagreen-200 box-border w-3.5 h-3.5 border-[1px] border-solid border-white" />
        <img
          className="absolute h-[15.63%] w-[5.1%] top-[14.06%] right-[4.59%] bottom-[70.31%] left-[90.31%] max-w-full overflow-hidden max-h-full"
          alt=""
          src="/img/vector71.svg"
        />
      </div>
      <div className="absolute top-[63px] left-[329px] w-[98px] h-8">
        <div className="absolute top-[6px] left-[0px] rounded-10xs bg-lightseagreen-200 w-[95px] h-[25px]" />
        <div className="absolute top-[5px] left-[5px] capitalize">Hokkaido</div>
        <div className="absolute top-[0px] left-[84px] rounded-[50%] bg-lightseagreen-200 box-border w-3.5 h-3.5 border-[1px] border-solid border-white" />
        <img
          className="absolute h-[15.63%] w-[5.1%] top-[14.06%] right-[4.59%] bottom-[70.31%] left-[90.31%] max-w-full overflow-hidden max-h-full"
          alt=""
          src="/img/vector71.svg"
        />
      </div>
    </div>
  );
};

export default EventLocation;
