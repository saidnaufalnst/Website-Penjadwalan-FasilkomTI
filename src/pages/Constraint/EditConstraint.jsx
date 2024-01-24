import React, { useEffect, useState } from 'react'
import ReactModal from 'react-modal';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';

ReactModal.setAppElement('#root');

const EditPengampu= () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(true);
  const [showDosen, setShowDosen]= useState([]);
  const [showJam, setShowJam]= useState([]);
  const [showHari, setShowHari]= useState([]);
  const [dataDosen, setDataDosen] = useState([]);
  const [dataJam, setDataJam] = useState([]);
  const [dataHari, setDataHari] = useState([]);

  const [selectedDosenId, setSelectedDosenId] = useState('');
  const [selectedHariId, setSelectedHariId] = useState('');
  const [selectedJamId, setSelectedJamId] = useState('');
  
  const fetchDataConstraint = async () => {
    try {
      const response = await axios.get(`contraint/${id}`);
      const data = response.data.data;
      setShowJam(data.jam);
      setShowHari(data.hari);
      setShowDosen(data.dosen);
    } catch (error) {
      console.error(error);
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

  const getDataJam = async() =>{
    try{
        const response = await axios.get(`/jam`);
        const data = response.data.data;
        setDataJam(data);
    }
    catch(error) {
        console.error(error);
    }
  }

  const getDataHari = async() =>{
    try{
        const response = await axios.get(`/hari`);
        const data = response.data.data;
        setDataHari(data);
    }
    catch(error) {
        console.error(error);
    }
  }

  useEffect(() => {
    fetchDataConstraint();
  }, [id]);

  useEffect(()=>{
    getDataDosen();
    getDataHari();
    getDataJam();
  },[]);

  const closeModal = () => {
    setIsOpen(false);
    navigate(`/page/admin/constraint?dataChanged=true`);
  };

  const closeModalOnOverlayClick = (event) => {
    if (event.target === event.currentTarget) {
      closeModal();
    }
  };

  const editConstraintHandler = async (e) =>  {
    e.preventDefault();
  
    const formData = new FormData();
    formData.append('dosen_id', selectedDosenId);
    formData.append('hari_id', selectedHariId);
    formData.append('jam_id', selectedJamId);
    formData.append('_method', "put");

    try {
      await axios.post(`http://127.0.0.1:8000/api/contraint/${id}`, formData);

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
              <form onSubmit={editConstraintHandler} className="">
                <div className="mb-6 ">
                  <label htmlFor="nama-dosen" className=" block mb-2 text-sm font-medium text-gray-900 ">Nama Dosen</label>
                  <select value={selectedDosenId} onChange={(e) => setSelectedDosenId(e.target.value)} id="nama-dosen" className=" border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
                    <option value={showDosen.id} selected hidden>{showDosen.name}</option>
                    {dataDosen.map(optionDosen =>(
                      <option key={optionDosen.id} value={optionDosen.id}>
                        {optionDosen.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="mb-6 ">
                  <label htmlFor="kode-matkul" className=" block mb-2 text-sm font-medium text-gray-900 ">Jam</label>
                  <select value={selectedJamId} onChange={(e) => setSelectedJamId(e.target.value)} id="kode-matkul" className=" border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
                    <option value={showJam.id} selected hidden>{showJam.awal} - {showJam.akhir}</option>
                    {dataJam.map(optionJam =>(
                      <option key={optionJam.id} value={optionJam.id}>
                        {optionJam.awal} - {optionJam.akhir}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="mb-6 ">
                  <label htmlFor="kelas" className=" block mb-2 text-sm font-medium text-gray-900 ">Hari</label>
                  <select value={selectedHariId} onChange={(e) => setSelectedHariId(e.target.value)} id="kelas" className=" border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
                    <option value={showHari.id} selected hidden>{showHari.nama}</option>
                    {dataHari.map(optionHari =>(
                      <option key={optionHari.id} value={optionHari.id}>
                        {optionHari.nama}
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

export default EditPengampu;
