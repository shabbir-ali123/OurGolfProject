import { useEffect, useState } from "react";
import { addPostComment, fetchSinglePosts } from "../utils/fetchPosts";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { API_ENDPOINTS } from "../appConfig";
import axios from "axios";
import {
  HandThumbUpIcon,
  HandThumbDownIcon,
  ShareIcon,
} from "@heroicons/react/24/solid";
import { useTranslation } from "react-i18next";
import Slider from "react-slick";
import { hasImageExtension } from "../utils/imgExtension";
import { Slide } from "react-slideshow-image";
import { postContext } from "../contexts/postsContext";
import { handleDeleteComment } from "../utils/fetchCommunication";
import { useTeacherContext } from "../contexts/teachersContext";
import { gigsContextStore } from "../contexts/gigsContext";
export interface SinglePostProps {
  posts: any;
  category: string;
  tags: string;
  mediaFile?: any;
  text: string;
  PostComments: any;
  PostLikes: any;
  createdAt: any;
  id: any;
}
export const getTimeAgo = (pastTime: any, t: any) => {
  const currentTime: any = new Date();

  const msPerMinute = 60 * 1000;
  const msPerHour = msPerMinute * 60;
  const msPerDay = msPerHour * 24;
  const msPerMonth = msPerDay * 30;
  const msPerYear = msPerDay * 365;

  const elapsed = currentTime - pastTime;

  if (elapsed < msPerMinute) {
    return Math.round(elapsed / 1000) + " " + t("SEC_AGO");
  } else if (elapsed < msPerHour) {
    return Math.round(elapsed / msPerMinute) + " " + t("MIN_AGO");
  } else if (elapsed < msPerDay) {
    return Math.round(elapsed / msPerHour) + " " + t("HOUR_AGO");
  } else if (elapsed < msPerMonth) {
    return "" + Math.round(elapsed / msPerDay) + " " + t("DAYS_AGO")
  } else if (elapsed < msPerYear) {
    return "" + Math.round(elapsed / msPerMonth) + " " + t("MONTH_AGO");
  } else {
    return "" + Math.round(elapsed / msPerYear) + " " + t("YEAR_AGO");
  }
};
const GigDetails: React.FC = () => {
  // const GigDetails = {
  //     id: 3,
  //     teacherId: 6,
  //     description: "sdcsdc",
  //     price: 0,
  //     title: "sdc",
  //     imageUrl: [
  //         "",
  //         "",
  //         ""
  //     ],
  //     createdAt: "2024-04-18T15:24:22.000Z",
  //     updatedAt: "2024-04-18T15:24:22.000Z",
  //     teacherName: "sajid",
  //     teacherImage: "https://egolf.s3.eu-north-1.amazonaws.com/user-aisar%40gmail.com/1716575368788.png"
  // }
  const { gig } = gigsContextStore();

  //   const { handlePostId, handleMessage, handlePost, singlePost, message } =
  //     postContext();

  const { t, i18n } = useTranslation();
  document.body.dir = i18n.dir();
  const params = useParams<{ id?: string }>();
  const { teacher, handTeacherId } = useTeacherContext();
  handTeacherId(gig?.teacherId);
  const postId = params.id;
  //   const [formData, setFormData] = useState<any>({
  //     content: "",
  //     postId: postId,
  //   });
  //   const [updateFormData, setUpdateFormData] = useState<any>({
  //     updatedContent: "",
  //     commentId: "",
  //   });

  //   useEffect(() => {
  //     if (postId) {
  //       handlePostId(postId);
  //     }
  //   }, [postId]);
  //   const [userHasLiked, setUserHasLiked] = useState<any>(false);
  const [localEvents, setLocalEvents] = useState<any>([]);
  const [isOpenMap, setIsOpenMap] = useState<{ [key: string]: boolean }>({});
  //   const currentUserId = localStorage.getItem("id");

  //   const [isEdit, setIsEdit] = useState<{ [key: string]: boolean }>({});

  //   const handleEditComment = (commentId: string, content: any) => {
  //     setIsOpenMap((prevState) => ({
  //       [commentId]: false,
  //     }));
  //     setIsEdit((prevState) => ({
  //       [commentId]: !prevState[commentId],
  //     }));

  //     if (isEdit) {
  //       setUpdateFormData((prevState: any) => ({
  //         commentId: commentId,
  //         content: content,
  //       }));
  //     }
  //   };

  //   useEffect(() => {
  //     if (singlePost) {
  //       const loggedInUser = JSON.parse(localStorage.getItem("id") || "null");
  //       setUserHasLiked(
  //         singlePost.PostLikes.some(
  //           (like: any) => like.userId === loggedInUser && like.counter === 1
  //         )
  //       );
  //     }
  //   }, [singlePost]);

  //   const handleSubmit = async (e: React.FormEvent) => {
  //     e.preventDefault();
  //     try {
  //       await addPostComment(formData, handleMessage);
  //       toast.success("Comment added successfully");
  //       fetchSinglePosts(handlePost, postId);
  //       setFormData({ ...formData, content: "" });
  //     } catch (error) {
  //       toast.error("Error adding comment, please try again");
  //     }
  //   };
  //   const likescount = singlePost?.PostLikes.length;
  //   const handleLike = async () => {
  //     try {
  //       const loggedInUser = JSON.parse(localStorage.getItem("id") || "");
  //       const likes = singlePost?.PostLikes || [];
  //       const userPosts = likes?.find(
  //         (like: any) => like.userId === loggedInUser
  //       );
  //       // console.log(singlePost?.PostLikes, "s");
  //       const newCounter = userPosts?.counter === 1 ? 0 : 1;

  //       // console.log(likes, "true or false");
  //       const response = await axios.post(
  //         API_ENDPOINTS.ADDPOSTLIKE,
  //         { postId: postId, Count: newCounter, userId: loggedInUser },
  //         {
  //           headers: {
  //             Authorization: `Bearer ${localStorage.getItem("token")}`,
  //           },
  //         }
  //       );

  //       if (response.status === 200) {
  //         setUserHasLiked(!userHasLiked);
  //         // fetchSinglePosts(handlePost, postId);
  //         setLocalEvents((prev: any) =>
  //           prev.map((e: any) =>
  //             e.id === singlePost?.id
  //               ? {
  //                   ...e,
  //                   likes: userPosts
  //                     ? likes.map((like: any) =>
  //                         like.userId === loggedInUser
  //                           ? { ...like, counter: newCounter }
  //                           : like
  //                       )
  //                     : [
  //                         ...likes,
  //                         {
  //                           counter: newCounter,
  //                           userId: loggedInUser,
  //                           id: Math.floor(Math.random() * 10),
  //                         },
  //                       ],
  //                 }
  //               : e
  //           )
  //         );
  //       }
  //     } catch (error) {
  //       toast.error(`Error updating likes: ${error}`);
  //     }
  //   };

  const toggleDropdown = (commentId: string) => {
    setIsOpenMap((prevState) => ({
      [commentId]: !prevState[commentId],
    }));
  };

  //   const postTime = new Date(singlePost?.createdAt);
  const postTime = new Date(gig?.createdAt);

  const timeAgo = getTimeAgo(postTime, t);

  var settings = {
    dots: true,
    speed: 500,
    slidesToShow: 1,

    initialSlide: 1,
    arrows: false,
  };


  const arrayImages = gig?.imageUrl?.split(',');
  return (
    <div
      className="mx-6 md:mx-auto max-w-7xl px-6  my-4 py-4"
      style={{
        boxShadow:
          "rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset",
      }}
    >
      <div className="flex gap-2 items-center py-4 justify-between">
        <div
          className="flex gap-2 items-center cursor-pointer  py-4"
          onClick={(e) => {
            e.preventDefault();
          }}
        >
          <img
            className="w-10 h-10 rounded-full border-2 border-solid border-green "
            src={teacher?.profileImage || "/img/profile-page.png"}
            alt="Post"
          />
          <div>
            <h4 className="m-0 font-medium text-lg hover:text-[#17b3a6]  uppercase text-[#565656]">
              {teacher?.firstName}
            </h4>
            <p className="m-0 p-0 text-sm">{timeAgo}</p>
          </div>
        </div>

        <div className="flex  gap-2">
          <Link to="/profile-page" className="">
            <button
              type="button"
              className="bg-[#17b3a6] hover:bg-blue-700 text-white font-bold py-2 px-2 rounded cursor-pointer"
            >
              {t("BACK")}
            </button>
          </Link>

        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        <div className="col-span-12  ">
          <div
            className="mb-4"
          />
          <div className="flex justify-between items-center">



            <h2
              dangerouslySetInnerHTML={{ __html: gig?.title ?? "" }}
            ></h2>
            <span className="bg-green font-bold p-2 rounded text-white">¥

              {
                gig?.price
              }
            </span>
          </div>
          {arrayImages?.map((img: string, index: number) => {
            if (arrayImages.length === 1) {
              return (
                <img
                  className="w-full h-[300px] xl:h-[600px] rounded-lg"
                  src={img}
                  alt="Blog Post Image"
                />
              );
            }
          })}
          <Slider {...settings}>
            {arrayImages?.map((img: string, index: number) => {
              if (arrayImages?.length === 1) {
                return;
              } else {
                return (
                  <div key={`multiple-${index}`}>
                    {" "}
                    {/* Ensure key is unique and at the top element */}
                    {hasImageExtension(img) ? (
                      <img
                        className="w-full h-[300px] xl:h-[600px] rounded-lg"
                        src={img}
                        alt="Blog Post Image"
                      />
                    ) : (
                      <video
                        controls
                        className="w-full h-[300px] xl:h-[600px] rounded-lg"
                        src={img}
                      />
                    )}
                  </div>
                );
              }
            })}
          </Slider>
          <div className="flex items-center justify-end mt-2">
          <svg className="w-4 h-4 text-yellow-300 ms-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
            <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
          </svg>
          <svg className="w-4 h-4 text-yellow-300 ms-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
            <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
          </svg>
          <svg className="w-4 h-4 text-yellow-300 ms-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
            <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
          </svg>
          <svg className="w-4 h-4 text-yellow-300 ms-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
            <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
          </svg>
          <svg className="w-4 h-4 ms-1 text-gray-300 dark:text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
            <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
          </svg>
          <p className="ml-1 text-[#949494]">4.5(20 reviews)</p>
        </div>
        </div>
        
        <div
          dangerouslySetInnerHTML={{ __html: gig?.description ?? "" }}
        ></div>



      </div>
      <div className="flex justify-end">
        <Link to="/message-page" className="">
          <button
            type="button"
            className="bg-[#17b3a6] hover:bg-blue-700 text-white font-bold py-2 px-2 rounded cursor-pointer"
          >
            {t("CHAT_WITH_TEACHER")}
          </button>
        </Link>
      </div>

    </div>
  );
};

export default GigDetails;
