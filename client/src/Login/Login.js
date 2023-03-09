import React, { useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
const Login = () => {
  const Navigate=useNavigate();
  const [signin , setSignin]=useState({email:"",password:""})

  const handleSubmit = async (event) => {
    event.preventDefault();
   
    try {
      const response = await axios.post('http://localhost:5000/signin', signin);
      if (response.status === 200 ) {
        setSignin({email:"",password:""});
     
      // Redirect the user to the dashboard or home page
         Navigate("/")
      }
      // handle successful login
    } catch (error) {
      console.log(error)
    
      // handle login error
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="email">email:</label>
        <input
          type="email"
          id="email"
          value={signin.email}
          onChange={(event) => setSignin({...signin,email:event.target.value})}
        />
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          value={signin.password}
          onChange={(event) => setSignin({...signin, password:event.target.value})}
        />
      </div>
      <button type="submit">Login</button>
    </form>
  );
};

export default Login;
