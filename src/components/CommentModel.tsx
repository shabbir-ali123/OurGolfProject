import axios from "axios";
import React, { useState } from "react";
import { API_ENDPOINTS } from "../appConfig";
import Toast from "./ToastMessage";
import { useToast } from '../utils/ToastProvider';
interface CommentModelProps {
  eventId: any;
  closeModal: () => void;
}

interface AddComment {
  userId: any;
  eventId: any;
  content: any;
}

const CommentModel: React.FC<CommentModelProps> = ({ closeModal, eventId }) => {
  const { showToast } = useToast();
  const [submitting, setSubmitting] = useState(false);
 

  const uid = localStorage.getItem("id");
  const [formData, setFormData] = useState<AddComment>({
    userId: uid,
    eventId: eventId,
    content: "",
  });

  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (submitting || !formData.content.trim()) {
      // If submitting or content is empty, do nothing
      return;
    }

    setSubmitting(true); // Set submitting to true

    try {
      const response = await axios.post(API_ENDPOINTS.ADDCOMMENT, formData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      console.log("API Response:", response.data);

      if (response.status === 201) {
        // Handle success
        showToast(response.data.message, "green");
        closeModal();
      } else {
        setError("Error Occurred");
      }
    } catch (error) {
      setError((error as any)?.response?.data?.message || "Error Occurred");
      console.error("Error:", error);
       showToast("Getting error please try again", "red");

    } finally {
      setSubmitting(false); 
    }
  };

  return (
    <>
      <div
        id="popup-modal"
        tabIndex={-1}
        className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-2xl mx-auto bg-white rounded-lg shadow-lg dark:bg-gray-700 p-4"
      >
        <div className="flex justify-between items-center mx-4">
        <h2 className="mx-4">Add Your Comment</h2>
        <button
            type="button"
            className="cursor-pointer text-white bg-blue-500 p-2 shadow-lg hover:bg-gray-200 hover:text-gray-900 rounded-full w-10 h-10 flex justify-center items-center "
            data-modal-hide="popup-modal"
            onClick={closeModal}
          >
            <svg
              className="w-4 h-4"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
              />
            </svg>
            <span className="sr-only">Close modal</span>
          </button>
        </div>
        
        <div className="relative p-4 max-h-full overflow-y-auto">
         

          <form method="post" className="mx-4  ">
            <input type="hidden" name="userId" />
            <input type="hidden" name="eventId" />

            <textarea
              name="content"
              id=""
              placeholder="share your thoughts..."
              value={formData.content}
              onChange={(e) =>
                setFormData({ ...formData, content: e.target.value })
              }
              className="w-full h-32 p-2 border border-gray-200 rounded-lg mb-4 focus:outline-none focus:border-gray-300 dark:border-gray-500 dark:focus:border-gray-600"
            ></textarea>
            <div className="flex justify-end">
              <button
                data-modal-hide="popup-modal"
                type="submit"
                onClick={handleSubmit}
                className=" text-white bg-blue-500 hover:bg-green-600 focus:ring-4 focus:outline-none focus:ring-green-300 rounded-lg text-sm font-medium py-2 dark:bg-gray-700"
              >
                Comment
              </button>
            </div>
          </form>
        </div>

     
      </div>
    
    </>
  );
};

export default CommentModel;
