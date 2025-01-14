// ApiDataContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from "react-router-dom";

const ApiDataContext = createContext();

export const ApiDataProvider = ({ children }) => {
    const [schoolData, setSchoolData] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    useEffect(() => {
        const email = sessionStorage.getItem("schoolEmail");
        if (email) {
          fetchSchoolData(email);
        } else {
          // navigate('/auth/schoollogin');
        }
      }, [navigate]);
    
      const fetchSchoolData = async (email) => {
        try {
          const response = await fetch(
            `https://codtsmartschool.strangeweb.in/schoolapi/tschool.php?email_id=${email}`
          );
          const data = await response.json();
        
          if (data.length > 0) {
            setSchoolData(data[0]);
          }
        } catch (error) {
          console.error("Error fetching school data:", error);
        }
      };

    return (
        <ApiDataContext.Provider value={{ schoolData, loading, error, refetch: fetchSchoolData }}>
            {children}
        </ApiDataContext.Provider>
    );
};

export const useApiData = () => useContext(ApiDataContext);
