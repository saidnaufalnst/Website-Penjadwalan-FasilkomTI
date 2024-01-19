import React, { useEffect, useState } from 'react';
import ReactModal from 'react-modal';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';

const TambahJadwal = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(true);
  const [dataPengampu, setDataPengampu] = useState([]);
  const [dataRuangan, setDataRuangan] = useState([]);
  const [dataJam, setDataJam] = useState([]);
  const [dataHari, setDataHari] = useState([]);
  const [uniqueLecturerNames, setUniqueLecturerNames] = useState([]);
  const [matakuliahOptions, setMatakuliahOptions] = useState([]);
  const [kelasOptions, setKelasOptions] = useState([]);

  const [selectedPengampuId, setSelectedPengampuId] = useState(null);
  const [selectedJamId, setSelectedJamId] = useState('');
  const [selectedHariId, setSelectedHariId] = useState('');
  const [selectedRuanganId, setSelectedRuanganId] = useState('');

  const [selectedDosenName, setSelectedDosenName] = useState('');
  const [selectedMatakuliah, setSelectedMatakuliah] = useState('');
  const [selectedKelas, setSelectedKelas] = useState('');

  useEffect(() => {
    getDataPengampu();
    getDataRuangan();
    getDataJam();
    getDataHari();
  }, []);

  const closeModal = () => {
    setSelectedPengampuId('');
    setSelectedHariId('');
    setSelectedJamId('');
    setSelectedRuanganId('');
    setSelectedDosenName('');
    setSelectedMatakuliah('');
    setSelectedKelas('');
    setIsOpen(false);
    navigate(`/page/admin/proses/jadwal/?dataChanged=true`);
  };

  const closeModalOnOverlayClick = (event) => {
    if (event.target === event.currentTarget) {
      closeModal();
    }
  };

  const getDataPengampu = async () => {
    try {
      const response = await axios.get(`/pengampu`);
      const data = response.data.data;
      setDataPengampu(data);

      const lecturerNamesSet = new Set(data.map((optionPengampu) => optionPengampu.dosen.name));
      const uniqueNames = Array.from(lecturerNamesSet);
      setUniqueLecturerNames(uniqueNames);
    } catch (error) {
      console.error(error);
    }
  };

  const getDataJam = async () => {
    try {
      const response = await axios.get(`/jam`);
      const data = response.data.data;
      setDataJam(data);
    } catch (error) {
      console.error(error);
    }
  };

  const getDataHari = async () => {
    try {
      const response = await axios.get(`/hari`);
      const data = response.data.data;
      setDataHari(data);
    } catch (error) {
      console.error(error);
    }
  };

  const getDataRuangan = async () => {
    try {
      const response = await axios.get(`/ruangan`);
      const data = response.data.data;
      setDataRuangan(data);
    } catch (error) {
      console.error(error);
    }
  };

  const inputReservasiHandler = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('pengampu_id', selectedPengampuId);
    formData.append('jam_id', selectedJamId);
    formData.append('hari_id', selectedHariId);
    formData.append('ruangan_id', selectedRuanganId);

    try {
      await axios.post('/jadwal', formData);

      Swal.fire({
        title: 'Berhasil!',
        text: 'Jadwal berhasil ditambahkan',
        icon: 'success',
        showConfirmButton: false,
        timer: 1500,
        willClose: () => {
          closeModal();
        },
      });
    } catch (error) {
      Swal.fire({
        title: 'Gagal!',
        text: error,
        icon: 'error',
        showConfirmButton: false,
        timer: 1500,
        willClose: () => {
          closeModal();
        },
      });
    }
  };

  useEffect(() => {
    if (selectedDosenName) {
      const filteredPengampu = dataPengampu.filter(
        (optionPengampu) => optionPengampu.dosen.name === selectedDosenName
      );
      setMatakuliahOptions([]);
      setKelasOptions([]);
      setSelectedPengampuId(null);
      setSelectedMatakuliah('');
      setSelectedKelas('');

      const uniqueMatakuliahOptions = Array.from(
        new Set(filteredPengampu.map((optionPengampu) => optionPengampu.matakuliah.nama))
      );
      setMatakuliahOptions(uniqueMatakuliahOptions);
    }
  }, [selectedDosenName, dataPengampu]);

  useEffect(() => {
    if (selectedMatakuliah && selectedDosenName) {
      const filteredPengampu = dataPengampu.filter(
        (optionPengampu) =>
          optionPengampu.dosen.name === selectedDosenName &&
          optionPengampu.matakuliah.nama === selectedMatakuliah
      );
      setKelasOptions([]);
      setSelectedPengampuId(null);
      setSelectedKelas('');

      const uniqueKelasOptions = Array.from(
        new Set(filteredPengampu.map((optionPengampu) => optionPengampu.kelas.nama))
      );
      setKelasOptions(uniqueKelasOptions);
    }
  }, [selectedDosenName, selectedMatakuliah, dataPengampu]);

  useEffect(() => {
    if (selectedKelas && selectedMatakuliah && selectedDosenName) {
      const filteredPengampu = dataPengampu.find(
        (optionPengampu) =>
          optionPengampu.dosen.name === selectedDosenName &&
          optionPengampu.matakuliah.nama === selectedMatakuliah &&
          optionPengampu.kelas.nama === selectedKelas
      );

      if (filteredPengampu) {
        setSelectedPengampuId(filteredPengampu.id);
      } else {
        setSelectedPengampuId(null);
      }
    }
  }, [selectedDosenName, selectedMatakuliah, selectedKelas, dataPengampu]);

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
            <form onSubmit={inputReservasiHandler} className="">
              <div className="mb-6 ">
                <label
                  htmlFor="pengampu"
                  className="block mb-2 text-sm font-medium text-gray-900 "
                >
                  Nama Dosen
                </label>
                <select
                  value={selectedDosenName}
                  onChange={(e) => setSelectedDosenName(e.target.value)}
                  id="pengampu"
                  className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                >
                  <option value="" disabled selected hidden>
                    -Pilih-
                  </option>
                  {uniqueLecturerNames.map((name) => (
                    <option key={name} value={name}>
                      {name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mb-6 ">
                <label
                  htmlFor="matakuliah"
                  className="block mb-2 text-sm font-medium text-gray-900 "
                >
                  Mata Kuliah
                </label>
                <select
                  value={selectedMatakuliah}
                  onChange={(e) => setSelectedMatakuliah(e.target.value)}
                  id="matakuliah"
                  className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                >
                  <option value="" disabled selected hidden>
                    -Pilih-
                  </option>
                  {matakuliahOptions.map((matakuliah) => (
                    <option key={matakuliah} value={matakuliah}>
                      {matakuliah}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mb-6 ">
                <label
                  htmlFor="kelas"
                  className="block mb-2 text-sm font-medium text-gray-900 "
                >
                  Kelas
                </label>
                <select
                  value={selectedKelas}
                  onChange={(e) => setSelectedKelas(e.target.value)}
                  id="kelas"
                  className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                >
                  <option value="" disabled selected hidden>
                    -Pilih-
                  </option>
                  {kelasOptions.map((kelas) => (
                    <option key={kelas} value={kelas}>
                      {kelas}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mb-6 ">
                <label htmlFor="jam" className="block mb-2 text-sm font-medium text-gray-900 ">Jam</label>
                <select value={selectedJamId} onChange={(e) => setSelectedJamId(e.target.value)} id="jam" className=" border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ">
                  <option value="" disabled selected hidden>-Pilih-</option>
                  {dataJam.map(optionJam =>(
                    <option key={optionJam.id} value={optionJam.id}>
                      {optionJam.awal} - {optionJam.akhir}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mb-6 ">
                <label htmlFor="hari" className="block mb-2 text-sm font-medium text-gray-900 ">Hari</label>
                <select value={selectedHariId} onChange={(e) => setSelectedHariId(e.target.value)} id="hari" className=" border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ">
                  <option value="" disabled selected hidden>-Pilih-</option>
                  {dataHari.map(optionHari =>(
                    <option key={optionHari.id} value={optionHari.id}>
                      {optionHari.nama}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mb-6 ">
                <label htmlFor="hari" className="block mb-2 text-sm font-medium text-gray-900 ">Ruangan</label>
                <select value={selectedRuanganId} onChange={(e) => setSelectedRuanganId(e.target.value)} id="hari" className=" border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ">
                  <option value="" disabled selected hidden>-Pilih-</option>
                  {dataRuangan.map(optionRuangan =>(
                    <option key={optionRuangan.id} value={optionRuangan.id}>
                      {optionRuangan.nama}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex justify-center gap-1">
                <div className="">
                  <button
                    type="button"
                    onClick={closeModal}
                    className="w-[88px] h-[36px] hover:text-white hover:bg-red-600 rounded-lg text-sm px-4 mb-2 button-negative"
                  >
                    Batal
                  </button>
                </div>
                <div className="">
                  <button
                    type="submit"
                    className="w-[88px] h-[36px] text-white bg-[#03965C] hover:bg-green-600 font-medium rounded-lg text-sm px-4 mb-2"
                  >
                    Simpan
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </ReactModal>
    </div>
  );
};

export default TambahJadwal;
