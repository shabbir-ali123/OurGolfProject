import React, { ReactNode, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import Select from "react-select";
import { GroupBase, OptionsOrGroups } from "react-select";
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
  onChange?: any;
  variant?: string;
  handleImageChange?: any;
  handleLocationChange?: any;
  handleLevelChange?: any;
}

interface OptionType {
  label: string;
  value: string;
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
  variant,
  handleImageChange,
  handleLocationChange,
  handleLevelChange,
}) => {
  const { t } = useTranslation();

  const fileInputRef = useRef<HTMLInputElement>(null);

  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

  const JapanCities: any[] = [
    {
      label: t("HOKKAIDO_TOHOKU"),
      options: [
        { value: "Hokkaido", label: t("HOKKAIDO") },
        { value: "Aomori Prefecture", label: t("AOMORI") },
        { value: "Iwate Prefecture", label: t("IWATE") },
        { value: "Miyagi Prefecture", label: t("MIYAGI") },
        { value: "Akita", label: t("AKITA") },
        { value: "Yamagata Prefecture", label: t("YAMAGATA") },
        { value: "Fukushima Prefecture", label: t("FUKUSHIMA") },
      ],
    },
    {
      label: t("KANTO"),
      options: [
        { value: "Ibaraki Prefecture", label: t("IBARAKI") },
        { value: "Tochigi Prefecture", label: t("TOCHIGI") },
        { value: "Gunma Prefecture", label: t("GUNMA") },
        { value: "Saitama", label: t("SAITAMA") },
        { value: "Chiba prefecture", label: t("CHIBA") },
        { value: "Tokyo", label: t("TOKYO") },
        { value: "Kanagawa Prefecture", label: t("KANAGAWA") },
      ],
    },
    {
      label: t("CHUBU"),
      options: [
        { value: "Niigata Prefecture", label: t("NIIGATA") },
        { value: "Toyama Prefecture", label: t("TOYAMA") },
        { value: "Ishikawa Prefecture", label: t("ISHIKAWA") },
        { value: "Fukui prefecture", label: t("FUKUI") },
        { value: "Yamanashi Prefecture", label: t("YAMANSHI") },
        { value: "Nagano", label: t("NAGANO") },
      ],
    },
    {
      label: t("TOKAI"),
      options: [
        { value: "Shizuoka Prefecture", label: t("SHIZUOKA") },
        { value: "Aichi prefecture", label: t("AICHI") },
        { value: "Mie Prefecture", label: t("MIE") },
        { value: "Gifu Prefecture", label: t("GIFU") },
      ],
    },
    {
      label: t("KINKI"),
      options: [
        { value: "Shiga Prefecture", label: t("SHIGA") },
        { value: "Kyoto", label: t("KYOTO") },
        { value: "Osaka prefecture", label: t("OSAKA") },
        { value: "Hyogo prefecture", label: t("HYOGO") },
        { value: "Nara Prefecture", label: t("NARA") },
        { value: "Wakayama Prefecture", label: t("WAKAYAMA") },
      ],
    },
    {
      label: t("SHIKOKU"),
      options: [
        { value: "Tottori prefecture", label: t("TOTTORI") },
        { value: "Shimane Prefecture", label: t("SHIMANE") },
        { value: "Okayama Prefecture", label: t("OKAYAMA") },
        { value: "Hiroshima", label: t("HIROSHIMA") },
        { value: "Yamaguchi Prefecture", label: t("YAMAGUCHI") },
        { value: "Tokushima", label: t("TOKUSHIMA") },
        { value: "Kagawa Prefecture", label: t("KAGAWA") },
        { value: "Ehime Prefecture", label: t("EHIME") },
        { value: "Kochi Prefecture", label: t("KOCHI") },
      ],
    },
    {
      label: t("KYUSHU"),
      options: [
        { value: "Fukuoka Prefecture", label: t("FUKUOKA") },
        { value: "Saga Prefecture", label: t("SAGA") },
        { value: "Nagasaki Prefecture", label: t("NAGASAKI") },
        { value: "Kumamoto Prefecture", label: t("KUMAMOTO") },
        { value: "Oita Prefecture", label: t("OITA") },
        { value: "Miyazaki prefecture", label: t("MIYAZAKI") },
        { value: "Kagoshima prefecture", label: t("KAGOSHIMA") },
        { value: "Okinawa Prefecture", label: t("OKINAWA") },
      ],
    },
  ];
  const removeSelectedFile = (index: number) => {
    const updatedFiles = [...selectedFiles];
    updatedFiles.splice(index, 1);
    setSelectedFiles(updatedFiles);
    
  };
  const levelOptions: readonly any[] = [
    { value: "entry", label: "Entry" },
    { value: "beginner", label: "Beginner" },
    { value: "intermediate", label: "Intermediate" },
    { value: "advanced", label: "Advanced" },
    { value: "taskgolf", label: "TASKGOLF Amateur Ambassador" },
  ];
  
  if (variant == "levelDropdown") {
    return (
      
      <Select
        name="level"
        required
        onChange={handleLevelChange}
        options={levelOptions}
        className="w-full text-base border text-black border-gray-300 rounded  hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
      />
    );
  }
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
            className="p-1 rounded-full  inline-block text-white  my-2"
            style={{ width: iconWidth, height: iconHeight }}
          >
            {icon}
          </span>
          {label}
        </label>
        {variant == "video" ? (
          <>
            <div className="flex flex-wrap gap-4 mt-2  ">
              {selectedFiles.map((file: any, index: any)  => (
                <div key={index} className="relative ">
                  <img
                    src={URL.createObjectURL(file)}
                    alt={`file-${index}`}
                    className="w-16 h-16 object-cover rounded-lg "
                  />
                  <button
                    className="absolute top-0 right-[-10px] h-4 w-4 bg-[#61cbc2] rounded-full text-white text-[14px] flex justify-center items-center cursor-pointer"
                    onClick={() => removeSelectedFile(index)}
                  >
                    X
                  </button>
                </div>
              ))}
            </div>
            <input
              id="file-upload"
              name="mediaFiles"
              ref={fileInputRef}
              className="hidden "
              type="file"
              multiple
              onChange={handleImageChange}
              accept="video/*"
            />
            <label
              htmlFor="file-upload"
              className="flex items-center justify-center p-4  border-2 border-dashed rounded-lg border-[#61cbc2] cursor-pointer"
            >
              <svg
                className="w-6 h-6 text-gray-600"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M12 4v16m8-8H4"></path>
              </svg>
            </label>
          </>
        ) : variant === "dropdown" ? (
          <Select
            name="place"
            required
            options={
              JapanCities as OptionsOrGroups<OptionType, GroupBase<OptionType>>
            }
            onChange={handleLocationChange}
            className="w-full text-base border text-black border-gray-300 rounded shadow hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          />
        ) : (
          <input
            className="appearance-none block w-full bg-white text-gray-700 border border-[#d9d9d9] rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white "
            id={pname}
            type={ptype}
            name={pname}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
          />
        )}
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
