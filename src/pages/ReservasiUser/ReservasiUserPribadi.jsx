import React, {useEffect, useState} from 'react'
import { Outlet, useNavigate, useLocation } from 'react-router-dom'
import axios from 'axios'
import format from 'date-fns/format';

const ReservasiUserPribadi = () => {
    const [dataReservasi, setDataReservasi] = useState([]);
    const [dataChanged, setDataChanged] = useState(false);
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
            const response = await axios.get(`/my-reservasi`);
            const data = response.data.data;
            setDataReservasi(data);
        }
        catch(error) {
            console.error(error);
        }
    }

    const detailButton = (id) => {
        navigate(`/page/user/reservasi/reservasi-pribadi/detail-reservasi/${id}`);
    }

    const deleteDataReservasi = async (id) => {
        const isDeleteData = window.confirm("Apakah Anda yakin ingin menghapus data ini?");

        if (isDeleteData){
            try {
                await axios.delete(`reservasi/${id}`);
                const filteredArray = dataReservasi.filter((item) => item.id !== id);
                setDataReservasi(filteredArray);
                setDataChanged(true);
              } catch (error) {
                console.error(error);
              }
        }
      };

  return (
    <div className="h-full">
        <Outlet/>
        <div className="flex justify-center h-full">
            <div className="w-full">
                <div className="flex justify-center items-center w-full h-full">
                    <div className="w-full h-full bg-white border border-gray-200 rounded-br-2xl rounded-tl-2xl table-style overflow-hidden">
                        <div className="overflow-hidden w-full h-full card">
                            <table className="w-full">
                                <thead className="sticky top-0 z-50 bg-[#03965C] ">
                                    <tr className="text-white text-center text-[15px]">
                                        <th className="py-5 px-6 w-[600px] font-medium">
                                            Nama Dosen
                                        </th>
                                        <th className="py-5 px-6 w-[150px] font-medium">
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
                                    {dataReservasi.map((item)=>(
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
                                            <td className="py-5 px-[38px] text-right">
                                                {item.status == null ? (
                                                    <div className='flex justify-end gap-3'>
                                                        <div className='flex items-center'>
                                                            <button onClick={()=> detailButton(item.id)}>
                                                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                    <path fillRule="evenodd" clipRule="evenodd" d="M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12ZM13 8C13 8.55228 12.5523 9 12 9C11.4477 9 11 8.55228 11 8C11 7.44772 11.4477 7 12 7C12.5523 7 13 7.44772 13 8ZM13 17V11H11V17H13Z" fill="#A6A6A6"/>
                                                                </svg>
                                                            </button>
                                                        </div>
                                                        <div className='flex items-center'>
                                                            <button onClick={() => deleteDataReservasi(item.id)}>
                                                                <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                    <path fillRule="evenodd" clipRule="evenodd" d="M21 6H3V9C4.10457 9 5 9.89543 5 11V15C5 17.8284 5 19.2426 5.87868 20.1213C6.75736 21 8.17157 21 11 21H13C15.8284 21 17.2426 21 18.1213 20.1213C19 19.2426 19 17.8284 19 15V11C19 9.89543 19.8954 9 21 9V6ZM10.5 11C10.5 10.4477 10.0523 10 9.5 10C8.94772 10 8.5 10.4477 8.5 11V16C8.5 16.5523 8.94772 17 9.5 17C10.0523 17 10.5 16.5523 10.5 16V11ZM15.5 11C15.5 10.4477 15.0523 10 14.5 10C13.9477 10 13.5 10.4477 13.5 11V16C13.5 16.5523 13.9477 17 14.5 17C15.0523 17 15.5 16.5523 15.5 16V11Z" fill="#FF3F3F"/>
                                                                    <path d="M10.0681 3.37059C10.1821 3.26427 10.4332 3.17033 10.7825 3.10332C11.1318 3.03632 11.5597 3 12 3C12.4403 3 12.8682 3.03632 13.2175 3.10332C13.5668 3.17033 13.8179 3.26427 13.9319 3.37059" stroke="#FF3F3F" strokeWidth="2" strokeLinecap="round"/>
                                                                </svg>
                                                            </button>
                                                        </div>
                                                    </div>
                                                ) : item.status ? (
                                                    <div className='mr-[14px]'>
                                                        <button onClick={()=> detailButton(item.id)}>
                                                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                <path fillRule="evenodd" clipRule="evenodd" d="M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12ZM13 8C13 8.55228 12.5523 9 12 9C11.4477 9 11 8.55228 11 8C11 7.44772 11.4477 7 12 7C12.5523 7 13 7.44772 13 8ZM13 17V11H11V17H13Z" fill="#A6A6A6"/>
                                                            </svg>
                                                        </button>
                                                    </div>
                                                ) : null}
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

export default ReservasiUserPribadi;