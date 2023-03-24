import { createContext, useContext, useState, useEffect } from "react";
import fire from "../controller/firebase";
import Cookies from "js-cookie";

const UserContext = createContext({});

export default function UserContextProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState({
    username: '',
    fullname: '',
    email: '',
    avatar: '',
    total_score: 0
  })

  const contextLogin = (data) => {
    setIsAuthenticated(true);
    setUser({
      username: data.username,
      fullname: data.fullname,
      email: data.email,
      avatar: data.avatar,
      total_score: data.total_score
    });
  };

  const contextLogout = () => {
    setIsAuthenticated(false);
    setUser({
      username: '',
      fullname: '',
      email: '',
      avatar: '',
      total_score: 0
    });
  };

 

  const updateTotalScore = (score) => {
    const updated = {
      ...user,
      total_score: score
    }
    Cookies.set("profile", JSON.stringify(updated));
  }

  const fromCookies = Cookies.get("profile")

  useEffect(() => {
    function loadUserFromCookies(profile) {
      if (profile) {
        const user = JSON.parse(profile)
        console.log('user from cookies', user)
        contextLogin(user);
      } else {
        contextLogout();
      }
    }
    loadUserFromCookies(fromCookies);
}, [fromCookies])

  return (
    <UserContext.Provider value={{
      isAuthenticated,
      user,
      contextLogin,
      contextLogout,
      updateTotalScore,
    }}>
      {children}
    </UserContext.Provider>
  );
}

export const useAuth = () => useContext(UserContext);