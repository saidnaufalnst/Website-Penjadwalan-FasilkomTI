import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { format, addDays, subDays } from 'date-fns';
import { id } from 'date-fns/locale';
import ButtonLogin from '../Button/ButtonLogin';
import ButtonJadwal from '../Button/ButtonJadwal';
import axios from 'axios';
import Swal from 'sweetalert2';
import ReactModal from 'react-modal';


const Kalender = ({ currentDate, onDateChange }) => {
  const location = useLocation();
  const isLandingPage = location.pathname === '/'; 
  const isProsesPage = location.pathname === '/page/admin/proses'; 
  const [nowDate, setNowDate] = useState(new Date());
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setloading] = useState(false);
  const [randomCode, setRandomCode] = useState("")
  const [confirmHandler, setConfirmHandler] = useState("");

  const confirmProsesHandler = () => {
    setIsOpen(true);
    generateRandomCode();
}

const closeModal = () => {
    setConfirmHandler("");
    setIsOpen(false);
};
  
  const closeModalOnOverlayClick = (event) => {
    if (event.target === event.currentTarget && loading === false) {
      closeModal();
    }
  };
  
  const handleProses = () => {
    if (confirmHandler === randomCode){
      setloading(true);
      axios.get(`http://127.0.0.1:9000/api/proses`).then(() => {
        setloading(false);
        Swal.fire({
          title: "Berhasil!",
          text: "Data berhasil dihapus",
          icon: "success",
          showConfirmButton: false,
          timer: 1000,
          willClose: () => {
          closeModal();
          },
      });
      })
      .catch((error) => {
        setloading(false);
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
      });
    }
  };
  
  const generateRandomCode =() => {
    const code = Math.floor(1000 + Math.random() * 9000).toString();
  
    setRandomCode(code);
  }

  const [dates, setDates] = useState([
    subDays(nowDate, 2),
    subDays(nowDate, 1),
    nowDate,
    addDays(nowDate, 1),
    addDays(nowDate, 2),
  ]);

  const handleNextDay = () => {
    const newDates = dates.map((date) => addDays(date, 1));
    const newDate = addDays(currentDate, 1);
    setDates(newDates);
    setNowDate(newDate);
    onDateChange(newDate);
  };

  const handlePrevDay = () => {
    const newDates = dates.map((date) => subDays(date, 1));
    const newDate = subDays(currentDate, 1);
    setDates(newDates);
    setNowDate(newDate);
    onDateChange(newDate);
  };

  return (
    <div className="flex justify-center pt-11 w-full bg-[#F2F2EA]">
      <div className="w-[90%]">
        <div className="flex w-full">
          <div className="flex items-center w-1/5">
            <h1 className="text-[#202020] font-bold text-xl">
              {format(currentDate, 'MMMM yyyy', { locale: id })}
            </h1>
          </div>
          <div className="w-3/5">
            <div className="flex justify-center gap-3 items-center">
              {dates.map((date, index) => (
                <div key={index} className={`grid grid-rows-2 items-center text-center ${index === 0 ? 'w-[90px] item-first' : index === 1 ? 'w-[90px] item-second' : ''}`}>
                  <h3>{format(date, 'dd')}</h3>
                  <span>{format(date, 'EEEE', { locale: id })}</span>
                </div>
              )).slice(0, 2)}
              <button onClick={handlePrevDay}>
                <svg width="28" height="24" viewBox="0 0 28 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M0.939581 10.9393C0.353794 11.5251 0.353794 12.4749 0.939581 13.0607L10.4855 22.6066C11.0713 23.1924 12.0211 23.1924 12.6068 22.6066C13.1926 22.0208 13.1926 21.0711 12.6068 20.4853L4.12156 12L12.6068 3.51472C13.1926 2.92893 13.1926 1.97919 12.6068 1.3934C12.0211 0.807611 11.0713 0.807611 10.4855 1.3934L0.939581 10.9393ZM27.252 10.5L14.6261 10.5V13.5L27.252 13.5V10.5ZM14.6261 10.5L2.00024 10.5V13.5L14.6261 13.5V10.5Z" fill="#03965C"/>
                </svg>
              </button>
              <div className="w-[100px]">
                <div className="flex justify-center mb-1">
                  <div className="bg-[#03965C] rounded-full h-[85px] w-[85px] flex justify-center items-center">
                    <span className="text-white text-center text-5xl font-bold">
                      {format(currentDate, 'dd')}
                    </span>
                  </div>
                </div>
              </div>
              <button onClick={handleNextDay}>
                <svg width="27" height="24" viewBox="0 0 27 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M26.3124 13.0607C26.8982 12.4749 26.8982 11.5251 26.3124 10.9393L16.7664 1.3934C16.1806 0.807611 15.2309 0.807611 14.6451 1.3934C14.0593 1.97919 14.0593 2.92893 14.6451 3.51472L23.1304 12L14.6451 20.4853C14.0593 21.0711 14.0593 22.0208 14.6451 22.6066C15.2309 23.1924 16.1806 23.1924 16.7664 22.6066L26.3124 13.0607ZM0 13.5H25.2517V10.5H0V13.5Z" fill="#03965C"/>
                </svg>
              </button>
              {dates.slice(-2).map((date, index) => (
                <div key={index} className={`grid grid-rows-2 items-center text-center ${index === 0 ? 'w-[90px] item-second' : index === 1 ? 'w-[90px] item-first' : ''}`}>
                  <h3>{format(date, 'dd')}</h3>
                  <span>{format(date, 'EEEE', { locale: id })}</span>
                </div>
              ))}
            </div>
          </div>
          <div className='flex w-1/5 items-center justify-end'>
            {isLandingPage && <ButtonLogin/>}
            {isProsesPage ? (
              <div className='flex w-full gap-3 items-center justify-end'>
                <div className="">
                    <button type="button" onClick={confirmProsesHandler} className="w-[117px] h-[45px] text-white bg-[#03965C] hover:bg-green-600 font-medium rounded-lg text-base px-4 py-2.5">
                        Proses
                    </button>
                </div>
                <div>
                    <ButtonJadwal/>
                </div>
              </div>
            ) : null}
          </div>
        </div>
        <div className="flex justify-center">
          <span className="text-[#03965C] text-center text-sm px-2 font-normal">
            {format(currentDate, 'EEEE', { locale: id })}
          </span>
        </div>
      </div>

      <ReactModal
          isOpen={isOpen}
          onRequestClose={closeModal}
          contentLabel="Tambah Dosen"
          className="custom-modal"
          overlayClassName="custom-modal-overlay"
      >
        <div className="custom-modal" onClick={closeModalOnOverlayClick}>
          <div className="bg-[#03965C] w-[387px] pt-7 rounded-[15px]">
              <div className='modal-content App'>
                {loading ? (
                  <div className=''>
                    <div className='mb-5'>
                      <span className='flex justify-center mb-2'>
                        Menunggu hingga proses selesai
                      </span>
                      <span className='flex justify-center text-[11px]'>
                        Memakan waktu 3 - 5 menit
                      </span>
                    </div>
                    <div className='flex justify-center items-center'>
                      <div role="status">
                        <svg aria-hidden="true" className="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-[#03965C]" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                        </svg>
                        <span className="sr-only">Loading...</span>
                      </div>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleProses}>
                    <div className="mb-6 ">
                    <label htmlFor="nama-dosen" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        <span className='flex justify-center'>Apakah anda yakin memproses jadwal?</span>
                        <span className='text-[11px] flex justify-center'>Masukkan kode ini untuk melanjutkan: {randomCode}</span>
                    </label>
                    <input 
                        type="text" 
                        id="proses" 
                        autoComplete='off'
                        value={confirmHandler}
                        onChange={(e) => setConfirmHandler(e.target.value)} 
                        className="shadow-sm bg-white border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" required />
                    </div>

                    <div className="flex justify-center gap-3">
                        <div className="">
                            <button type="button" onClick={closeModal} className="w-[158px] h-[36px] hover:text-white hover:bg-red-800 rounded-lg text-sm px-4 mb-2 button-negative">
                                Batal
                            </button>
                        </div>
                        <div className="">
                            <button type="submit" className="w-[158px] h-[36px] text-white bg-[#03965C] hover:bg-green-800 font-medium rounded-lg text-sm px-4 mb-2">
                                Proses
                            </button>
                        </div>
                    </div>
                </form>
                )}
              </div>
          </div>
        </div>
      </ReactModal>
    </div>
  );
};

export default Kalender;
