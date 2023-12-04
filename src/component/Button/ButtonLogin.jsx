import React from 'react'
import { useNavigate } from 'react-router-dom';

const ButtonLogin = () => {
    const navigate = useNavigate();
    const login= () =>{
        navigate("/login")
    }
  return (
    <div>
        <div className="">
            <button type="button" onClick={login} className="w-[117px] h-[45px] text-white bg-[#03965C] hover:bg-green-600 font-medium rounded-lg text-base px-4 py-2.5">
                Masuk
            </button>
        </div>
    </div>
  )
}

export default ButtonLogin