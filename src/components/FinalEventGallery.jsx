import React, { useEffect, useRef } from 'react';
import Flickity from "react-flickity-component";
import 'flickity/css/flickity.css';
import "flickity-as-nav-for";

function FinalEventGallery() {
    const mainCarouselRef = useRef();
    const navCarouselRef = useRef();



    return (
        <div className="w-[1200px]">
            <Flickity className="carousel-main2 mb-6" options={{
                accessibility: false,prevNextButtons: false, contain: false,
                pageDots: false
            }}>
                <div class="carousel-cell" />
                <div class="carousel-cell" />
                <div class="carousel-cell" />
                <div class="carousel-cell" />
                <div class="carousel-cell" />


            </Flickity>
            <Flickity
                className="carousel-nav"
                options={{
                    asNavFor: ".carousel-main2",
                    contain: true,
                    pageDots: false
                }}
            >


                <div class="carousel-cell-1" />
                <div class="carousel-cell-1" />
                <div class="carousel-cell-1" />
                <div class="carousel-cell-1" />
                <div class="carousel-cell-1" />

            </Flickity>


        </div>
    );
}

export default FinalEventGallery;