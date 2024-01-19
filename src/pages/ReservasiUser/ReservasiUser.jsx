import React, {useEffect, useState} from 'react'
import { Outlet, useNavigate, useLocation } from 'react-router-dom'
import axios from 'axios'
import ButtonReservasiUser from '../../component/Button/ButtonReservasiUser';
import NavReservasiUser from '../../component/Bar&Navigation/NavReservasiUser';

const ReservasiUser = () => {
    const [searchData, setSearchData] = useState("");
    const navigate = useNavigate();
    const location = useLocation();

    const isReservasiSemua = location.pathname.includes('/reservasi-semua');
    const isReservasiPribadi = location.pathname.includes('/reservasi-pribadi');

    useEffect(() =>{
        navigate("/page/user/reservasi/reservasi-semua");
    },[]);

    const handleSearch = (e) => {
        e.preventDefault();
        setSearchData(e.target.value)
        navigate(`/page/user/reservasi/reservasi-semua?searchData=${e.target.value}`);
    };

  return (
    <div className="h-full">
        <div className="flex justify-center h-[70%]">
            <div className="w-[90%]">
                <div className="mt-5 mb-10">
                    <span className="text-[#202020] font-bold text-3xl">
                        RESERVASI
                    </span>
                </div>
                
                <div className="flex justify-between">
                    {isReservasiSemua ? (
                        <form>   
                            <div className="relative justify-start">
                                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                                    <svg className="w-4 h-4 text-gray-500 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                                    </svg>
                                </div>
                                <input 
                                    type="input" 
                                    id="default-search" 
                                    autoComplete='off'
                                    value={searchData}
                                    onChange={handleSearch}
                                    className="block h-[45px] w-[368px] p-4 text-sm text-gray-900 border border-gray-400 rounded-lg bg-white" placeholder="Cari Reservasi" />
                            </div>
                        </form>
                    ) : isReservasiPribadi ? (
                        <ButtonReservasiUser/>
                    ) : null}
                    <NavReservasiUser/>
                </div>
                
                <Outlet/>
            </div>
        </div>
    </div>
  )
}

export default ReservasiUser;