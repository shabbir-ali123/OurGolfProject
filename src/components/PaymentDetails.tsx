import React, { useRef, useState,ChangeEvent ,useEffect} from "react";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export type Click = "bank" | "paypal";

interface PaymentDetailsProps {
  onChange: (formData: Record<string, any>, paymentType: Click) => void;
}

const PaymentDetails: React.FC<PaymentDetailsProps> = ({ onChange }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [activeTab, setActiveTab] = useState<Click>("bank");
  const [formData, setFormData] = useState<Record<string, any>>({}); // Explicitly define the type
  useEffect(() => {
    // Set the default payment type to "bank" when the component mounts
    handleTabClick("bank");
  }, []); 
  const handleTabClick = (tab: Click) => {
    setActiveTab(tab);
    onChange(formData, tab);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    // Update formData using the previous state
    setFormData((prevData) => ({ ...prevData, [name]: value }));

    // Call the onChange prop with the updated data and activeTab
    onChange({ ...formData, [name]: value }, activeTab);
  };


  // const handleSubmit = () => {
  //   // Pass the formData and paymentType to the parent component
  //   onChange(formData, activeTab);
  // };
  
  return (
    <div className="lg:max-w-6xl mx-auto p-2 ">
      <div className=" p-4 bg-gradient-to-b from-[rgba(167,255,193,0.34)] via-transparent to-transparent rounded-3xl mt-4 border-solid border-2 border-[#51ff85]">
        <div className="mx-4 flex gap-2">
          <button
            className={`${
              activeTab === "bank"
                ? "bg-blue-500 text-white cursor-pointer animate-bounce border-none"
                : "text-[#0038FF] border border-[#0038FF] bg-transparent cursor-pointer  hover:text-blue-800 hover:scale-105 transform transition duration-300 ease-in-out"
            } px-4 py-2 border rounded-full`}
            onClick={() => handleTabClick("bank")}
          >
            Bank Details
          </button>

          <button
            className={`${
              activeTab === "paypal"
                ? "bg-blue-500 text-white cursor-pointer animate-bounce"
                : "text-[#0038FF] border border-[#0038FF] bg-transparent cursor-pointer  hover:text-blue-800 over:scale-105 transform transition duration-300 ease-in-out"
            } px-4 py-2   rounded-full`}
            onClick={() => handleTabClick("paypal")}
          >
            PayPal
          </button>
        </div>

        {activeTab === "bank" && (
          <div>
            {/* Bank Details Content */}
            <h2 className="text-[#52FF86] mt-8 mx-4">Bank Details</h2>
            <form className="grid grid-cols-9 mx-auto lg:gap-x-16  px-4 py-0  ">
              <div className="col-span-8 lg:col-span-4 py-2  md:col-span-5   md:mr-0 md:mb-0 ">
                <label
                  className="block captilize tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="grid-event-name"
                >
                  Bank Name
                </label>
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-[#51ff85] bg-transparent rounded py-4 px-4 mb-0 leading-tight focus:outline-none focus:bg-white hover:animate-bounce"
                  id="grid-Event-Name"
                  type="text"
                  name="bankName"
                  onChange={handleInputChange}
                  placeholder="Payment ID"
                />
              </div>
              <div className="col-span-8  lg:col-span-4 py-2 md:col-span-5  md:mr-0 md:mb-0">
                <label
                  className="block captilize tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="grid-short-video"
                >
                  Branch
                </label>
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-[#51ff85] bg-transparent hover:animate-bounce rounded py-4 px-4 mb-0 leading-tight focus:outline-none focus:bg-white"
                  id="grid-first-name"
                  type="text"
                  name="branchName"
                  onChange={handleInputChange}
                  placeholder="Branch Name"
                />
              </div>
              <div className="col-span-8  lg:col-span-4 py-1 md:col-span-5  md:mr-0 md:mb-1">
                <label
                  className="block captilize tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="grid-short-video"
                >
                  Account Number
                </label>
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-[#51ff85] bg-transparent hover:animate-bounce rounded py-4 px-4 mb-0 leading-tight focus:outline-none focus:bg-white"
                  id="grid-first-name"
                  type="text"
                  name="branchNumber"
                  onChange={handleInputChange}
                  placeholder="Account Number"
                />
              </div>
              <div className="col-span-8  lg:col-span-4 py-1 md:col-span-5  md:mr-0 md:mb-1">
                <label
                  className="block captilize tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="grid-short-video"
                >
                  Account Holder Name
                </label>
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-[#51ff85] bg-transparent hover:animate-bounce rounded py-4 px-4 mb-0 leading-tight focus:outline-none focus:bg-white"
                  id="grid-first-name"
                  type="text"
                  name="accountHolderName"
                  onChange={handleInputChange}
                  placeholder="Account Holder Name"
                />
              </div>
              <div className="col-span-8 lg:col-span-4 py-2  md:col-span-4  md:mr-0 md:mb-0 ">
                <label
                  className="block captilize tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="grid-event-name"
                >
                  Participation fee (approximate per person)
                </label>
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-[#51ff85] bg-transparent hover:animate-bounce rounded py-4 px-4 mb-0 leading-tight focus:outline-none focus:bg-white"
                  id="grid-Event-Name"
                  type="number"
                  pattern="[0-9]*"
                  title="Please enter a valid number"
                  name="participationFee"
                  onChange={handleInputChange}
                  placeholder="$ Enter Amount"
                  min="0"
                />
              </div>
            </form>
          </div>
        )}

        {activeTab === "paypal" && (
          <div>
            {/* Bank Details Content */}
            <h2 className="text-[#52FF86] mt-8 mx-4">Paypal Details</h2>
            <form className="grid grid-cols-9 mx-auto lg:gap-x-16  px-4 py-0  ">
              <div className="col-span-8 lg:col-span-7 py-2  md:col-span-5   md:mr-0 md:mb-0 ">
                <label
                  className="block captilize tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="grid-event-name"
                >
                  Paypal ID
                </label>
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-[#51ff85] bg-transparent hover:animate-bounce rounded py-4 px-4 mb-0 leading-tight focus:outline-none focus:bg-white"
                  id="grid-Event-Name"
                  type="number"
                  name="paypalId"
                  onChange={handleInputChange}
                  placeholder="Paypal ID"
                  min="0"
                />
              </div>
              <div className="col-span-8 lg:col-span-7 py-2  md:col-span-5   md:mr-0 md:mb-0 ">
                <label
                  className="block captilize tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="grid-event-name"
                >
                  Participation fee (approximate per person)
                </label>
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-[#51ff85] bg-transparent hover:animate-bounce rounded py-4 px-4 mb-0 leading-tight focus:outline-none focus:bg-white"
                  id="participationFee"
                  type="number"
                  pattern="[0-9]*"
                  name="participationFee"
                  onChange={handleInputChange}
                  title="Please enter a valid number"
                  placeholder="$ Enter Amount"
                  min="0"
                />
              </div>
              <div className=" flex gap-2 col-span-12  lg:col-span-6 py-2 md:col-span-5  md:mr-0 md:mb-3">
                <label
                  className="block captilize tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="grid-short-video"
                >
                  Hide participant name
                </label>
                <label className="relative flex items-center mb-8 cursor-pointer md:mb-5 lg:mb-5">
                  <input type="checkbox" value="" className="sr-only peer"onChange={handleInputChange} name="hideParticipantName" />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:w-5 after:h-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                </label>
              </div>
            </form>
          </div>
        )}
      </div>
  
    </div>
  );
};

export default PaymentDetails;
