import React, {useEffect, useState} from 'react'
import { Outlet, useNavigate, useLocation } from 'react-router-dom'
import axios from 'axios'
import ButtonTambahJadwal from '../../component/Button/ButtonTambahJadwal';
import ButtonBackToProses from '../../component/Button/ButtonBackToProses';

const JadwalPage = () => {
    const [dataReservasi, setDataReservasi] = useState([]);
    const [dataChanged, setDataChanged] = useState(false);
    const [searchData, setSearchData] = useState("");
    const navigate = useNavigate();
    const location = useLocation();
    const data = new URLSearchParams(location.search).get('dataChanged');
    const refreshData = data === 'true';
    
    useEffect(() =>{
        getDataJadwal();
    },[]);

    useEffect(() => {
      if (dataChanged) {
        getDataJadwal();
        setDataChanged(false);
      }
    }, [dataChanged]);

    useEffect(() =>{
        if (refreshData){
            getDataJadwal();
            const newSearch = new URLSearchParams(location.search);
            newSearch.delete('dataChanged');
            navigate({ search: `?${newSearch.toString()}` });
        }
    }, [refreshData])

    const getDataJadwal = async() =>{
        try{
            const response = await axios.get(`jadwal`);
            const data = response.data.data;
            setDataReservasi(data);
        }
        catch(error) {
            console.error(error);
        }
    }

    const editButton = (id) => {
        navigate(`/page/admin/proses/jadwal/edit-jadwal/${id}`);
    }

    const filteredDataJadwal = dataReservasi.filter((reservasi) => {
        return reservasi.pengampu.dosen.name.toLowerCase().includes(searchData.toLowerCase()) || reservasi.hari.nama.toLowerCase().includes(searchData.toLowerCase()) || reservasi.ruangan.nama.toLowerCase().includes(searchData.toLowerCase());
    });

    const deleteDataJadwal = async (id) => {
        const isDeleteData = window.confirm("Apakah Anda yakin ingin menghapus data ini?");

        if (isDeleteData){
            try {
                await axios.delete(`jadwal/${id}`);
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
        <div className="flex justify-center h-[70%]">
            <div className="w-[90%]">
                <div className="mt-5 mb-10">
                    <span className="text-[#202020] font-bold text-3xl">
                        JADWAL
                    </span>
                </div>
                
                <div className="flex justify-between mx-auto mb-7">
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
                                onChange={(e) => setSearchData(e.target.value)}
                                className="block h-[45px] w-[368px] p-4 text-sm text-gray-900 border border-gray-400 rounded-lg bg-white" placeholder="Cari Jadwal" />
                        </div>
                    </form>
                    <div className='flex justify-end gap-3'>
                        <ButtonBackToProses/>
                        <ButtonTambahJadwal/>
                    </div>
                </div>
                
                <div className="flex justify-center items-center w-full h-full">
                    <div className="w-full h-full bg-white border border-gray-200 rounded-br-2xl rounded-tl-2xl table-style overflow-hidden">
                        <div className="overflow-hidden w-full h-full card">
                            <table className="w-full">
                                <thead className="sticky top-0 z-50 bg-[#03965C]">
                                    <tr className="text-white text-center text-[15px]">
                                    <th className="py-5 px-6 w-[600px] font-medium">
                                            Nama Dosen
                                        </th>
                                        <th className="py-5 px-6 w-[350px] font-medium">
                                            Mata Kuliah
                                        </th>
                                        <th className="py-5 px-6 w-[200px] font-medium">
                                            Ruangan
                                        </th>
                                        <th className="py-5 px-6 w-[200px] font-medium">
                                            Hari
                                        </th>
                                        <th className="py-5 px-6 w-[200px] font-medium">
                                            Jam
                                        </th>
                                        <th className="py-5 px-[52px] w-[200px] text-right font-medium">
                                            Aksi
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="">
                                    {filteredDataJadwal.map((item)=>(
                                        <tr key={item.id} className="border-b text-center text-black text-[13px]">
                                            <td className="py-5">
                                                {item.pengampu.dosen.name}
                                            </td>
                                            <td className="py-5">
                                                {item.pengampu.matakuliah.nama}
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
                                            <td className="py-5 px-[38px] flex justify-end text-right">
                                                <div className='flex justify-end gap-3'>
                                                    <div className='flex items-center'>
                                                        <button onClick={()=> editButton(item.id)}>
                                                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                <path fillRule="evenodd" clipRule="evenodd" d="M14.459 8.87436L15.8333 7.5C16.0679 7.2655 16.1851 7.14825 16.2696 7.03605C16.8056 6.32383 16.8056 5.34284 16.2696 4.63063C16.1851 4.51842 16.0679 4.40117 15.8333 4.16667C15.5988 3.93217 15.4816 3.81492 15.3694 3.73047C14.6572 3.19442 13.6762 3.19442 12.964 3.73047C12.8518 3.81491 12.7345 3.93216 12.5 4.16664L12.5 4.16667L11.1064 5.56029C11.9033 6.94053 13.06 8.08831 14.459 8.87436ZM9.6518 7.01488L4.18973 12.477C3.76467 12.902 3.55214 13.1145 3.4124 13.3756C3.27267 13.6367 3.21372 13.9315 3.09583 14.5209L2.6471 16.7646C2.58058 17.0972 2.54732 17.2635 2.64193 17.3581C2.73654 17.4527 2.90284 17.4194 3.23545 17.3529L5.4791 16.9042C6.06855 16.7863 6.36328 16.7274 6.62437 16.5876C6.88547 16.4479 7.098 16.2354 7.52306 15.8103L13.0006 10.3327C11.6528 9.48197 10.5106 8.34754 9.6518 7.01488Z" fill="#FFBA07"/>
                                                            </svg>
                                                        </button>
                                                    </div>
                                                    <div className='flex items-center'>
                                                        <button onClick={() => deleteDataJadwal(item.id)}>
                                                            <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                <path fillRule="evenodd" clipRule="evenodd" d="M21 6H3V9C4.10457 9 5 9.89543 5 11V15C5 17.8284 5 19.2426 5.87868 20.1213C6.75736 21 8.17157 21 11 21H13C15.8284 21 17.2426 21 18.1213 20.1213C19 19.2426 19 17.8284 19 15V11C19 9.89543 19.8954 9 21 9V6ZM10.5 11C10.5 10.4477 10.0523 10 9.5 10C8.94772 10 8.5 10.4477 8.5 11V16C8.5 16.5523 8.94772 17 9.5 17C10.0523 17 10.5 16.5523 10.5 16V11ZM15.5 11C15.5 10.4477 15.0523 10 14.5 10C13.9477 10 13.5 10.4477 13.5 11V16C13.5 16.5523 13.9477 17 14.5 17C15.0523 17 15.5 16.5523 15.5 16V11Z" fill="#FF3F3F"/>
                                                                <path d="M10.0681 3.37059C10.1821 3.26427 10.4332 3.17033 10.7825 3.10332C11.1318 3.03632 11.5597 3 12 3C12.4403 3 12.8682 3.03632 13.2175 3.10332C13.5668 3.17033 13.8179 3.26427 13.9319 3.37059" stroke="#FF3F3F" strokeWidth="2" strokeLinecap="round"/>
                                                            </svg>
                                                        </button>
                                                    </div>
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

export default JadwalPage