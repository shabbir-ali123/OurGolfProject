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
import { FlexitySlider } from './sliders/FlickitySlider';

const EventDetailsCeremony: React.FC = () => {

    const [isModalOpen, setIsModalOpen] = useState(false);
    const { isCreated, eventCeremony, handleLoading, loading } = singleEventContextStore();
    const [singleEventC, setsingleEventC] = useState<any>();




    const openModal = (id: any) => {
        console.log(id, "yess")
        eventCeremony.map((item: any) => {

            if (item.id == id) {
                setsingleEventC({
                    item
                })
            }

        })
        console.log(singleEventC, "helloooo")
        setIsModalOpen(true)
    }
    const closeModal = useCallback((value: any) => {
        return setIsModalOpen(value);
    }, [isModalOpen]);

    return (
        <div className="max-w-6xl mx-auto p-4 bg-white rounded-lg shadow-lg">
            <h2 className="text-xl font-bold mb-4">Event Memories</h2>
            <FlexitySlider>


                {eventCeremony?.map((item: any) => {
                    console.log(item, "Event item details"); // Check the structure of item
                    const parsedArray = JSON.parse(item.ceremonyImages);

                    return (
                        <div key={item.eventId} className="relative">
                            {/* Ensure correct access to eventInfo */}
                            <p className="text-gray-700 mb-4 capitalize text-sm md:text-base">
                                {item.eventInfo || "No event info available"}
                            </p>
                            {parsedArray.length === 1 ? (
                                parsedArray.map((image: any, index: any) => (
                                    <div key={index}>
                                        <img
                                            src={image}
                                            alt={`Event image ${index}`}
                                            className="w-full object-cover max-h-[300px] md:max-h-[500px] rounded-lg"
                                        />
                                    </div>
                                ))
                            ) : (
                                parsedArray.map((image: any, index: any) => (
                                    <div key={index} className="relative">
                                        <img
                                            src={image}
                                            alt={`Event image ${index + 1}`}
                                            className="w-full object-cover h-[300px] md:h-[500px] rounded-lg"
                                        />
                                    </div>
                                ))
                            )}
                            {isCreated ? (
                                <button
                                    onClick={() => openModal(item.id)}
                                    className="px-4 py-2 my-4 bg-blue-500 text-white rounded-md text-sm md:text-base"
                                >
                                    Edit Event
                                </button>
                            ) : (
                                ""
                            )}
                        </div>
                    );
                })}



            </FlexitySlider>


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
