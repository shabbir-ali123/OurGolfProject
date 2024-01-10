
const API_BASE_URL = "http://localhost:5000";
const API_VERSION = "api";

export const API_ENDPOINTS = {
  REGISTER: `${API_BASE_URL}/${API_VERSION}/register`,
  LOGIN: `${API_BASE_URL}/${API_VERSION}/login`,
  CREATEEVENT: `${API_BASE_URL}/${API_VERSION}/createEvent`,
  GET_USER: `${API_BASE_URL}/${API_VERSION}/user/`,
  UPDATEUSER: `${API_BASE_URL}/${API_VERSION}/update-profile`,
  GETALLEVENT: `${API_BASE_URL}/${API_VERSION}/getAllEvents`,
  PUBLICEVENTS: `${API_BASE_URL}/${API_VERSION}/get-public-events`,
  ADDCOMMENT: `${API_BASE_URL}/${API_VERSION}/add-comment`,
  ADDLIKE: `${API_BASE_URL}/${API_VERSION}/add-like`,
  MARKASFAVORITE: `${API_BASE_URL}/${API_VERSION}/is-favourite-event/`,
  GETFAVEVENTS: `${API_BASE_URL}/${API_VERSION}/get-favourite-events`,
  GETSINGLEEVENT: `${API_BASE_URL}/${API_VERSION}/get-event-by-id`,
  JOINEDEVENTS: `${API_BASE_URL}/${API_VERSION}/get-joined-events`,
  BECOMETEACHER: `${API_BASE_URL}/${API_VERSION}/become-teacher`,
  GETALLTEACHERS: `${API_BASE_URL}/${API_VERSION}/get-all-teachers`,
  GETTEACHERBYID: `${API_BASE_URL}/${API_VERSION}/get-teacher-by-id/`,
  UPDATEPROFILE: `${API_BASE_URL}/${API_VERSION}/update-profile`,
  BOOKAPPOINTMENT: `${API_BASE_URL}/${API_VERSION}/book-appointment`,
  GETTEACHERBOOKEDAPPOINTMENTS: `${API_BASE_URL}/${API_VERSION}/get-teacher-booked-appointments`,
  GETUSERBOOKEDAPPOINTMENTS: `${API_BASE_URL}/${API_VERSION}/get-user-booked-appointments`,
  FAVORITETEACHER: `${API_BASE_URL}/${API_VERSION}/favorite-teacher`,
  GETFAVORITETEACHER: `${API_BASE_URL}/${API_VERSION}/get-favorite-teachers`,
  ACCEPTAPPOINTMENT: `${API_BASE_URL}/${API_VERSION}//accept-appointment`,
};
