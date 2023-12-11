
import React, { useEffect, useState } from 'react';
import RegisterPage from "../components/Register";
import { useNavigate } from 'react-router-dom';

const Register: React.FC = () => {
 
  const history = useNavigate();
  const [token, setToken] = useState('');

  useEffect(() => {
    // Check if a token exists in localStorage
    const storedToken = localStorage.getItem('token');

    // If a token exists, set it in the component state
    if (storedToken) {
      setToken(storedToken);

      // Redirect to the homepage
      history('/event-main-page')    }
  }, [history]);


  return (
    <div>
    {token ? 
        <div>ss</div>
     : (
      <RegisterPage/>
      )}
    </div>
    
  );
};

export default Register;
