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
  ptype?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputWithIcon: React.FC<InputWithIconProps> = ({
  icon,
  label,
  pname,
  ptype,
  placeholder,
  colSpanSm = 4,
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
        className={`col-span-12 mx-0 lg:mx-4 sm:col-span-${colSpanSm} md:col-span-${colSpanMd} lg:col-span-${colSpanLg} py-0 xl:py-2 md:mr-0 md:mb-0`}
      >
        <label
          className="mb-2 text-xs font-bold tracking-wide text-gray-700 capitalize flex items-center gap-2"
          htmlFor={pname}
        >
          <span
            className="p-1 rounded-full  inline-block text-[#52FF86]  my-2"
            style={{ width: iconWidth, height: iconHeight }}
          >
            {icon}
          </span>
          {label}
        </label>
        <input
          className="appearance-none block w-full bg-white text-gray-700 border border-[#d9d9d9] rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white "
          id={pname}
          type={ptype}
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

export interface TextAreaProp {
  label: string;
  pname: string;
  placeholder?: string;
  colSpanSm?: number;
  colSpanMd?: number;
  colSpanLg?: number;
  iconWidth?: string;
  iconHeight?: string;
  value?: string;
}

export const CustomTextArea: React.FC<TextAreaProp> = ({
  label,
  pname,
  placeholder,
  colSpanSm = 8,
  colSpanMd = 5,
  colSpanLg = 4,
  iconWidth = "24px",
  iconHeight = "24px",
  value,
}) => {
  return (
    <div>
      <div
        className={`col-span-12 sm:col-span-${colSpanSm} md:col-span-${colSpanMd} lg:col-span-${colSpanLg} py-2 md:mr-0 md:mb-0`}
      >
        <label
          className="text-xs font-bold tracking-wide text-gray-700 capitalize"
          htmlFor={pname}
        >
          {label}
        </label>
        <textarea
          className=" appearance-none w-full bg-gray-200 text-gray-700 border border-[#51ff85] bg-transparent rounded leading-tight focus:outline-none focus:bg-white hover:animate-bounce"
          id={pname}
          name={pname}
          placeholder={placeholder}
          value={value}
        />
      </div>
    </div>
  );
};

export interface FileInputProps {
  label: string;
  pname: string;
}

export const FileInputComponents: React.FC<FileInputProps> = ({
  label,
  pname,
}) => {
  return (
    <div className="mb-4">
      <label
        className="block mb-2 text-sm font-medium text-gray-900"
        htmlFor="postMedia"
      >
        {label}
      </label>
      <input type="file" name={pname} id={pname} />
    </div>
  );
};
