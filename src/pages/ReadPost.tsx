import { useEffect, useState } from "react";
import { fetchSinglePosts } from "../utils/fetchPosts";
import { useParams } from "react-router-dom";
interface SinglePostProps {
    posts: any;
    category: string;
    tags: string;
    mediaFile?: any;
    text: string
  }
  
const ReadPost: React.FC = () => {
    const params = useParams<{ id?: string }>();
    const postId = params.id;
    
    const [singlePost, setSinglePost] = useState<SinglePostProps>();
    
    useEffect(() => {
        fetchSinglePosts(setSinglePost, postId)
    },[])

    return (
        <div className="max-w-2xl p-4 mx-auto">
          <h1 className="mb-4 text-3xl font-bold">{singlePost?.posts.nickName}</h1>
          <p className="mb-4 text-gray-600">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.
          </p>
          <img
            className="object-cover w-full h-64 mb-4"
            src={singlePost?.mediaFile?.map((img: any) => img)}
            alt="Blog Post Image"
          />
          <p className="mb-4 text-gray-600">
            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
          </p>
          <p className="text-gray-600">
            {singlePost?.text}
          </p>
        </div>
      );
    }
export default ReadPost;
