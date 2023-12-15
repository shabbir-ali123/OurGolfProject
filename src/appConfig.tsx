// apiConfig.js
const API_BASE_URL = "http://localhost:5000";
const API_VERSION = "api";

export const API_ENDPOINTS = {
  REGISTER: `${API_BASE_URL}/${API_VERSION}/register`,
  LOGIN: `${API_BASE_URL}/${API_VERSION}/login`,
  CREATEEVENT: `${API_BASE_URL}/${API_VERSION}/createEvent`,
  GET_USER:`${API_BASE_URL}/${API_VERSION}/user/:id`
  // Add more endpoints as needed
};
