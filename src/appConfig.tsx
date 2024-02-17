// http://18.216.79.130:5000
// http://localhost:3000
const API_BASE_URL = "http://18.216.79.130:5000"
const API_VERSION = "api";

export const API_ENDPOINTS = {
  //auth
  REGISTER: `${API_BASE_URL}/${API_VERSION}/register`,
  LOGIN: `${API_BASE_URL}/${API_VERSION}/login`,
  //event
  CREATEEVENT: `${API_BASE_URL}/${API_VERSION}/createEvent`,
  GET_USER: `${API_BASE_URL}/${API_VERSION}/user/`,
  UPDATEUSER: `${API_BASE_URL}/${API_VERSION}/update-profile`,
  GETALLEVENT: `${API_BASE_URL}/${API_VERSION}/getAllEvents`,
  PUBLICEVENTS: `${API_BASE_URL}/${API_VERSION}/get-public-events`,
  ADDCOMMENT: `${API_BASE_URL}/${API_VERSION}/add-comment`,
  ADDLIKE: `${API_BASE_URL}/${API_VERSION}/add-like`,
  MARKASFAVORITE: `${API_BASE_URL}/${API_VERSION}/is-favourite-event/`,
  GETFAVEVENTS: `${API_BASE_URL}/${API_VERSION}/get-favourite-events`,
  GETEVENTSBYID: `${API_BASE_URL}/${API_VERSION}/get-events-by-user-id`,
  GETJOINEDEVENTS: `${API_BASE_URL}/${API_VERSION}/get-joined-events`,
  JOINEDEVENTS: `${API_BASE_URL}/${API_VERSION}/join-event/`,
  GETEVENTBYID: `${API_BASE_URL}/${API_VERSION}/get-event-by-id/`,
GETPUBLICEVENTBYID: `${API_BASE_URL}/${API_VERSION}/get-public-event-by-id/`,
 
  // teacher
  BECOMETEACHER: `${API_BASE_URL}/${API_VERSION}/become-teacher`,
  GETALLTEACHERS: `${API_BASE_URL}/${API_VERSION}/get-all-teachers`,
  GETALLTEACHERSPUBLIC: `${API_BASE_URL}/${API_VERSION}/get-all-teachers-public`,
  GETTEACHERBYID: `${API_BASE_URL}/${API_VERSION}/get-teacher-by-id/`,
  UPDATEPROFILE: `${API_BASE_URL}/${API_VERSION}/update-profile`,
  BOOKAPPOINTMENT: `${API_BASE_URL}/${API_VERSION}/book-appointment`,
  GETTEACHERBOOKEDAPPOINTMENTS: `${API_BASE_URL}/${API_VERSION}/get-teacher-booked-appointments`,
  GETUSERBOOKEDAPPOINTMENTS: `${API_BASE_URL}/${API_VERSION}/get-user-booked-appointments`,
  GETTEACHERAPPPOINTMENTCOUNT: `${API_BASE_URL}/${API_VERSION}/get-teacher-appointments-count`,
  GETTEACHERAPPPOINTMENTPUBLICCOUNT: `${API_BASE_URL}/${API_VERSION}/get-public-teacher-appointments-count`,
  UPDATEAPPOINTMENTSTATUS: `${API_BASE_URL}/${API_VERSION}/update-appointment-status`,  
  GETFAVORITETEACHER: `${API_BASE_URL}/${API_VERSION}/get-favorite-teachers`,
  ACCEPTAPPOINTMENT: `${API_BASE_URL}/${API_VERSION}/accept-appointment`, 
  
  // teams
  GETALLTEAMS: `${API_BASE_URL}/${API_VERSION}/get-all-teams`, 
  GETTEAMSBYEVENT: `${API_BASE_URL}/${API_VERSION}/get-teams-by-event/`, 
  UPDATETEAMMEMBER: `${API_BASE_URL}/${API_VERSION}/update-team-member`, 
  
  // student
  FAVORITETEACHER: `${API_BASE_URL}/${API_VERSION}/favorite-teacher`,

  //posts
  CREATEPOSTS: `${API_BASE_URL}/${API_VERSION}/create-post`, 
  GETPOSTS: `${API_BASE_URL}/${API_VERSION}/get-posts`, 
  GETPUBLICPOSTS: `${API_BASE_URL}/${API_VERSION}/get-public-posts`, 
  GETPOSTBYID: `${API_BASE_URL}/${API_VERSION}/get-post-by-id/`, 
  ADDPOSTCOMMENT: `${API_BASE_URL}/${API_VERSION}/add-post-comment`,
  ADDPOSTLIKE: `${API_BASE_URL}/${API_VERSION}/add-post-like`,
  
  //location
  GETEVENTPLACE: `${API_BASE_URL}/${API_VERSION}/get-event-places`,
  GETEVENTPLACES: `${API_BASE_URL}/${API_VERSION}/get-public-event-places`
};
