import React, { useState } from 'react'
import ReactModal from 'react-modal';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';

const TambahKelas= () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(true);
  const [namaKelas, setNamaKelas] = useState("");
  const [namaSemester, setNamaSemester] = useState("");

  const closeModal = () => {
    setNamaKelas("");
    setIsOpen(false);
    navigate(`/page/admin/kelas?dataChanged=true`);
  };

  const closeModalOnOverlayClick = (event) => {
    if (event.target === event.currentTarget) {
      closeModal();
    }
  };

  const inputKelasHandler = async (e) =>  {
    e.preventDefault();
  
    const formData = new FormData();
    formData.append('nama', namaKelas);
    formData.append('semester', namaSemester);

    try {
      await axios.post('/kelas', formData);

      Swal.fire({
        title: "Berhasil!",
        text: "Kelas berhasil ditambahkan",
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
        text: error,
        icon: "error",
        showConfirmButton: false,
        timer: 1500,
        willClose: () => {
          closeModal();
        },
      });    }

  }

  return (
    <div>
        <ReactModal
          isOpen={isOpen}
          onRequestClose={closeModal}
          contentLabel="Tambah Dosen"
          className="custom-modal"
          overlayClassName="custom-modal-overlay"
        >
          <div className="custom-modal" onClick={closeModalOnOverlayClick}>
            <div className="modal-content w-[387px] App">
              <form onSubmit={inputKelasHandler}>
                <div className="mb-6 ">
                  <label htmlFor="nama-dosen" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Kelas</label>
                  <input 
                    type="text" 
                    id="nama-dosen" 
                    autoComplete='off'
                    value={namaKelas}
                    onChange={(e) => setNamaKelas(e.target.value)} 
                    className="shadow-sm bg-white border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" required />
                </div>

                <div className="mb-6 ">
                  <label htmlFor="nama-dosen" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Semester</label>
                  <input 
                    type="text" 
                    id="nama-dosen" 
                    autoComplete='off'
                    value={namaSemester}
                    onChange={(e) => setNamaSemester(e.target.value)} 
                    className="shadow-sm bg-white border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" required />
                </div>

                <div className="flex justify-center gap-1">
                    <div className="">
                        <button type="button" onClick={closeModal} className="w-[88px] h-[36px] hover:text-white hover:bg-red-600 rounded-lg text-sm px-4 mb-2 button-negative">
                            Batal
                        </button>
                    </div>
                    <div className="">
                        <button type="submit" className="w-[88px] h-[36px] text-white bg-[#03965C] hover:bg-green-600 font-medium rounded-lg text-sm px-4 mb-2">
                            Simpan
                        </button>
                    </div>
                </div>

              </form>
              
            </div>
          </div>
        </ReactModal>
    </div>
  )
}

export default TambahKelas;
