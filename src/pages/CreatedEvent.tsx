import React, { useState } from 'react';
import { Cog6ToothIcon } from '@heroicons/react/24/solid';
import { CreatedEventPagination } from '../components/CreatedEventPagination';
interface Event {
    id: number;
    name: string;
    totalPlayers: number;
    startTime: string;
    startDate: string;
    endTime: string;
    endDate: string;
    setting: 'ongoing' | 'upcoming' | 'past';
}

const dummyEvents: Event[] = [
   
    {
        id: 1,
        name: 'Zozo Championship',
        totalPlayers: 25,
        startTime: '12:00 PM',
        startDate: 'Nov 13, SUN',
        endTime: '12:00 PM',
        endDate: 'Nov 13, SUN',
        setting: 'ongoing',
    },
   
    {
        id: 2,
        name: 'Zozo Championship 2',
        totalPlayers: 26,
        startTime: '12:00 PM',
        startDate: 'Nov 13, SUN',
        endTime: '12:00 PM',
        endDate: 'Nov 13, SUN',
        setting: 'ongoing',
    },
    {
        id: 1,
        name: 'Zozo Championship 3',
        totalPlayers: 25,
        startTime: '12:00 PM',
        startDate: 'Nov 13, SUN',
        endTime: '12:00 PM',
        endDate: 'Nov 13, SUN',
        setting: 'ongoing',
    },
   
    {
        id: 2,
        name: 'Zozo Championship 4',
        totalPlayers: 26,
        startTime: '12:00 PM',
        startDate: 'Nov 13, SUN',
        endTime: '12:00 PM',
        endDate: 'Nov 13, SUN',
        setting: 'ongoing',
    },
    {
        id: 1,
        name: 'Zozo Championship',
        totalPlayers: 27,
        startTime: '12:00 PM',
        startDate: 'Nov 13, SUN',
        endTime: '12:00 PM',
        endDate: 'Nov 13, SUN',
        setting: 'upcoming',
    },
   
    {
        id: 2,
        name: 'Zozo Championship 2',
        totalPlayers: 28,
        startTime: '12:00 PM',
        startDate: 'Nov 13, SUN',
        endTime: '12:00 PM',
        endDate: 'Nov 13, SUN',
        setting: 'upcoming',
    },
    {
        id: 1,
        name: 'Zozo Championship 3',
        totalPlayers: 27,
        startTime: '12:00 PM',
        startDate: 'Nov 13, SUN',
        endTime: '12:00 PM',
        endDate: 'Nov 13, SUN',
        setting: 'upcoming',
    },
   
    {
        id: 2,
        name: 'Zozo Championship 4',
        totalPlayers: 28,
        startTime: '12:00 PM',
        startDate: 'Nov 13, SUN',
        endTime: '12:00 PM',
        endDate: 'Nov 13, SUN',
        setting: 'upcoming',
    },
    {
        id: 1,
        name: 'Zozo Championship ',
        totalPlayers: 29,
        startTime: '12:00 PM',
        startDate: 'Nov 13, SUN',
        endTime: '12:00 PM',
        endDate: 'Nov 13, SUN',
        setting: 'past',
    },
   
    {
        id: 2,
        name: 'Zozo Championship 2',
        totalPlayers: 30,
        startTime: '12:00 PM',
        startDate: 'Nov 13, SUN',
        endTime: '12:00 PM',
        endDate: 'Nov 13, SUN',
        setting: 'past',
    },
    {
        id: 1,
        name: 'Zozo Championship 3',
        totalPlayers: 29,
        startTime: '12:00 PM',
        startDate: 'Nov 13, SUN',
        endTime: '12:00 PM',
        endDate: 'Nov 13, SUN',
        setting: 'past',
    },
   
    {
        id: 2,
        name: 'Zozo Championship 4',
        totalPlayers: 30,
        startTime: '12:00 PM',
        startDate: 'Nov 13, SUN',
        endTime: '12:00 PM',
        endDate: 'Nov 13, SUN',
        setting: 'past',
    },
];

const tabs = ['ongoing', 'upcoming', 'past'] as const;

const EventsComponent: React.FC = () => {
    const [events] = useState<Event[]>(dummyEvents);
    const [activeTab, setActiveTab] = useState<typeof tabs[number]>('ongoing');

    const filteredEvents = events.filter(event => event.setting === activeTab);

    return (
        <div className=' max-w-7xl mx-auto flex  justify-center py-10 custom-box-shadow my-10'>
            <div >
                <h4>Created Events</h4>
                <div className="flex justify-start space-x-2 mb-4">
                    {tabs.map(tab => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
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
                                    Setting
                                </th>
                            </tr>
                        </thead>
                        <tbody className='mt-2'>
                            {filteredEvents.map(event => (
                                <tr key={event.id} className="bg-white  " style={{
                                    boxShadow: "rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset"
                                  }}>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 border-solid border-l border-r border-t border-b  border-[#e4e4e4]">{event.name}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 border-solid border-l border-r border-t border-b  border-[#e4e4e4]">{event.totalPlayers}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 border-solid border-l border-r border-t border-b  border-[#e4e4e4]">{event.startTime}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 border-solid border-l border-r border-t border-b  border-[#e4e4e4]">{event.startDate}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 border-solid border-l border-r border-t border-b  border-[#e4e4e4]">{event.endTime}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 border-solid border-l border-r border-t border-b  border-[#e4e4e4]">{event.endDate}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 border-solid border-l border-r border-t border-b  border-[#e4e4e4] text-center">

                                    <Cog6ToothIcon className="w-8 h-8 text-blue-500" />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <CreatedEventPagination/>
            </div>
        </div>

    );
};

export default EventsComponent;
