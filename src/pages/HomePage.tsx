
import React, { useState } from "react";
import HeroSection from "../components/home/HeroSection";
import HomeCardSec from "../components/home/HomeCardSec";
import RecommendedTeachers from "../components/home/RecommendTeac";
import RecommendEvent from "../components/home/RecommendEvent"
import RecommendedPosts from "../components/home/RecommendPosts";
import { PostContext } from "../contexts/postsContext";

const HomePage: React.FC = () => {

    return (
        <div className="bg-white">
            <HeroSection videoSrc="/video/video.mp4" />
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 gap-4">

                <HomeCardSec />

            </div>
            <RecommendedTeachers/>
            <RecommendEvent/>
            <PostContext>
            <RecommendedPosts/>
            </PostContext>
           
        </div>

    );
};

export default HomePage;
