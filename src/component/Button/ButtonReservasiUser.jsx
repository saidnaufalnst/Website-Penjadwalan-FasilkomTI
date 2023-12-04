import React from 'react'
import { useNavigate } from 'react-router-dom';

const ButtonReservasiUser = () => {
    const navigate = useNavigate();
    const openModal= () =>{
        navigate("/page/user/reservasi/reservasi-pribadi/tambah-reservasi")
    }
  return (
    <div>
        <div className="flex justify-start mb-5">
            <button type="button" onClick={openModal} className="w-[117px] h-[45px] text-white bg-[#03965C] hover:bg-green-600 font-medium rounded-lg text-base px-4 py-2.5 mb-2">
                Tambah +
            </button>
        </div>
    </div>
  )
}

export default ButtonReservasiUser