import React, { useRef, ChangeEvent, useState } from "react";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { motion } from "framer-motion";

interface BasicInfoProps {
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  setFormData: React.Dispatch<React.SetStateAction<any>>;
}

const BasicInfo: React.FC<BasicInfoProps> = ({ onChange, setFormData }) => {
  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const imagesArray: string[] = [];

      for (let i = 0; i < files.length; i++) {
        const reader = new FileReader();
        reader.onloadend = () => {
          const dataUrl = reader.result as string;
          imagesArray.push(dataUrl);

          if (imagesArray.length === files.length) {
            setFormData((prevFormData: any) => ({
              ...prevFormData,
              imageUrl: imagesArray,
            }));
          }
        };
        reader.readAsDataURL(files[i]);
      }
    }
  };

  const [isHovered, setIsHovered] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileInputChange = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };
  return (
    <motion.div
      className="lg:max-w-6xl mx-auto  px-2 "
      animate={{ x: [0, 100, 0] }}
    >
      <h2 className="text-[#0f1e56] text-4xl animate-bounce">
        Basic Information
      </h2>
      <div className=" bg-gradient-to-b from-[rgba(167,255,193,0.34)] via-transparent to-transparent rounded-3xl mt-4 border-solid border-2 border-[#51ff85]">
        <div className="grid grid-cols-9 mx-auto lg:gap-x-16  px-4 py-8  ">
          <div className="col-span-8 lg:col-span-4 py-2  md:col-span-5   md:mr-0 md:mb-3 ">
            <label
              className="block captilize tracking-wide text-gray-700 text-xs font-bold mb-2 an"
              htmlFor="grid-event-name"
            >
              Event Name
            </label>
            <input
              className="appearance-none block w-full bg-white text-gray-800 border border-[#51ff85] rounded py-4 px-4 mb-3 leading-tight focus:outline-none focus:bg-white transition duration-300 ease-in-out transform  hover:animate-bounce shadow-xl"
              id="grid-Event-Name"
              type="text"
              name="eventName"
              placeholder="Event Name"
              onChange={onChange}
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
              className="appearance-none block w-full bg-white text-gray-800 border border-[#51ff85] rounded py-4 px-4 mb-3 leading-tight focus:outline-none focus:bg-white transition duration-300 ease-in-out transform  hover:animate-bounce shadow-xl"
              id="grid-first-name"
              type="text"
              name="eventVideoUrl"
              placeholder="Short Video Url"
              onChange={onChange}
            />
          </div>
          <div className="col-span-8  lg:col-span-4 py-2 md:col-span-5  md:mr-0 md:mb-3">
            <label
              className="flex items-center gap-2 capitalize tracking-wide text-gray-700 text-xs font-bold mb-2 relative"
              htmlFor="grid-short-video"
            >
              Event Details
              <svg
                width="20"
                height="20"
                className="cursor-pointer"
                viewBox="0 0 40 40"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              >
                <path
                  d="M20 0C16.0444 0 12.1776 1.17298 8.8886 3.37061C5.59962 5.56823 3.03617 8.69181 1.52242 12.3463C0.00866569 16.0008 -0.387401 20.0222 0.384303 23.9018C1.15601 27.7814 3.06082 31.3451 5.85787 34.1421C8.65492 36.9392 12.2186 38.844 16.0982 39.6157C19.9778 40.3874 23.9991 39.9913 27.6537 38.4776C31.3082 36.9638 34.4318 34.4004 36.6294 31.1114C38.827 27.8224 40 23.9556 40 20C39.9944 14.6974 37.8855 9.61356 34.136 5.86405C30.3864 2.11453 25.3026 0.00559965 20 0ZM20 36.9231C16.6529 36.9231 13.381 35.9305 10.598 34.071C7.81506 32.2115 5.64599 29.5685 4.36512 26.4762C3.08426 23.3839 2.74912 19.9812 3.4021 16.6985C4.05508 13.4157 5.66685 10.4003 8.03358 8.03358C10.4003 5.66684 13.4157 4.05508 16.6985 3.40209C19.9812 2.74911 23.3839 3.08425 26.4762 4.36511C29.5685 5.64598 32.2115 7.81505 34.071 10.598C35.9306 13.381 36.9231 16.6529 36.9231 20C36.918 24.4867 35.1334 28.7882 31.9608 31.9608C28.7882 35.1334 24.4867 36.918 20 36.9231ZM23.0769 29.2308C23.0769 29.6388 22.9148 30.0301 22.6263 30.3186C22.3378 30.6071 21.9465 30.7692 21.5385 30.7692C20.7224 30.7692 19.9398 30.445 19.3628 29.868C18.7857 29.291 18.4615 28.5084 18.4615 27.6923V20C18.0535 20 17.6622 19.8379 17.3737 19.5494C17.0852 19.2609 16.9231 18.8696 16.9231 18.4615C16.9231 18.0535 17.0852 17.6622 17.3737 17.3737C17.6622 17.0852 18.0535 16.9231 18.4615 16.9231C19.2776 16.9231 20.0602 17.2472 20.6373 17.8243C21.2143 18.4013 21.5385 19.1839 21.5385 20V27.6923C21.9465 27.6923 22.3378 27.8544 22.6263 28.1429C22.9148 28.4314 23.0769 28.8227 23.0769 29.2308ZM16.9231 11.5385C16.9231 11.082 17.0584 10.6359 17.312 10.2564C17.5656 9.87688 17.926 9.58109 18.3477 9.40643C18.7693 9.23177 19.2333 9.18607 19.681 9.27511C20.1286 9.36415 20.5398 9.58394 20.8626 9.90667C21.1853 10.2294 21.4051 10.6406 21.4941 11.0883C21.5832 11.5359 21.5375 11.9999 21.3628 12.4216C21.1881 12.8433 20.8924 13.2037 20.5129 13.4572C20.1334 13.7108 19.6872 13.8462 19.2308 13.8462C18.6187 13.8462 18.0318 13.603 17.599 13.1702C17.1662 12.7375 16.9231 12.1505 16.9231 11.5385Z"
                  fill="black"
                />
              </svg>
              {/* Info Box */}
              {isHovered && (
                <div
                  className="absolute bg-white border rounded-md px-1 z-[10] shadow-lg"
                  style={{
                    top: "-34px",
                    right: "135px",
                    opacity: isHovered ? 1 : 0,
                    transition: "opacity 0.3s ease-in-out",
                  }}
                  id="info-box"
                >
                  <p className="text-sm text-[#17B3A6]">
                    Additional Information
                  </p>
                </div>
              )}
            </label>
            <input
              className="appearance-none block w-full bg-white text-gray-800 border border-[#51ff85] rounded py-4 px-4 mb-3 leading-tight focus:outline-none focus:bg-white transition duration-300 ease-in-out transform hover:animate-bounce shadow-xl"
              id="grid-first-name"
              name="eventDetails"
              type="text"
              placeholder="Event Details"
              onChange={onChange}
            />
            <div className="relative w-full col-span-8  lg:col-span-4  md:col-span-5  md:mr-0 md:mb-2">
              <div className="z-[1] absolute grid  place-items-center text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-sm rounded-l-sm text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 top-[32px] right-[-42px] ">
                <button className="leading-tight duration-300 ease-in-out transform  hover:animate-bounce bg-transparent text-white cursor-pointer py-2.5 px-4 rounded-sm">
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
                className="appearance-none block w-full bg-white text-gray-800 border border-[#51ff85] rounded py-4 px-4 mb-3 leading-tight focus:outline-none focus:bg-white transition duration-300 ease-in-out transform  shadow-xl"
                id="grid-first-name"
                name="place"
                type="text"
                placeholder="Enter Place"
                onChange={onChange}
              />
            </div>
          </div>
          <div className="col-span-8  lg:col-span-4 py-2 md:col-span-5  md:mr-0 md:mb-3">
            <label
              className="block captilize tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="grid-short-video"
            >
              Upload Images <span>(max 5 images)</span>
            </label>
            <div className="relative ">
              {/* <input
                className="hidden h-10"
                id="file-input"
                type="file"
                name="imageUrl"
                ref={fileInputRef}
                onChange={(e) => {
                  console.log(e.target.files);
                }}
              /> */}

              <div className="flex items-center ">
                <input
                  className="filehidden appearance-none block w-full bg-white text-gray-800 border border-[#51ff85] rounded py-16 px-4 mb-3 leading-tight focus:outline-none focus:bg-white transition duration-300 ease-in-out transform  hover:animate-bounce shadow-xl"
                  type="file"
                  name="imageUrl"
                  onClick={handleFileInputChange}
                  onChange={handleImageChange}
                  multiple
                  accept="image/*"
                  readOnly
                  ref={fileInputRef}
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
        </div>

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
              onClick={() => {}}
            >
              Select
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default BasicInfo;
