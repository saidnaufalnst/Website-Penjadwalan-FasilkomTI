import React, { createContext, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import Swal from 'sweetalert2';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();

  const login = async (userData) => {
    try {
        const response = await axios.post(`/login`, userData);
    
        if (response.data.status === true) {
          const role = response.data.message.user.role;
          const user = response.data.message.user.name;
          const token = response.data.message.token;
          localStorage.setItem('token', token);
          localStorage.setItem('user', user);
          localStorage.setItem('role', role);
  
          Swal.fire({
            title: "Berhasil!",
            text: "Login Berhasil",
            icon: "success",
            showConfirmButton: false,
            timer: 1500,
            willClose: () => {
              if (parseInt(role) === 1) {
                navigate("/page/admin/home", {replace: true});
              } else if (parseInt(role) === 2) {
                navigate("/page/user/home", {replace: true});
              }
            },
          }); 
        } else {
          Swal.fire({
            title: "Gagal!",
            text: response.data.message,
            icon: "error",
            showConfirmButton: false,
            timer: 1500,
          });
          
          console.log('Authentication failed:', response.data.message);
        }
      } catch (error) {
        console.error('An error occurred during login:', error);
      }
  };

  const register = async (userData) => {
    await axios.post('/register', userData)
    .then(() => {
      Swal.fire({
        title: "Berhasil!",
        text: "Register Berhasil",
        icon: "success",
        showConfirmButton: false,
        timer: 1500,
        willClose: () => {
          navigate("/login"); 
        },
      });
    })
    .catch((error) => {
      Swal.fire({
        title: "Gagal!",
        text: error.data.message,
        icon: "error",
        showConfirmButton: false,
        timer: 1500,
      });
    })
  };

  const logout = () => {
      try {
        axios.post('/logout')
        .then(() => {
            localStorage.removeItem('token');
            localStorage.removeItem('role');
            localStorage.removeItem('user');
            Swal.fire({
              title: "Berhasil!",
              text: "Log Out Berhasil",
              icon: "success",
              showConfirmButton: false,
              timer: 1500,
              willClose: () => {
                navigate("/", {replace:true}); 
              },
            });
          })
      } catch (error) {
        console.error('An error occurred during logout:', error);
      }
  };
  

  return (
    <AuthContext.Provider value={{ login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
