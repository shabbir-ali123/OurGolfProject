// export default Recruitment;
import React, { useRef, useState,ChangeEvent } from "react";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export type Tab = "individual" | "team";

interface RecuitmentsProps {
  onChange: (formData: Record<string, any>, eventType: Tab) => void;
}

const Recuitments: React.FC<RecuitmentsProps> = ({ onChange }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [activeTab, setActiveTab] = useState<Tab>("individual");
  const [formData, setFormData] = useState<Record<string, any>>({}); // Explicitly define the type

  const handleTabClick = (tab: Tab) => {
    setActiveTab(tab);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
    onChange({ [name]: value }, activeTab); // Call the onChange prop with the updated data
  };


  

  return (
    <div className="lg:max-w-6xl mx-auto px-2 py-8  ">
      <h2 className="text-[#0f1e56] text-4xl">Recruitment Details</h2>
      <div className=" bg-gradient-to-b from-[rgba(167,255,193,0.34)] via-transparent to-transparent rounded-3xl mt-4 border-solid border-2 border-[#51ff85]">
        <div className="flex items-center gap-2 col-span-5 lg:col-span-6 py-1  md:col-span-5   md:mr-0 md:mb-3 ">
          <label
            className="block captilize tracking-wide text-gray-700 text-xs font-bold mb-2"
            htmlFor="grid-event-name"
          >
            Number of Players
          </label>
          <input
            className="text-center appearance-none block w-[50px] bg-gray-200 text-gray-700 border border-[#51ff85] bg-transparent rounded py-2 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
            id="grid-Event-Name"
            type="number"
            name="capacity"
            placeholder=""
            onChange={handleInputChange}
            />
        </div>
        <div className=" flex gap-2 col-span-12  lg:col-span-6 py-2 md:col-span-5  md:mr-0 md:mb-3">
          <label
            className="block captilize tracking-wide text-gray-700 text-xs font-bold mb-2"
            htmlFor="grid-short-video"
          >
            Include you in the numbers of players
          </label>
          <label className="relative flex items-center mb-8 cursor-pointer md:mb-5 lg:mb-5">
            <input
              type="checkbox"
              // value=""
              className="sr-only peer"
              name="selfIncluded"
              onChange={handleInputChange}
              />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:w-5 after:h-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
          </label>
        </div>
        <div className="flex items-center space-x-4 col-span-12  lg:col-span-6 py-2 md:col-span-5  md:mr-0 md:mb-3">
          <label
            htmlFor="date"
            className="block captilize tracking-wide text-gray-700 text-xs font-bold mb-2"
          >
            Start Date and Time
          </label>
          <input
            type="date"
            id="date"
            name="eventStartDate"
            onChange={handleInputChange}
            className="border border-[#52FF86] rounded px-2 py-2 focus:outline-none focus:border-blue-500"
          />

          <input
            type="time"
            id="time"
            name="eventStartTime"
            onChange={handleInputChange}
            placeholder="Select Time:"
            className="border border-[#52FF86] rounded px-2 py-2 focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="flex items-center space-x-4 col-span-12  lg:col-span-6 py-2 md:col-span-5  md:mr-0 md:mb-3">
          <label
            htmlFor="date"
            className="block captilize tracking-wide text-gray-700 text-xs font-bold mb-2"
          >
            End Date and Time
          </label>
          <input
            type="date"
            id="date"
            name="eventEndDate"
            onChange={handleInputChange}
            className="border border-[#52FF86] rounded px-2 py-2 focus:outline-none focus:border-blue-500"
          />

          <input
            type="time"
            id="time"
            name="eventEndTime"
            onChange={handleInputChange}
            placeholder="Select Time:"
            className="border border-[#52FF86] rounded px-2 py-2 focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="flex items-center space-x-4 col-span-12 lg:col-span-6 py-2 md:col-span-5 md:mr-0 md:mb-3">
          <label
            htmlFor="date"
            className="block capitalize tracking-wide text-gray-700 text-xs font-bold mb-2"
          >
            Application Deadline
          </label>
          <input
            type="date"
            id="date"
            name="eventDeadlineDate"
            onChange={handleInputChange}
            placeholder="Enter Date"
            className="border border-[#52FF86] rounded px-2 py-2 focus:outline-none focus:border-blue-500"
          />

          <input
            type="time"
            id="time"
            name="eventDeadlineTime"
            onChange={handleInputChange}
            placeholder="Enter Time"
            className="border border-[#52FF86] rounded px-2 py-2 focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="flex items-center space-x-4 col-span-12 lg:col-span-6 py-2 md:col-span-5 md:mr-0 md:mb-3">
          <div className=" ">
            <div className="">
              <h2>Match Type</h2>
              <div className="mx-4 flex gap-2">
          <button
            className={`${
              activeTab === "individual"
                ? "bg-blue-500 text-white cursor-pointer animate-bounce border-none"
                : "text-[#0038FF] border border-[#0038FF] bg-transparent cursor-pointer  hover:text-blue-800 hover:scale-105 transform transition duration-300 ease-in-out"
            } px-4 py-2 border rounded-full`}
            onClick={() => handleTabClick("individual")}
          >
            individual Details
          </button>

          <button
            className={`${
              activeTab === "team"
                ? "bg-blue-500 text-white cursor-pointer animate-bounce"
                : "text-[#0038FF] border border-[#0038FF] bg-transparent cursor-pointer  hover:text-blue-800 over:scale-105 transform transition duration-300 ease-in-out"
            } px-4 py-2   rounded-full`}
            onClick={() => handleTabClick("team")}
          >
            team
          </button>
        </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    
  );
};


