import React, {useState} from 'react'
import Kalender from '../../component/Kalender/Kalender'
import JadwalKuliah from '../../component/Jadwal/JadwalKuliah'
import ToolbarFooter from '../../component/Bar&Navigation/ToolbarFooter'

const Home = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const handleDateChange = (newDate) => {
    setCurrentDate(newDate);
  };

  return (
    <div className="h-full">
      <div className="h-full w-full overflow-y-auto home">
        <div className='flex justify-center h-full w-full'>
          <div className="w-full z-40">
            <div className='bg-[#F2F2EA] sticky top-0'>
              <Kalender currentDate={currentDate} onDateChange={handleDateChange}/>
            </div>
            <JadwalKuliah currentDate={currentDate} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home