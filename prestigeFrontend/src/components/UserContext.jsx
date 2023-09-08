import { createContext, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState(null);
  const [userFirstName, setUserFirstName] = useState(null);
  const [userLastName, setUserLastName] = useState(null);
  const [userTitle, setUserTitle] = useState(null);
  const [userType, setUserType] = useState(null); // Nouveau

  const navigate = useNavigate();

  const handleLogout = () => {
    console.log('Déconnexion en cours...');
    setIsLoggedIn(false);
    setUserData(null);
    setUserFirstName(null);
    setUserLastName(null);
    setUserTitle(null);
    setUserType(null); // Nouveau
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userFirstName');
    localStorage.removeItem('userLastName');
    localStorage.removeItem('userTitle');
    localStorage.removeItem('userType'); // Nouveau
    localStorage.removeItem('authToken');
    navigate('/');
  };

  const handleLogin = (firstName, lastName, title, type, userData, authToken) => {
    setIsLoggedIn(true);
    setUserFirstName(firstName);
    setUserLastName(lastName);
    setUserTitle(title);
    setUserType(type); // Nouveau
    setUserData(userData);
    localStorage.setItem('isLoggedIn', true);
    localStorage.setItem('userFirstName', firstName);
    localStorage.setItem('userLastName', lastName); // Nouveau
    localStorage.setItem('userTitle', title); // Nouveau
    localStorage.setItem('userType', type); // Nouveau
    localStorage.setItem('authToken', authToken);
  };
  
  return (
    <UserContext.Provider
      value={{
        isLoggedIn,
        setIsLoggedIn,
        userData,
        setUserData,
        userFirstName,
        setUserFirstName,
        userLastName,
        setUserLastName,
        userTitle,
        setUserTitle,
        userType, // Nouveau
        setUserType, // Nouveau
        handleLogout,
        handleLogin,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  return useContext(UserContext);
};
