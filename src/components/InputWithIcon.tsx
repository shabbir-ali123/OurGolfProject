import React, { ReactNode } from "react";

interface InputWithIconProps {
  icon: ReactNode;
  label: string;
  pname: string;
  placeholder?: string;
  colSpanSm?: number;
  colSpanMd?: number;
  colSpanLg?: number;
  iconWidth?: string;
  iconHeight?: string;
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputWithIcon: React.FC<InputWithIconProps> = ({
  icon,
  label,
  pname,
  placeholder,
  colSpanSm = 8,
  colSpanMd = 5,
  colSpanLg = 4,
  iconWidth = "24px",
  iconHeight = "24px",
  value,
  onChange,
}) => {
  return (
    <div>
      <div
        className={`col-span-12 sm:col-span-${colSpanSm} md:col-span-${colSpanMd} lg:col-span-${colSpanLg} py-2 md:mr-0 md:mb-0`}
      >
        <label
          className="mb-2 text-xs font-bold tracking-wide text-gray-700 capitalize"
          htmlFor={pname}
        >
          <span
            className="p-1 rounded-full border-solid border-2 border-[#4B4B4B] inline-block text-[#52FF86]"
            style={{ width: iconWidth, height: iconHeight }}
          >
            {icon}
          </span>
          {label}
        </label>
        <input
          className="float-right appearance-none ml-4 w-8/12 bg-gray-200 text-gray-700 border border-[#51ff85] bg-transparent rounded py-4 px-4 mb-0 leading-tight focus:outline-none focus:bg-white hover:animate-bounce"
          id={pname}
          type="text"
          name={pname}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
        />
      </div>
    </div>
  );
};

export default InputWithIcon;
