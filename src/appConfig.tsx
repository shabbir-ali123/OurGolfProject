// http://18.216.79.130:5000
// http://localhost:5000
// https://0271-18-216-79-130.ngrok-free.app
// https://shaggy-turtle-15.telebit.io
// https://18.216.79.130:5000/api/login
// https://18.216.79.130:5000
// https://backend.golf-encounters.com:5000/
const API_BASE_URL = "https://backend.golf-encounters.com:5000"
const API_VERSION = "api";

export const API_ENDPOINTS = {
  //authen
  REGISTER: `${API_BASE_URL}/${API_VERSION}/register`,
  LOGIN: `${API_BASE_URL}/${API_VERSION}/login`,
  UPDATEUSERPROFILE: `${API_BASE_URL}/${API_VERSION}/edit-user-profile/`,
  GET_USER: `${API_BASE_URL}/${API_VERSION}/user/`,
  UPDATEUSER: `${API_BASE_URL}/${API_VERSION}/update-profile`,
  ALLUSERS: `${API_BASE_URL}/${API_VERSION}/get-total-users`,

  //event
  CREATEEVENT: `${API_BASE_URL}/${API_VERSION}/createEvent`,
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
  DELETE_EVENT: `${API_BASE_URL}/${API_VERSION}/delete-event-by-id/`,
  UPDATE_EVENT: `${API_BASE_URL}/${API_VERSION}/update-event-by-id/`,
  UPDATE_EVENT_MEDIA: `${API_BASE_URL}/${API_VERSION}/update-event-media`,
  GET_NOTIFICATION: `${API_BASE_URL}/${API_VERSION}/get-notifications`,
  APPROVE_EVENT: `${API_BASE_URL}/${API_VERSION}/approve-join-request`,
  SEARCH_EVENT: `${API_BASE_URL}/${API_VERSION}/search-event-by-name`,
  SEARCH_EVENT_NAME: `${API_BASE_URL}/${API_VERSION}/get-event-col-data`,
  GETMEMBERSLIST: `${API_BASE_URL}/${API_VERSION}/get-joined-and-wait-list/`,


  // teacher
  BECOMETEACHER: `${API_BASE_URL}/${API_VERSION}/become-teacher`,
  GETALLTEACHERS: `${API_BASE_URL}/${API_VERSION}/get-all-teachers`,
  GETALLTEACHERSPUBLIC: `${API_BASE_URL}/${API_VERSION}/get-all-teachers-public`,
  GETTEACHERBYID: `${API_BASE_URL}/${API_VERSION}/get-teacher-by-id/`,
  GETPUBLICTEACHERBYID: `${API_BASE_URL}/${API_VERSION}/get-public-teacher-by-id/`,
  UPDATEPROFILE: `${API_BASE_URL}/${API_VERSION}/update-profile`,
  BOOKAPPOINTMENT: `${API_BASE_URL}/${API_VERSION}/book-appointment`,
  GETTEACHERBOOKEDAPPOINTMENTS: `${API_BASE_URL}/${API_VERSION}/get-teacher-booked-appointments`,
  GETUSERBOOKEDAPPOINTMENTS: `${API_BASE_URL}/${API_VERSION}/get-user-booked-appointments`,
  GETTEACHERAPPPOINTMENTCOUNT: `${API_BASE_URL}/${API_VERSION}/get-teacher-appointments-count`,
  GETTEACHERAPPPOINTMENTPUBLICCOUNT: `${API_BASE_URL}/${API_VERSION}/get-public-teacher-appointments-count`,
  UPDATEAPPOINTMENTSTATUS: `${API_BASE_URL}/${API_VERSION}/update-appointment-status`,
  GETFAVORITETEACHER: `${API_BASE_URL}/${API_VERSION}/get-favorite-teachers`,
  ACCEPTAPPOINTMENT: `${API_BASE_URL}/${API_VERSION}/accept-appointment`,
  DECLINEAPPOINTMENT: `${API_BASE_URL}/${API_VERSION}/decline-appointment`,
  UPDATETEACHERPROFILE: `${API_BASE_URL}/${API_VERSION}/update-teacher-profile`,
  ADDGIGS: `${API_BASE_URL}/${API_VERSION}/add-gigs`,
  GETGIGSBYID: `${API_BASE_URL}/${API_VERSION}/get-gigs-by-teacher/`,
  GETPUBLICGIGSBYID: `${API_BASE_URL}/${API_VERSION}/get-public-gigs-by-teacher/`,

  // teams
  GETALLTEAMS: `${API_BASE_URL}/${API_VERSION}/get-all-teams`,
  GETPUBLICTEAMSBYEVENT: `${API_BASE_URL}/${API_VERSION}/get-public-teams-by-event/`,
  GETTEAMSBYEVENT: `${API_BASE_URL}/${API_VERSION}/get-teams-by-event/`,
  UPDATETEAMMEMBER: `${API_BASE_URL}/${API_VERSION}/update-team-member`,

  // student
  FAVORITETEACHER: `${API_BASE_URL}/${API_VERSION}/favorite-teacher`,

  //posts
  CREATEPOSTS: `${API_BASE_URL}/${API_VERSION}/create-post`,
  GETPOSTS: `${API_BASE_URL}/${API_VERSION}/get-posts`,
  GETPUBLICPOSTS: `${API_BASE_URL}/${API_VERSION}/get-public-posts`,
  GETPOSTBYID: `${API_BASE_URL}/${API_VERSION}/get-post-by-id/`,
  GETALLPOSTS: `${API_BASE_URL}/${API_VERSION}/get-all-posts`,
  GETPUBLICALLPOSTS: `${API_BASE_URL}/${API_VERSION}/get-public-all-posts`,
  ADDPOSTCOMMENT: `${API_BASE_URL}/${API_VERSION}/add-post-comment`,
  ADDPOSTLIKE: `${API_BASE_URL}/${API_VERSION}/add-post-like`,
  DELETEPOST: `${API_BASE_URL}/${API_VERSION}/delete-post/`,
  UPDATEPOST: `${API_BASE_URL}/${API_VERSION}/update-post/`,
  GETMYPOSTS: `${API_BASE_URL}/${API_VERSION}/get-my-posts`,
  EDITPOSTCOMMENTS: `${API_BASE_URL}/${API_VERSION}/edit-comment`,
  DELETECOMMENTBYID: `${API_BASE_URL}/${API_VERSION}/delete-comment/`,
  GETMOSTCOMMENTSPOSTS: `${API_BASE_URL}/${API_VERSION}/get-top-commented-post`,
  GETMOSTLIKEDPOSTS: `${API_BASE_URL}/${API_VERSION}/get-top-liked-post`,
  GETUSERALLPOSTS: `${API_BASE_URL}/${API_VERSION}/get-user-all-posts/`,
  UPDATEPOSTMEDIA: `${API_BASE_URL}/${API_VERSION}/update-post-media`,

  //location
  GETEVENTPLACE: `${API_BASE_URL}/${API_VERSION}/get-event-places`,
  GETEVENTPLACES: `${API_BASE_URL}/${API_VERSION}/get-public-event-places`,

  // Score Page
  GETALLSCORE: `${API_BASE_URL}/${API_VERSION}/get-all-score-cards`,
  GETALLSCOREPUBLIC: `${API_BASE_URL}/${API_VERSION}/get-all-public-score-cards`,
  ADDSCORE: `${API_BASE_URL}/${API_VERSION}/add-score-card`,
  GETSCOREBYEVENTID: `${API_BASE_URL}/${API_VERSION}/get-score-card-by-event/`,
  GETPUBLICSCOREBYEVENTID: `${API_BASE_URL}/${API_VERSION}/get-public-score-card-by-event/`,


  //notification hanlder
  UPDATENOTIFICATIONSTATUS: `${API_BASE_URL}/${API_VERSION}/update-notification-response`,


};
