import React, { useEffect, useState } from 'react'
import ReactModal from 'react-modal';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';

const TambahPengampu= () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(true);
  const [dataDosen, setDataDosen] = useState([]);
  const [dataMatkul, setDataMatkul] = useState([]);
  const [dataKelas, setDataKelas] = useState([]);

  const [selectedDosenId, setSelectedDosenId] = useState('');
  const [selectedMatkulId, setSelectedMatkulId] = useState('');
  const [selectedKelasId, setSelectedKelasId] = useState('');
  
  useEffect(() =>{
    getDataDosen();
    getDataMatkul();
    getDataKelas();
},[]);

  const closeModal = () => {
    setIsOpen(false);
    navigate(`/page/admin/pengampu?dataChanged=true`);
  };

  const closeModalOnOverlayClick = (event) => {
    if (event.target === event.currentTarget) {
      closeModal();
    }
  };

  const getDataDosen = async() =>{
    try{
        const response = await axios.get(`/dosen`);
        const data = response.data.data;
        setDataDosen(data);
    }
    catch(error) {
        console.error(error);
    }
  }

  const getDataMatkul = async() =>{
    try{
        const response = await axios.get(`/matakuliah`);
        const data = response.data.data;
        data.sort((a, b) => a.kode_matkul.localeCompare(b.kode_matkul));
        setDataMatkul(data);
    }
    catch(error) {
        console.error(error);
    }
  }

  const getDataKelas = async() =>{
    try{
        const response = await axios.get(`/kelas`);
        const data = response.data.data;
        data.sort((a, b) => a.semester - b.semester);
        setDataKelas(data);
    }
    catch(error) {
        console.error(error);
    }
  }

  const inputPengampuHandler = async (e) =>  {
    e.preventDefault();
  
    const formData = new FormData();
    formData.append('dosen_id', selectedDosenId);
    formData.append('matakuliah_id', selectedMatkulId);
    formData.append('kelas_id', selectedKelasId);

    try {
      await axios.post('/pengampu', formData);

      Swal.fire({
        title: "Berhasil!",
        text: "Dosen berhasil ditambahkan",
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
        text: error.data.message,
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
          contentLabel="Contoh Modal"
          className="custom-modal"
          overlayClassName="custom-modal-overlay"
        >
          <div className="custom-modal" onClick={closeModalOnOverlayClick}>
            <div className="modal-content w-[387px] App">
              <form onSubmit={inputPengampuHandler} className="">
                <div className="mb-6 ">
                  <label htmlFor="nama-dosen" className=" block mb-2 text-sm font-medium text-gray-900">Nama Dosen</label>
                  <select value={selectedDosenId} onChange={(e) => setSelectedDosenId(e.target.value)} id="nama-dosen" className=" border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
                    <option value="" disabled selected hidden>-Pilih-</option>
                    {dataDosen.map(optionDosen =>(
                      <option key={optionDosen.id} value={optionDosen.id}>
                        {optionDosen.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="mb-6 ">
                  <label htmlFor="kode-matkul" className=" block mb-2 text-sm font-medium text-gray-900">Kode Mata Kuliah</label>
                  <select value={selectedMatkulId} onChange={(e) => setSelectedMatkulId(e.target.value)} id="kode-matkul" className=" border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
                    <option value="" disabled selected hidden>-Pilih-</option>
                    {dataMatkul.map(optionMatkul =>(
                      <option key={optionMatkul.id} value={optionMatkul.id}>
                        <div className='flex justify-between gap-2'>
                          <div>{optionMatkul.kode_matkul}</div>
                          <div> - </div>
                          <div>{optionMatkul.nama}</div>
                        </div>
                      </option>
                    ))}
                  </select>
                </div>

                <div className="mb-6 ">
                  <label htmlFor="kelas" className=" block mb-2 text-sm font-medium text-gray-900">Kelas</label>
                  <select value={selectedKelasId} onChange={(e) => setSelectedKelasId(e.target.value)} id="kelas" className=" border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
                    <option value="" disabled selected hidden>-Pilih-</option>
                    {dataKelas.map(optionKelas =>(
                      <option key={optionKelas.id} value={optionKelas.id}>
                        {optionKelas.nama} - SEMESTER {optionKelas.semester}
                      </option>
                    ))}
                  </select>
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

export default TambahPengampu;
