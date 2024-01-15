import React, { useState } from "react";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { API_ENDPOINTS } from "../appConfig";
import axios from "axios";
import PostCard from "./PostCard"
interface CreatePostType {
  userId: any,
  category: any,
  tags: any,
  mediaFile: any
}
const PostModal: React.FC<{ closeModal: () => void }> = ({ closeModal }) => {
  const [postContent, setPostContent] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [tags, setTags] = useState("");
  const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setSelectedFiles(event.target.files);
    }
  };
  const [formData, setFormData] = useState<CreatePostType>({
   userId: "",
   category: "",
   tags: [],
   mediaFile: ""
  });
  const handlePost = async (event:any) => {
    event.preventDefault();
    const userToken = localStorage.getItem("token");
    const userId = localStorage.getItem("id");

    if (!userToken || !userId) {
      alert("Authentication is required to create a post.");
      return;
    }

    if (!selectedFiles || selectedFiles.length === 0) {
      alert("Please select a file to upload.");
      return;
    }

    // console.log(Array.from(formData));
    try {
      const response = await axios.post(API_ENDPOINTS.CREATEPOST, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${userToken}`,
        },
      });
      console.log(response.data);
      closeModal();
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        // Error response from Axios request
        console.error(
          "Post creation error:",
          error.response?.data || error.message
        );
        alert(
          "Failed to create post. Please check the console for more information."
        );
      } else if (error instanceof Error) {
        // Generic error
        console.error("Post creation error:", error.message);
        alert(
          "Failed to create post. Please check the console for more information."
        );
      } else {
        // Unknown error
        console.error("Post creation error:", error);
        alert(
          "An unknown error occurred. Please check the console for more information."
        );
      }
    }
  };
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log({ e });
    const { name, value, checked } = e.target;
    if (name === "selfIncluded") {
      setFormData({ ...formData, });
    } else {
      setFormData({ ...formData,});
    }
  };
  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-50 backdrop-blur-sm flex justify-center items-center p-4">
      <div className="w-full max-w-xl bg-white rounded-lg shadow-md mx-auto p-6">
        <form className="px-2">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">Write Post</h1>
          <button onClick={closeModal} className="p-2">
            <XMarkIcon className="w-6 h-6" aria-hidden="true" />
          </button>
        </div>
        <textarea
          className="w-full  border rounded-lg mb-4"
          placeholder="Write text..."
          value={postContent}
          onChange={(e) => setPostContent(e.target.value)}
        ></textarea>
        <label htmlFor="">Add photos and videos</label>
        <div className="flex items-center justify-center mb-4 rounded-lg border-2 border-solid border-[#51ff85] w-[100px]">
          <input
            id="file-upload"
            type="file"
            className="hidden"
            onChange={handleFileChange} // Add this line to use the handleFileChange function
            multiple
            accept="image/*,video/*"
          />
          <label
            htmlFor="file-upload"
            className="cursor-pointer p-2 border rounded-full flex justify-center items-center"
          >
            <svg
              className="w-6 h-6"
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
        </div>
        <label htmlFor="">Add Category</label>
        <select
          className="w-full p-2 border rounded-lg mb-4"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="" disabled>
            Select Category
          </option>

          <option value="option1">Option 1</option>
        </select>
        <div>
          <label htmlFor="">Add tags</label>
          <input
            className="w-full p-2 border rounded-lg mb-4"
            placeholder="# Tags"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
          />
        </div>

        <button
          className="w-full bg-[#51ff85] hover:bg-[#51ff85] text-white font-bold py-2 rounded"
          onClick={(event) => handlePost(event)}
        >
          Post
        </button>
        </form>
        
      </div>
    </div>
  );
};

export default PostModal;
