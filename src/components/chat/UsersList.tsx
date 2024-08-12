import { useEffect, useState } from "react";
import { getAllUsers } from "../../utils/fetchUser";
import { userAuthContext } from "../../contexts/authContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { fetchOnlineUsers, updateChatStatus } from "../../utils/fetchChat";

export const UsersList = () => {
  const {
    handleSelectedUser,
    chatUser,
    receiver,
    handleReceiver,
    handleChatId,
    activeChatId,
  } = userAuthContext();
  const [users, setUsers] = useState<any[]>([]);
  const [onlineUsers, setOnlineUsers] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");

  useEffect(() => {
    getAllUsers(setUsers);
    fetchOnlineUsers(setOnlineUsers)
  }, [chatUser]);

  const filteredUsers = users?.filter((user) => {
    // Skip the user if their ID matches the one in localStorage
    if (user.id.toString() === localStorage.getItem('id')) {
      return false;
    }
  
    // Continue filtering based on the nickname
    return user.nickName.toLowerCase().includes(searchTerm.toLowerCase());
  });
  // const handleChatStatus = (e: any) => {
  //   e.preventDefault();
  //   const formData = {
  //     sender: localStorage.getItem("id"),
  //     receiver: receiver,
  //   };
  //   updateChatStatus(formData);
  // };
 
  return (
    <div className=" p-2 ">
      <div className="relative">
        <input
          type="text"
          placeholder="Search users"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="p-1 pl-10 pr-4  border-[1px] border-solid border-[#c8c8c8] rounded"
        />
        <FontAwesomeIcon
          icon={faSearch}
          className="absolute top-2 left-3 text-gray-400 pointer-events-none"
        />
      </div>
      <div className="bg-white absolute pr-[122px] z-50">
        {filteredUsers.map((user: any) => {
         const isOnline = onlineUsers.includes(user.id.toString());
          return (
            <li
              className={`list-none text-black  ${
                searchTerm ? "block" : "hidden"
              }`}
              key={user.id}
              onClick={(e: any) => {
                handleReceiver(user.id);
                handleChatId(user.id);
                // handleChatStatus(e);
              }}
            >
              <div
                className="flex relative items-center gap-2 cursor-pointer m-2 pb-4 border-solid border-[#c8c8c8]"
                onClick={() => handleSelectedUser(user.id.toString())}
              >
                <div>
                  <img
                    src={user?.imageUrl}
                    className="rounded-full w-10 h-10"
                    alt=""
                  />
                </div>
                {user?.nickName}
                {isOnline ? (
                  <span className="w-4 h-4 absolute top-[-10%] left-[25%] bg-blue-400 rounded-full"></span>
                ) : (
                  ""
                )}              </div>
            </li>
          );
        })}
      </div>
    </div>
  );
};
