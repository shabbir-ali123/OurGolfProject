import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Client as PusherPushNotifications } from '@pusher/push-notifications-web';
import { UsersList } from './UsersList';
import { userAuthContext } from '../../contexts/authContext';
import { useTranslation } from 'react-i18next';
import { getTimeAgo } from '../../pages/ReadPost';

const AllUserChat = () => {
    const { t, i18n } = useTranslation();
    const [allChat, setAllChat] = useState<any>([])
    const [sender, setSender] = useState(localStorage.getItem('id'));
    const { handleSelectedUser, chatUser, receiver, handleReceiver, handleChatId, activeChatId } = userAuthContext();
    // const [activeId, setActiveId] = useState<any>(Boolean);

    useEffect(() => {
        fetchMessages();

    }, [sender]);
    useEffect(() => {
        if (allChat && allChat[0]?.user) {
            const defaultMessages = allChat[0].user.id;
            console.log(defaultMessages, "sad");
            handleReceiver(defaultMessages);
            handleChatId(defaultMessages);
        }
    }, [allChat])
    const fetchMessages = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/all-chat', {
                params: { receiver: sender }
            });
            setAllChat(response.data);
        } catch (error) {
            console.error('Error fetching messages:', error);
        }
    };
    console.log(allChat, "allchat")
    return (
        <div className='w-[30%] sticky'>
            <div className=' shadow-lg py-10 h-[75vh] bg-[#17b3a6]'

            >
                <div className='px-2 text-white'>
                    <h3>Messages</h3>
                    <UsersList />
                </div>

                {
                    allChat.map((item: any) => {
                        return <div className={`border-solid  border-[#c8c8c8] border-b-[1px] cursor-pointer pt-3 px-6 ${activeChatId == item.user.id ? "bg-black" : ""}`} onClick={
                            () => {
                                handleReceiver(item.user.id);
                                handleChatId(item.user.id);
                            }
                        }>
                            <div className='flex items-center gap-4 z-[0]'> <img width='50px' height='50px' className='rounded-full' src={item.user.imageUrl || "/img/zozo.png"} alt="" />
                                <span ><p className='text-white font-bold'>{item.user.nickName}<span> <small className="text-white"> {getTimeAgo(new Date(item.messages[0].timestamp), t)}</small></span></p><p className='text-white'>{item.messages[0].message}</p></span>
                            </div>
                        </div>
                    })
                }

            </div>
        </div>

    );
};

export default AllUserChat;
