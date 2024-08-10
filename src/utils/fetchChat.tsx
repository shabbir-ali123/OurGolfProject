import axios from "axios";
import { API_ENDPOINTS } from "../appConfig";

export const fetchMessages = async (sender: any, setAllChat: any) => {
  try {
    const response = await axios.get(API_ENDPOINTS.ALLCHAT, {
      params: { receiver: sender },
    });
    setAllChat(response.data);
  } catch (error) {
    console.error("Error fetching messages:", error);
  }
};
export const fetchMessage = async (receiver:any, sender:any, setMessages:any) => {

  try {
      const response = await axios.get(API_ENDPOINTS.GETCHAT, {
          params: { receiver: receiver, sender: sender }
      });
      setMessages(response.data);
  } catch (error) {
      console.error('Error fetching messages:', error);
  }
};