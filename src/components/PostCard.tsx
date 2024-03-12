import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ShareIcon,
  HandThumbUpIcon,
  EnvelopeIcon,
} from "@heroicons/react/24/solid";
import axios from "axios";
import { API_ENDPOINTS } from "../appConfig";
import { postContext } from "../contexts/postsContext";
import {
  EllipsisVerticalIcon,
  HandThumbDownIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import PostModal from "./PostModel";
import UpdatePost from "./UpdatePost";
import { toast } from "react-toastify";
import { fetchPosts } from "../utils/fetchPosts";
import { useTranslation } from "react-i18next";
import { getTimeAgo } from "../pages/ReadPost";

interface Post {
  createdAt: string | number | Date;
  id: string;
  tags: string[];
  text: string;
  posts: any;
  mediaFile: string[];
  imageUrl: string[0];
  PostComments: string[];
  PostLikes: any[];
}

const PostCard = () => {
  const { t, i18n } = useTranslation();
  document.body.dir = i18n.dir();
  const { handleDeletePost, handleCategory, category, handlePost, post } =
    postContext();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLikesModelOpen, setLikesModelOpen] = useState(false);

  const isAuthenticated = () => {
    return localStorage.getItem("token");
  };

  const handleInteraction = (event: React.MouseEvent<HTMLElement>) => {
    if (!isAuthenticated()) {
      navigate("/login-page");
      return;
    }
    const interactionType =
      event.currentTarget.getAttribute("data-interaction");
    console.log("User interacted with:", interactionType);
  };

  const [activeDropdownPostId, setActiveDropdownPostId] = useState(null);
  const [hoveredIndex, setHoveredIndex] = useState(-1);
  const [postwId, setPostwId] = useState("");

  const handleMouseEnter = (index: any) => {
    setHoveredIndex(index);
  };

  // Function to handle mouse leaving a card
  const handleMouseLeave = () => {
    setHoveredIndex(-1); // Reset hoveredIndex when mouse leaves any card
  };
  const handleEllipsisClick = (event: any, postId: any) => {
    event.preventDefault();
    setActiveDropdownPostId(activeDropdownPostId === postId ? null : postId);
  };
  const deletePost = (postId: any) => {
    handleDeletePost(postId);
  };
  const editPost = (postId: any) => {
    setIsModalOpen(true);
  };
  const closeModal = () => setIsModalOpen(false);
  const loggedInUser = localStorage.getItem("id");
  const handleLike = async (postId: string, hasLiked: boolean, event: any) => {
    event.preventDefault();
    event.stopPropagation();
    if (!isAuthenticated()) {
      navigate("/login-page");
      return;
    }
    try {
      const newCounter = hasLiked ? 0 : 1;
      const response = await axios.post(
        API_ENDPOINTS.ADDPOSTLIKE,
        { postId, Count: newCounter, userId: loggedInUser },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.status === 200) {
        // fetchPosts(handlePost, category, router);
        toast.success("Post Has been Liked");
        window.location.reload();
      }
    } catch (error) {
      console.error(`Error updating likes: ${error}`);
    }
  };
  const handleLikes = (postId: string, hasLiked: boolean, event: any) => {
    event.preventDefault();
    setLikesModelOpen(true);
    setPostwId(postId);
  };
  const sortedPosts = [...post].sort((a, b) => {
    const dateA = new Date(a.createdAt);
    const dateB = new Date(b.createdAt);

    return Number(dateB) - Number(dateA);
  });

  const closeLikesModel = (event: any) => {
    event.preventDefault();
    setLikesModelOpen(false);
  };
  return (
    <div className="relative grid grid-cols-1 md:grid-cols-2 gap-4 bg-white">
      {sortedPosts.map((post: Post, index) => {
        const loggedInUser = JSON.parse(localStorage.getItem("id") || "null");

        const userHasLiked = post.PostLikes.some(
          (like: any) => like.userId === loggedInUser && like.counter === 1
        );
        return (
          <Link
            key={post.id}
            onMouseEnter={() => handleMouseEnter(index)}
            onMouseLeave={handleMouseLeave}
            to={`/read-post/${post.id}`}
            className="text-black hover:rounded-lg "
          >
            {isLikesModelOpen && post.id === postwId ? (
              <div className="z-[9999] fixed inset-0 flex items-center justify-center p-4 bg-gray-500 bg-opacity-50 backdrop-blur-sm">
                <div
                  className="w-full max-w-sm p-6 mx-auto bg-white rounded-lg "
                  style={{
                    boxShadow:
                      "rgba(0, 0, 0, 0.16) 0px 10px 36px 0px, rgba(0, 0, 0, 0.06) 0px 0px 0px 1px",
                  }}
                >
                  <button
                    onClick={closeLikesModel}
                    className="p-2 rounded-full cursor-pointer"
                  >
                    <XMarkIcon className="w-6 h-6" aria-hidden="true" />
                  </button>
                  {post.PostLikes.map((item: any) => (
                    <div
                      key={item.key}
                      className="flex items-center gap-2 m-0 p-0 "
                    >
                      <img
                        className="w-10 h-10 rounded-full"
                        src={item.user.imageUrl}
                      />
                      <p className="text-black">{item.user.nickName}</p>
                    </div>
                  ))}
                </div>
              </div>
            ) : null}

            <div
              className=" mx-4 lg:mx-0 lg:flex p-4 relative rounded-lg hover:rounded-lg hover:bg-[#17b3a6] hover:text-white"
              style={{ boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px" }}
            >
              <img
                className="rounded-lg  object-cover  h-[250px] w-full lg:w-[180px]"
                src={post.mediaFile[0]}
                alt="Post"
              />

              <div className="p-4">
                <div className="flex items-center gap-2 justify-between">
                  <div className="flex items-center  gap-2 ">
                    <img
                      className="w-8 h-8 rounded-full "
                      src={post.posts.imageUrl}
                      alt="Post"
                    />

                    <p className="p-0 text-sm flex gap-4 items-center">
                      {post.posts.nickName}{" "}
                      <span className="text-[10px]">
                        {getTimeAgo(new Date(post?.createdAt))}
                      </span>
                    </p>
                  </div>
                  {post.posts.id === loggedInUser && (
                    <div
                      className="relative"
                      onClick={(event) => handleEllipsisClick(event, post.id)}
                    >
                      <EllipsisVerticalIcon
                        className="w-6 h-6 cursor-pointer "
                        aria-hidden="true"
                        onClick={(event) => handleEllipsisClick(event, post.id)}
                      />
                      {activeDropdownPostId === post.id && (
                        <div className="absolute right-[20px] top-0  w-[100px] overflow-hidden bg-white">
                          <ul className="p-0 m-0">
                          <Link
                                className="decoration-none text-[#43bcb0] hover:text-[#000] "
                                to={"/edit-post/" + post.id}
                              >
                            <li className="list-none p-2 hover:shadow-lg  text-start">
                            
                                Edit
                         
                            </li>
                            </Link>
                            <li className="list-none p-2 hover:shadow-lg text-start">
                              <a
                                className="decoration-none text-[#43bcb0] hover:text-[red]"
                                onClick={() => deletePost(post.id)}
                              >
                                Delete
                              </a>
                            </li>
                          </ul>
                        </div>
                      )}
                    </div>
                  )}
                </div>
                <p className="p-0 text-sm break-words truncate w-80 ">
                  {post.text}
                </p>

                <div className="mt-2">
                  <div className="flex space-x-2">
                    <span
                      className={`bg-[#17b3a6] ${
                        hoveredIndex === index
                          ? "bg-black text-white"
                          : "bg-[#17b3a6] text-white"
                      } hover:bg-black  text-xs font-semibold mr-2 px-2.5 py-0.5 rounded-full`}
                    >
                      {post.tags}
                    </span>
                  </div>

                  <div className="flex justify-between mt-6 space-x-4 z-10 relative">
                    <div
                      className="flex items-center gap-0 hover:bg-black p-1 rounded-lg "
                      onClick={(event) =>
                        handleLikes(post.id, userHasLiked, event)
                      }
                    >
                      <div className="flex items-center "></div>{" "}
                      <span className="flex items-center gap-2 text-[10px] cursor-pointer">
                        by {userHasLiked ? "you, " : ""}
                        {post?.PostLikes[0]?.user?.nickName} &{" "}
                        {
                          (post?.PostLikes || []).filter(
                            (like: any) => like.counter
                          ).length
                        }{" "}
                        others
                      </span>
                    </div>
                    <div className="flex item-center">
                      <span
                        className="flex items-center text-[10px] gap-0 hover:bg-black p-1 rounded-lg"
                        onClick={handleInteraction}
                        data-interaction="comment"
                      >
                        {" "}
                        {post.PostComments.length} {t("COMMENTS")}
                      </span>

                      <span
                        className="flex items-center gap-0 text-[10px] hover:bg-black p-1 rounded-lg"
                        onClick={handleInteraction}
                        data-interaction="share"
                      >
                        <span className=""></span>0{t("SHARE")}
                      </span>
                    </div>
                  </div>

                  <div className="flex  justify-between z-10 relative">
                    <div
                      className="flex items-center gap-0 hover:bg-black p-1 rounded-lg "
                      onClick={(event) =>
                        handleLike(post.id, userHasLiked, event)
                      }
                    >
                      <div className="flex items-center ">
                        <button className="flex items-center cursor-pointer bg-transparent">
                          {userHasLiked ? (
                            <HandThumbUpIcon
                              className={`w-6 h-6  ${
                                hoveredIndex === index
                                  ? "text-white "
                                  : "text-[#17b3a6]"
                              } text-[#17b3a6]`}
                            />
                          ) : (
                            <HandThumbUpIcon
                              className={`w-6 h-6  ${
                                hoveredIndex === index
                                  ? "text-white"
                                  : "text-black"
                              } `}
                            />
                          )}
                        </button>
                      </div>{" "}
                      <span
                        className={`flex items-center gap-2 cursor-pointer ${
                          hoveredIndex === index
                            ? "text-white "
                            : "text-[#17b3a6]"
                        } ${userHasLiked ? "text-[#17b3a6]" : "text-black"}`}
                      >
                        {t("LIKE")}
                      </span>
                    </div>
                    <span
                      className="flex items-center gap-0 hover:bg-black p-1 rounded-lg"
                      onClick={handleInteraction}
                      data-interaction="comment"
                    >
                      {" "}
                      <EnvelopeIcon
                        className="w-4 h-4 cursor-pointer"
                        aria-hidden="true"
                      />
                      {t("COMMENTS")}
                    </span>

                    <span
                      className="flex items-center gap-0 hover:bg-black p-1 rounded-lg"
                      onClick={handleInteraction}
                      data-interaction="share"
                    >
                      <ShareIcon
                        className="w-4 h-4 cursor-pointer"
                        aria-hidden="true"
                        data-interaction="share"
                      />
                      {t("SHARE")}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default PostCard;
