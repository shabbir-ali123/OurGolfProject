import React, { useRef } from "react";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const ItemInstruction: React.FC = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileInputChange = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };
  return (
    <div className="lg:max-w-6xl mx-auto px-2 ">
      <h2 className="text-[#0f1e56] text-4xl">
        Items to be entered by participants
      </h2>
      <div className="py-6 bg-gradient-to-b from-[rgba(167,255,193,0.34)] via-transparent to-transparent rounded-3xl mt-4 border-solid border-2 border-[#51ff85]">
        <p className="px-16">
          You can set items that must be entered by participents when applying. <br />
          Only the organizer can check the entered information.
        </p>
        <div className="lg:flex gap-16">
          <div className=" col-span-8 gap-24 mx-16 lg:col-span-4 py-2 md:col-span-5 md:mr-0 md:mb-3">
            <div className="flex items-center gap-2 col-span-3 py-4">
              <svg
                width="25"
                height="25"
                viewBox="0 0 25 25"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M25 12.5C25 19.4035 19.4035 25 12.5 25C5.59644 25 0 19.4035 0 12.5C0 5.59644 5.59644 0 12.5 0C19.4035 0 25 5.59644 25 12.5ZM17.5379 8.71209C17.904 9.0782 17.904 9.6718 17.5379 10.0379L11.2879 16.2879C10.9218 16.654 10.3282 16.654 9.96209 16.2879L7.46209 13.7879C7.09597 13.4218 7.09597 12.8282 7.46209 12.4621C7.8282 12.096 8.4218 12.096 8.78791 12.4621L10.625 14.2991L13.4185 11.5056L16.2121 8.71209C16.5782 8.34597 17.1718 8.34597 17.5379 8.71209Z"
                  fill="#52FF86"
                />
              </svg>
              <div>
                <h4 className="m-0 py-1">Full Name</h4>
                <p className="m-0">Example: Taro Sato</p>
              </div>
            </div>
            <div className="flex items-center gap-2 col-span-3">
              <svg
                width="25"
                height="25"
                viewBox="0 0 25 25"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M25 12.5C25 19.4035 19.4035 25 12.5 25C5.59644 25 0 19.4035 0 12.5C0 5.59644 5.59644 0 12.5 0C19.4035 0 25 5.59644 25 12.5ZM17.5379 8.71209C17.904 9.0782 17.904 9.6718 17.5379 10.0379L11.2879 16.2879C10.9218 16.654 10.3282 16.654 9.96209 16.2879L7.46209 13.7879C7.09597 13.4218 7.09597 12.8282 7.46209 12.4621C7.8282 12.096 8.4218 12.096 8.78791 12.4621L10.625 14.2991L13.4185 11.5056L16.2121 8.71209C16.5782 8.34597 17.1718 8.34597 17.5379 8.71209Z"
                  fill="#52FF86"
                />
              </svg>
              <div>
                <h4 className="m-0 py-1">Email</h4>
                <p className="m-0">Make sure info@golf.com is enabled</p>
              </div>
            </div>
          </div>
          <div className=" col-span-8 gap-24 mx-16 lg:col-span-4 py-2 md:col-span-5 md:mr-0 md:mb-3">
            <div className="flex items-center gap-2 col-span-3 py-4">
              <svg
                width="25"
                height="25"
                viewBox="0 0 25 25"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M25 12.5C25 19.4035 19.4035 25 12.5 25C5.59644 25 0 19.4035 0 12.5C0 5.59644 5.59644 0 12.5 0C19.4035 0 25 5.59644 25 12.5ZM17.5379 8.71209C17.904 9.0782 17.904 9.6718 17.5379 10.0379L11.2879 16.2879C10.9218 16.654 10.3282 16.654 9.96209 16.2879L7.46209 13.7879C7.09597 13.4218 7.09597 12.8282 7.46209 12.4621C7.8282 12.096 8.4218 12.096 8.78791 12.4621L10.625 14.2991L13.4185 11.5056L16.2121 8.71209C16.5782 8.34597 17.1718 8.34597 17.5379 8.71209Z"
                  fill="#52FF86"
                />
              </svg>
              <div>
                <h4 className="m-0 py-1">Telephone</h4>
                <p className="m-0">half-width digits.</p>
              </div>
            </div>
            <div className="flex items-center gap-2 col-span-3">
              <svg
                width="25"
                height="25"
                viewBox="0 0 25 25"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M25 12.5C25 19.4035 19.4035 25 12.5 25C5.59644 25 0 19.4035 0 12.5C0 5.59644 5.59644 0 12.5 0C19.4035 0 25 5.59644 25 12.5ZM17.5379 8.71209C17.904 9.0782 17.904 9.6718 17.5379 10.0379L11.2879 16.2879C10.9218 16.654 10.3282 16.654 9.96209 16.2879L7.46209 13.7879C7.09597 13.4218 7.09597 12.8282 7.46209 12.4621C7.8282 12.096 8.4218 12.096 8.78791 12.4621L10.625 14.2991L13.4185 11.5056L16.2121 8.71209C16.5782 8.34597 17.1718 8.34597 17.5379 8.71209Z"
                  fill="#52FF86"
                />
              </svg>
              <div>
                <h4 className="m-0 py-1">handicapscore</h4>
                <p className="m-0">Handicap score before the match</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemInstruction;
