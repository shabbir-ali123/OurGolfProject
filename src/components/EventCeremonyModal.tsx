import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { updateCeremonyDetails } from '../utils/fetchEvents';

interface EventEditModalProps {
    event: any;
    closeModal: () => void;
}

const EventEditModal: React.FC<EventEditModalProps> = ({ event, closeModal }) => {
    const [eventInfo, setEventInfo] = useState(event.item.eventInfo || '');
    const [removedMediaUrls, setRemovedMediaUrls] = useState<any>({});
    const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
    const [message, setMessage] = useState<string>('');
   console.log(event,"noooo")
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setSelectedFiles(Array.from(e.target.files));
        }
    };

    const handleRemoveImage = (removedMediaUrls: string ,eventId:any) => {
        setRemovedMediaUrls({ removedMediaUrls ,eventId, eventInfo});
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const token = localStorage.getItem('token');
        if (!token) {
            toast.error('User not authenticated');
            return;
        }

        try {
            await updateCeremonyDetails(
           
                removedMediaUrls,
                event.item.id, 
                token,
                setMessage
            );
            toast.success('Ceremony details updated successfully');
            closeModal();
        } catch (error) {
            toast.error('An error occurred. Please try again.');
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center p-4 bg-gray-500 bg-opacity-50 backdrop-blur-sm">
            <div className="w-full max-w-xl p-6 bg-white rounded-lg shadow-lg relative">
                <button
                    onClick={closeModal}
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
                            value={eventInfo}
                            onChange={(e) => setEventInfo(e.target.value)}
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
                                        onClick={() => handleRemoveImage(image, event.item.eventId)}
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
