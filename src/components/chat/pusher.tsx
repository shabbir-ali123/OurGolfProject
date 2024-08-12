import Pusher from 'pusher-js';
import { API_ENDPOINTS } from '../../appConfig';

export const pusher = new Pusher(process.env.REACT_APP_PUSHER_KEY || '06eee6fdace6c672f8b2', {
  cluster: process.env.REACT_APP_CLUSTER || 'ap3',
  forceTLS: true,
  channelAuthorization: {
    endpoint: API_ENDPOINTS.PUSHERAUTH,
    transport:'ajax',
    headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,  // Replace `yourTokenHere` with your actual token
      }
  },
});

