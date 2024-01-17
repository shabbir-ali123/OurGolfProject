import React, { useRef, useState } from "react";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { API_ENDPOINTS } from "../appConfig";
import axios from "axios";

interface CreatePostType {
  text: string;
  category: string;
  tags: string;
  userId: string | null;
  mediaFiles: File[];
}

const PostModal: React.FC<{ closeModal: () => void }> = ({ closeModal }) => {
  const [postContent, setPostContent] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [tags, setTags] = useState("");
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const userId = localStorage.getItem("id");

  const [formData, setFormData] = useState<CreatePostType>({
    userId: userId,
    text: postContent,
    category: "",
    tags: "",
    mediaFiles: [],
  });

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileInputChange = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;

    if (files && files.length > 0) {
      const filesArray: File[] = Array.from(files).slice(0, 5);
      setFormData((prevFormData: CreatePostType) => ({
        ...prevFormData,
        mediaFiles: [...prevFormData.mediaFiles, ...filesArray],
      }));
    }
  };

  const handlePost = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!formData.userId || formData.mediaFiles.length === 0) {
      // Handle error condition
      return;
    }
  
    const userToken = localStorage.getItem("token");
  
    try {
      const formDataToSend = new FormData();
      formDataToSend.append("userId", formData.userId);
      formDataToSend.append("text", formData.text);
      formDataToSend.append("category", formData.category);
      formDataToSend.append("tags", formData.tags);
  
      formData.mediaFiles.forEach((file, index) => {
        formDataToSend.append("mediaFiles", file);
      });
  
      const response = await axios.post(
        API_ENDPOINTS.CREATEPOSTS,formDataToSend,
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
            "Content-Type": "multipart/form-data", 
          },
        }
      );
      if (response.status === 201) {
       
        window.location.reload();
      }
      console.log(response.data);
      closeModal();
    } catch (error: unknown) {
    }
  };
  
  const handleInputTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setSelectedCategory(value);
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
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
            className="w-full border rounded-lg mb-4"
            placeholder="Write text..."
            name="text"
            value={formData.text}
            onChange={handleInputTextChange}
          ></textarea>
          <label htmlFor="">Add photos and videos</label>
          <div className="flex items-center justify-center mb-4 rounded-lg border-2 border-solid border-[#51ff85] w-[100px]">
            <input
              id="file-upload"
              name="mediaFiles"
              ref={fileInputRef}
              className="hidden"
              type="file"
              multiple
              onChange={handleImageChange}
              accept="image/*,video/*"
            />
            <label className="cursor-pointer p-2 border rounded-full flex justify-center items-center">
              <button
                onClick={handleFileInputChange}
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
              </button>
            </label>
          </div>
          <label htmlFor="">Add Category</label>
          <select
            className="w-full p-2 border rounded-lg mb-4"
            onChange={handleSelectChange}
            name="category"
          >
            <option value="" disabled>
              Select Category
            </option>
            <option value="option1">Option 1</option>
            <option value="option12">Option 12</option>
          </select>
          <div>
            <label htmlFor="">Add tags</label>
            <input
              className="w-full p-2 border rounded-lg mb-4"
              placeholder="# Tags"
              name="tags"
              onChange={handleInputChange}
              required
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
