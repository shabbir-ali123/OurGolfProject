import { FunctionComponent } from "react";
import StateDefault from "./StateDefault";

const LeaderBoardSection: FunctionComponent = () => {
  return (
    <div className="absolute top-[0px] left-[calc(50%_-_675px)] w-[1350px] h-[1004px] text-left text-21xl text-gray1-700 font-poppins">
      <div className="absolute top-[0px] left-[calc(50%_-_675px)] bg-white shadow-[0px_0px_5px_rgba(0,_0,_0,_0.25)] w-[1350px] h-[1004px]" />
      <div className="absolute top-[87px] left-[64px] w-[563px] h-[147px]">
        <div className="absolute top-[129px] left-[0px] tracking-[0.04em] leading-[18px] font-semibold [text-shadow:0px_7px_4px_#17b3a6]">
          Leader Board
        </div>
        <div className="absolute top-[0px] left-[8px] w-[555px] h-[62px]">
          <div className="absolute top-[0px] left-[0px] w-[55px] h-[62px]">
            <div className="absolute top-[0px] left-[0px] rounded-md bg-white shadow-[0px_0px_4px_rgba(0,_0,_0,_0.25)] box-border w-[55px] h-[62px] border-[1px] border-solid border-silver" />
            <img
              className="absolute h-[33.87%] w-[32.73%] top-[33.87%] right-[34.55%] bottom-[32.26%] left-[32.73%] max-w-full overflow-hidden max-h-full"
              alt=""
              src="/img/icon.svg"
            />
          </div>
          <StateDefault
            search="Search player score here..."
            stateDefaultWidth="490px"
            stateDefaultPosition="absolute"
            stateDefaultTop="2px"
            stateDefaultLeft="65px"
            stateDefaultBorder="1px solid #b5b5b5"
            stateDefaultHeight="60px"
            searchFontSize="19px"
          />
        </div>
      </div>
    </div>
  );
};

export default LeaderBoardSection;
