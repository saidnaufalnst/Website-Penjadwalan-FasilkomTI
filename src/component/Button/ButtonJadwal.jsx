import React from 'react'
import { useNavigate } from 'react-router-dom';

const ButtonJadwal = () => {
  const navigate = useNavigate();
  
    const jadwal= () =>{
      navigate ('/page/admin/proses/jadwal');
    }
  return (
    <div>
        <div className="">
            <button type="button" onClick={jadwal} className="w-[117px] h-[45px] text-black hover:text-white bg-[#DBDBDB] hover:bg-[#03965C] font-medium rounded-lg text-base px-4 py-2.5">
                Detail
            </button>
        </div>
    </div>
  )
}

export default ButtonJadwal