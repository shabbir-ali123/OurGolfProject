import axios from "axios";
import React, { useEffect, useState } from "react";
import { API_ENDPOINTS } from "../appConfig";
import { useToast } from "../utils/ToastProvider";
import {
  eventContextStore,
  singleEventContextStore,
  SingleEventsContext,
} from "../contexts/eventContext";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import { getTimeAgo } from "../pages/ReadPost";
import { handleDeleteComment, handleEditForm } from "../utils/fetchCommunication";
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
  userId: any;
  createdAt: Date;
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
  console.log(eventId, "evvn");
  const { singleEvent, handleSingleEventID, handleMessage } =
    singleEventContextStore();
  const [isOpenMap, setIsOpenMap] = useState<{ [key: string]: boolean }>({});

  const { t, i18n } = useTranslation();
  document.body.dir = i18n.dir();
  const { showToast } = useToast();
  const [submitting, setSubmitting] = useState(false);
  const [commentData, setCommentData] = useState<{
    userId: number;
    content: string;
    createdAt: string;
  }>({
    userId: 0,
    content: "",
    createdAt: "",
  });
  const [commentsToShow, setCommentsToShow] = useState(2);
  const currentUserId = localStorage.getItem("id");

  const token = localStorage.getItem("token");
  const uid = localStorage.getItem("id");
  const [formData, setFormData] = useState<AddComment>({
    userId: uid,
    eventId: eventId,
    content: "",
  });

  useEffect(() => {
    handleSingleEventID(eventId);
  }, [eventId]);

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
        toast.success(response.data.message);

        handleMessage(response.data);
        setFormData({
          userId: uid,
          eventId: eventId,
          content: "",
        });
      }

      // setFormData({ userId: uid,
      //   eventId: eventId,
      //   content: "",});
    } catch (error) {
      showToast("Getting error, please try again", "red");
    } finally {
      setSubmitting(false);
    }
  };

  const loadMoreComments = () => {
    setCommentsToShow((prev) => prev + 2);
  };
  const toggleDropdown = (commentId: string) => {
    setIsOpenMap((prevState) => ({
      [commentId]: !prevState[commentId],
    }));
  };
  const [isEdit, setIsEdit] = useState<{ [key: string]: boolean }>({});
  const [updateFormData, setUpdateFormData] = useState<any>({
    updatedContent: "",
    commentId: "",
  });

  const handleEditComment = (commentId: string, content: any) => {
    setIsOpenMap((prevState) => ({
      [commentId]: false,
    }));
    setIsEdit((prevState) => ({
      [commentId]: !prevState[commentId],
    }));

    if (isEdit) {
      setUpdateFormData((prevState: any) => ({
        commentId: commentId,
        content: content,
      }));
    }
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
            {token ? (
              <h2 className="mx-4">{t("ADD_COMMENTS")}</h2>
            ) : (
              <h2 className="mx-4">Recent Comments</h2>
            )}
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
            {token && (
              <form method="post" className="mx-4 ">
                <input type="hidden" name="userId" />
                <input type="hidden" name="eventId" />

                <textarea
                  name="content"
                  id=""
                  placeholder={t("WRITE_COMMENTS")}
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
                    {t("POST_COMMENTS")}
                  </button>
                </div>
              </form>
            )}
            <div key={singleEvent.id}>
              {singleEvent?.comments?.map((comment: any) => {
                if (comment.eventId === eventId) {
                  return (
                    <div key={comment.id} className="py-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          {comment?.userId}
                          <img
                            className="w-10 h-10"
                            src="/img/ellipse-11@2x.png"
                            alt=""
                          />
                          <h4 className="inline-flex items-center mr-2 text-sm font-semibold text-gray-900 dark:text-white">
                            {comment.user?.nickname}
                          </h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {getTimeAgo(new Date(comment.createdAt))}
                          </p>
                        </div>
                        {currentUserId == comment.userId && (
                          <button
                            id="dropdownComment1Button"
                            data-dropdown-toggle="dropdownComment1"
                            onClick={() => toggleDropdown(comment.id)} // Pass comment ID to toggle function
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
                        )}
                        {isOpenMap[comment.id] && (
                          <div
                            id="dropdownComment1"
                            className="z-99 origin-top-right absolute right-0 mt-2 w-36 bg-white divide-y divide-gray-100 rounded shadow "
                          >
                            <div
                              className="py-1 text-sm text-gray-700 "
                              aria-labelledby="dropdownComment1Button"
                            >
                              <a
                                type="button"
                                onClick={() =>
                                  handleEditComment(comment.id, comment.content)
                                }
                                className="block px-4 cursor-pointer py-2 hover:bg-[#17b3a6] hover:text-white "
                              >
                                Edit
                              </a>

                              <a
                                type="button"
                                onClick={() =>
                                  handleDeleteComment(
                                    comment.id,
                                    comment.userId,
                                    handleMessage,
                                    setIsEdit
                                  )
                                }
                                className="block px-4 cursor-pointer py-2 hover:bg-[#17b3a6] hover:text-white "
                              >
                                Remove
                              </a>
                            </div>
                          </div>
                        )}
                      </div>

                      <div>
                      {isEdit[comment.id] ? (
                            <form onSubmit={(e)=>{handleEditForm(e, setIsEdit, handleMessage, updateFormData)}}>
                            <textarea
                                name="editContent"
                                id=""
                                value={updateFormData?.content}
                                onChange={(e) => {
                                  setUpdateFormData({
                                    commentId: comment.id,
                                    content: e.target.value,
                                  });
                                }}
                                className="w-full px-1 h-16 px-2 mb-4 border border-gray-200 rounded-lg focus:outline-none focus:border-gray-300 dark:border-gray-500 dark:focus:border-gray-600"
                              ></textarea>
                              <input
                                type="hidden"
                                name="commentId"
                                value={comment.id}
                              />
                              <div className="flex gap-2">
                                <button
                                  data-modal-hide="popup-modal"
                                  type="submit"
                                  // onClick={handleEditForm}
                                  className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-[#17b3a6] hover:bg-green-600 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800"
                                >
                                  {t("UPDATE_COMMENTS")}
                                </button>
                                <button
                                  data-modal-hide="popup-modal"
                                  type="submit"
                                  onClick={() => {
                                    setIsEdit({ false: false });
                                  }}
                                  className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-[#17b3a6] hover:bg-green-600 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800"
                                >
                                  {t("CLOSE_COMMENTS")}
                                </button>
                              </div>
                            </form>
                          ) : (
                            <p className="comment-content p-0 m-0 text-gray-500 dark:text-gray-400">
                              {comment.content}
                            </p>
                          )}
                        
                      </div>
                    </div>
                  );
                }
                return null;
              })}

              {singleEvent?.comments?.length > commentsToShow && (
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
          </div>
        </div>
      </td>
    </>
  );
};

export default CommentModel;
