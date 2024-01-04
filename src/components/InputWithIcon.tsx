
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
      }

    const InputWithIcon: React.FC<InputWithIconProps> = ({
    icon,
    label,
    placeholder,
    colSpanSm = 8,
    colSpanMd = 5,
    colSpanLg = 4,
    iconWidth = "24px",
    iconHeight = "24px",
    pname   
    }) => {
    return (
        <div>
        <div
            className={`col-span-12 sm:col-span-${colSpanSm} md:col-span-${colSpanMd} lg:col-span-${colSpanLg} py-2 md:mr-0 md:mb-0`}
        > 
       
            <label
            className=" capitalize tracking-wide text-gray-700 text-xs font-bold mb-2  "
            htmlFor="grid-event-name"
            >
             <span
          className="p-1 rounded-full border-solid border-4 border-gray-600 inline-block"
          style={{ width: iconWidth, height: iconHeight }}
        >
          {icon}
        </span>{" "} {label}
            </label>
            <input
            className="float-right appearance-none ml-4 w-8/12 bg-gray-200 text-gray-700 border border-[#51ff85] bg-transparent rounded py-4 px-4 mb-0 leading-tight focus:outline-none focus:bg-white hover:animate-bounce"
            id="grid-Event-Name"
            type="text"
            name={pname}
            placeholder={placeholder}
            />
        </div>
        </div>
    );
    };

    export default InputWithIcon;
