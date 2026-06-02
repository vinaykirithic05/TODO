// client/src/context/AuthContext.jsx
import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";
// Creating AuthContext namespace
export const AuthContext = createContext();
// Define the Provider Component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  // Synchronize authentication status on app startup/ refresh
  useEffect(() => {
    const bootstrapAuth = () => {
      const token = localStorage.getItem("token");
      const storedUser = localStorage.getItem("user");
      if (token && storedUser) {
        // Parse the stored user details back into statu
        setUser(JSON.parse(storedUser));
        // Configure Axios default headers to attach the token to all future headers
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      }
      setLoading(false);
    };
    bootstrapAuth();
  }, []);
  // Action : Log in the user
  const login = async (email, password) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/auth/login`,
        { email, password },
      );
      const { token, ...userData } = response.data;
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(userData));
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      setUser(userData);
      return response;
    } catch (error) {
      throw error;
    }
  };
  // Action : Register the user
  const register = async(username , email , password) => {
    try {
        const response = await axios.post(`${import.meta.env.VITE_API_URL}/auth/register`,{username,email,password})
        const {token , ...userData} = response.data;
        localStorage.setItem('token' , token);
        localStorage.setItem('user',JSON.stringify(userData));
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        setUser(userData)
        return response;

    } catch (error) {
      throw error;
    }
  }
  // Action: Logout the user
  const logout = () =>{
    // Clear local Storage Cache
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    // Remove the Axios header
    delete axios.defaults.headers.common['Authorization'];
    setUser(null)
  };
  const value = {user,loading , login, logout,register}
  return(
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
};

const useAuth  = () => useContext(AuthContext);
export default useAuth;
