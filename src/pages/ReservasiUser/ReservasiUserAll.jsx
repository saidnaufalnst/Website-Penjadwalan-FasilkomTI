import React, {useEffect, useState} from 'react'
import { Outlet, useNavigate, useLocation } from 'react-router-dom'
import axios from 'axios'
import format from 'date-fns/format';

const ReservasiUserAll = () => {
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

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const searchDataParam = params.get('searchData');
        if (searchDataParam || searchDataParam === "") {
          setSearchData(searchDataParam);
        }

        const newSearch = new URLSearchParams(location.search);
        newSearch.delete('searchData');
        navigate({ search: `?${newSearch.toString()}` });
      }, [location.search]);

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
            setDataReservasi(data);
        }
        catch(error) {
            console.error(error);
        }
    }

    const detailButton = (id) => {
        navigate(`/page/user/reservasi/reservasi-semua/detail-reservasi/${id}`);
    }

    const filteredDataReservasi = dataReservasi.filter((reservasi) => {
        return reservasi.pengampu.dosen.name.toLowerCase().includes(searchData.toLowerCase()) || reservasi.hari.nama.toLowerCase().includes(searchData.toLowerCase()) || reservasi.ruangan.nama.toLowerCase().includes(searchData.toLowerCase());
    });

  return (
    <div className="h-full">
        <Outlet/>
        <div className="flex justify-center h-full">
            <div className="w-full">
                <div className="flex justify-center items-center w-full h-full">
                    <div className="w-full h-full bg-white border border-gray-200 rounded-br-2xl rounded-tl-2xl table-style overflow-hidden">
                        <div className="overflow-hidden w-full h-full card">
                            <table className="w-full">
                                <thead className="sticky top-0 z-50 bg-[#03965C]">
                                    <tr className="text-white text-center text-[15px]">
                                        <th className="py-5 px-6 w-[600px] font-medium">
                                            Nama Dosen
                                        </th>
                                        <th className="py-5 px-6 w-[200px] font-medium">
                                            Ruangan
                                        </th>
                                        <th className="py-5 px-6 w-[200px] font-medium">
                                            Tanggal
                                        </th>
                                        <th className="py-5 px-6 w-[200px] font-medium">
                                            Jam
                                        </th>
                                        <th className="py-5 px-6 w-[200px] font-medium">
                                            Status
                                        </th>
                                        <th className="py-5 px-[52px] w-[200px] text-right font-medium">
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
                                                {item.hari.nama}, {(format(Date.parse(item.tanggal), 'dd-MM-yyyy'))}
                                            </td>
                                            <td className="py-5">
                                                {item.jam.awal} - {item.jam.akhir}
                                            </td>
                                            <td className="py-5">
                                                {item.status == null ? "-" : item.status}
                                            </td>
                                            <td className="py-5 px-[52px] flex justify-end text-right">
                                                <div className='flex items-center'>
                                                    <button onClick={()=> detailButton(item.id)}>
                                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path fillRule="evenodd" clipRule="evenodd" d="M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12ZM13 8C13 8.55228 12.5523 9 12 9C11.4477 9 11 8.55228 11 8C11 7.44772 11.4477 7 12 7C12.5523 7 13 7.44772 13 8ZM13 17V11H11V17H13Z" fill="#A6A6A6"/>
                                                        </svg>
                                                    </button>
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

export default ReservasiUserAll;