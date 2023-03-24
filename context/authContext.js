import { createContext, useContext, useState, useEffect } from "react";
import fire from "../controller/firebase";
import Cookies from "js-cookie";

const UserContext = createContext({});

export default function UserContextProvider({ children }) {
  const fromCookies = Cookies.get("profile");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState({
    username: 'Visitor',
    fullname: '',
    email: '',
    avatar: '',
    total_score: 0
  })

  const contextLogin = () => {
    const fromCookies = Cookies.get("profile");
    const data = JSON.parse(fromCookies)
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
      username: 'Visitor',
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

  useEffect(() => {
    function loadUserFromCookies(profile) {
      if (profile) {
        contextLogin();
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