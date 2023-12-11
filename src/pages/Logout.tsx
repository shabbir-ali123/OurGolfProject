import React, { useEffect, useState } from "react";
import { API_ENDPOINTS } from "../appConfig";
import axios from "axios";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Logout: React.FC = () => {
  
  const router = useNavigate()

  useEffect(() => {
        localStorage.removeItem('token');
    router('/login-page')    

    window.location.reload();
  },[router]);
 
  return (
    <></>
  );
    
}
export default Logout;