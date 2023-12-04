import React from 'react';
import SideNavbar from '../../component/Bar&Navigation/SideNavbar';
import { Navigate, Outlet } from 'react-router-dom';
import SideNavbarUser from '../../component/Bar&Navigation/SideNavbarUser';

const Dashboard = () => {
  const role = localStorage.getItem("role");

  return (
      <div className="flex h-screen">
        { role === "1" ? <SideNavbar/> : role === "2" ? <SideNavbarUser/> : <Navigate to= {"/login"}/>}
        <Outlet/>
      </div>

  )
}

export default Dashboard
