import { UsersList } from "../components/chat/UsersList"
import ChatApp from "./test"

export const ChatSystem = () => {
    return (
        <div className="flex ml-[200px]" >
            <ChatApp/>
            <UsersList/>
        </div>
    )
}