//   return (
//     <div className="lg:max-w-6xl mx-auto p-2 ">
//       <div className=" p-4 bg-gradient-to-b from-[rgba(167,255,193,0.34)] via-transparent to-transparent rounded-3xl mt-4 border-solid border-2 border-[#51ff85]">
        

//         {activeTab === "individual" && (
//           <div>
//             {/* individual Details Content */}
//             <h2 className="text-[#52FF86] mt-8 mx-4">individual Details</h2>
//             <form className="grid grid-cols-9 mx-auto lg:gap-x-16  px-4 py-0  ">
//               <div className="col-span-8 lg:col-span-4 py-2  md:col-span-5   md:mr-0 md:mb-0 ">
//                 <label
//                   className="block captilize tracking-wide text-gray-700 text-xs font-bold mb-2"
//                   htmlFor="grid-event-name"
//                 >
//                   individual Name
//                 </label>
//                 <input
//                   className="appearance-none block w-full bg-gray-200 text-gray-700 border border-[#51ff85] bg-transparent rounded py-4 px-4 mb-0 leading-tight focus:outline-none focus:bg-white hover:animate-bounce"
//                   id="grid-Event-Name"
//                   type="text"
//                   name="individualName"
//                   onChange={handleInputChange}
//                   placeholder="Payment ID"
//                 />
//               </div>
//               <div className="col-span-8  lg:col-span-4 py-2 md:col-span-5  md:mr-0 md:mb-0">
//                 <label
//                   className="block captilize tracking-wide text-gray-700 text-xs font-bold mb-2"
//                   htmlFor="grid-short-video"
//                 >
//                   Branch
//                 </label>
//                 <input
//                   className="appearance-none block w-full bg-gray-200 text-gray-700 border border-[#51ff85] bg-transparent hover:animate-bounce rounded py-4 px-4 mb-0 leading-tight focus:outline-none focus:bg-white"
//                   id="grid-first-name"
//                   type="text"
//                   name="branchName"
//                   onChange={handleInputChange}
//                   placeholder="Branch Name"
//                 />
//               </div>
//               <div className="col-span-8  lg:col-span-4 py-1 md:col-span-5  md:mr-0 md:mb-1">
//                 <label
//                   className="block captilize tracking-wide text-gray-700 text-xs font-bold mb-2"
//                   htmlFor="grid-short-video"
//                 >
//                   Account Number
//                 </label>
//                 <input
//                   className="appearance-none block w-full bg-gray-200 text-gray-700 border border-[#51ff85] bg-transparent hover:animate-bounce rounded py-4 px-4 mb-0 leading-tight focus:outline-none focus:bg-white"
//                   id="grid-first-name"
//                   type="text"
//                   name="branchNumber"
//                   onChange={handleInputChange}
//                   placeholder="Account Number"
//                 />
//               </div>
//               <div className="col-span-8  lg:col-span-4 py-1 md:col-span-5  md:mr-0 md:mb-1">
//                 <label
//                   className="block captilize tracking-wide text-gray-700 text-xs font-bold mb-2"
//                   htmlFor="grid-short-video"
//                 >
//                   Account Holder Name
//                 </label>
//                 <input
//                   className="appearance-none block w-full bg-gray-200 text-gray-700 border border-[#51ff85] bg-transparent hover:animate-bounce rounded py-4 px-4 mb-0 leading-tight focus:outline-none focus:bg-white"
//                   id="grid-first-name"
//                   type="text"
//                   name="accountHolderName"
//                   onChange={handleInputChange}
//                   placeholder="Account Holder Name"
//                 />
//               </div>
//               <div className="col-span-8 lg:col-span-4 py-2  md:col-span-4  md:mr-0 md:mb-0 ">
//                 <label
//                   className="block captilize tracking-wide text-gray-700 text-xs font-bold mb-2"
//                   htmlFor="grid-event-name"
//                 >
//                   Participation fee (approximate per person)
//                 </label>
//                 <input
//                   className="appearance-none block w-full bg-gray-200 text-gray-700 border border-[#51ff85] bg-transparent hover:animate-bounce rounded py-4 px-4 mb-0 leading-tight focus:outline-none focus:bg-white"
//                   id="grid-Event-Name"
//                   type="number"
//                   pattern="[0-9]*"
//                   title="Please enter a valid number"
//                   name="participationFee"
//                   onChange={handleInputChange}
//                   placeholder="$ Enter Amount"
//                 />
//               </div>
//             </form>
//           </div>
//         )}

