import React, {useEffect, useState} from 'react'
import { Outlet } from 'react-router-dom'
import axios from 'axios'

const AccountSetting = () => {
    const [dataUser, setDataUser] = useState([]);
    const [dataChanged, setDataChanged] = useState(false);
    const [searchData, setSearchData] = useState("");
    const [statusUser, setStatusUSer] = useState(true);
    
    useEffect(() =>{
        getDataUser();
    },[]);

    useEffect(() => {
      if (dataChanged) {
        getDataUser();
        setDataChanged(false);
      }
    }, [dataChanged]);

    const getDataUser = async() =>{
        try{
            const response = await axios.get(`/get-user`);
            const data = response.data.data;
            setDataUser(data);
        }
        catch(error) {
            console.error(error);
        }
    }

    const handleStatusChange = async (userId, currentStatus) => {
        const newStatus = currentStatus === 'Active' ? 'Not Active' : 'Active';
        const id = userId;

        try {
            const response = await axios.post(`/confirm-user`, { "status": newStatus, "id": id });
            if (response.data.status === "Succes") {
                setDataChanged(true);
            }
        } catch (error) {
            console.error(error);
        }
    };

    const filteredDataUser = dataUser.filter((user) => {
        return user.name.toLowerCase().includes(searchData.toLowerCase());
    });

  return (
    <div className="h-full">
        <Outlet/>
        <div className="flex justify-center h-[70%]">
            <div className="w-[90%]">
                <div className="mt-5 mb-10">
                    <span className="text-[#202020] font-bold text-3xl">
                        PENGATURAN AKUN
                    </span>
                </div>
                
                <div className="flex justify-between mx-auto mb-7">
                    <form>   
                        <div className="relative justify-start">
                            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                                <svg className="w-4 h-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                                </svg>
                            </div>
                            <input 
                                type="input" 
                                id="default-search" 
                                autoComplete='off'
                                value={searchData}
                                onChange={(e) => setSearchData(e.target.value)}
                                className="block h-[45px] w-[368px] p-4 text-sm text-gray-900 border border-gray-400 rounded-lg bg-white" placeholder="Cari Akun" />
                        </div>
                    </form>
                </div>
                
                <div className="flex justify-center items-center w-full h-full">
                    <div className="w-full h-full bg-white border border-gray-200 rounded-br-2xl rounded-tl-2xl table-style overflow-hidden">
                        <div className="overflow-hidden w-full h-full card">
                            <table className="w-full">
                                <thead className="sticky top-0 z-50 bg-[#03965C]">
                                    <tr className="text-white text-center text-[15px]">
                                        <th className="py-5 px-6 w-[350px] font-medium">
                                            Nama
                                        </th>
                                        <th className="py-5 px-6 w-[300px] font-medium">
                                            Email
                                        </th>
                                        <th className="py-5 px-[52px] w-[350px] text-right font-medium">
                                            Status
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="">
                                {filteredDataUser.map((item) => (
                                    <tr key={item.id} className="border-b text-center text-black text-[13px]">
                                        <td className="py-5">{item.name}</td>
                                        <td className="py-5">{item.email}</td>
                                        <td className="py-5 px-[57.5px] text-right">
                                            <div className='flex items-center justify-end'>
                                                <label className="relative inline-flex items-center cursor-pointer">
                                                    <input 
                                                        type="checkbox" 
                                                        checked={item.status === 'Active'}
                                                        className="sr-only peer"
                                                        onClick={() => handleStatusChange(item.id, item.status)}
                                                    />
                                                    <div className={`w-9 h-5 ${item.status === 'Active' ? 'bg-green-500' : 'bg-red-500'} rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all`}></div>
                                                </label>
                                            </div>
                                        </td>
                                    </tr>
                                ))}


                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default AccountSetting