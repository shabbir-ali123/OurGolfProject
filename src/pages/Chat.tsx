import ChatWrapper from "../chat/chatWrapper"
import { UsersList } from "../components/chat/UsersList"
import ChatApp from "./ChatBox"

export const ChatSystem = () => {
    return (
        <div className="max-w-7xl mx-auto flex items-center mx-auto h-full rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark" >
            {/* <ChatWrapper/> */}
            <UsersList/>
            {/* <MemberList/> */}
            <ChatApp/>
             
                
        </div>
    )
}