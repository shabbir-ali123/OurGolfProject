import { ArrowDownIcon, VideoCameraIcon } from "@heroicons/react/24/solid";
import InputWithIcon from "../FormComponents";

export const UploaderInput = ({
  handleUploadChange,
  ref,
  handleInputClick,
}: any) => {
  return (
    <div className="flex items-center justify-center p-3 border-2 border-dashed rounded-lg border-[#61cbc2] ml-2">
      <input
        className="w-[106px]"
        id="portfolioVideo"
        name="portfolioVideo"
        ref={ref}
        type="file"
        multiple
        onChange={handleUploadChange}
        accept="video/*"
      />
      <label
        htmlFor="portfolioVideo"
        className="flex items-center justify-center p-2 border-2 border-gray-300 rounded-lg cursor-pointer hover:border-[#51ff85]"
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
      <ArrowDownIcon className="h-[40px]" onClick={handleInputClick} />
    </div>
  );
};
