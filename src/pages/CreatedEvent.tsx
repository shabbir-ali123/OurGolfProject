import React, { useEffect, useState } from 'react';
import { Cog6ToothIcon } from '@heroicons/react/24/solid';
import { CreatedEventPagination } from '../components/CreatedEventPagination';
import { API_ENDPOINTS } from '../appConfig';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { deleteEvent, fetchCreatedEvents } from '../utils/fetchEvents';
import { createdEventsStore } from '../contexts/eventContext';

interface Event {
    id: number;
    eventName: string;
    capacity: number;
    imageUrl:[];
    eventStartTime: string;
    eventStartDate: string;
    eventEndTime: string;
    eventEndDate: string;
    place: string;
    eventDetails: string;
    teamSize: string;
}

const tabs = ['live', 'upcoming', 'past'] as const;

const CreatedEvents: React.FC = () => {
    const { handleActiveTab, handleCurrentPage, activeTab, currentPage, totalPages, createdEvents} = createdEventsStore();

    console.log(createdEvents, 'CE')
    // const [events, setEvents] = useState<Event[]>([]);
    // const [activeTab, setActiveTab] = useState<typeof tabs[number]>('past');
    // const [currentPage, setCurrentPage] = useState<number>(1);
    // const [totalPages, setTotalPage] = useState<number>(1);
    const [showPopup, setShowPopup] = useState(false);
    const pageSize = 6; 
    const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
    const navigate = useNavigate();

    const handleTabClick = (tab: any) => {
        handleActiveTab(tab);
    };

    const handlePageChange = (newPage: number) => {
        handleCurrentPage(newPage);
    };
    const handleCogIconClick = (event: Event) => {
        setSelectedEvent(event);
        setShowPopup(true);
    };
 
    const handleEditTeam = (id:any, eventName:any, eventStartDate:any, place:any, eventDetails:any, teamSize:any, imageUrl:any) => {
        navigate(`/edit-team-page?id=${id}&eventName=${encodeURIComponent(eventName)}&eventStartDate=${encodeURIComponent(eventStartDate)}&eventLocation=${encodeURIComponent(place)}&eventDetails=${encodeURIComponent(eventDetails)}&teamSize=${encodeURIComponent(teamSize)}&imageUrl=${encodeURIComponent(imageUrl)}`);
        setShowPopup(false);
      };
  
    const handleCancelEvent = () => {
        setShowPopup(false);
    };

    const handleDeleteEvent = (id: any) => {
        deleteEvent(id);
      }

    // console.log({events})
    return (
        <div className=' max-w-7xl mx-auto flex  justify-center py-10 custom-box-shadow my-10'>
            <div >
                <h4>Created Events</h4>
                <div className="flex justify-start space-x-2 mb-4">
                    {tabs.map(tab => (
                        <button
                            key={tab}
                            onClick={() => handleTabClick(tab)}
                            className={`px-10 py-4 text-sm font-medium rounded-md transition-colors duration-300 ${activeTab === tab ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800 hover:bg-blue-400 hover:text-white'
                                }`}
                        >
                            {tab.charAt(0).toUpperCase() + tab.slice(1)}
                        </button>
                    ))}
                </div>
                <div className="overflow-x-auto">
                    <table className="min-w-full">
                        <thead>
                            <tr className='bg-[#fffff]'>
                                <th className="px-6 py-3 border-b border-gray-200 bg-[#054a51] text-left text-xs font-medium text-white uppercase tracking-wider">
                                    Event Name
                                </th>
                                <th className="px-6 py-3 border-b border-gray-200 bg-[#054a51] text-left text-xs font-medium text-white uppercase tracking-wider">
                                    Total Players
                                </th>
                                <th className="px-6 py-3 border-b border-gray-200 bg-[#054a51] text-left text-xs font-medium text-white uppercase tracking-wider">
                                    Start Time
                                </th>
                                <th className="px-6 py-3 border-b border-gray-200 bg-[#054a51] text-left text-xs font-medium text-white uppercase tracking-wider">
                                    Start Date
                                </th>
                                <th className="px-6 py-3 border-b border-gray-200 bg-[#054a51] text-left text-xs font-medium text-white uppercase tracking-wider">
                                    End Time
                                </th>
                                <th className="px-6 py-3 border-b border-gray-200 bg-[#054a51] text-left text-xs font-medium text-white uppercase tracking-wider">
                                    End Date
                                </th>
                                <th className="px-6 py-3 border-b border-gray-200 bg-[#054a51] text-left text-xs font-medium text-white uppercase tracking-wider">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="mt-2">
                            {createdEvents?.length === 0 ? (
                                <tr className='flex justify-center'>
                                    <td  className="text-center py-4">
                                        No event
                                    </td>
                                </tr>
                            ) : (
                                createdEvents?.map((event: any) => (
                                    <tr key={event.id} className="bg-white" style={{
                                        boxShadow: "rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset"
                                    }}>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 border-solid border-l border-r border-t border-b  border-[#e4e4e4]">{event.eventName}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 border-solid border-l border-r border-t border-b  border-[#e4e4e4]">{event.capacity}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 border-solid border-l border-r border-t border-b  border-[#e4e4e4]">{event.eventStartTime}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 border-solid border-l border-r border-t border-b  border-[#e4e4e4]">{event.eventStartDate}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 border-solid border-l border-r border-t border-b  border-[#e4e4e4]">{event.eventEndTime}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 border-solid border-l border-r border-t border-b  border-[#e4e4e4]">{event.eventEndDate}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 border-solid border-l border-r border-t border-b  border-[#e4e4e4] text-center">
                                            {/* <Cog6ToothIcon className="w-8 h-8 text-blue-500" onClick={() => handleCogIconClick(event)} /> */}
                                            <Link to={`/edit-team/${event.id}`}><Cog6ToothIcon className="w-8 h-8 text-blue-500" onClick={() => handleCogIconClick(event)} />
                                            </Link>
                                        <p onClick={() => handleDeleteEvent(event.id)}>Delete</p>
                                        <Link to={`/edit-event/${event.id}`}>Edit</Link>
                                        </td>
                                    </tr>
                              ))
                              )}
                         
                        </tbody>
                        {showPopup && selectedEvent && (
                            <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-50">
                                <div className="bg-white p-8 rounded-md">
                                    <h2 className="text-lg font-bold mb-4">Event Name <br /> {selectedEvent.eventName}</h2>
                                
                                    <button
                                        className="px-4 py-2 bg-blue-500 text-white mr-2"
                                        onClick={() => {
                                            if (selectedEvent) handleEditTeam(selectedEvent.id, selectedEvent.eventName, selectedEvent.eventStartDate, selectedEvent.place, selectedEvent.eventDetails, selectedEvent.teamSize, selectedEvent.imageUrl);


                                        }}
                                    >
                                        Edit Team
                                    </button>
                                
                                    <button
                                        className="px-4 py-2 bg-[red] text-white"
                                        onClick={handleCancelEvent}
                                    >
                                        Cancel
                                    </button>

                                </div>
                            </div>
                        )}
                    </table>
                </div>
                <CreatedEventPagination
                    currentPage={currentPage}
                    pageSize={pageSize}
                    totalEvents={totalPages}
                    onPageChange={handlePageChange}
                />
            </div>
        </div>

    );
};

export default CreatedEvents;
