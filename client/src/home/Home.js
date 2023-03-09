import axios from "axios";
import React, { useState, useEffect } from "react";
function Home() {
    const [message, setMessage] = useState("");

  useEffect(() => {
    
    axios
      .get("/", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then((res) => setMessage(res.data.message))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div>
      <h1>Welcome to the home page!</h1>
      <p>Click on the button below to go to the about page.</p>
      <button>Go to about page</button>
      <h2>{message}</h2>
    </div>
  );
}

export default Home;