import React, { useRef } from 'react';
import Flickity from "react-flickity-component";
import 'flickity/css/flickity.css';
import "flickity-as-nav-for";
import { singleEventContextStore } from '../contexts/eventContext';

    export const FinalEventGallery = ({ children}) => {

    const mainCarouselRef = useRef();
    const navCarouselRef = useRef();
    const { singleEvent } = singleEventContextStore();

    return (
        <div className=" max-w-5xl mx-6 xl:mx-auto mt-10">
            <h4>Event Gallery</h4>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum expedita dolorum iste officiis impedit fugiat enim tempore hic quas modi!</p>
            <Flickity
                className="carousel-main2 mb-6 "
                options={{
                    accessibility: false,
                    prevNextButtons: false,
                    contain: true,
                    pageDots: false,
                }}
                ref={mainCarouselRef}
            >

                <div></div>
                {children[0]}
            </Flickity>

            <Flickity
                className="carousel-nav"
                options={{
                    asNavFor: '.carousel-main2',
                    contain: true,
                    pageDots: false,
                }}
                ref={navCarouselRef}
            >
                <div></div>
                {children[1]}

            </Flickity>
        </div>
    );
}

