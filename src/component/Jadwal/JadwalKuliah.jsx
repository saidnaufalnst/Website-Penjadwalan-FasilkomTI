import React, { useState, useEffect } from "react";
import { Chart, BarElement, CategoryScale, LinearScale, TimeScale } from "chart.js";
import { format } from 'date-fns';
import { id } from 'date-fns/locale';
import 'chartjs-adapter-date-fns';
import { Bar } from "react-chartjs-2";
import ChartDataLabels from 'chartjs-plugin-datalabels';
import axios from "axios";
import { useLocation } from "react-router-dom";
import ToolbarFooter from "../Bar&Navigation/ToolbarFooter";

Chart.register(
  BarElement, CategoryScale, LinearScale, TimeScale, ChartDataLabels
);

const getBackgroundColor = (semester) => {
  switch (semester) {
    case 1:
      return '#FF8CA7';
    case 2:
      return '#FF8CA7';
    case 3:
      return '#FFB97F';
    case 4:
      return '#FFB97F';
    case 5:
      return '#87D4FF';
    case 6:
      return '#87D4FF';
    case 7:
      return '#B3FF98';
    default:
      return '#B3FF98';
  }
};

const JadwalKuliah = ({ currentDate }) => {
  const [jadwal, setJadwal] = useState([]);
  const [colorAndSemester, setColorAndSemester] = useState([]);

  const location = useLocation();
  const nowDate = format(currentDate, 'yyyy-MM-dd');
  const today = format(currentDate, 'EEEE', { locale: id })

  useEffect(() => {
    getDataJadwal(today, nowDate);
  }, [today, nowDate, location])

  useEffect(() => {
    setColorAndSemester(getColorAndSemester(jadwal));
  }, [jadwal]);
  

  const getDataJadwal = async (today, nowDate) => {
    const apiEndpoint = location.pathname === '/' ? 'cek-jadwal' : 'jadwal';

    try {
      const response = await axios.get(apiEndpoint, {
        params: {
          hari: today,
          tanggal_reservasi: nowDate
        },
      });
      const data = response.data.data;

      data.sort((a, b) => {
        const ruanganComparison = a.ruangan.nama.localeCompare(b.ruangan.nama);
        if (ruanganComparison !== 0) {
          return ruanganComparison;
        }
        return a.jam.awal.localeCompare(b.jam.awal);
      });

      for (let i = 0; i < data.length - 1; i++) {
        const currentSchedule = data[i];
        const nextSchedule = data[i + 1];

        if (
          currentSchedule.jam.akhir === nextSchedule.jam.awal &&
          currentSchedule.ruangan.nama === nextSchedule.ruangan.nama &&
          currentSchedule.pengampu.matakuliah.nama === nextSchedule.pengampu.matakuliah.nama &&
          currentSchedule.pengampu.matakuliah.semester === nextSchedule.pengampu.matakuliah.semester &&
          currentSchedule.pengampu.dosen.name === nextSchedule.pengampu.dosen.name &&
          currentSchedule.pengampu.kelas.nama === nextSchedule.pengampu.kelas.nama
        ) {
          currentSchedule.jam.akhir = nextSchedule.jam.akhir;
          data.splice(i + 1, 1);
          i--;
        }
      }

      setJadwal(data);
    } catch (error) {
      console.error(error);
    }
  };
  
  const breakTextIntoLines = (text, maxWidth) => {
    const lines = [];
    const words = text.split(' ');
  
    let line = '';
    for (const word of words) {
      const testLine = line + word + ' ';
      const testCanvas = document.createElement('canvas');
      const testContext = testCanvas.getContext('2d');
      const testWidth = testContext.measureText(testLine).width;
  
      if (testWidth > maxWidth) {
        const lastLine = lines[lines.length - 1];
        const lastLineWidth = testContext.measureText(lastLine).width;
  
        if (lastLineWidth <= maxWidth) {
          lines[lines.length - 1] += ` ${word} `;
        } else {
          lines.push(`${word} `);
        }
      } else {
        line = testLine;
      }
    }
  
    lines.push(line.trim());
  
    return lines;
  };

  const getColorAndSemester = (jadwal) => {
    const uniqueSemesters = [...new Set(jadwal.map(item => item.pengampu.matakuliah.semester))];
    
    const colorAndSemester = uniqueSemesters.map((semester, index) => ({
      semester,
      backgroundColor: getBackgroundColor(semester),
    }));

    colorAndSemester.sort((a, b) => a.semester - b.semester);
  
    return colorAndSemester;
  };  
  

  const chartData = {
    type: 'bar',
    labels:  ['R.101', 'R.102', 'R.103', 'R.104', 'R.105', 'R.106'],
    datasets: [{
      data: jadwal.map(item => {
        return {
          x: `R.${item.ruangan.nama}`,
          y: [`${nowDate} ${item.jam.awal}`, `${nowDate} ${item.jam.akhir}`],
          dataLabel: {
            ruangan: item.ruangan.nama,
            mataKuliah: item.pengampu.matakuliah.nama,
            pengampu: item.pengampu.dosen.name,
            kelas: item.pengampu.kelas.nama,
            awal: item.jam.awal,
            akhir: item.jam.akhir,
            semester: item.pengampu.matakuliah.semester,
          },
        };
      }),
      backgroundColor: jadwal.map(item => getBackgroundColor(item.pengampu.matakuliah.semester)),
      borderColor: 'rgba(0, 0, 0, 0)',
      barPercentage: 1.1,
      borderRadius: 8,
      borderWidth: {
        bottom: 1
      },
      borderSkipped: false,
    }],
  };

  const options = {
    maintainAspectRatio: false,
    plugins: {
      datalabels: {
        display: true,
        color: 'black',
        align: 'center',
        textAlign: 'center',
        font: {
          size: 10,
          family: 'poppins',
        },
        formatter: function (value, context) {
          const dataLabel = context.dataset.data[context.dataIndex].dataLabel;
    
          const barWidth = context.chart.scales['x'].getPixelForValue(1) - context.chart.scales['x'].getPixelForValue(0); 
          const maxWidth = barWidth * 0.75;
    
          const linesPengampu = breakTextIntoLines(dataLabel.pengampu, maxWidth);
          const linesMatakuliah = breakTextIntoLines(dataLabel.mataKuliah, maxWidth);
          const linesKelas = breakTextIntoLines(dataLabel.kelas, maxWidth);

          const formatTimeWithIcon = (time, icon) => {
            return `${icon} ${time}`;
          };
  
          return [
            ...linesMatakuliah,
            ...linesKelas,
            ...linesPengampu,
            formatTimeWithIcon(`${dataLabel.awal} - ${dataLabel.akhir}`, '🕔')
          ];        
        },
      },
    },
    
    scales: {
      x: {
        stacked: true,
        position: 'top',
        grid: {
          display: false,
          drawTicks: true,
          tickWidth: 5
        },
        border: {
          display: false,
        },
        ticks:{
          color: 'black',
          padding: 35,
          font: {
            size: 19,
            weight: 600
          }
        },
      },

      y: {
        stacked: true,
        min: `${nowDate} 07:00:00`,
        max: `${nowDate} 17:00:00`,
        reverse: true,
        type: 'time',
        time: {
          unit: 'hour',
          displayFormats:{
            hour: 'HH:mm'
          }
        },
        grid: {
          color: '#D9D9D9',
          lineWidth: 1.5,
          drawTicks:true,
          tickColor: 'rgba(0, 0, 0, 0)'
        },
        border: {
          display: false,
        },
        ticks: {
          color: 'black',
          font: {
            size: 18
          },
          backdropPadding: {
            x: 50
          },
        },
      },
    },
  };

  return (
    <div className="w-full h-full">
      <div className="w-full h-full flex justify-center">
        <div className="w-[90%] h-full">
          <div className="mt-[-20px] h-full z-0">
            <Bar data={chartData} options={options}/>
          </div>
        </div>
      </div>
      <div className='z-50 sticky bottom-0'>
          <ToolbarFooter colorAndSemester={colorAndSemester}/>
      </div>
    </div>
  );
};

export default JadwalKuliah;
