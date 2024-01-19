import React from 'react';
import logo_fasilkom from '../../assets/image/logo_fasilkom.png'

const Toolbar = () => {
  return (
    <div className="bg-[#03965C] w-full h-[76px]">
        <div className="flex justify-center h-full items-center">
            <img src={logo_fasilkom} alt="" className="w-[51px] h-[51px]"/>
            <span className="text-white px-2 font-semibold">Ilmu Komputer</span>
        </div>
    </div>
  )
}

export default Toolbar