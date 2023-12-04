import React, {useEffect, useState} from 'react'
import { Outlet, useNavigate, useLocation } from 'react-router-dom'
import axios from 'axios'

const TableReservasiAll = () => {
    const [dataReservasi, setDataReservasi] = useState([]);
    const [dataChanged, setDataChanged] = useState(false);
    const [searchData, setSearchData] = useState("");
    const navigate = useNavigate();
    const location = useLocation();
    const data = new URLSearchParams(location.search).get('dataChanged');
    const refreshData = data === 'true';
    
    useEffect(() =>{
        getDataReservasi();
    },[]);

    useEffect(() => {
      if (dataChanged) {
        getDataReservasi();
        setDataChanged(false);
      }
    }, [dataChanged]);

    useEffect(() =>{
        if (refreshData){
            getDataReservasi();

            const newSearch = new URLSearchParams(location.search);
            newSearch.delete('dataChanged');
            navigate({ search: `?${newSearch.toString()}` });
        }
    }, [refreshData])

    const getDataReservasi = async() =>{
        try{
            const response = await axios.get(`reservasi`);
            const data = response.data.data;
            data.sort((a, b) => a.pengampu.dosen.name.localeCompare(b.pengampu.dosen.name));
            setDataReservasi(data);
        }
        catch(error) {
            console.error(error);
        }
    }

    const detailButton = (id) => {
        navigate(`/page/user/reservasi/detail-reservasi/${id}`);
    }

    const filteredDataReservasi = dataReservasi.filter((reservasi) => {
        return reservasi.pengampu.dosen.name.toLowerCase().includes(searchData.toLowerCase());
    });
  return (
    <div className="flex justify-center items-center w-full h-full">
        <div className="w-full h-full py-6 px-10 bg-white border border-gray-200 rounded-br-2xl rounded-tl-2xl table-style overflow-hidden">
            <div className="overflow-hidden w-full h-full card px-5">
                <table className="w-full">
                    <thead className="sticky top-0 z-50 bg-white border-b">
                        <tr className="text-black text-center text-xl border-b">
                            <th className="py-4 px-6 w-[600px] font-medium">
                                Nama Dosen
                            </th>
                            <th className="py-4 px-6 w-[200px] font-medium">
                                Ruangan
                            </th>
                            <th className="py-4 px-6 w-[200px] font-medium">
                                Hari
                            </th>
                            <th className="py-4 px-6 w-[200px] font-medium">
                                Jam
                            </th>
                            <th className="py-4 px-6 w-[200px] font-medium">
                                Status
                            </th>
                            <th className="py-4 px-12 w-[200px] text-right font-medium">
                                Aksi
                            </th>
                        </tr>
                    </thead>
                    <tbody className="">
                        {filteredDataReservasi.map((item)=>(
                            <tr key={item.id} className="border-b text-center text-black text-[13px]">
                                <td className="py-5">
                                    {item.pengampu.dosen.name}
                                </td>
                                <td className="py-5">
                                    {item.ruangan.nama}
                                </td>
                                <td className="py-5">
                                    {item.hari.nama}
                                </td>
                                <td className="py-5">
                                    {item.jam.awal} - {item.jam.akhir}
                                </td>
                                <td className="py-5">
                                    {item.status == null ? "-" : item.status}
                                </td>
                                <td className="py-5 px-[55px] text-right">
                                    <button onClick={()=> detailButton(item.id)}>
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path fillRule="evenodd" clipRule="evenodd" d="M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12ZM13 8C13 8.55228 12.5523 9 12 9C11.4477 9 11 8.55228 11 8C11 7.44772 11.4477 7 12 7C12.5523 7 13 7.44772 13 8ZM13 17V11H11V17H13Z" fill="#A6A6A6"/>
                                        </svg>
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    </div>
  )
}

export default TableReservasiAll
