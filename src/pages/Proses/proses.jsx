import React, {useState} from 'react'
import Kalender from '../../component/Kalender/Kalender'
import JadwalKuliah from '../../component/Jadwal/JadwalKuliah'
import { Outlet, useLocation } from 'react-router-dom';

const Proses = () => {
  const location = useLocation();
  const isProsesPage = location.pathname === '/page/admin/proses';
  const [currentDate, setCurrentDate] = useState(new Date());
  const handleDateChange = (newDate) => {
    setCurrentDate(newDate);
  };
  
  return (
    <div className="h-full w-full">
      {isProsesPage ? (
        <div className="flex justify-center h-full overflow-y-auto home">
          <div className="w-full z-40">
            <div className='bg-[#F2F2EA] sticky top-0'>
              <Kalender currentDate={currentDate} onDateChange={handleDateChange}/>
            </div>
              <JadwalKuliah currentDate={currentDate} />
          </div>
      </div>
      ) : <Outlet/>}
    </div>
  )
}

export default Proses