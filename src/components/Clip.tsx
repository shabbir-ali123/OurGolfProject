import React from "react";
import { useTranslation } from "react-i18next";

interface IProps {
  title: string;
}

export const Clip = ({ title }: IProps) => {
  const { t} = useTranslation();
  return (
    <div className="animate__animated animate__lightSpeedInRight">
      <span className="inline-flex items-center gap-x-1 rounded-md bg-[#17B3A6] px-2 py-1 text-base font-normal text-white ring-1 ring-inset ring-gray-500/10">
        {t(title.toUpperCase())}
        <button
          type="button"
          className="relative text-gray-400 rounded-md cursor-pointer group"
        >
          X
        </button>
      </span>
    </div>
  );
};
