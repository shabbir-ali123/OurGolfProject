import { FunctionComponent, useEffect, useState } from "react";
import { fetchSinglePosts } from "../utils/fetchPosts";
import { useParams } from "react-router-dom";

const ReadPost: React.FC = () => {
    const params = useParams<{ id?: string }>();
  const postId = params.id;
  console.log(postId, "yg")
    const [singlePost, setSinglePost] = useState('');
    
    useEffect(() => {
        fetchSinglePosts(setSinglePost, postId)
    },[])

    console.log(singlePost, 'sp')
    return (
        <div className="max-w-2xl p-4 mx-auto">
          <h1 className="mb-4 text-3xl font-bold">My Simple Blog Post</h1>
          <p className="mb-4 text-gray-600">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.
          </p>
          <img
            className="object-cover w-full h-64 mb-4"
            src="https://via.placeholder.com/800x400"
            alt="Blog Post Image"
          />
          <p className="mb-4 text-gray-600">
            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
          </p>
          <p className="text-gray-600">
            Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </p>
        </div>
      );
    }
export default ReadPost;
