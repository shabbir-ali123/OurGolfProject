import React, { useState } from "react";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { useTranslation } from "react-i18next";
interface AddReview {
    rating: string;
  feedback: string;
}

const ReviewsModal = ({ closeModal }: any) => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState<AddReview>({
    rating: "",
    feedback: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevFormData: any) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  console.log(formData)

  return (
    <div className="z-[9999] fixed inset-0 flex items-center justify-center p-4 bg-gray-500 bg-opacity-50 backdrop-blur-sm ">
      <div
        className=" w-full max-w-xl p-6 mx-auto bg-white rounded-lg    mx-20 xl:mx-auto"
        style={{
          boxShadow: "rgba(0, 0, 0, 0.16) 0px 10px 36px 0px, rgba(0, 0, 0, 0.06) 0px 0px 0px 1px",
          maxHeight: '90vh', 
          overflowY: 'auto', 
        }}
      >
        <form className="px-2">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold">{t("WRITE_FEEDBACK")}</h1>
            <button
              onClick={closeModal}
              className="p-2 rounded-full cursor-pointer"
            >
              <XMarkIcon className="w-6 h-6" aria-hidden="true" />
            </button>
          </div>
          <div>
            <label className="mb-2">Rating:</label> <br />
            <input
              className="xs:w-[200px] sm:w-[300px] md:w-[400px] xl:w-[533px] p-3 mb-4 text-gray-700 border mt-2 border-gray-300 rounded-lg shadow-sm focus:border-[#51ff85] focus:ring-1 focus:ring-[#51ff85] focus:outline-none"
              name="rating"
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label className="mb-2">Write Feedback</label> <br />
            <input
              className="xs:w-[200px] sm:w-[300px] md:w-[400px] xl:w-[533px] p-3 mb-4 text-gray-700 border mt-2 border-gray-300 rounded-lg shadow-sm focus:border-[#51ff85] focus:ring-1 focus:ring-[#51ff85] focus:outline-none"
              name="feedback"
              onChange={handleInputChange}
            />
          </div>

          <button
            className="w-full bg-[#61cbc2] hover:bg-[#45e07d] text-white font-bold py-3 px-4 rounded-lg shadow hover:shadow-md transition-all"
            type="submit"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default ReviewsModal;
