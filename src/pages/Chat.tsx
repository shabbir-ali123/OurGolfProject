import { UsersList } from "../components/chat/UsersList"
import ChatApp from "./ChatBox"

export const ChatSystem = () => {
    return (
        <div className="flex justify-center gap-3" >
            <UsersList/>
            <ChatApp/>
             
                
        </div>
    )
}