import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Admin() {
  const navigate = useNavigate();

  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    axios.get('http://localhost:5000/admin', { withCredentials: true })
      .then(response => {
        const userRole = response.data.role;
        console.log(userRole);
        if (userRole === 1) {
          setIsAdmin(true);
        } else {
          setErrorMessage("You are not authorized to view this page.");
        }
        setIsLoading(false);
      })
      .catch(error => {
        if (error.response && error.response.status === 401) {
          setErrorMessage("You are not authorized to view this page.");
        } else {
          setErrorMessage("An error occurred. Please try again later.");
        }
        setIsLoading(false);
      });
  }, []);

  return (
    <div>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        errorMessage ? (
          <p>{errorMessage}</p>
        ) : (
          isAdmin ? (
            <h2>Hello admin, you are authorized to view this page.</h2>
          ) : (
            <p>You are not authorized to view this page.</p>
          )
        )
      )}
    </div>
  );
}

export default Admin;
