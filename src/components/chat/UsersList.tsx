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
        <div>
            {users?.map((user: any) => {
                return (
                    <li key={user.id}>
                        <div className="flex" onClick={() => handleSelectedUser(user.id.toString())}>
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