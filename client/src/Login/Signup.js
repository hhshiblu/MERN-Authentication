import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const Navigate = useNavigate();
  const [user, setUser] = useState({
    name: "",
    email: "",
    phone: "",
    work: "",
    password: "",
    cpassword: "",
  });

  const handelChange = (e) => {
    const{name,value}=e.target
    setUser({...user, [name]:value})

  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post("http://localhost:5000/signup", user);
      // handle successful signup
      if (response.status !== 422) {
      
        console.log("register successful");
        window.alert("sign in success");
        Navigate("/signin");
        setUser({ 
          name: "",
          email: "",
          phone: "",
          work: "",
          password: "",
          cpassword: ""})
      }
    } catch (error) {
      console.log(error);
      Navigate("/signup")
      // handle signup error
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Name:</label>
        <input
          name="name"
          type="text"
          id="name"
          value={user.name}
          onChange={handelChange}
        />
      </div>
      <div>
        <label>Email:</label>
        <input
          name="email"
          type="email"
          id="email"
          value={user.email}
          onChange={handelChange}
        />
      </div>
      <div>
        <label >Phone Number:</label>
        <input
          name="phone"
          type="number"
          id="phone"
          value={user.phone}
          onChange={handelChange}
        />
      </div>
      <div>
        <label>Work:</label>
        <input
          name="work"
          type="text"
          id="work"
          value={user.work}
          onChange={handelChange}
        />
      </div>
      <div>
        <label>Password:</label>
        <input
          name="password"
          type="password"
          id="password"
          value={user.password}
          onChange={handelChange}
        />
      </div>
      <div>
        <label>Confirm Password:</label>
        <input
          name="cpassword"
          type="password"
          id="cpassword"
          value={user.cpassword}
          onChange={handelChange}
        />
      </div>
      <button type="submit">Sign Up</button>
    </form>
  );
};

export default Signup;
