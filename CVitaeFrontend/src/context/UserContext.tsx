import React, { createContext, useState, useEffect, ReactNode, useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { verifyToken } from '../api/authApi';
import { User }  from '../types';

interface UserContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  isLoading: boolean;
}

export const UserContext = createContext<UserContextType | undefined>(undefined);

export const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUserContext must be used within a UserProvider");
  }
  return context;
};

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      setIsLoading(false);
      if (location.pathname !== "/authenticate") {
        navigate("/authenticate");
      }
      return;
    }

    verifyToken(token)
      .then((data) => {
        setUser({ _id: data._id, email: data.email, role : data.role });
      })
      .catch(() => {
        localStorage.removeItem("token");
        setUser(null);
        if (location.pathname !== "/authenticate") {
          navigate("/authenticate");
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [navigate, location.pathname]);

  return (
    <UserContext.Provider value={{ user, setUser, isLoading }}>
      {children}
    </UserContext.Provider>
  );
};