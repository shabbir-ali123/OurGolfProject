import React, { useEffect, useState } from "react";
import { ShareIcon ,
    HandThumbUpIcon,
    EnvelopeIcon

} from "@heroicons/react/24/solid";
import { fetchPosts } from "../utils/fetchPosts";
interface Post{
  id: any

}
const PostItem: React.FC = () => {
  const [post, setPosts] =  useState<Post[]>([]);

  useEffect(() => {
    fetchPosts(setPosts);
  },[]);
    
  return (
    <div className="bg-white p-4 my-4 rounded-lg border-2 border-solid border-[#51ff85] flex ">
      
      {post.map((post: Post) => (
       <div>{post.id}</div> 
      ))}
      <img
        className=" rounded-lg w-[300px] h-[240px]"
        src="https://img.freepik.com/free-photo/golf-ball_1308-5010.jpg?size=626&ext=jpg&uid=R68032164&ga=GA1.1.1873485738.1704878396&semt=ais"
        alt="Post"
      />
      <div className="p-4">
        <div className="flex items-center gap-2">
        <img
        className=" rounded-full w-8 h-8"
        src="https://img.freepik.com/free-photo/golf-ball_1308-5010.jpg?size=626&ext=jpg&uid=R68032164&ga=GA1.1.1873485738.1704878396&semt=ais"
        alt="Post"
      />
      <p className="p-0">Shabbir</p>
        </div>
        <p className="text-gray-700 text-sm p-0">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book.
        </p>

        <div className="  mt-2">
          <div className="flex space-x-2">
            <span className="bg-[#e0ffe9] text-green-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded-full">
              #Golf
            </span>
            <span className="bg-[#e0ffe9] text-green-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded-full">
              #Party
            </span>
          </div>
          <div className="flex space-x-4 mt-6">
            <span className="text-gray-600 text-sm flex items-center gap-2 cursor-pointer"> <EnvelopeIcon
                className="w-4 h-4 cursor-pointer text-[#00D1FF]"
                aria-hidden="true"
              />242 comments</span>
            <span className="text-gray-600 text-sm flex items-center gap-2 cursor-pointer"> <HandThumbUpIcon
                className="w-4 h-4 cursor-pointer text-[#51ff85]"
                aria-hidden="true"
              />93k likes</span>
            <span className="text-gray-600 text-sm flex items-center gap-2 cursor-pointer">
              {" "}
              <ShareIcon
                className="w-4 h-4 cursor-pointer"
                aria-hidden="true"
              />
              Share
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostItem;
