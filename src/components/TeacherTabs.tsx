
import React from 'react';
import { Link } from 'react-router-dom';

interface TeacherTabsProps {
  selectedTab: 'student' | 'teacher';
  onSelectTab: (tab: 'student' | 'teacher') => void;
  showTabs?: boolean;
  profilePic: string; 
  name: string; 
  discription: string;
}

const TeacherTabs: React.FC<TeacherTabsProps> = ({
  selectedTab,
  onSelectTab,
  showTabs = true,
  profilePic,
  name,
  discription,
}) => {
  return (
    <div>
      <div className="lg:flex lg:flex-1 lg:justify-center">
        <Link to="#" className="group block flex-shrink-0">
          <div className="text-center">
            <div className="">
              <img
                className="inline-block h-40 w-40 rounded-full border-solid border-[10px] border-[#51ff85]"
                src={profilePic}
                alt=""
              />
            </div>
            <div className="py-3">
              <p className="text-black font-sans font-bold text-base group-hover:text-gray-900 m-0">
                {name}
              </p>
              <p className="text-gray-700 font-sans text-xs font-normal">{discription}</p>
            </div>
          </div>
        </Link>
      </div>
      {showTabs && (
        <div className="flex justify-center">
          <button
            className={`px-4 py-2 rounded-l-md cursor-pointer ${
              selectedTab === 'student' ? 'bg-[#52FF86] text-white' : 'border-solid border-2 border-[#51ff85]'
            }`}
            onClick={() => onSelectTab('student')}
          >
            Student
          </button>
          <button
            className={`px-4 py-2 rounded-r-md cursor-pointer ${
              selectedTab === 'teacher' ? 'bg-[#52FF86] text-white' : 'border-solid border-2 border-[#51ff85]'
            }`}
            onClick={() => onSelectTab('teacher')}
          >
            Teacher
          </button>
        </div>
      )}
    </div>
  );
};

export default TeacherTabs;
