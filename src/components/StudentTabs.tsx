
import React from 'react';
import { Link } from 'react-router-dom';

interface StudentTabsProps {
  selectedTab: 'student' | 'teacher';
  onSelectTab: (tab: 'student' | 'teacher') => void;
  showTabs?: boolean;
  profilePic: string;
  name: string;
  description: string; // Corrected the prop name
}

const StudentTabs: React.FC<StudentTabsProps> = ({
  selectedTab,
  onSelectTab,
  showTabs = true,
  profilePic,
  name,
  description,
}) => {
  return (
    <div>
      <div className="lg:flex lg:flex-1 lg:justify-center">
        <div className=" block flex-shrink-0">
          <div className="text-center">
            <div className="">
              <img
                className="inline-block h-24 w-24 rounded-full border-solid border-[4px] border-[#51ff85]"
                src={profilePic}
                alt=""
              />
            </div>
            <div className="py-3">
              <p className="text-black font-sans font-bold text-base group-hover:text-gray-900 m-0">
                {name}
              </p>
              <p className="text-gray-700 font-sans text-xs font-normal">{description}</p>
            </div>
          </div>
        </div>
      </div>
      {showTabs && (
        <div className="flex justify-center">
          <Link to="/student-page" className='list-none no-underline'>
          <button
            className={`px-4 py-1 rounded-l-md cursor-pointer ${
              selectedTab === 'student' ? 'bg-[#52FF86] text-white' : 'border-solid border-2 border-[#51ff85]'
            }`}
            onClick={() => onSelectTab('student')}
          >
            Student
          </button>
          </Link>
          
          <Link to="/teacher-page" className='list-none no-underline text-black'>
          <button
            className={`px-4 py-1 rounded-r-md cursor-pointer ${
              selectedTab === 'teacher' ? 'bg-[#52FF86] text-white' : 'border-solid border-2 border-[#51ff85]'
            }`}
            onClick={() => onSelectTab('teacher')}
          >
            Teacher
          </button>
          </Link>
          
          
        </div>
      )}
    </div>
  );
};

export default StudentTabs;
