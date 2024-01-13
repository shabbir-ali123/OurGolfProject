import React, { useState } from "react";
import { XMarkIcon } from "@heroicons/react/24/solid";
import InputWithIcon, {CustomTextArea, FileInputComponents, TextAreaProp} from "./FormComponents"
import { UserIcon } from "@heroicons/react/24/outline";
interface PostModalProps {
  closeModal: () => void;
}

const PostModal: React.FC<PostModalProps> = ({ closeModal }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleInputClick = () => {
    setIsModalOpen(true);
  };

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-50 backdrop-blur-sm flex justify-center items-center p-4">
      <div className="w-full p-6 bg-white rounded-lg shadow-md max-w-xl mx-auto">
        <div className="w-full">
          <div className="flex justify-end">
            <button onClick={closeModal} className="bg-transparent">
              <XMarkIcon
                className="w-5 h-5 cursor-pointer border-2 border-solid border-[#51ff85] rounded-full p-1 text-[#51ff85]"
                aria-hidden="true"
              />
            </button>
          </div>

          <div className="mb-4">
            <h1 className="text-2xl font-bold">Write Post</h1>
          </div>
        <div style={{display: "block"}}>
           
        <CustomTextArea
                pname="postText"
                label="Text"
                placeholder="Write text..."
                colSpanSm={6}
                colSpanMd={4}
                colSpanLg={2}
            />
             <InputWithIcon
                pname="firstName"
                icon={<UserIcon />}
                label=""
                value=""
                onChange={(value) =>{}}
                placeholder="first Name"
                colSpanSm={6}
                colSpanMd={4}
                colSpanLg={2}
              />
         
         <FileInputComponents
                pname="firstName"
                icon={<UserIcon />}
                label=""
              />
        </div>
          <div className="mb-4 relative">
            <label
              className="block mb-2 text-sm font-medium text-gray-900"
              htmlFor="postCategory"
            >
              Add Category
            </label>
            <select
              id="postCategory"
              className="cursor-pointer bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            >
              <option value="" disabled selected>
                Select
              </option>
             
              <option value="option1">Option 1</option>
              <option value="option2">Option 2</option>
              <option value="option3">Option 3</option>
           
            </select>
            {isModalOpen && (
              <div className="absolute z-10 w-full bg-white rounded-md shadow-lg mt-1"></div>
            )}
          </div>
          <div className="flex justify-center w-full">
            <button
              className=" text-white bg-[#52FF86] hover:bg-green-600 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
              onClick={closeModal}
            >
              Post
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostModal;
