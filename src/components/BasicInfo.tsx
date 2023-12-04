import React, { useRef } from "react";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const BasicInfo: React.FC = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileInputChange = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };
  return (
    <div className="lg:max-w-6xl mx-auto px-2 ">
      <h2 className="text-[#0f1e56] text-4xl">Basic Information</h2>
      <div className=" bg-gradient-to-b from-[rgba(167,255,193,0.34)] via-transparent to-transparent rounded-3xl mt-4 border-solid border-2 border-[#51ff85]">
        <form className="grid grid-cols-9 mx-auto lg:gap-x-16  px-4 py-8  ">
          <div className="col-span-8 lg:col-span-4 py-2  md:col-span-5   md:mr-0 md:mb-3 ">
            <label
              className="block captilize tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="grid-event-name"
            >
              Event Name
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-[#51ff85] bg-transparent rounded py-4 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              id="grid-Event-Name"
              type="text"
              placeholder="Event Name"
            />
          </div>
          <div className="col-span-8  lg:col-span-4 py-2 md:col-span-5  md:mr-0 md:mb-3">
            <label
              className="block captilize tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="grid-short-video"
            >
              Short Video Url
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-[#51ff85] bg-transparent rounded py-4 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              id="grid-first-name"
              type="text"
              placeholder="Short Video Url"
            />
          </div>
          <div className="col-span-8  lg:col-span-4 py-2 md:col-span-5  md:mr-0 md:mb-3">
            <label
              className="block captilize tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="grid-short-video"
            >
              Event Details
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-[#51ff85] bg-transparent rounded py-4 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              id="grid-first-name"
              type="text"
              placeholder="Event Details"
            />
            <div className="relative w-full col-span-8  lg:col-span-4  md:col-span-5  md:mr-0 md:mb-2">
              <div className="absolute grid  place-items-center text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-sm rounded-l-sm text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 top-[32px] right-[-42px] ">
                <button className="bg-transparent text-white cursor-pointer py-2.5 px-4">
                  Search
                </button>
              </div>
              <label
                className="block captilize tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="grid-short-video"
              >
                Place
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-[#51ff85] bg-transparent rounded py-4 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                id="grid-first-name"
                type="text"
                placeholder="Enter Place"
              />
            </div>
          </div>
          <div className="col-span-8  lg:col-span-4 py-2 md:col-span-5  md:mr-0 md:mb-3">
            <label
              className="block captilize tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="grid-short-video"
            >
              Upload Images
            </label>
            <div className="relative ">
              <input
                className="hidden h-10"
                id="file-input"
                type="file"
                ref={fileInputRef}
                onChange={(e) => {
                  console.log(e.target.files);
                }}
              />
              <div className="flex items-center ">
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-[#51ff85] bg-transparent rounded py-16 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                  type="text"
                  onClick={handleFileInputChange}
                  readOnly
                />
                <span
                  className="absolute top-[65px] left-[50%] transform -translate-x-1/2 pr-3 flex items-center text-gray-700 cursor-pointer"
                  onClick={handleFileInputChange}
                >
                  <FontAwesomeIcon icon={faPlus} />
                </span>
              </div>
            </div>
          </div>
        </form>

        <div className="col-span-12 mx-4 sm:mx-16 relative md:col-span-8 lg:col-span-8 ">
          {/* Google Map */}
          <iframe
            className="col-span-4 sm:col-span-4 rounded-2xl"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d8181116.269949623!2d130.64039243803072!3d36.56179855912495!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x34674e0fd77f192f%3A0xf54275d47c665244!2sJapan!5e0!3m2!1sen!2s!4v1700468556527!5m2!1sen!2s"
            width="100%"
            height="350px"
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>

          <div className="absolute top-0 left-0 right-0 flex items-center justify-center mt-4">
            <button
              className="bg-[#51ff85] mx-2 text-white py-3 px-4 mb-2 md:mb-0 md:mr-2 rounded-md"
              onClick={() => {}}
            >
              Map
            </button>
            <input
              type="text"
              className="w-3/4 md:w-1/2 p-2 rounded-md focus:outline-none border-[#52FF86]"
              placeholder="Search location"
            />
            <button
              className="bg-blue-500 mx-2 text-white py-3 px-4 rounded-md sm:mx-0 lg:mx-2"
              onClick={() => {
                // Handle select button click
              }}
            >
              Select
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BasicInfo;
