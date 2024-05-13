// RecommendedTeachers.tsx
import React, { useEffect, useState } from 'react';
import HomeTeacher from './HomeTeacher'; 
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./home.css"
import { useTranslation } from "react-i18next";
import { Link } from 'react-router-dom';
import { teacherContext } from '../../contexts/teachersContext';
const RecommendedTeachers: React.FC = () => {
  const { t } = useTranslation();

  const {teachers} = teacherContext()
  const [displayedTeachers, setDisplayedTeachers] = useState([]);
  useEffect(() => {
    if (teachers && teachers.length > 0) {
      setDisplayedTeachers(shuffleArray(teachers).slice(0, 4));
    }
  }, [teachers]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (teachers && teachers.length > 0) {
        setDisplayedTeachers(shuffleArray(teachers).slice(0, 4));
      }
    }, 600000); // 600000 ms = 10 minutes

    return () => clearInterval(interval);
  }, [teachers]);
  const shuffleArray = (array:any) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };
    //     {
    //         imageUrl: "/img/teacher1.png",
    //         name: "Taki Najal",
    //         description: "Lorem Ipsum is simply highd dummy text of the print and types text of the erdt and s printing and types. Text of the erdt and s printing and types erdssd"
    //     },
    //     {
    //         imageUrl: "/img/teacher2.png",
    //         name: "Joshika Nain",
    //         description: "Lorem Ipsum is simply highd dummy text of the print and types text of the erdt and s printing and types. Text of the erdt and s printing and types erdssd"
    //     },
    //     {
    //         imageUrl: "/img/teacher1.png",
    //         name: "Emma Wilson",
    //         description: "Lorem Ipsum is simply highd dummy text of the print and types text of the erdt and s printing and types. Text of the erdt and s printing and types erdssd"
    //     },
    //     {
    //         imageUrl: "/img/teacher2.png",
    //         name: "Oliver Brown",
    //         description: "Lorem Ipsum is simply highd dummy text of the print and types text of the erdt and s printing and types. Text of the erdt and s printing and types erdssd"
    //     },
    //     {
    //         imageUrl: "/img/teacher1.png",
    //         name: "Oliver Brown",
    //         description: "Lorem Ipsum is simply highd dummy text of the print and types text of the erdt and s printing and types. Text of the erdt and s printing and types erdssd"
    //     }
    // ];
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
        <div className=" px-4 py-10 xl:py-20 bg-[#17B3A6]">
            <div>
                <img src="/img/arrowss.png" width="230px" className='absolute right-[66%]' alt="" />
            </div>
            <Link to="/all-teachers">
            <h2 className="cursor-pointer text-center text-2xl font-bold my-8 text-white bg-[#17B3A6] shadow-lg max-w-2xl py-4  border-2 border-white border-solid mx-auto">{t("RECOMMENDED_TEACHER")}</h2>
            </Link>
            
           
            <Slider {...settings} className='mx-2 xl:mx-20'>
            {displayedTeachers.map((teacher:any, index:any) => (
                <HomeTeacher key={index} imageUrl={teacher.imageUrl} name={teacher.firstName} description={teacher.aboutMyself} />
            ))}
                </Slider>
            </div>
      
    );
};

export default RecommendedTeachers;
