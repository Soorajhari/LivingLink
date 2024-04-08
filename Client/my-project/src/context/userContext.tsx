// UserContext.tsx
import React, { createContext, useState } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
}

interface UserContextValue {
  user: User | null;
  updateUser: (newUser: User | null) => void;
}

const UserContext = createContext<UserContextValue | null>(null);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  const updateUser = (newUser: User | null) => {
    setUser(newUser);
  };

  const value: UserContextValue = { user, updateUser };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export default UserContext;

