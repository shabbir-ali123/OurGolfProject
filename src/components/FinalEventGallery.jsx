import React, { useRef } from 'react';
import Flickity from "react-flickity-component";
import 'flickity/css/flickity.css';
import "flickity-as-nav-for";
import { singleEventContextStore } from '../contexts/eventContext';
import { useTranslation } from "react-i18next";
    export const FinalEventGallery = ({ children}) => {
        const { t, i18n } = useTranslation();
    const mainCarouselRef = useRef();
    const navCarouselRef = useRef();
    const { singleEvent } = singleEventContextStore();

    return (
        <div className=" max-w-5xl mx-6 xl:mx-auto mt-10">
            <h4>{t("ABOUT_THE_EVENT")}</h4>
            <p>{t("EVENT_BELOW")}</p>
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

