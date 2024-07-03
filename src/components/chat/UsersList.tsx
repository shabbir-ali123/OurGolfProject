import { useEffect, useState } from "react";
import { getAllUsers } from "../../utils/fetchUser";
import { userAuthContext } from "../../contexts/authContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

export const UsersList = () => {
  const { handleSelectedUser, chatUser } = userAuthContext();
  const [users, setUsers] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");

  useEffect(() => {
    getAllUsers(setUsers);
    
  }, [chatUser]);


  const filteredUsers = users?.filter((user) =>
    user.nickName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="shadow-lg p-2">
      <h1>All Users</h1>
      <div className="relative">
        <input
          type="text"
          placeholder="Search users"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="p-1 pl-10 pr-4 mb-4 border-[1px] border-solid border-[#c8c8c8] rounded"
        />
        <FontAwesomeIcon icon={faSearch} className="absolute top-2 left-3 text-gray-400 pointer-events-none" />
      </div>
      <div className="custom-scrollbar h-[73vh] overflow-y-scroll">
        {filteredUsers.map((user: any) => (
          <li className="list-none" key={user.id}>
            <div
              className="flex items-center gap-2 cursor-pointer m-2 border-b-[1px] border-solid border-[#c8c8c8]"
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
            </div>
          </li>
        ))}
      </div>
    </div>
  );
};
