import { Tab } from "@headlessui/react";
import ActivtiesBox from "../components/ActivtiesBox";
import { useTranslation } from "react-i18next";
import { useTeacherContext } from "../contexts/teachersContext";
import { useEffect, useState } from "react";
import { fetchTeachersAppointments } from "../utils/fetchTeacher";


export default function Activeties({ selectedDate }: any) {
  const { t } = useTranslation();
  const { studentAppointments } = useTeacherContext();
  const status = ['Pending', 'Booked', 'Completed', 'Declined'];
  const [teacherAppointments, setTeacherAppointments] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<any>(false);
  const [filteredAppointments, setFilteredAppointments] = useState<any>({
    pending: [],
    booked: [],
    completed: [],
    declined: [],
  });
  const [filterTeacherApp, setFilterTeacherApp] = useState<any>({
    pending: [],
    booked: [],
    completed: [],
    declined: [],
  });

  useEffect(() => {
    fetchTeachersAppointments(setTeacherAppointments, setIsLoading);
  }, []);

  useEffect(() => {
    // const combinedAppointments = [...studentAppointments, ...teacherAppointments];

    const pending = teacherAppointments.filter((appointment: any) => {
      if (!selectedDate) {
        return appointment.status === 'PENDING';
      } else {
        const date = new Date(appointment.createdAt);
        const formattedDate = date.toISOString().slice(0, 10);
        return formattedDate === selectedDate && appointment.status === 'PENDING';
      }
    });

    const booked = teacherAppointments.filter((appointment: any) => {
      if (!selectedDate) {
        return appointment.status === 'BOOKED';
      } else {
        const date = new Date(appointment.createdAt);
        const formattedDate = date.toISOString().slice(0, 10);
        return formattedDate === selectedDate && appointment.status === 'BOOKED';
      }
    });

    const completed = teacherAppointments.filter((appointment: any) => {
      if (!selectedDate) {
        return appointment.status === 'COMPLETED';
      } else {
        const date = new Date(appointment.createdAt);
        const formattedDate = date.toISOString().slice(0, 10);
        return formattedDate === selectedDate && appointment.status === 'COMPLETED';
      }
    });

    const declined = teacherAppointments.filter((appointment: any) => {
      if (!selectedDate) {
        return appointment.status === 'DECLINED';
      } else {
        const date = new Date(appointment.createdAt);
        const formattedDate = date.toISOString().slice(0, 10);
        return formattedDate === selectedDate;
      }
    });

    setFilteredAppointments({
      completed: completed,
      pending: pending,
      booked: booked,
      declined: declined,
    });
  }, [selectedDate, studentAppointments, teacherAppointments]);
  

  return (
    <div className="flex flex-wrap xl:flex-nowrap ">
      <div className="w-full">
        <Tab.Group>
          <Tab.List className="flex  items-center justify-start">
            <div className="flex-wrap xl:flex gap-6 py-2 lg:flex-nowrap">
              {status.map((category, index) => (
                <Tab
                  key={category}
                  className={({ selected }) =>
                    `w-full rounded-md py-2 text-base font-normal leading-5 sm:font-bold md:text-lg cursor-pointer m-1 xl:m-0
                    ring-white ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2
                    ${
                      selected
                        ? `bg-gradient-to-b from-[#0AE94D] to-[#00A632] rounded-lg text-white shadow-`
                        : `bg-[#ffff] shadow-lg border-solid border-2 border-[#51ff85] `
                    }`
                  }
                >
                  <div className="items-center xl:justify-center text-start flex ">
                    <div
                      className={`bg-[#E8FFEF] rounded-full font-regular  text-[12px] w-8 h-8 flex items-center justify-center  md:text-[20px] md:font-bold md:w-10  md:h-10 text-[#52FF86]`}
                    >
                      {filteredAppointments[category.toLowerCase()].length}
                    </div>
                    <span className="ml-2">
                      {t(category.toLocaleUpperCase())}
                    </span>
                  </div>
                </Tab>
              ))}
            </div>
          </Tab.List>
          <Tab.Panels>
            <Tab.Panel>
              <div>
                {
                  filteredAppointments.pending.length > 0 ? 
                filteredAppointments.pending.map((activity: any, index: any) => (
                  <ActivtiesBox key={index} activity={activity} />
                )) : 
                <h3>Oops! You dont have Pending Appointments {selectedDate && `at ${selectedDate}`}</h3>
              }
                
                <style>{`
        
        @media screen and (min-width: 1300px) {
          .scrollbar {
            scrollbar-width: thin;
            scrollbar-color: #52FF86 transparent;
           
          }
               
                .scrollbar::-webkit-scrollbar {
                    width: 8px;
                    height:10px;
                }

                .scrollbar::-webkit-scrollbar-thumb {
                    background-color: #52FF86;
                    border-radius: 6px;
                }

                .scrollbar::-webkit-scrollbar-track {
                    background-color: transparent;
                }
            `}</style>
              </div>
            </Tab.Panel>
            <Tab.Panel>
              <div className="">
                {filteredAppointments.booked.map((activity: any, index: any) => (
                  <ActivtiesBox key={index} activity={activity} />
                ))}
                
                <style>{`
        
        @media screen and (min-width: 1300px) {
          .scrollbar {
            scrollbar-width: thin;
            scrollbar-color: #52FF86 transparent;
           
          }
               
                .scrollbar::-webkit-scrollbar {
                    width: 8px;
                    height:10px;
                }

                .scrollbar::-webkit-scrollbar-thumb {
                    background-color: #52FF86;
                    border-radius: 6px;
                }

                .scrollbar::-webkit-scrollbar-track {
                    background-color: transparent;
                }
            `}</style>
              </div>
            </Tab.Panel>
            <Tab.Panel>
              <div className="">
                {filteredAppointments.completed.map((activity: any, index: any) => (
                  <ActivtiesBox key={index} activity={activity} />
                ))}
                
                <style>{`
        
        @media screen and (min-width: 1300px) {
          .scrollbar {
            scrollbar-width: thin;
            scrollbar-color: #52FF86 transparent;
           
          }
               
                .scrollbar::-webkit-scrollbar {
                    width: 8px;
                    height:10px;
                }

                .scrollbar::-webkit-scrollbar-thumb {
                    background-color: #52FF86;
                    border-radius: 6px;
                }

                .scrollbar::-webkit-scrollbar-track {
                    background-color: transparent;
                }
            `}</style>
              </div>
            </Tab.Panel>
            <Tab.Panel>
              <div className="">
                {filteredAppointments.declined.map((activity: any, index: any) => (
                  <ActivtiesBox key={index} activity={activity} />
                ))}
                
                <style>{`
        
        @media screen and (min-width: 1300px) {
          .scrollbar {
            scrollbar-width: thin;
            scrollbar-color: #52FF86 transparent;
           
          }
               
                .scrollbar::-webkit-scrollbar {
                    width: 8px;
                    height:10px;
                }

                .scrollbar::-webkit-scrollbar-thumb {
                    background-color: #52FF86;
                    border-radius: 6px;
                }

                .scrollbar::-webkit-scrollbar-track {
                    background-color: transparent;
                }
            `}</style>
              </div>
            </Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
      </div>
    </div>
  );
}
