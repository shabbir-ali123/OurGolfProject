  import React, { useEffect, useState } from "react";
  import { Link, useNavigate } from 'react-router-dom';
  import { ShareIcon, HandThumbUpIcon, EnvelopeIcon } from "@heroicons/react/24/solid";
  import { fetchPosts } from "../utils/fetchPosts";
  interface PostCardProps {
    category: string;
  }
  interface Post {
    id: string;
    tags: string[];
    text: string;
    posts: any; 
    mediaFile: string[];
    PostComments: string[],
    PostLikes: string[]
  }

  const PostCard: React.FC<PostCardProps> = ({ category }) => {
    const [posts, setPosts] = useState<Post[]>([]);
    const navigate = useNavigate();
    useEffect(() => {
      fetchPosts(setPosts, category);
    }, [category]);
    
    const isAuthenticated = () => {
      return localStorage.getItem("token");
    };

    const handleInteraction = (event: React.MouseEvent<HTMLElement>) => {
      if (!isAuthenticated()) {
        navigate('/login-page');
        return;
      }
      const interactionType = event.currentTarget.getAttribute("data-interaction");
      console.log("User interacted with:", interactionType);
    };
    
    return (
      <div className="bg-white ">

        {posts.map((post: Post) => (
          <Link to={`/read-post/${post.id}`}>            
          <div key={post.id} className="flex my-4  p-4 rounded-lg border-2 border-solid border-[#51ff85]">
            <img
              className="rounded-lg w-[150px] h-[auto]"
              src={post.mediaFile[0]}
              alt="Post"
            />
            <div className="p-4">
              <div className="flex items-center gap-2">
                <img
                  className="w-8 h-8 rounded-full "
                  src="https://img.freepik.com/free-photo/golf-ball_1308-5010.jpg?size=626&ext=jpg&uid=R68032164&ga=GA1.1.1873485738.1704878396&semt=ais"
                  alt="Post"
                />
                <p className="p-0">{post.posts.nickName}</p>
              </div>
              <p className="p-0 text-sm text-gray-700">
                {post.text}
              </p>

              <div className="mt-2 ">
                <div className="flex space-x-2">
                  <span className="bg-[#e0ffe9] text-green-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded-full">
                    {post.tags}
                  </span>
                  <span className="bg-[#e0ffe9] text-green-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded-full">
                    #Party
                  </span>
                </div>
                <div className="flex mt-6 space-x-4">
                  <span className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer" onClick={handleInteraction} data-interaction="comment" > <EnvelopeIcon
                    className="w-4 h-4 cursor-pointer text-[#00D1FF]"
                    aria-hidden="true"

                  />{post.PostComments.length} comments</span>
                  <span className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer" onClick={handleInteraction} data-interaction="like"> <HandThumbUpIcon
                    className="w-4 h-4 cursor-pointer text-[#51ff85]"
                    aria-hidden="true"

                    data-interaction="like"
                  />{post.PostLikes.length} likes</span>
                  <span className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer" onClick={handleInteraction} data-interaction="share">
                    {" "}
                    <ShareIcon
                      className="w-4 h-4 cursor-pointer"
                      aria-hidden="true"

                      data-interaction="share"
                    />
                    Share
                  </span>
                </div>
              </div>
            </div></div>
            </Link>
        ))}

      </div>
    );
  };

  export default PostCard;
