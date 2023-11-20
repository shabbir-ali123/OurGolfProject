import {
  ChatBubbleBottomCenterIcon,
  HandThumbUpIcon,
  MapPinIcon,
  PlusIcon,
  ShareIcon,
} from "@heroicons/react/24/outline";

const people = [
  {
    organizer: "Lindsay Walton",
    time: "12:00 PM",
    date: "Nov 13, SUN",
    event: "ZOZO CHAMPIONSHIP",
    notes: "It's a organizer's note. Keep in mind",
    type: "null",
    location: "Yokohama Country Club",
    imageUrl:
      "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
  {
    organizer: "Lindsay Walton",
    time: "12:00 PM",
    date: "Nov 13, SUN",
    event: "ZOZO CHAMPIONSHIP",
    notes: "It's a organizer's note. Keep in mind",
    type: "full",
    location: "Yokohama Country Club",
    imageUrl:
      "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
  {
    organizer: "Lindsay Walton",
    time: "12:00 PM",
    date: "Nov 13, SUN",
    event: "ZOZO CHAMPIONSHIP",
    notes: "It's a organizer's note. Keep in mind",
    type: "null",
    location: "Yokohama Country Club",
    imageUrl:
      "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
  {
    organizer: "Lindsay Walton",
    time: "12:00 PM",
    date: "Nov 13, SUN",
    event: "ZOZO CHAMPIONSHIP",
    notes: "It's a organizer's note. Keep in mind",
    type: "full",
    location: "Yokohama Country Club",
    imageUrl:
      "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
  {
    organizer: "Lindsay Walton",
    time: "12:00 PM",
    date: "Nov 13, SUN",
    event: "ZOZO CHAMPIONSHIP",
    notes: "It's a organizer's note. Keep in mind",
    type: "null",
    location: "Yokohama Country Club",
    imageUrl:
      "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
  {
    organizer: "Lindsay Walton",
    time: "12:00 PM",
    date: "Nov 13, SUN",
    event: "ZOZO CHAMPIONSHIP",
    notes: "It's a organizer's note. Keep in mind",
    type: "full",
    location: "Yokohama Country Club",
    imageUrl:
      "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
];

export default function Example() {
  return (
    <div className="">
    <div className="mt-8 flow-root">
      <div className=" -my-2 overflow-x-auto">
        <div className="inline-block min-w-full py-2 align-middle ">
          <div className="overflow-hidden  sm:rounded-lg">
            <table className="min-w-full divide-y divide-gray-300" style={{borderCollapse: "separate", borderSpacing: "0 10px"}}>
              <thead className="bg-[#006800] text-white ">
                  <tr>
                    <th
                      scope="col"
                      className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold sm:pl-6"
                    >
                      Organizer
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold"
                    >
                      Time
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold"
                    >
                      Date
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold"
                    >
                      Event Name
                    </th>

                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold"
                    >
                      Short Notes
                    </th>

                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibol"
                    >
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white ">
                {people.map((person, index) => (
                    <tr
                      key={person.time}
                      className={`${
                        person.type === "full"
                          ? "bg-[#3A66C0] text-white shadow-[-3.9px_3.9px_3.12px_#0052fb]  "
                          : "bg-[#D3DAFF] text-black"
                      }`}
                      style={{
                        // display: "flex",
                        // alignItems: "center",
                        width: "100%",
                        borderRadius: "4px",
                        border: "none", // Remove the white border
                       
                      }}

                    >
                      <td className="flex items-center relative whitespace-nowrap overflow-hidden">
                        {person.type !== "full" && (
                          <div
                            className={`whitespace-nowrap  -rotate-90 px-8 py-4    text-white  text-sm ml-[-29px] flex justify-center items-center ${
                              person.type !== "full" && "bg-[#CF4E4E]"
                            }`}
                          >
                            FULL
                          </div>
                        )}
                        <div
                          className={`flex items-center gap-x-4    ${
                            person.type === "full" ? "ml-14 " : ""
                          }`}
                        >
                          <img
                            src={person.imageUrl}
                            alt=""
                            className="h-8 w-8   rounded-full bg-gray-800"
                          />
                          <div className="truncate text-sm font-medium leading-6 ">
                            {person.organizer}
                          </div>
                        </div>
                      </td>
                      <td className="whitespace-nowrap px-3 py-5 text-sm">
                        {person.time}
                      </td>
                      <td className="whitespace-nowrap px-3 py-5  text-sm">
                        {person.date}
                      </td>
                      <td className="md:flex justify-between items-center text-center ml-2 whitespace-pre-wrap xl:text-left text-sm  font-semibold ">
                        <div className="flex flex-col">
                          {person.event}
                          <span className="flex items-center gap-1 font-normal ">
                            <MapPinIcon
                              className={`-mr-0.5 h-3 w-3 ${
                                person.type !== "full" && "text-[#CF4E4E]"
                              }`}
                              aria-hidden="true"
                            />

                            {person.location}
                          </span>
                        </div>

                        <span
                          className={`md:whitespace-nowrap px-2 text-white py-6 text-sm sm:py-2 px-1   ${
                            person.type === "full"
                              ? "bg-[#006800] cursor-pointer "
                              : "bg-[#A1A1A1]"
                          }`}
                        >
                          <p className="rotate-45  text-xl">
                          Join
                          </p>
                         
                        </span>
                      </td>
                      <td className="whitespace-nowrap px-3 py-5 text-sm">
                        {person.notes}
                      </td>
                      <td className="flex gap-1 whitespace-nowrap px-3 py-5 text-sm">
                        <div className="flex  gap-1 flex-col items-center">
                          <div className="flex bg-[#17B3A6] cursor-pointer p-1 rounded-md">
                            <HandThumbUpIcon className="h-4 w-4 text-white" />
                          </div>
                          <div className="flex bg-[#17B3A6]  cursor-pointer text-center justify-center h-4 w-4 p-1 rounded-md">
                            <div className="text-[10px] text-white">12</div>
                          </div>
                        </div>
                        <div className="flex  gap-1 flex-col items-center">
                          <div className="flex bg-[#17B3A6] cursor-pointer p-1 rounded-md">
                            <ChatBubbleBottomCenterIcon className="h-4 w-4 text-white" />
                          </div>
                          <div className="flex bg-[#17B3A6]  cursor-pointer text-center justify-center h-4 w-4 p-1 rounded-md">
                            <div className="text-[10px] text-white">20</div>
                          </div>
                        </div>
                        <div className="flex  gap-1 flex-col items-center">
                          <div className="flex bg-[#17B3A6] cursor-pointer p-1 rounded-md">
                            <PlusIcon className="h-4 w-4 text-white" />
                          </div>
                          <div className="flex bg-[#17B3A6]  cursor-pointer text-center justify-center h-4 w-4 p-1 rounded-md">
                            <ShareIcon className="h-4 w-4 text-white" />
                          </div>
                        </div>
                      </td>
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
