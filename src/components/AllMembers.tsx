import React, { useState } from 'react';
import { singleTeamsContextStore } from '../contexts/teamContext';
const people = [
    {
      name: 'Lindsay Walton',
      title: 'Front-end Developer',
      department: 'Optimization',
      email: 'lindsay.walton@example.com',
      role: 'Member',
      image:
        'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
    {
        name: 'Lindsay Walton',
        title: 'Front-end Developer',
        department: 'Optimization',
        email: 'lindsay.walton@example.com',
        role: 'Member',
        image:
          'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      },
   
   
    
      {
        name: 'Lindsay Walton',
        title: 'Front-end Developer',
        department: 'Optimization',
        email: 'lindsay.walton@example.com',
        role: 'Member',
        image:
          'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      },
 
  ]
  
  export default function AllMembers() {
    const [visibleCount, setVisibleCount] = useState(5);
    const {waitingUsers, joinedUsers } = singleTeamsContextStore();
    const loadMore = () => {
        setVisibleCount((prevCount) => prevCount + 5);
      };
    return (
      <div className="px-4  mx-10 sm:px-6 lg:px-8 py-4 border border-solid border-[#b0d7fd] rounded-lg my-10">
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <h1 className="text-base font-semibold leading-6 text-gray-900">All Members</h1>
            <p className="mt-2 text-sm text-gray-700">
              A list of all the users in your account including their name, title, email and role.
            </p>
          </div>
   
        </div>
        <div className="mt-8 flow-root ">
          <div className="-mx-4 -my-2  sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
              <table className="min-w-full divide-y divide-gray-300 bg-transparent">
                <thead>
                  <tr>
                    <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">
                      Name
                    </th>
                 
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Status
                    </th>
                  
                 
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 ">
                {waitingUsers?.slice(0, visibleCount).map((person:any) => (
                    <tr key={person.email}>
                      <td className="whitespace-nowrap py-5 pl-4 pr-3 text-sm sm:pl-0">
                        <div className="flex items-center">
                          <div className="h-11 w-11 flex-shrink-0">
                            <img className="h-11 w-11 rounded-full" src={person.imageUrl} alt="" />
                          </div>
                          <div className="ml-4">
                            <div className="font-medium text-gray-900">{person.nickName}</div>
                            <div className="mt-1 text-gray-500">{person.email}</div>
                          </div>
                        </div>
                      </td>
                  
                      <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                        <span className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                          Waiting List
                        </span>
                      </td>
                  
                    
                    </tr>
                  ))}
                  {joinedUsers?.slice(0, visibleCount).map((person:any) => (
                    <tr key={person.email}>
                      <td className="whitespace-nowrap py-5 pl-4 pr-3 text-sm sm:pl-0">
                        <div className="flex items-center">
                          <div className="h-11 w-11 flex-shrink-0">
                            <img className="h-11 w-11 rounded-full" src={person.imageUrl} alt="" />
                          </div>
                          <div className="ml-4">
                            <div className="font-medium text-gray-900">{person.nickName}</div>
                            <div className="mt-1 text-gray-500">{person.email}</div>
                          </div>
                        </div>
                      </td>
                  
                      <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                        <span className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                          Joined
                        </span>
                      </td>
                  
                    
                    </tr>
                  ))}
                </tbody>
                
              </table>
            </div>
          </div>
        </div>
        {visibleCount < people.length && (
        <div className="flex justify-center mt-4">
          <button onClick={loadMore} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Load More
          </button>
        </div>
      )}
      </div>
    )
  }
  