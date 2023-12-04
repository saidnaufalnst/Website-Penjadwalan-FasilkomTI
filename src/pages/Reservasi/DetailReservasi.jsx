import React, { useState, useEffect } from 'react';
import ReactModal from 'react-modal';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import format from 'date-fns/format';

ReactModal.setAppElement('#root'); 

const DetailReservasi = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(true);
  const [dataDosen, setDataDosen] = useState([]);
  const [dataKelas, setDataKelas] = useState([]);
  const [dataSemester, setDataSemester] = useState([]);
  const [dataJam, setDataJam] = useState([]);
  const [dataMatkul, setDataMatkul] = useState([]);
  const [dataRuangan, setDataRuangan] = useState([]);
  const [dataHari, setDataHari] = useState([]);
  const [dataStatus, setDataStatus] = useState(null);
  const [status, setStatus] = useState("");
  const [dataTanggal, setDataTanggal] = useState([])

  const fetchDataReservasi= async () => {
    try {
      const response = await axios.get(`/reservasi/${id}`);
      const data = response.data.data;
      setDataDosen(data.pengampu.dosen.name);
      setDataKelas(data.pengampu.kelas.nama);
      setDataSemester(data.pengampu.matakuliah.semester);
      setDataMatkul(data.pengampu.matakuliah.nama);
      setDataHari(data.hari.nama);
      setDataJam(data.jam);
      setDataRuangan(data.ruangan.nama);
      setDataStatus(data.status);
      setDataTanggal((format(Date.parse(data.tanggal), 'dd-MM-yyyy')))

    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchDataReservasi();
  }, [id]);

  const closeModal = () => {
    setIsOpen(false);
    navigate(`/page/admin/reservasi/?dataChanged=true`);
  };

  const closeModalOnOverlayClick = (event) => {
    if (event.target === event.currentTarget) {
      closeModal();
    }
  };

  const confirmReservasiHandler = async (e) => {
    e.preventDefault();

    let confirmationMessage = "";

    const formData = new FormData();
    formData.append('id', id);
    formData.append('status', status);

    if (status === "Diterima"){
      confirmationMessage = ("Apakah Anda yakin ingin menerima data ini?");
    } else if (status === "Ditolak"){
      confirmationMessage = ("Apakah Anda yakin ingin menolak data ini?");
    }

    if (confirmationMessage && window.confirm(confirmationMessage)){
      try {
        await axios.post(`/confirm-reservasi`, formData);
        
        Swal.fire({
          title: "Berhasil!",
          text: "Data Reservasi berhasil diperbarui",
          icon: "success",
          showConfirmButton: false,
          timer: 1000,
          willClose: () => {
            closeModal();
          },
        });
      } catch (error) {
        Swal.fire({
          title: "Gagal!",
          text: "Terjadi kesalahan saat memperbarui data",
          icon: "error",
          showConfirmButton: false,
          timer: 1500,
          willClose: () => {
            closeModal();
          },
        });
      }
    }
  };

  const handleStatusChange = (newStatus) => {
    setStatus(newStatus);
  }

  return (
    <div>
      <ReactModal
        isOpen={isOpen}
        onRequestClose={closeModal}
        contentLabel="Edit Dosen"
        className="custom-modal"
        overlayClassName="custom-modal-overlay"
      >
        <div className="custom-modal" onClick={closeModalOnOverlayClick}>
          <div className="modal-content w-[387px] App">
            <form onSubmit={confirmReservasiHandler}>
                <div className="mb-6 ">
                  <label htmlFor="nama-dosen" className=" block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nama Dosen</label>
                  <input 
                    type="text" 
                    id="nama-dosen" 
                    autoComplete='off'
                    value={dataDosen}
                    disabled
                    className="shadow-sm bg-white border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" required />
                </div>

                <div className="flex gap-5">
                  <div className="mb-6 ">
                    <label htmlFor="kelas" className=" block mb-2 text-sm font-medium text-gray-900 dark:text-white">Kelas</label>
                    <input 
                      type="text" 
                      id="kelas" 
                      autoComplete='off'
                      value={dataKelas}
                      disabled
                      className="shadow-sm bg-white border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" required />
                  </div>

                  <div className="mb-6 ">
                    <label htmlFor="semester" className=" block mb-2 text-sm font-medium text-gray-900 dark:text-white">Semester</label>
                    <input 
                      type="text" 
                      id="semester" 
                      autoComplete='off'
                      value={dataSemester}
                      disabled
                      className="shadow-sm bg-white border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" required />
                  </div>
                </div>

                <div className="mb-6 ">
                  <label htmlFor="ruangan" className=" block mb-2 text-sm font-medium text-gray-900 dark:text-white">Ruangan</label>
                  <input 
                    type="text" 
                    id="ruangan" 
                    autoComplete='off'
                    value={dataRuangan}
                    disabled
                    className="shadow-sm bg-white border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" required />
                </div>

                <div className="mb-6 ">
                  <label htmlFor="jam" className=" block mb-2 text-sm font-medium text-gray-900 dark:text-white">Jam</label>
                  <input 
                    type="text" 
                    id="jam" 
                    autoComplete='off'
                    value={dataJam.awal + "-" + dataJam.akhir}
                    disabled
                    className="shadow-sm bg-white border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" required />
                </div>

                <div className="mb-6 ">
                  <label htmlFor="hari" className=" block mb-2 text-sm font-medium text-gray-900 dark:text-white">Tanggal</label>
                  <input 
                    type="text" 
                    id="hari" 
                    autoComplete='off'
                    value={dataHari + ", " + dataTanggal}
                    disabled
                    className="shadow-sm bg-white border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" required />
                </div>

                <div className="mb-6 ">
                  <label htmlFor="hari" className=" block mb-2 text-sm font-medium text-gray-900 dark:text-white">Mata Kuliah</label>
                  <input 
                    type="text" 
                    id="hari" 
                    autoComplete='off'
                    value={dataMatkul}
                    disabled
                    className="shadow-sm bg-white border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" required />
                </div>
                
                <div>
                  {dataStatus ? (
                    <div className='flex justify-center text-center items-center'>
                      <span className="text-2xl font-semibold">
                        {dataStatus} 
                      </span>
                      {dataStatus === "Diterima" ? (
                        <svg width="28" height="28" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path fillRule="evenodd" clipRule="evenodd" d="M17 29.75C24.0416 29.75 29.75 24.0416 29.75 17C29.75 9.95837 24.0416 4.25 17 4.25C9.95837 4.25 4.25 9.95837 4.25 17C4.25 24.0416 9.95837 29.75 17 29.75ZM16.3516 21.8902L23.4349 13.3902L21.8984 12.1098L15.5161 19.7686L12.0404 16.2929L10.6262 17.7071L14.8762 21.9571L15.6505 22.7314L16.3516 21.8902Z" fill="#22C55E"/>
                        </svg>
                      ) : (
                        <svg width="28" height="28" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path fillRule="evenodd" clipRule="evenodd" d="M29.75 17C29.75 24.0416 24.0416 29.75 17 29.75C9.95837 29.75 4.25 24.0416 4.25 17C4.25 9.95837 9.95837 4.25 17 4.25C24.0416 4.25 29.75 9.95837 29.75 17ZM17 18.4142L12.0404 23.3738L10.6262 21.9596L15.5858 17L10.6262 12.0404L12.0404 10.6262L17 15.5858L21.9596 10.6262L23.3738 12.0404L18.4142 17L23.3738 21.9596L21.9596 23.3738L17 18.4142Z" fill="#FF4530"/>
                        </svg>
                      )}
                    </div>
                  ) : (
                    <div className="flex justify-center gap-1">
                      <div className="">
                        <button type="submit" onClick={() => handleStatusChange("Ditolak")} className="w-[88px] h-[36px] hover:text-white hover:bg-red-600 rounded-lg text-sm px-4 mb-2 button-negative">
                          Tolak
                        </button>
                      </div>
                      <div className="">
                        <button type="submit" onClick={() => handleStatusChange("Diterima")} className="w-[88px] h-[36px] text-white bg-[#03965C] hover:bg-green-600 font-medium rounded-lg text-sm px-4 mb-2">
                          Terima
                        </button>
                      </div>
                    </div>    
                  )}
                </div>      
              </form>
            
          </div>
        </div>
      </ReactModal>
    </div>
  )
}

export default DetailReservasi;
