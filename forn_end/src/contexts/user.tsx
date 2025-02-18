import React, { createContext, useState, useContext, ReactNode } from "react";
import { UsersLogin } from "../interface";


interface UserContextType {
  user: UsersLogin | null;
  setUser: React.Dispatch<React.SetStateAction<UsersLogin | null>>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useuser must be used within a userProvider");
  }
  return context;
};

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [user, setUser] = useState<UsersLogin | null>(null);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
