import { useEffect, useState } from "react";
import { getAllUsers } from "../../utils/fetchUser"
import { userAuthContext } from "../../contexts/authContext";

export const UsersList = () => {
    const {handleSelectedUser, chatUser} = userAuthContext();
    const [users, setUsers] = useState<any[]>([]);

    useEffect(() => {
        getAllUsers(setUsers )
    },[chatUser])

    return (
        <div className="h-[80vh] overflow-auto">
            <h1>All Users</h1>
        {users?.map((user: any) => {
                return (
                    <li className="list-none " key={user.id} >
                        <div className="flex cursor-pointer" onClick={() => handleSelectedUser(user.id.toString())}>
                            <div >
                            <img src={user?.imageUrl} className="rounded-full w-10 h-10" alt="" />
                            </div>
                            {user?.nickName}
                        </div>
                    </li>
                );
            })}
        </div>
    )
}