import React, { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { API_ENDPOINTS } from '../appConfig';
import { singleEventContextStore } from '../contexts/eventContext';
import { updateCeremonyDetails } from '../utils/fetchEvents';
import { toast } from 'react-toastify';
import EventEditModal from '../components/EventCeremonyModal'; 

const EventDetailsCeremony: React.FC = () => {
    const [eventInfo, setEventInfo] = useState<string>('');
    const [removedMediaUrls, setRemovedMediaUrls] = useState<string[]>([]);
    const [files, setFiles] = useState<File[]>([]);
    const [message, setMessage] = useState<string>('');
    const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false); 
    const { eventCeremony,handleLoading,loading } = singleEventContextStore();
    const [singleEventC, setsingleEventC] = useState<any>();
    useEffect(() => {
        if (eventCeremony) {
            setEventInfo(eventCeremony[0]?.eventInfo || '');
        }
    }, [eventCeremony]);



const handleEventCeremony = useCallback(
    (value: any) => {
      return setsingleEventC(value);
    },
    [singleEventC]
  );
    const openModal= (id:any) => {
        console.log(id,"yess")
        eventCeremony.map((item:any)=>{
            
                if(item.id == id){
                    setsingleEventC({
                        item
                    })
                }

        })
        console.log(singleEventC,"helloooo")
        setIsModalOpen(true)
    }
    const closeModal = () => setIsModalOpen(false);
   
    return (
        <div className="max-w-6xl mx-auto p-4 bg-white rounded-lg shadow-lg">
            <h2 className="text-xl font-bold mb-4">Event Memories</h2>
            <Slider
                dots={true}
                infinite={true}
                speed={500}
                slidesToShow={1}
                slidesToScroll={1}
                className="mb-8"
                arrows={true}
            >
                {eventCeremony?.map((item: any) => {
                    const parsedArray = JSON.parse(item.ceremonyImages);
                    return (
                        <div key={item.eventId} className="relative">
                            <p className="text-gray-700 mb-4 capitalize text-sm md:text-base">{item.eventInfo}</p>
                            {parsedArray.length > 1 ? (
                                <Slider
                                    dots={true}
                                    infinite={true}
                                    speed={500}
                                    slidesToShow={1}
                                    slidesToScroll={1}
                                    className="mb-8"
                                >
                                    {parsedArray.map((image: any, index: any) => (
                                        <div key={index} className="relative">
                                            <img src={image} alt={`Event image ${index + 1}`} className="w-full object-cover h-[300px] md:h-[500px] rounded-lg" />
                                        
                                        </div>
                                    ))}
                                </Slider>
                            ) : (
                                parsedArray.map((image: any, index: any) => (
                                    <div key={index}>
                                        <img src={image} alt={`Event image ${index + 1}`} className="w-full object-cover max-h-[300px] md:max-h-[500px] rounded-lg" />
                                    </div>
                                ))
                            )}

                            <button
                                onClick={()=>{
                                    openModal(item.id)
                                }}
                                className="px-4 py-2 bg-blue-500 text-white rounded-md text-sm md:text-base"
                            >
                                Edit Event
                            </button>
                        </div>
                    );
                })}
            </Slider>


            {isModalOpen && (
                <EventEditModal
                    event={singleEventC}
                    handleLoading={handleLoading}
                    closeModal={closeModal}
                />
            )}
        </div>
    );
};

export default EventDetailsCeremony;
