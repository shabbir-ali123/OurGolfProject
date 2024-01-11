import React, { useState } from 'react';

interface PostModalProps {
    closeModal: () => void;
  }

  const PostModal: React.FC<PostModalProps> = ({ closeModal }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleInputClick = () => {
    setIsModalOpen(true);
  };


  return (
    <div className='fixed inset-0 bg-gray-500 bg-opacity-50 backdrop-blur-sm flex justify-center items-center p-4'>
  <div className="p-6 bg-white rounded-lg shadow-md max-w-sm mx-auto">
      <div className="mb-4">
        <h1 className="text-2xl font-bold">Write Post</h1>
      </div>
      <div className="mb-4">
        <label className="block mb-2 text-sm font-medium text-gray-900" htmlFor="postText">
          Text
        </label>
        <textarea
          id="postText"
          rows={4}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          placeholder="Write text..."
        ></textarea>
      </div>
      <div className="mb-4">
        <label className="block mb-2 text-sm font-medium text-gray-900" htmlFor="postMedia">
          Add photos and video
        </label>
        {/* Add your file input or media upload component here */}
      </div>
      <div className="mb-4 relative">
        <label className="block mb-2 text-sm font-medium text-gray-900" htmlFor="postCategory">
          Add Category
        </label>
        <input
          id="postCategory"
          type="text"
          className="cursor-pointer bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          placeholder="Select"
          readOnly
          onClick={handleInputClick}
        />
        {isModalOpen && (
          <div className="absolute z-10 w-full bg-white rounded-md shadow-lg mt-1">
            {/* Render your category options here */}
          </div>
        )}
      </div>
      {/* Add other fields */}
      <button
        className="text-white bg-green-500 hover:bg-green-600 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
        onClick={closeModal}
      >
        Post
      </button>
      <button onClick={closeModal} className="...">
          Close
        </button>
    </div>
    </div>
  
  );
};

export default PostModal;
