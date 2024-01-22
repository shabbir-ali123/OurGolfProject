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
}

const ReadPost: React.FC = () => {
  const params = useParams<{ id?: string }>();
  const postId = params.id;

  const [formData, setFormData] = useState<any>({
    content: "",
    postId: postId
  });
  const [commentData, setCommentData] = useState<any>({
    userId: 0,
    content: "",
    createdAt: "",
  });
  const [singlePost, setSinglePost] = useState<SinglePostProps>();

  useEffect(() => {
    fetchSinglePosts(setSinglePost, postId);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await addPostComment(formData);

      toast.success(response.message);
      console.log(response, 'rd');
      setCommentData({
        content: response.message,
        createdAt: response.comment.createdAt,
      });
    } catch (error) {
      toast.error("Getting error, please try again");
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
        </div>
      </div>
    </div>
  );
};
export default ReadPost;
