import React from 'react'
import { useNavigate } from 'react-router-dom';

const ButtonBackToProses = () => {
  const navigate = useNavigate();
  
    const jadwal= () =>{
      navigate ('/page/admin/proses');
    }
  return (
    <div>
        <div className="">
            <button type="button" onClick={jadwal} className="w-[117px] h-[45px] text-black hover:text-white bg-[#DBDBDB] hover:bg-[#03965C] font-medium rounded-lg text-base px-4 py-2.5">
                Kembali
            </button>
        </div>
    </div>
  )
}

export default ButtonBackToProses