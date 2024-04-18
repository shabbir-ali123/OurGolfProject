import { FunctionComponent } from "react";
const IndiviualPlayerTableRow: FunctionComponent = () => {
  return (
    <div className="mt-12 flex relative items-center gap-3 box-border p-3 rounded-10xs  bg-white shadow-[0px_0px_10px_rgba(0,_0,_0,_0.25)] py-10">
      <div className="basis-1/2 min-w-[120px] ">
        <div className="absolute top-[-10px] w-[99px] h-32 left-[0px]">
          <img
            className="object-cover w-full h-full  rounded-8xs"
            alt=""
            src="/img/rectangle-1256@2x.png"
          />
          <div className="absolute m-auto left-0 right-0  bottom-[-10px] w-[29px] h-[29px]">
            <div className=" rounded-[50%] bg-mediumslateblue w-[29px] h-[29px]" />
            <b className="absolute top-[9px] left-[11px]  leading-[9.22px]">
              1
            </b>
          </div>
        </div>
      </div>
      <div className="flex gap-3 items-center basis-1/2 min-w-[180px]">
        <div className="w-7">
          <img className="pr-1" alt="" src="/img/vector.svg" />3
        </div>
        <div> Esther Howard</div>
      </div>
      <div className="basis-1/2 min-w-[111px]">Team 1</div>
      <div className="basis-1/3 text-center leading-[9.22px] text-5xl font-bold text-seagreen-100">
        210
      </div>
    </div>
  );
};
export default IndiviualPlayerTableRow;
