import React from 'react';
import './App.css';
import Routing from '../config/routes/RouteService';
import { AuthProvider } from '../config/auth/Auth';
import axios from 'axios';

axios.defaults.baseURL = "http://62.72.56.116:80/api";
axios.defaults.headers.post['Content-Type'] = "application/json";
axios.defaults.headers.post['Accept'] = "application/json";

axios.interceptors.request.use(function (config){
  const token = localStorage.getItem('token');
  config.headers.Authorization = token ? `Bearer ${token}` : '';

  return config;
})

function App() {
  return (
    <AuthProvider>
      <div className='App'>
        <Routing />
      </div>
    </AuthProvider>
  );
}

export default App;
