import React, { useRef } from 'react';
import Flickity from "react-flickity-component";
import 'flickity/css/flickity.css';
import "flickity-as-nav-for";

function FinalEventGallery() {
    const mainCarouselRef = useRef();
    const navCarouselRef = useRef();

    return (
        <div className="     mt-10">
            <h4>Event Gallery</h4>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum expedita dolorum iste officiis impedit fugiat enim tempore hic quas modi!</p>
            <Flickity
                className="carousel-main2 mb-6 "
                options={{
                    accessibility: false,
                    prevNextButtons: false,
                    contain: false,
                    pageDots: false,
                }}
                ref={mainCarouselRef}
            >
                {/* Main carousel images */}
                <div className="carousel-cell"><img height="100%" width="100%" className='object-fit' src="/img/BG-GOLF.jpg" alt="Description" /></div>
                <div className="carousel-cell"><img height="100%" width="100%" className='object-fit' src="/img/second-image.jpg" alt="Description" /></div>
                <div className="carousel-cell"><img height="100%" width="100%" className='object-fit' src="/img/third.jpg" alt="Description" /></div>
                <div className="carousel-cell"><img height="100%" width="100%" className='object-fit' src="/img/BG-GOLF.jpg" alt="Description" /></div>
                <div className="carousel-cell"><img height="100%" width="100%" className='object-fit' src="/img/tournament.png" alt="Description" /></div>
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
                {/* Navigation carousel images */}
                <div className="carousel-cell-1"><img height="100%" width="100%" className='object-cover' src="/img/BG-GOLF.jpg" alt="Thumbnail" /></div>
                <div className="carousel-cell-1"><img height="100%" width="100%" className='object-cover' src="/img/second-image.jpg" alt="Thumbnail" /></div>
                <div className="carousel-cell-1"><img height="100%" width="100%" className='object-cover' src="/img/third.jpg" alt="Thumbnail" /></div>
                <div className="carousel-cell-1"><img height="100%" width="100%" className='object-cover' src="/img/BG-GOLF.jpg" alt="Thumbnail" /></div>
                <div className="carousel-cell-1"><img height="100%" width="100%" className='object-cover' src="/img/tournament.png" alt="Thumbnail" /></div>
            </Flickity>
        </div>
    );
}

export default FinalEventGallery;
