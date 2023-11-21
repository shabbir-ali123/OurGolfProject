// TeacherTabs.tsx
import React from 'react';
import { Link, useNavigate } from "react-router-dom";
interface TeacherTabsProps {
  selectedTab: 'teacher' | 'student';
  onSelectTab: (tab: 'teacher' | 'student') => void;
}

const TeacherTabs: React.FC<TeacherTabsProps> = ({ selectedTab, onSelectTab }) => {
  return (
    <div>
        <div className="hidden lg:flex lg:flex-1 lg:justify-center">
          <Link to="#" className="group block flex-shrink-0">
            <div className="text-center">
              <div>
                <img
                  className="inline-block h-40 w-40  border-2 border-green-500 rounded-full "
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                  alt=""
                />
              </div>
              <div className="ml-3">
                <p className="text-base font-medium text-white group-hover:text-gray-900 m-0">
                JOHN MILER
                </p>
              
              </div>
            </div>
          </Link>
        </div>
        <div className='flex justify-center'>
        <button
        className={`px-4 py-2 rounded-l-md ${selectedTab === 'teacher' ? 'bg-[#52FF86] text-white' : 'bg-gray-300'}`}
        onClick={() => onSelectTab('teacher')}
      >
        Teacher
      </button>
      <button
        className={`px-4 py-2 rounded-r-md ${selectedTab === 'student' ? 'bg-blue-500 text-white' : 'bg-gray-300'}`}
        onClick={() => onSelectTab('student')}
      >
        Student
      </button>
        </div>
     
    </div>
  );
};

export default TeacherTabs;
