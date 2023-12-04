import React from 'react'
import { useNavigate } from 'react-router-dom';

const ButtonTambahJadwal = () => {
  const navigate = useNavigate();
  
    const jadwal= () =>{
      navigate ('/page/admin/proses/jadwal/tambah-jadwal');
    }
  return (
    <div>
        <div className="">
            <button type="button" onClick={jadwal} className="w-[117px] h-[45px] text-white bg-[#03965C] hover:bg-green-600 font-medium rounded-lg text-base px-4 py-2.5">
                Tambah +
            </button>
        </div>
    </div>
  )
}

export default ButtonTambahJadwal