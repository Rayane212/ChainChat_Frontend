import React, { createContext, useState, useEffect } from "react";
import { api } from "../utils/apiMiddleware";

interface User {
  id: string;
  username: string;
  email: string;
}

interface RegisterData {
  lastName: string;
  firstName: string;
  phoneNumber: string;
  bio?: string;
  birthday: string;
  avatar?: File;
  username: string;
  email: string;
  password: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, username : string, password: string) => Promise<void>;
  register: (data: RegisterData ) => Promise<void>;
  logout: () => void;
}

const defaultAuthContext: AuthContextType = {
  user: null,
  login: async () => { throw new Error("AuthContext not initialized") },
  register: async () => { throw new Error("AuthContext not initialized") },
  logout: () => { throw new Error("AuthContext not initialized") },
};

export const AuthContext = createContext<AuthContextType | null>(defaultAuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    async function fetchUser() {
      try {
        const userData = await api.getUserProfile();
        setUser(userData);
      } catch (error) {
        console.error("Utilisateur non authentifié");
      }
    }
    fetchUser();
  }, []);

  const login = async (email: string, username: string, password: string) => {
    await api.login(email, password);
    const userData = await api.getUserProfile();
    console.log(userData);
    setUser(userData);
  };

  const register = async (data: RegisterData) => {
    console.log(data);
    const formData = new FormData();
    formData.append("firstName", data.firstName);
    formData.append("lastName", data.lastName);
    formData.append("phoneNumber", data.phoneNumber);
    if (data.bio) formData.append("bio", data.bio);
    formData.append("birthday", data.birthday);
    if (data.avatar) formData.append("avatar", data.avatar);
    formData.append("username", data.username);
    formData.append("email", data.email);
    formData.append("password", data.password);

    console.log(formData.values);

    const registerDTO = {
      lastName: data.lastName,
      firstName: data.firstName,
      phoneNumber: data.phoneNumber,
      bio: data.bio,
      avatar: data.avatar,
      birthday: data.birthday,
      username: data.username,
      email: data.email,
      password: data.password,
    }

    await api.register(registerDTO);
  };

  const logout = () => {
    api.logout();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
