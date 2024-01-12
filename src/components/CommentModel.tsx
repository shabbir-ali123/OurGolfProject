import axios from "axios";
import React, { useEffect, useState } from "react";
import { API_ENDPOINTS } from "../appConfig";
import { useToast } from "../utils/ToastProvider";
import { fetchEvents } from "../utils/fetchEvents";
interface CommentModelProps {
  eventId: any;
  closeModal: () => void;
}

interface AddComment {
  userId: any;
  eventId: any;
  content: any;
}
interface Comment {
  id: any;
  content: any;
  userId: any; // Add the appropriate type for userId
  createdAt: string; // Assuming createdAt is a string representing a date
  eventId: any;
}
interface Event {
  id: any;
  creator: {
    nickName: any;
  };
  isFavorite: Boolean;
  comments: Comment[];
  accountHolderName: string;
  eventStartTime: string;
  eventStartDate: string;
  eventName: string;
  eventDetails: string;
  type: string;
  place: string;
  imageUrl: string;
  likes: Array<{
    counter: number;
    userId: string;
    id: number;
  }>;
}
const CommentModel: React.FC<CommentModelProps> = ({ closeModal, eventId }) => {
  const [events, setEvents] = useState<Event[]>([]);

  console.log(eventId, "kjlkjlkjlk");
  const { showToast } = useToast();
  const [submitting, setSubmitting] = useState(false);
  const [commentData, setCommentData] = useState<{
    userId: number;
    content: string;
    createdAt: string;
  }>({
    userId: 0, // Update the type to match your data
    content: "",
    createdAt: "",
  });

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
      return;
    }

    setSubmitting(true);

    try {
      const response = await axios.post(API_ENDPOINTS.ADDCOMMENT, formData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (response.status === 201) {
        showToast(response.data.message, "green");

        setCommentData({
          userId: response.data.userId,
          content: response.data.content,
          createdAt: response.data.createdAt,
        });

        closeModal();
      } else {
        setError("Error Occurred");
      }
    } catch (error) {
      setError((error as any)?.response?.data?.message || "Error Occurred");
      console.error("Error:", error);
      showToast("Getting error, please try again", "red");
    } finally {
      setSubmitting(false);
    }
  };
  useEffect(() => {
    fetchEvents("", "", setEvents);
  }, []);
  const [commentsToShow, setCommentsToShow] = useState(2);

  const loadMoreComments = () => {
    setCommentsToShow((prev) => prev + 2);
  };

  return (
    <>
   
    <td
        colSpan={8}
        id="popup-modal"
        tabIndex={-1}
        className="p-2  bg-white rounded-lg shadow-lg dark:bg-gray-700 mt-[-10px]"
      >
        <div className="col-span-12">
        <div className="flex items-center justify-between mx-4">
          <h2 className="mx-4">Add Your Comment</h2>
          <button
            type="button"
            className="flex items-center justify-center w-10 h-10 p-2 text-white bg-blue-500 rounded-full shadow-lg cursor-pointer hover:bg-gray-200 hover:text-gray-900 "
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

        <div className="relative max-h-full p-4 overflow-y-auto">
          <form method="post" className="mx-4 ">
            <input type="hidden" name="userId" />
            <input type="hidden" name="eventId" />

            <textarea
              name="content"
              id=""
              placeholder="Write a comment..."
              value={formData.content}
              onChange={(e) =>
                setFormData({ ...formData, content: e.target.value })
              }
              className="w-full h-16 p-2 mb-4 border border-gray-200 rounded-lg focus:outline-none focus:border-gray-300 dark:border-gray-500 dark:focus:border-gray-600"
            ></textarea>
            <div className="flex justify-start">
              <button
                data-modal-hide="popup-modal"
                type="submit"
                onClick={handleSubmit}
                className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-blue-500 hover:bg-green-600 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800"
              >
                Post comment
              </button>
            </div>
          </form>

          {events.map((event) => {
            if (event.id === eventId) {
              return (
                <div key={event.id}>
                  {event.comments.slice(0, commentsToShow).map((comment) => {
                    if (comment.eventId === eventId) {
                      return (
                        <div key={comment.id} className="py-4">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                              <img
                                className="w-10 h-10"
                                src="/img/ellipse-11@2x.png"
                                alt=""
                              />
                              <h4 className="inline-flex items-center mr-2 text-sm font-semibold text-gray-900 dark:text-white">
                                {comment.userId}
                              </h4>
                              <p className="text-sm text-gray-600 dark:text-gray-400">
                                {comment.createdAt}
                              </p>
                            </div>
                            <button
                              id="dropdownComment1Button"
                              data-dropdown-toggle="dropdownComment1"
                              className="inline-flex items-center p-2 text-sm font-medium text-center text-gray-500 bg-white rounded-lg dark:text-gray-400 hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-50 dark:bg-gray-900 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                              type="button"
                            >
                              <svg
                                className="w-4 h-4"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="currentColor"
                                viewBox="0 0 16 3"
                              >
                                <path d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z" />
                              </svg>
                              <span className="sr-only">Comment settings</span>
                            </button>
                            <div
                              id="dropdownComment1"
                              className="z-10 hidden bg-white divide-y divide-gray-100 rounded shadow w-36 dark:bg-gray-700 dark:divide-gray-600"
                            >
                              <ul
                                className="py-1 text-sm text-gray-700 dark:text-gray-200"
                                aria-labelledby="dropdownMenuIconHorizontalButton"
                              >
                                <li>
                                  <a
                                    href="#"
                                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                  >
                                    Edit
                                  </a>
                                </li>
                                <li>
                                  <a
                                    href="#"
                                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                  >
                                    Remove
                                  </a>
                                </li>
                                <li>
                                  <a
                                    href="#"
                                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                  >
                                    Report
                                  </a>
                                </li>
                              </ul>
                            </div>
                          </div>

                          <div>
                            <p className="p-0 m-0 text-gray-500 dark:text-gray-400">
                              {comment.content}
                            </p>
                            <div className="flex items-center mt-4 space-x-4">
                              <button
                                type="button"
                                className="flex items-center text-sm font-medium text-gray-500 hover:underline dark:text-gray-400"
                              >
                                <svg
                                  className="mr-1.5 w-3.5 h-3.5"
                                  aria-hidden="true"
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 20 18"
                                >
                                  <path
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M5 5h5M5 8h2m6-3h2m-5 3h6m2-7H2a1 1 0 0 0-1 1v9a1 1 0 0 0 1 1h3v5l5-5h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1Z"
                                  />
                                </svg>
                                Reply
                              </button>
                            </div>
                          </div>
                        </div>
                      );
                    }
                    return null;
                  })}

                  {event.comments.length > commentsToShow && (
                    <div className="mt-4 text-center">
                      <button
                        className="text-blue-500 hover:underline"
                        onClick={loadMoreComments}
                      >
                        Load more comments
                      </button>
                    </div>
                  )}
                </div>
              );
            }
            return null;
          })}
        </div>
        </div>
      
      </td>
    </>
     
  
  );
};

export default CommentModel;
