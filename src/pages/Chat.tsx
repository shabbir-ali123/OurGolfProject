import { UsersList } from "../components/chat/UsersList"
import ChatApp from "./test"

export const ChatSystem = () => {
    return (
        <div className="flex justify-center gap-3" >
            <ChatApp/>
             <UsersList/>
                
        </div>
    )
}