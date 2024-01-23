import { useEffect, useState } from "react";
import { addPostComment, fetchSinglePosts } from "../utils/fetchPosts";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { API_ENDPOINTS } from "../appConfig";
import axios from "axios";

interface SinglePostProps {
  posts: any;
  category: string;
  tags: string;
  mediaFile?: any;
  text: string;
  PostComments: any;
  PostLikes: any
}

const ReadPost: React.FC = () => {
  const params = useParams<{ id?: string }>();
  const postId = params.id;
  const [formData, setFormData] = useState<any>({ content: "", postId: postId });
  const [singlePost, setSinglePost] = useState<any>();
  const [likeCount, setLikeCount] = useState<number>(0);
  const [userHasLiked, setUserHasLiked] = useState<boolean>(false);

  useEffect(() => {
    fetchSinglePosts(setSinglePost, postId);
  }, [postId])

  useEffect(() => {
    if (singlePost) {
      setLikeCount(singlePost.PostLikes.length);
      const loggedInUser = JSON.parse(localStorage.getItem("id") || "null");
      setUserHasLiked(singlePost.PostLikes.some((like: any) => like.userId === loggedInUser));
    }
  }, [singlePost]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await addPostComment(formData);
      toast.success("Comment added successfully");
      fetchSinglePosts(setSinglePost, postId); // Refresh comments
    } catch (error) {
      toast.error("Error adding comment, please try again");
    }
  };

  const handleLike = async () => {
    const loggedInUser = JSON.parse(localStorage.getItem("id") || "null");
    if (!loggedInUser) {
      toast.error("You must be logged in to like a post");
      return;
    }

    try {
      const newCounter = userHasLiked ? 0 : 1;

      const response = await axios.post(
        API_ENDPOINTS.ADDPOSTLIKE,
        { postId: postId, Count: newCounter, userId: loggedInUser },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.status === 200) {
        setLikeCount(prevCount => newCounter === 1 ? prevCount + 1 : prevCount - 1);
        setUserHasLiked(!userHasLiked);
        toast.success(`Post ${newCounter === 1 ? 'liked' : 'unliked'} successfully`);
      }
    } catch (error) {
      toast.error(`Error updating likes: ${error}`);
    }
  };

  return (
    <div className="max-w-2xl p-4 mx-auto">
      <h1 className="mb-4 text-3xl font-bold">{singlePost?.posts.nickName}</h1>
      <p className="mb-4 text-gray-600">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam.
      </p>
      <img
        className="object-cover w-full h-64 mb-4"
        src={singlePost?.mediaFile?.map((img: any) => img)}
        alt="Blog Post Image"
      />
      <p className="mb-4 text-gray-600">
        Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
        dolore eu fugiat nulla pariatur.
      </p>
      <p className="text-gray-600">{singlePost?.text}</p>
      <div className="col-span-12">
        <div className="flex items-center justify-between mx-4">
          <h2 className="mx-4">Add Your Comment</h2>
        </div>
        <button onClick={handleLike}>
        {userHasLiked ? 'Unlike' : 'Like'}
      </button>
      <div>{likeCount} {likeCount === 1 ? 'Like' : 'Likes'}</div>
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
            {singlePost?.PostComments.map((comment: any) => {
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
            })}
          </form>
        </div>
      </div>
    </div>
  );
};
export default ReadPost;
