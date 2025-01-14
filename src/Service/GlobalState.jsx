import React, { createContext, useState, useContext, useEffect } from "react";

// Create a Context
const GlobalStateContext = createContext();

// Function to get default user info
const logoutUser = () => ({
  email: '',
  fullName: '',
  gender: '',
  age: '',
  phone: '',
  profileImage: '',
  status: '',
  userId: '',
  zipcode: '',
});

// Function to get default profile ID
const getDefaultProfileID = () => 0;

// Function to get data from local storage
const getLocalData = () => {
  const localData = localStorage.getItem('userInfo');
  return localData ? JSON.parse(localData) : logoutUser();
};

const getLocalProfileID = () => {
  const profileID = localStorage.getItem('profileID');
  return profileID ? JSON.parse(profileID) : getDefaultProfileID();
};

// Define a provider component
export const GlobalStateProvider = ({ children }) => {

  // Initialize state with local data or default values
  const [userInfo, setUserInfo] = useState(getLocalData);
  const [profileID, setProfileID] = useState(getLocalProfileID);

  // Update local storage whenever userInfo or profileID changes
  useEffect(() => {
    localStorage.setItem('userInfo', JSON.stringify(userInfo));
  }, [userInfo]);

  useEffect(() => {
    localStorage.setItem('profileID', JSON.stringify(profileID));
  }, [profileID]);

  // Define the state functions

  const handleUserInfo = (e) => {
    const { name, value } = e.target;
    setUserInfo((prevInfo) => ({
      ...prevInfo,
      [name]: value,
    }));
  };

  const updateProfileID = (newProfileID) => {
    setProfileID(newProfileID);
  };

  return (
    <GlobalStateContext.Provider value={{ userInfo, handleUserInfo, logoutUser, profileID, updateProfileID }}>
      {children}
    </GlobalStateContext.Provider>
  );
};

// Custom hook to use the context
export const useGlobalState = () => useContext(GlobalStateContext);
