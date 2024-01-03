import React from "react";

interface IProps {
  title: string;
}

export const Clip = ({ title }: IProps) => {
  return (
    <div className="animate__animated animate__lightSpeedInRight">
      <span className="inline-flex items-center gap-x-1 rounded-l-md bg-[#17B3A6] px-2 py-1 text-base font-normal text-white ring-1 ring-inset ring-gray-500/10">
        {title}
      </span>
    </div>
  );
};
