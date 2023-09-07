//UserContext
import { createContext, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';


const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState(null);
  const [userFirstName, setUserFirstName] = useState(null);

  const navigate = useNavigate();

  const handleLogout = () => {
    console.log('Déconnexion en cours...');
    setIsLoggedIn(false);
    setUserData(null);
    setUserFirstName(null); // Ajoute cette ligne
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userFirstName');
    localStorage.removeItem('authToken');
    navigate('/');
  };
  const handleLogin = (firstName, userData,authToken) => {
    setIsLoggedIn(true);
    setUserFirstName(firstName);  // <-- C'est ici que userFirstName est mis à jour
    setUserData(userData);
    localStorage.setItem('isLoggedIn', true);
    localStorage.setItem('userFirstName', firstName);
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
