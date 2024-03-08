import React, { useEffect, useRef, useState } from "react";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { API_ENDPOINTS } from "../appConfig";
import axios from "axios";
import { postContext } from "../contexts/postsContext";
import { toast } from "react-toastify";
import { Link, useParams } from "react-router-dom";

interface UpdatePostType {
  text: string;
  category: string;
  tags: string;
  userId: string | null;
  mediaFiles: File[];
}

interface UpdatePostProps {
  closeModal?: () => void;
}

const UpdatePost: React.FC<UpdatePostProps> = ({ closeModal }) => {
  const { handlePostId, singlePost, handlePosts, post } = postContext();
  const params = useParams<{ id: string }>();
  const postId = params.id;

  useEffect(() => {
    if (postId) {
      handlePostId(postId);
    }
  }, [postId]);

  useEffect(() => {
    if (singlePost) {
      setFormData({
        userId: singlePost?.userId,
        text: singlePost?.text,
        category: singlePost?.category,
        tags: singlePost?.tags,
        mediaFiles: singlePost.mediaFile || [],
      });
    }
  }, [singlePost]);

  const [formData, setFormData] = useState<UpdatePostType>({
    userId: singlePost?.userId,
    text: singlePost?.text,
    category: singlePost?.category,
    tags: singlePost?.tags,
    mediaFiles: [],
  });
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;

    if (files && files.length > 0) {
      const filesArray: File[] = Array.from(files);

      setFormData((prevFormData: UpdatePostType) => ({
        ...prevFormData,
        mediaFiles: [...prevFormData.mediaFiles, ...filesArray],
      }));
    }
    console.log(formData);
  };
  
  async function fetchAndConvertFiles(urls:any ) {
    const files = [];
  
    for (const url of urls) {
      try {
        const response = await fetch(url);
        const blob = await response.blob();
        const filename = url.substring(url.lastIndexOf("/") + 1);
        const file = new File([blob], filename, { type: blob.type });
        files.push(file);
      } catch (error) {
        console.error("Error fetching or converting file:", error);
      }
    }
  
    return files;
  }
  const handlePost = async (event: React.FormEvent) => {
    event.preventDefault();

    console.log(formData.mediaFiles.length, "asdasd");
    if (!formData.userId || formData.mediaFiles.length === 0) {
      return;
    }
    const userToken = localStorage.getItem("token");

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("userId", formData.userId);
      formDataToSend.append("text", formData.text);
      formDataToSend.append("category", formData.category);
      formDataToSend.append("tags", formData.tags);
      if (postId) {
        formDataToSend.append("postId", postId);
      }
      formData.mediaFiles.forEach((file, index) => {
            formDataToSend.append("mediaFiles", file);
      });
   
  
      const response = await axios.put(
        API_ENDPOINTS.UPDATEPOST + postId,
        formDataToSend,
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      handlePosts(post);
      toast.success("Post has been Updated");
      // closeModal();
    } catch (error: unknown) {}
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
    // setSelectedCategory(value);
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  return (
    <div className="z-50 fixed inset-0 flex items-center justify-center p-4 bg-gray-500 bg-opacity-50 backdrop-blur-sm">
      <div
        className="w-full max-w-xl p-6 mx-auto bg-white rounded-lg "
        style={{
          boxShadow:
            "rgba(0, 0, 0, 0.16) 0px 10px 36px 0px, rgba(0, 0, 0, 0.06) 0px 0px 0px 1px",
        }}
      >
        <form className="px-2">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold">Edit Post</h1>
            <Link
              to={"/post-page"}
              className="p-2 rounded-full cursor-pointer"
            >
              <XMarkIcon className="w-6 h-6" aria-hidden="true" />
            </Link>
          </div>
          <div>
            <textarea
              className="w-[533px] p-3 mb-4 text-gray-700 border border-gray-300 rounded-lg shadow-sm focus:border-[#51ff85] focus:ring-1 focus:ring-[#51ff85] focus:outline-none"
              placeholder="Write text..."
              name="text"
              value={formData.text}
              onChange={handleInputTextChange}
              rows={4}
            ></textarea>
          </div>

          <div>
            {singlePost?.mediaFile.map((item: any, index: number) => (
              <img key={index} src={item} alt="" className="h-20" />
            ))}

            <label className="block text-gray-700">
              Update photos and videos
            </label>
            <div className="flex items-center justify-center p-3 border-2 border-dashed rounded-lg border-[#61cbc2]">
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
              <label
                htmlFor="file-upload"
                className="flex items-center justify-center p-2 border-2 border-gray-300 rounded-lg cursor-pointer hover:border-[#51ff85]"
              >
                <svg
                  className="w-6 h-6 text-gray-600"
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
          </div>
          <label htmlFor="">Add Category</label>
          <select
            className="w-full p-3 mb-4 text-gray-700 border border-gray-300 rounded-lg shadow-sm focus:border-[#51ff85] focus:ring-1 focus:ring-[#51ff85] focus:outline-none"
            onChange={handleSelectChange}
            value={formData.category}
            name="category"
          >
            <option value="">Select Category</option>
            <option value="Public">Public</option>
            <option value="Private">Private</option>
          </select>
          <div>
            <label htmlFor="">Add tags</label>
            <input
              className="w-[533px] p-3 mb-4 text-gray-700 border border-gray-300 rounded-lg shadow-sm focus:border-[#51ff85] focus:ring-1 focus:ring-[#51ff85] focus:outline-none"
              placeholder="# Tags"
              name="tags"
              value={formData.tags}
              onChange={handleInputChange}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#61cbc2] hover:bg-[#45e07d] text-white font-bold py-3 px-4 rounded-lg shadow hover:shadow-md transition-all"
            onClick={(event) => handlePost(event)}
          >
            Update
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdatePost;
