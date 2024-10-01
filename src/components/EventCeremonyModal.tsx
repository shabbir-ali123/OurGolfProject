import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { updateCeremonyDetails } from '../utils/fetchEvents';

interface EventEditModalProps {
    event: any;
    closeModal: any;
    handleLoading: any;
}

const EventEditModal: React.FC<EventEditModalProps> = ({ event, closeModal, handleLoading }) => {
    const [formdata, setFormdata] = useState<any>({
        removedMediaUrls: "",
        eventId: "",
        id: "",
        eventInfo: "",
        mediaFiles: ""
    });
    const [message, setMessage] = useState<string>('');

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { files } = e.target;
        if (files) {
            setFormdata((prev: any) => ({
                ...prev,
                mediaFiles: files
            }));
        }
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();

        updateCeremonyDetails(formdata, handleLoading, closeModal);
    };

    const handleDelete = async (e: React.FormEvent, removedMediaUrls: any) => {
        setFormdata((prev: any) => ({
            ...prev,
            removedMediaUrls
        }));
        if (formdata.removedMediaUrls) {
            updateCeremonyDetails(formdata, handleLoading, closeModal);
        }
    };

    useEffect(() => {
        if (event?.item) {
            setFormdata({
                eventId: event.item.eventId || "",
                eventInfo: event.item.eventInfo || "",
                mediaFiles: "",
                id: event.item.id || "",
                removedMediaUrls: ''
            });
        }
    }, [event]);

    const handleInput = (e: any) => {
        const { name, value } = e.target;

        setFormdata((prev: any) => ({
            ...prev,
            eventInfo: value
        }));
    };

    if (!event?.item) {
        return null; // Or a loading spinner/message, if needed
    }

    return (
        <div className="fixed inset-0 flex items-center justify-center p-4 bg-gray-500 bg-opacity-50 backdrop-blur-sm">
            <div className="w-full max-w-xl p-6 bg-white rounded-lg shadow-lg relative">
                <button
                    onClick={() => {
                        closeModal(false);
                    }}
                    className="absolute top-2 right-2 text-gray-500"
                >
                    X
                </button>
                <h2 className="text-xl font-bold mb-4">Edit Event</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="eventInfo" className="block text-gray-700">Event Information:</label>
                        <textarea
                            id="eventInfo"
                            value={formdata.eventInfo}
                            name="eventInfo"
                            onChange={handleInput}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="fileInput" className="block text-gray-700">Upload New Files:</label>
                        <input
                            id="fileInput"
                            type="file"
                            multiple
                            onChange={handleFileChange}
                            className="mt-1 block"
                        />
                    </div>

                    <div className="mb-4">
                        <p className="text-gray-700">Current Images:</p>
                        <div className="flex flex-wrap gap-2 mt-2">
                            {event.item.ceremonyImages && JSON.parse(event.item.ceremonyImages).map((image: string, index: number) => (
                                <div key={index} className="relative">
                                    <img src={image} alt={`Event image ${index + 1}`} className="w-32 h-32 object-cover rounded-lg" />
                                    <button
                                        onClick={(e) => handleDelete(e, image)}
                                        className="absolute top-0 right-0 bg-red-500 text-white px-2 py-1 rounded-full"
                                    >
                                        X
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="px-4 py-2 bg-blue-500 text-white rounded-md"
                    >
                        Update Ceremony Details
                    </button>
                    {message && <p className="mt-4 text-green-500">{message}</p>}
                </form>
            </div>
        </div>
    );
};

export default EventEditModal;
