import React from 'react';
import { Routes, Route} from 'react-router-dom';

import Home from './home/Home';
import About from './About/About';
import Login from './Login/Login';
import Signup from './Login/Signup';
import Header from './Header/Header';
import Admin from './Admin/Admin';
function Component() {
 
  // const [isLoggedIn, setIsLoggedIn] = useState(false);

  // // Function for logging in and storing the JWT token in local storage
  // const handleLogin = async (email, password) => {
  //   try {
  //     const response = await axios.post('/signin', { email, password });
  //     localStorage.setItem('token', response.data.token);
  //     setIsLoggedIn(true);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };
 



  return (
    <div>
     <Header/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />}
        />
        <Route path="/signin" element={<Login/>} />
        <Route path="/signup" element={<Signup/>} />
        <Route path="/admin" element={<Admin/>} />
      </Routes>
    </div>
    
      
   
  );
}

export default Component
