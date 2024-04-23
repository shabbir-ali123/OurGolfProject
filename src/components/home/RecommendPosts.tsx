// RecommendedPosts.tsx
import React from 'react';
import HomeTeacher from './HomeTeacher'; 
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./home.css"
import TopLikes from './TopLikes';
import TopComments from './TopComments';
const RecommendedPosts: React.FC = () => {
    const likes = [
        {
            imageUrl: "/img/second-image.jpg",
            name: "Hil Golf Event",
            description: "Lorem Ipsum is simply highd dummy text of the print and types text of the erdt and s printing and types. Text of the erdt and s printing and types erdssd"
        },
        {
            imageUrl: "/img/third.jpg",
            name: "Joshika Nain",
            description: "Lorem Ipsum is simply highd dummy text of the print and types text of the erdt and s printing and types. Text of the erdt and s printing and types erdssd"
        },
        {
            imageUrl: "/img/second-image.jpg",
            name: "Hil Golf Event",
            description: "Lorem Ipsum is simply highd dummy text of the print and types text of the erdt and s printing and types. Text of the erdt and s printing and types erdssd"
        },
        {
            imageUrl: "/img/third.jpg",
            name: "Joshika Nain",
            description: "Lorem Ipsum is simply highd dummy text of the print and types text of the erdt and s printing and types. Text of the erdt and s printing and types erdssd"
        },
        {
            imageUrl: "/img/teacher1.png",
            name: "Oliver Brown",
            description: "Lorem Ipsum is simply highd dummy text of the print and types text of the erdt and s printing and types. Text of the erdt and s printing and types erdssd"
        }
    ];
    const comments = [
        {
            imageUrl: "/img/teacher1.png",
            name: "Top Player",
            description: "Lorem Ipsum is simply highd dummy text of the print and types text of the erdt and s printing and types. Text of the erdt and s printing and types erdssd"
        },
        {
            imageUrl: "/img/teacher2.png",
            name: "Joshika Nain",
            description: "Lorem Ipsum is simply highd dummy text of the print and types text of the erdt and s printing and types. Text of the erdt and s printing and types erdssd"
        },
        {
            imageUrl: "/img/second-image.jpg",
            name: "Top Player",
            description: "Lorem Ipsum is simply highd dummy text of the print and types text of the erdt and s printing and types. Text of the erdt and s printing and types erdssd"
        },
        {
            imageUrl: "/img/third.jpg",
            name: "Joshika Nain",
            description: "Lorem Ipsum is simply highd dummy text of the print and types text of the erdt and s printing and types. Text of the erdt and s printing and types erdssd"
        },
        {
            imageUrl: "/img/teacher1.png",
            name: "Oliver Brown",
            description: "Lorem Ipsum is simply highd dummy text of the print and types text of the erdt and s printing and types. Text of the erdt and s printing and types erdssd"
        }
    ];
    const settings = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 4,
        responsive: [
            {
              breakpoint: 1024,
              settings: {
                slidesToShow: 3,
                slidesToScroll: 3,
              }
            },
            {
              breakpoint: 600,
              settings: {
                slidesToShow: 1,
                slidesToScroll: 2,
              }
            },
            {
              breakpoint: 480,
              settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
              }
            }
          ]
    };
    return (
        <div>
             <div>
                <img src="/img/colorarrow.png" width="230px" className='absolute right-[66%]' alt="" />
            </div>
            <h2 className="text-center text-2xl font-bold my-8 text-white bg-[#17B3A6] shadow-lg max-w-2xl py-4  border-2 border-white border-solid mx-4 xl:mx-auto">News are always posted in here.</h2>
            <div className=" px-4 py-10 xl:py-20 "style={{ 
            backgroundImage: "url('/img/shape.png')",
            backgroundSize: 'cover', 
            // Center the background image
          }}>
            <div>
            <h3 className='text-[24px] font-semibold text-[#17B3A6] ml-8 xl:ml-24 xl:pt-20 pt-10'>Top Liked Posts</h3>
           
           <Slider {...settings} className='mx-2 xl:mx-20'>
               {likes.map((teacher, index) => (
                   <TopLikes key={index} imageUrl={teacher.imageUrl} name={teacher.name} description={teacher.description} />
               ))}
               </Slider>
            </div>
            <div>
            <h3 className='text-[24px] font-semibold text-[#17B3A6] ml-8 xl:ml-24 xl:pt-20 pt-10'>Top Commented Posts</h3>
           
           <Slider {...settings} className='mx-2 xl:mx-20'>
               {comments.map((teacher, index) => (
                   <TopComments key={index} imageUrl={teacher.imageUrl} name={teacher.name} description={teacher.description} />
               ))}
               </Slider>
            </div>
            </div>
        </div>
      
      
    );
};

export default RecommendedPosts;