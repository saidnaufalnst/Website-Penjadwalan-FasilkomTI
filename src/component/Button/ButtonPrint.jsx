import React from 'react'
import axios from 'axios'

const ButtonPrint = () => {
    const printJadwal = async () => {
        try {
          const response = await axios.get(`/export`, { responseType: 'blob' });
          const blob = new Blob([response.data], { type: response.headers['content-type'] });
          const url = window.URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = 'Jadwal Kuliah Ilmu Komputer.xlsx';
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
          window.URL.revokeObjectURL(url);
        } catch (error) {
          console.error(error);
        }
      };
  return (
    <div className="flex items-center justify-end">
        <button type="button" onClick={printJadwal} className="sticky flex justify-center items-center w-[32px] h-[32px] bg-[#DBDBDB] hover:bg-gray-400 rounded-lg z-50">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4 10C4 8.11438 4 7.17157 4.58579 6.58579C5.17157 6 6.11438 6 8 6H16C17.8856 6 18.8284 6 19.4142 6.58579C20 7.17157 20 8.11438 20 10V12C20 12.9428 20 13.4142 19.7071 13.7071C19.4142 14 18.9428 14 18 14H17.3C17.1586 14 17.0879 14 17.0439 13.9561C17 13.9121 17 13.8414 17 13.7V13C17 12.0572 17 11.5858 16.7071 11.2929C16.4142 11 15.9428 11 15 11H9C8.05719 11 7.58579 11 7.29289 11.2929C7 11.5858 7 12.0572 7 13V13.7C7 13.8414 7 13.9121 6.95607 13.9561C6.91213 14 6.84142 14 6.7 14H5C4.5286 14 4.29289 14 4.14645 13.8536C4 13.7071 4 13.4714 4 13V10Z" fill="#202020"/>
                <path d="M7 20.2615L7 13C7 12.0572 7 11.5858 7.29289 11.2929C7.58579 11 8.05719 11 9 11L15 11C15.9428 11 16.4142 11 16.7071 11.2929C17 11.5858 17 12.0572 17 13L17 20.2615C17 20.5961 17 20.7634 16.8902 20.8378C16.7803 20.9121 16.625 20.85 16.3143 20.7257L14.6857 20.0743C14.594 20.0376 14.5481 20.0193 14.5 20.0193C14.4519 20.0193 14.406 20.0376 14.3143 20.0743L12.1857 20.9257C12.094 20.9624 12.0481 20.9807 12 20.9807C11.9519 20.9807 11.906 20.9624 11.8143 20.9257L9.6857 20.0743C9.594 20.0376 9.54815 20.0193 9.5 20.0193C9.45185 20.0193 9.406 20.0376 9.3143 20.0743L7.6857 20.7257C7.37502 20.85 7.21969 20.9121 7.10984 20.8378C7 20.7634 7 20.5961 7 20.2615Z" fill="#7E869E" fillOpacity="0.25"/>
                <path d="M9.5 14.5L13.5 14.5" stroke="#202020" strokeLinecap="round"/>
                <path d="M9.5 17.5L14.5 17.5" stroke="#202020" strokeLinecap="round"/>
                <path d="M7 4.73913C7 4.04725 7 3.70131 7.16382 3.45155C7.23899 3.33693 7.33693 3.23899 7.45155 3.16382C7.70131 3 8.04725 3 8.73913 3H15.2609C15.9528 3 16.2987 3 16.5485 3.16382C16.6631 3.23899 16.761 3.33693 16.8362 3.45155C17 3.70131 17 4.04725 17 4.73913C17 4.84291 17 4.8948 16.9754 4.93227C16.9642 4.94946 16.9495 4.96415 16.9323 4.97543C16.8948 5 16.8429 5 16.7391 5H7.26087C7.15709 5 7.1052 5 7.06773 4.97543C7.05054 4.96415 7.03585 4.94946 7.02457 4.93227C7 4.8948 7 4.84291 7 4.73913Z" fill="#202020"/>
            </svg>
        </button>
    </div>
  )
}

export default ButtonPrint