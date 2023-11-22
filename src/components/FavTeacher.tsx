import React from "react";
import { Link, useNavigate } from "react-router-dom";
const FavoriteTeachers: React.FC = () => {
  return (
    <div>
      <div className="flex items-center justify-between">
        <h3 className="text-black font-sans font-bold text-xl ">
          Favorite Teachers
        </h3>
        <button
          type="button"
          className="cursor-pointer rounded-full bg-white px-3.5 py-2 text-sm font-semibold text-[#51ff85] shadow-sm ring-1 ring-inset ring-[#52FF86] hover:bg-gray-50"
        >
          View All
        </button>
      </div>
      <div className="grid grid-flow-col auto-rows-max mx-auto gap-3 my-4 ">
        <div className="">
          <div className="text-center">
            <div className="border-6 border-solid border-green-500">
              <img
                className="inline-block h-16 w-16 rounded-full "
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                alt=""
              />
               <p className="text-base font-medium text-black ">
               Sona
              </p>
            </div>
            <div className="">
             
            </div>
          </div>
        </div>
        <div className="">
          <div className="text-center">
            <div className="border-6 border-solid border-green-500">
              <img
                className="inline-block h-16 w-16 rounded-full "
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                alt=""
              />
               <p className="text-base font-medium text-black ">
               SHIANI
              </p>
            </div>
            <div className="">
             
            </div>
          </div>
        </div>
        <div className="">
          <div className="text-center">
            <div className="border-6 border-solid border-green-500">
              <img
                className="inline-block h-16 w-16 rounded-full "
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                alt=""
              />
               <p className="text-base font-medium text-black ">
               Liam
              </p>
            </div>
            <div className="">
             
            </div>
          </div>
        </div>
        <div className="">
          <div className="text-center">
            <div className="border-6 border-solid border-green-500">
              <img
                className="inline-block h-16 w-16 rounded-full "
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                alt=""
              />
               <p className="text-base font-medium text-black ">
               Jiana
              </p>
            </div>
            <div className="">
             
            </div>
          </div>
        </div>
       
        
      </div>
    </div>
  );
};

export default FavoriteTeachers;
