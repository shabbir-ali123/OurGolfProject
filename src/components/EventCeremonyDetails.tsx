import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { API_ENDPOINTS } from '../appConfig';
import { singleEventContextStore } from '../contexts/eventContext';




const EventDetailsCeremone: React.FC = ({ }) => {

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const { eventCeremony } = singleEventContextStore()


    return (
        <div className="max-w-6xl mx-auto p-4 bg-white rounded-lg shadow-lg">
<h2>Event Memories</h2>
            <>
                <Slider
                    dots={true}
                    infinite={true}
                    speed={500}
                    slidesToShow={1}
                    slidesToScroll={1}
                    className="mb-8"
                    arrows={true}
                >
                    {

                        eventCeremony?.map((item: any) => {
                            const parsedArray = JSON.parse(item.ceremonyImages);
                            return <div>
                                <p className="text-gray-700 mb-4 capitalize">{item.eventInfo}</p>
                                {
                                    parsedArray.length > 1 ? <Slider
                                    dots={true}
                                    infinite={true}
                                    speed={500}
                                    slidesToShow={1}
                                    slidesToScroll={1}
                                    className="mb-8"
                                >
                                    {parsedArray?.map((image: any, index: any) => (
                                        <img src={image} alt={`Event image ${index + 1}`} className="w-full object-fit h-[500px]  rounded-lg" />
                                    ))}
                                </Slider> :
                                 parsedArray?.map((image: any, index: any) => (
                                    <img  src={image} alt={`Event image ${index + 1}`} className="w-full object-fit max-h-[500px] rounded-lg" />
                                ))}
                                
                            </div>
                        }

                        )
                    }


                </Slider>

            </>

        </div>
    );
};

export default EventDetailsCeremone;