//         {activeTab === "team" && (
//           <div>
//             {/* individual Details Content */}
//             <h2 className="text-[#52FF86] mt-8 mx-4">team Details</h2>
//             <form className="grid grid-cols-9 mx-auto lg:gap-x-16  px-4 py-0  ">
//               <div className="col-span-8 lg:col-span-7 py-2  md:col-span-5   md:mr-0 md:mb-0 ">
//                 <label
//                   className="block captilize tracking-wide text-gray-700 text-xs font-bold mb-2"
//                   htmlFor="grid-event-name"
//                 >
//                   team ID
//                 </label>
//                 <input
//                   className="appearance-none block w-full bg-gray-200 text-gray-700 border border-[#51ff85] bg-transparent hover:animate-bounce rounded py-4 px-4 mb-0 leading-tight focus:outline-none focus:bg-white"
//                   id="grid-Event-Name"
//                   type="text"
//                   name="teamId"
//                   onChange={handleInputChange}
//                   placeholder="team ID"
//                 />
//               </div>
//               <div className="col-span-8 lg:col-span-7 py-2  md:col-span-5   md:mr-0 md:mb-0 ">
//                 <label
//                   className="block captilize tracking-wide text-gray-700 text-xs font-bold mb-2"
//                   htmlFor="grid-event-name"
//                 >
//                   Participation fee (approximate per person)
//                 </label>
//                 <input
//                   className="appearance-none block w-full bg-gray-200 text-gray-700 border border-[#51ff85] bg-transparent hover:animate-bounce rounded py-4 px-4 mb-0 leading-tight focus:outline-none focus:bg-white"
//                   id="grid-Event-Name"
//                   type="number"
//                   pattern="[0-9]*"
//                   name="participationFee"
//                   onChange={handleInputChange}
//                   title="Please enter a valid number"
//                   placeholder="$ Enter Amount"
//                 />
//               </div>
//               <div className=" flex gap-2 col-span-12  lg:col-span-6 py-2 md:col-span-5  md:mr-0 md:mb-3">
//                 <label
//                   className="block captilize tracking-wide text-gray-700 text-xs font-bold mb-2"
//                   htmlFor="grid-short-video"
//                 >
//                   Hide participant name
//                 </label>
//                 <label className="relative flex items-center mb-8 cursor-pointer md:mb-5 lg:mb-5">
//                   <input type="checkbox" value="" className="sr-only peer" />
//                   <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:w-5 after:h-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
//                 </label>
//               </div>
//             </form>
//           </div>
//         )}
//       </div>
//       <div className="py-6">
//         <button
//           type="button"
//           className=" glow-on-hover  text-white bg-[#52FF86] hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-8 py-4 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
//         >
//           Preview
//         </button>
//         <button
//            type="submit"
//            onClick={handleSubmit}
//           className="glow-on-hover hover:rotate-45 transform transition duration-300 ease-in-out text-black bg-[#ffff] border border-[#52FF86] shadow-xl ring-blue-300 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-8 py-4 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
//         >
//           Next
//         </button>
//         <button className="cursor-pointer text-white bg-[#FE2E00] hover:bg-blue-800  focus:outline-none  focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-8 py-4 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700  dark:focus:ring-blue-800 hover:scale-105 transform transition duration-300 ease-in-out">
//           Clear
//         </button>
//       </div>
//     </div>
//   );
// };

export default Recuitments;
