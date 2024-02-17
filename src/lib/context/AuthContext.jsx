import { createContext, useContext, useEffect, useState } from "react";
import { getAccount } from "../axios/api";
import { useNavigate } from "react-router-dom";

const DEFAULT_USER = {
  id: "",
  name: "",
  email: "",
};

const INTIAL_STATE = {
  user: DEFAULT_USER,
  isLoading: false,
  isAuthenticated: false,
  activeRoomId: "",
  setUser: () => {},
  setIsAuthenticated: () => {},
  checkAuthUser: async () => false,
  setActiveRoomId: () => {},
};

const AuthContext = createContext(INTIAL_STATE);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(DEFAULT_USER);
  const [isLoading, setIsLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeRoomId, setActiveRoomId] = useState("");
  const navigate = useNavigate();
  const checkAuthUser = async () => {
    setIsLoading(true);
    try {
      const currentUser = await getAccount();
      console.log(currentUser);
      setIsAuthenticated(true);
      setUser({
        id: currentUser?.id,
        name: currentUser?.name,
        email: currentUser?.email,
      });
      return true;
    } catch (err) {
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const cookie = localStorage.getItem("cloakCode");
    if (!cookie || cookie.length == 0) {
      navigate("/signIn");
    }
    checkAuthUser();
  }, []);

  const value = {
    user,
    isLoading,
    isAuthenticated,
    activeRoomId,
    setUser,
    setIsAuthenticated,
    checkAuthUser,
    setActiveRoomId,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

const useAuth = () => useContext(AuthContext);

export { AuthProvider, useAuth };
