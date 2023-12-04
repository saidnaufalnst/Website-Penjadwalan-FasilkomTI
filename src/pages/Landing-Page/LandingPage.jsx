import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom'
import Toolbar from '../../component/Bar&Navigation/Toolbar';
import Kalender from '../../component/Kalender/Kalender';
import JadwalKuliah from '../../component/Jadwal/JadwalKuliah';
import ToolbarFooter from '../../component/Bar&Navigation/ToolbarFooter';

const LandingPage = () => {
  const navigate = useNavigate();
  const [currentDate, setCurrentDate] = useState(new Date());

  const handleDateChange = (newDate) => {
    setCurrentDate(newDate);
  };

  const login = () =>{
    navigate("/login")
  }
  

  return (
    <div className="bg-[#F2F2EA] h-screen">
      <div className="h-full w-full overflow-y-auto home">
        <div className='sticky top-0'>
          <Toolbar/>
        </div>
        <div className="flex justify-center h-full">
          <div className="w-full">
              <div className='bg-[#F2F2EA] sticky top-[76px]'>
                <Kalender currentDate={currentDate} onDateChange={handleDateChange}/>
              </div>
              <JadwalKuliah currentDate={currentDate}/>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LandingPage;