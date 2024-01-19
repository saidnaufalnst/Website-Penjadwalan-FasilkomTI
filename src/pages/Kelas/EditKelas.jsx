import React, { useState, useEffect } from 'react';
import ReactModal from 'react-modal';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';

ReactModal.setAppElement('#root');

const EditKelas = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(true);
  const [namaKelas, setNamaKelas] = useState("");
  const [namaSemester, setNamaSemester] = useState("");

  const fetchDataKelas = async () => {
    try {
      const response = await axios.get(`/kelas/${id}`);
      const data = response.data.data;
      setNamaKelas(data.nama);
      setNamaSemester(data.semester);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchDataKelas();
  }, [id]);

  const closeModal = () => {
    setIsOpen(false);
    navigate(`/page/admin/kelas?dataChanged=true`);
  };

  const closeModalOnOverlayClick = (event) => {
    if (event.target === event.currentTarget) {
      closeModal();
    }
  };

  const updateKelasHandler = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('nama', namaKelas);
    formData.append('semester', namaSemester);
    formData.append('_method', "put");

    try {
      await axios.post(`/kelas/${id}`, formData);

      Swal.fire({
        title: "Berhasil!",
        text: "Data kelas berhasil diperbarui",
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
  };

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
            <form onSubmit={updateKelasHandler}>
              <div className="mb-6 ">
                <label htmlFor="nama-dosen" className=" block mb-2 text-sm font-medium text-gray-900 ">Kelas</label>
                <input 
                  type="text" 
                  id="nama-dosen" 
                  autoComplete='off'
                  value={namaKelas} 
                  onChange={(e) => setNamaKelas(e.target.value)} 
                  className="shadow-sm bg-white border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " required />
              </div>

              <div className="mb-6 ">
                <label htmlFor="nip-dosen" className=" block mb-2 text-sm font-medium text-gray-900 ">Semester</label>
                <input 
                  type="text" 
                  id="nip-dosen" 
                  autoComplete='off'
                  value={namaSemester} 
                  onChange={(e) => setNamaSemester(e.target.value)} 
                  className="shadow-sm bg-white border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " required />
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

export default EditKelas;
