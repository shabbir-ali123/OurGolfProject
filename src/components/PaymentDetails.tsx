import React, { useRef, useState, ChangeEvent, useEffect } from "react";
import { useTranslation } from "react-i18next";

export type Click = "bank" | "paypal";

interface PaymentDetailsProps {
  onChange: (formData: Record<string, any>, paymentType: Click) => void;
}

const PaymentDetails: React.FC<PaymentDetailsProps> = ({ onChange }) => {
  const {t, i18n} = useTranslation();
document.body.dir = i18n.dir();
  const [activeTab, setActiveTab] = useState<Click>("bank");
  const [formData, setFormData] = useState({
    bank: {
      bankName: "",
      branchName: "",
      branchNumber: "",
      accountHolderName: "",
      participationFee: 0,
    },
    paypal: {
      paypalId: "",
      participationFee: 0,
      hideParticipantName: false,
    },
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [activeTab]: {
        ...prevData[activeTab],
        [name]: type === "checkbox" ? checked : value,
      },
    }));
  };

  useEffect(() => {
    console.log("After update", formData);
    onChange(formData[activeTab], activeTab);
  }, [formData, activeTab]);
  return (
    <div className="p-2 mx-auto lg:max-w-6xl ">
      <div className=" p-4 bg-gradient-to-b from-[rgba(167,255,193,0.34)] via-transparent to-transparent rounded-3xl mt-4 border-solid border-2 border-[#51ff85]">
       

    
          <div>
            {/* Bank Details Content */}
            <h2 className="text-[#52FF86] mt-8 mx-4"> {t('BRANCH_DETAILS')}</h2>
            <div className="grid grid-cols-9 px-4 py-0 mx-auto lg:gap-x-16 ">
              <div className="col-span-8 py-2 lg:col-span-4 md:col-span-5 md:mr-0 md:mb-0 ">
                <label
                  className="block mb-2 text-xs font-bold tracking-wide text-gray-700 captilize"
                  htmlFor="grid-event-name"
                >
                  {t('BANK_NAME')}
                </label>
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-[#51ff85] bg-transparent rounded py-4 px-4 mb-0 leading-tight focus:outline-none focus:bg-white hover:animate-bounce"
                  id="grid-Event-Name"
                  type="text"
                  name="bankName"
                  onChange={handleInputChange}
                  placeholder={t('BANK_NAME')}
                />
              </div>
              <div className="col-span-8 py-2 lg:col-span-4 md:col-span-5 md:mr-0 md:mb-0">
                <label
                  className="block mb-2 text-xs font-bold tracking-wide text-gray-700 captilize"
                  htmlFor="grid-short-video"
                >
                  {t('BRANCH')}
                </label>
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-[#51ff85] bg-transparent hover:animate-bounce rounded py-4 px-4 mb-0 leading-tight focus:outline-none focus:bg-white"
                  id="grid-first-name"
                  type="text"
                  name="branchName"
                  onChange={handleInputChange}
                  placeholder={t('BRANCH')}
                />
              </div>
              <div className="col-span-8 py-1 lg:col-span-4 md:col-span-5 md:mr-0 md:mb-1">
                <label
                  className="block mb-2 text-xs font-bold tracking-wide text-gray-700 captilize"
                  htmlFor="grid-short-video"
                >
                 {t('ACCOUNT_NUMBER')}
                </label>
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-[#51ff85] bg-transparent hover:animate-bounce rounded py-4 px-4 mb-0 leading-tight focus:outline-none focus:bg-white"
                  id="grid-first-name"
                  type="text"
                  name="branchNumber"
                  onChange={handleInputChange}
                  placeholder={t('ACCOUNT_NUMBER')}
                />
              </div>
              <div className="col-span-8 py-1 lg:col-span-4 md:col-span-5 md:mr-0 md:mb-1">
                <label
                  className="block mb-2 text-xs font-bold tracking-wide text-gray-700 captilize"
                  htmlFor="grid-short-video"
                >
                  {t('ACCOUNT_HOLDER_NAME')}
                </label>
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-[#51ff85] bg-transparent hover:animate-bounce rounded py-4 px-4 mb-0 leading-tight focus:outline-none focus:bg-white"
                  id="grid-first-name"
                  type="text"
                  name="accountHolderName"
                  onChange={handleInputChange}
                  placeholder={t('ACCOUNT_HOLDER_NAME')}
                />
              </div>
              
            </div>
          </div>
       

      
          <div>
            {/* Bank Details Content */}
            <h2 className="text-[#52FF86] mt-8 mx-4">{t('PAYPAL_DETAILS')}</h2>
            <div className="grid grid-cols-9 px-4 py-0 mx-auto lg:gap-x-16 ">
              <div className="col-span-8 py-2 lg:col-span-7 md:col-span-5 md:mr-0 md:mb-0 ">
                <label
                  className="block mb-2 text-xs font-bold tracking-wide text-gray-700 captilize"
                  htmlFor="grid-event-name"
                >
                  {t('PAYPA_ID')}
                </label>
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-[#51ff85] bg-transparent hover:animate-bounce rounded py-4 px-4 mb-0 leading-tight focus:outline-none focus:bg-white"
                  id="grid-Event-Name"
                  type="number"
                  name="paypalId"
                  onChange={handleInputChange}
                  placeholder={t('PAYPA_ID')}
                  min="0"
                />
              </div>
              <div className="col-span-4 py-2 lg:col-span-4 md:col-span-5 md:mr-0 md:mb-0 ">
                <label
                  className="block mb-2 text-xs font-bold tracking-wide text-gray-700 captilize"
                  htmlFor="grid-event-name"
                >
                  {t('PARTICIPATION_FEE')}
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
              <div className="flex col-span-12 gap-2 py-2 lg:col-span-6 md:col-span-5 md:mr-0 md:mb-3">
                <label
                  className="block mb-2 text-xs font-bold tracking-wide text-gray-700 captilize"
                  htmlFor="grid-short-video"
                >
                  {t('HIDE_NAME')}
                </label>
                <label className="relative flex items-center mb-8 cursor-pointer md:mb-5 lg:mb-5">
                  <input type="checkbox" value="" className="sr-only peer"onChange={handleInputChange} name="hideParticipantName" />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:w-5 after:h-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                </label>
              </div>
            </div>
          </div>
       
      </div>
  
    </div>
  );
};

export default PaymentDetails;
