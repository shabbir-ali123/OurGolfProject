import ChatWrapper from "../chat/chatWrapper"
import AllUserChat from "../components/chat/ListUsers"
import { UsersList } from "../components/chat/UsersList"
// import ChatApp from "./ChatBox"
import NewChat from "../components/chat/NewChat"

export const ChatSystem = () => {
    return (
        <div className="max-w-7xl flex items-start mx-auto  rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark" >
            <AllUserChat/>
              <NewChat/>
                
        </div>
    )
}