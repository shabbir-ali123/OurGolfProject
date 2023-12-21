import {
  ChatBubbleBottomCenterIcon,
  HandThumbUpIcon,
  MapPinIcon,
  PlusIcon,
  ShareIcon,
} from "@heroicons/react/24/outline";

interface TableProps {
  events: Array<{
    accountHolderName: string;
    eventStartTime: string;
    eventStartDate: string;
    eventName: string;
    eventDetails: string;
    type: string;
    place: string;
    imageUrl: string;
  }>;
}

const Table: React.FunctionComponent<TableProps> = ({ events }) => {
  if (!Array.isArray(events)) {
    console.error("Events is not an array:", events);
    // You can provide a fallback or return null, depending on your use case
    return null;
  }
  return (
    <div className="animate__animated animate__fadeInLeft">
      <div className="mt-2 flow-root">
        <div className=" -my-2 overflow-x-auto">
          <div className="inline-block min-w-full py-0 align-middle ">
            <div className="overflow-hidden  sm:rounded-lg">
              <table
                className="min-w-full divide-y divide-gray-300"
                style={{ borderCollapse: "separate", borderSpacing: "0 10px" }}
              >
                <thead className="bg-[#006800] text-white ">
                  <tr>
                    <th
                      scope="col"
                      className="py-2 pl-4 pr-3 text-left text-sm font-semibold sm:pl-6"
                    >
                      Organizer
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-2 text-left text-sm font-semibold"
                    >
                      Time
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-2 text-left text-sm font-semibold"
                    >
                      Date
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-2 text-left text-sm font-semibold"
                    >
                      Event Name
                    </th>

                    <th
                      scope="col"
                      className="px-3 py-2 text-left text-sm font-semibold"
                    >
                      Short Notes
                    </th>

                    <th
                      scope="col"
                      className="px-3 py-2 text-left text-sm font-semibol"
                    >
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white ">
                {events.map((event, index) => (
                    <tr
                    key={index}
                      className={`rounded-sm ${
                        event.type === "full"
                          ? "bg-[#3A66C0] text-white shadow-[-3.9px_3.9px_3.12px_#0052fb]  "
                          : "bg-[#D3DAFF] text-black "
                      }`}
                      style={{
                        width: "100%",
                        borderRadius: "4px",
                        border: "none",
                      }}
                    >
                      <td className="flex items-center  mt-[0px] ">
                        <div
                          className={` -rotate-90 px-4 py-2    text-white  text-sm my-6 ml-[-19px] flex  items-center ${
                            event.type !== "full"
                              ? "bg-[#CF4E4E]"
                              : "opacity-0"
                          }`}
                        >
                          FULL
                        </div>
                        <div className={`flex items-center gap-x-4`}>
                          <img
                            src={event.imageUrl}
                            alt=""
                            className="h-8 w-8   rounded-full bg-gray-800 "
                          />
                          <div className="truncate text-sm font-medium leading-6  ">
                            {event.accountHolderName}
                          </div>
                        </div>
                      </td>
                      <td className="whitespace-nowrap px-3 py-0 text-sm">
                        {event.eventStartTime}
                      </td>
                      <td className="whitespace-nowrap px-3 py-0  text-sm">
                        {event.eventStartDate}
                      </td>
                      <td className="flex justify-between items-center text-center ml-2 whitespace-pre-wrap xl:text-left text-sm  font-semibold ">
                        <div className="flex flex-col">
                          {event.eventName}
                          <span className="flex items-center gap-1 font-normal ">
                            <MapPinIcon
                              className={`-mr-0.5 h-5 w-5 ${
                                event.type !== "full" && "text-[#CF4E4E]"
                              }`}
                              aria-hidden="true"
                            />

                            {event.place}
                          </span>
                        </div>

                        <span
                          className={`md:whitespace-nowrap px-2 text-white py-0 text-sm mx-0  sm:mx-2    ${
                            event.type === "full"
                              ? "bg-[#006800] cursor-pointer py-0 mt-[-10px]  animate__animated animate__heartBeat animate__repeat-3 hover:animate-bounce "
                              : "bg-[#A1A1A1]  py-0 mt-[-10px]"
                          }`}
                        >
                          <p className="rotate-45 sm:text-lg xl:text-xl ">
                            Join
                          </p>
                        </span>
                      </td>
                      <td className="whitespace-nowrap px-3 py-0 text-sm">
                        {event.eventDetails}
                      </td>
                      <td className="flex  gap-1 whitespace-nowrap px-3 py-0 text-sm ">
                        <div className="flex  gap-1 flex-col items-center">
                          <div className="flex bg-[#17B3A6] cursor-pointer p-1 rounded-md ">
                            <HandThumbUpIcon className="h-3 w-3 text-white" />
                          </div>
                          <div className="flex bg-[#17B3A6]  cursor-pointer text-center justify-center h-3 w-3 p-1 rounded-md">
                            <div className="text-[10px] text-white ">12</div>
                          </div>
                        </div>
                        <div className="flex  gap-1 flex-col items-center">
                          <div className="flex bg-[#17B3A6] cursor-pointer p-1 rounded-md">
                            <ChatBubbleBottomCenterIcon className="h-3 w-3 text-white" />
                          </div>
                          <div className="flex bg-[#17B3A6]  cursor-pointer text-center justify-center h-3 w-3 p-1 rounded-md">
                            <div className="text-[10px] text-white">20</div>
                          </div>
                        </div>
                        <div className="flex  gap-1 flex-col items-center">
                          <div className="flex bg-[#17B3A6] cursor-pointer p-1 rounded-md">
                            <PlusIcon className="h-3 w-3 text-white" />
                          </div>
                          <div className="flex bg-[#17B3A6]  cursor-pointer text-center justify-center h-3 w-3 p-1 rounded-md">
                            <ShareIcon className="h-3 w-3 text-white" />
                          </div>
                          
                        </div>
                        
                      </td>
                      <div className="flex justify-start items-center my-1 ml-4">
                            <button className="bg-[#52FF86] hover:bg-blue-700 text-white font-bold py-1 px-4 rounded">
                              View
                            </button>
                          </div>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
Table.defaultProps = {
  events: [],
};
export default Table;