import React from 'react'
import { NavLink } from 'react-router-dom';

const NavReservasiUser = () => {
  return (
    <div className="flex gap-3 mb-5">
        <NavLink to="/page/user/reservasi/reservasi-semua" className="bg-[#DBDBDB] hover:bg-[#03965C] hover:text-white flex justify-center nav-reservasi-user text-[#4D4D4D] h-[45px] w-[117px] rounded-lg font-medium px-4 py-2.5 mb-2">
            <span className="">Semua</span>
        </NavLink>

        <NavLink to="/page/user/reservasi/reservasi-pribadi" className="bg-[#DBDBDB] hover:bg-[#03965C] hover:text-white flex justify-center nav-reservasi-user h-[45px] w-[117px] rounded-lg font-medium px-4 py-2.5 text-[#4D4D4D] mb-2">
            <span className="">Pribadi</span>
        </NavLink>
    </div>

  )
}

export default NavReservasiUser