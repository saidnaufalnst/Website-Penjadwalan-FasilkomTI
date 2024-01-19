import React, { useState } from 'react'
import ReactModal from 'react-modal';
import { NavLink } from 'react-router-dom';
import logo_fasilkom from '../../assets/image/logo_fasilkom.png'
import { useAuth } from '../../config/auth/Auth';
import axios from 'axios';
import Swal from 'sweetalert2';

const SideNavbar = () => {
    const {logout} = useAuth();
    const user = localStorage.getItem("user");
    const role = localStorage.getItem("role");
    const [isOpen, setIsOpen] = useState(false);
    const [confirmReset, setConfirmReset] = useState("");
    const [randomCode, setRandomCode] = useState("")

    const logoutHandler = () => {
        const isLogOut = window.confirm("Apakah Anda yakin ingin log out?");

        if (isLogOut){
            logout();
        }
    }

    const confirmHandler = () => {
        setIsOpen(true);
        generateRandomCode();
    }

    const closeModal = () => {
        setConfirmReset("");
        setIsOpen(false);
    };

    const closeModalOnOverlayClick = (event) => {
        if (event.target === event.currentTarget) {
        closeModal();
        }
    };

    const generateRandomCode =() => {
        const code = Math.floor(1000 + Math.random() * 9000).toString();

        setRandomCode(code);
    }

    const resetHandler = async (e) =>  {
        e.preventDefault();

        try {
        if (confirmReset === randomCode){
            await axios.get('/reset');
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
        } 
        } catch (error) {
            Swal.fire({
                title: "Gagal!",
                text: error,
                icon: "error",
                showConfirmButton: false,
                timer: 1500,
                willClose: () => {
                closeModal();
                },
            });    
        } 
    }
    
    return(
        <div className="w-[350px] side-navbar z-50">
            <div className="h-full w-full pt-4 overflow-y-auto bg-[#03965C]">
                <div className="flex justify-center sticky top-0 bg-[#03965C] pb-2 mb-4">
                    <img src={logo_fasilkom} alt="" className="w-[51px] h-[51px]"/>
                    <div className="grid grid-rows-2 items-center">
                        <span className="text-white px-2 font-semibold">Fasilkom-TI</span>
                        <span className="text-white text-sm px-2 font-medium">Sistem Penjadwalan</span>
                    </div>
                </div>
                <div className="w-full">
                    <ul className="px-4 font-medium">
                        <li>
                            <NavLink to="/page/admin/home" className="hover:bg-[#92FFB7] hover:bg-opacity-[32%] rounded-lg  flex items-center p-2 mb-3 text-white group">
                                <svg width="26" height="26" viewBox="0 0 33 33" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path className="" fillRule="evenodd" clipRule="evenodd" d="M7.0327 13.5016C6.66675 14.2972 6.66675 15.2024 6.66675 17.0127V22.6666C6.66675 25.1807 6.66675 26.4378 7.4478 27.2189C8.19354 27.9646 9.37324 27.9983 11.6667 27.9998V21.3333C11.6667 20.0447 12.7114 19 14.0001 19H18.0001C19.2887 19 20.3334 20.0447 20.3334 21.3333V27.9998C22.6269 27.9983 23.8066 27.9646 24.5524 27.2189C25.3334 26.4378 25.3334 25.1807 25.3334 22.6666V17.0127C25.3334 15.2024 25.3334 14.2972 24.9675 13.5016C24.6015 12.7059 23.9143 12.1168 22.5397 10.9387L21.2064 9.79582C18.722 7.66631 17.4798 6.60156 16.0001 6.60156C14.5204 6.60156 13.2782 7.66632 10.7938 9.79582L9.46042 10.9387C8.0859 12.1168 7.39864 12.7059 7.0327 13.5016ZM18.3334 27.9999V21.3333C18.3334 21.1492 18.1842 21 18.0001 21H14.0001C13.816 21 13.6667 21.1492 13.6667 21.3333V27.9999H18.3334Z" fill="white"/>
                                </svg>
                                <span className="ml-3">Beranda</span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/page/admin/dosen" className="hover:bg-[#92FFB7] hover:bg-opacity-[32%] rounded-lg  flex items-center p-2 mb-3 text-white group">
                                <svg width="25" height="25" viewBox="0 0 29 29" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path className="" fillRule="evenodd" clipRule="evenodd" d="M2.41675 14.5C2.41675 7.82656 7.82664 2.41666 14.5001 2.41666C21.1735 2.41666 26.5834 7.82656 26.5834 14.5C26.5834 18.2219 24.9007 21.5507 22.2546 23.7672C21.7195 22.2939 20.7737 20.9984 19.5224 20.0382C18.0816 18.9326 16.3162 18.3333 14.5001 18.3333C12.684 18.3333 10.9186 18.9326 9.4778 20.0382C8.22643 20.9984 7.28062 22.2939 6.74558 23.7672C4.09945 21.5507 2.41675 18.2219 2.41675 14.5ZM20.5371 24.9657L20.538 24.969C18.7615 25.9957 16.6994 26.5833 14.5001 26.5833C12.3007 26.5833 10.2386 25.9957 8.46216 24.969L8.46305 24.9657C8.81914 23.6368 9.6038 22.4624 10.6953 21.6249C11.7868 20.7873 13.1242 20.3333 14.5001 20.3333C15.8759 20.3333 17.2133 20.7873 18.3048 21.6249C19.3964 22.4624 20.181 23.6368 20.5371 24.9657ZM11.8751 10.875C11.8751 9.42525 13.0503 8.25 14.5001 8.25C15.9498 8.25 17.1251 9.42525 17.1251 10.875C17.1251 12.3247 15.9498 13.5 14.5001 13.5C13.0503 13.5 11.8751 12.3247 11.8751 10.875ZM14.5001 6.25C11.9458 6.25 9.87508 8.32068 9.87508 10.875C9.87508 13.4293 11.9458 15.5 14.5001 15.5C17.0544 15.5 19.1251 13.4293 19.1251 10.875C19.1251 8.32068 17.0544 6.25 14.5001 6.25Z" fill="white"/>
                                    <rect className="" x="2.91675" y="2.91666" width="23.1667" height="23.1667" rx="11.5833" stroke="white"/>
                                </svg>
                                <span className="ml-3">Dosen</span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/page/admin/kelas" className="hover:bg-[#92FFB7] hover:bg-opacity-[32%] rounded-lg  flex items-center p-2 mb-3 text-white group">
                                <svg width="25" height="25" viewBox="0 0 29 29" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path className="" d="M5.75 21.25H12.5C13.8807 21.25 15 22.3693 15 23.75V11C15 8.17157 15 6.75736 14.1213 5.87868C13.2426 5 11.8284 5 9 5H5.75C4.80719 5 4.33579 5 4.04289 5.29289C3.75 5.58579 3.75 6.05719 3.75 7V19.25C3.75 20.1928 3.75 20.6642 4.04289 20.9571C4.33579 21.25 4.80719 21.25 5.75 21.25Z" fill="white"/>
                                    <path className="" d="M24.25 21.25H17.5C16.1193 21.25 15 22.3693 15 23.75V11C15 8.17157 15 6.75736 15.8787 5.87868C16.7574 5 18.1716 5 21 5H24.25C25.1928 5 25.6642 5 25.9571 5.29289C26.25 5.58579 26.25 6.05719 26.25 7V19.25C26.25 20.1928 26.25 20.6642 25.9571 20.9571C25.6642 21.25 25.1928 21.25 24.25 21.25Z" fill="white"/>
                                </svg>
                                <span className="ml-3">Kelas</span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/page/admin/matakuliah" className="hover:bg-[#92FFB7] hover:bg-opacity-[32%] rounded-lg  flex items-center p-2 mb-3 text-white group">
                                <svg width="25" height="25" viewBox="0 0 29 29" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path className="" d="M3.625 7.625C3.625 5.73938 3.625 4.79657 4.21079 4.21079C4.79657 3.625 5.73938 3.625 7.625 3.625H21.375C23.2606 3.625 24.2034 3.625 24.7892 4.21079C25.375 4.79657 25.375 5.73938 25.375 7.625V21.375C25.375 23.2606 25.375 24.2034 24.7892 24.7892C24.2034 25.375 23.2606 25.375 21.375 25.375H7.625C5.73938 25.375 4.79657 25.375 4.21079 24.7892C3.625 24.2034 3.625 23.2606 3.625 21.375V7.625Z" stroke="white" strokeWidth="2"/>
                                    <path className="" fillRule="evenodd" clipRule="evenodd" d="M21.75 12.0833H14.9485C14.131 12.0833 13.7223 12.0833 13.3547 11.9311C12.9872 11.7789 12.6982 11.4898 12.1201 10.9118L10.8382 9.6299C10.2602 9.05184 9.97115 8.76281 9.60361 8.61057C9.23606 8.45833 8.82731 8.45833 8.00981 8.45833H3.625V21.375C3.625 23.2606 3.625 24.2034 4.21079 24.7892C4.79657 25.375 5.73938 25.375 7.625 25.375H21.375C23.2606 25.375 24.2034 25.375 24.7892 24.7892C25.375 24.2034 25.375 23.2606 25.375 21.375V8.45833C25.375 9.98214 25.375 10.744 24.9814 11.2747C24.8642 11.4327 24.7244 11.5726 24.5664 11.6897C24.0357 12.0833 23.2738 12.0833 21.75 12.0833ZM8.45833 18.3333C7.90605 18.3333 7.45833 18.781 7.45833 19.3333C7.45833 19.8856 7.90605 20.3333 8.45833 20.3333H18.125C18.6773 20.3333 19.125 19.8856 19.125 19.3333C19.125 18.781 18.6773 18.3333 18.125 18.3333H8.45833Z" fill="white"/>
                                </svg>
                                <span className="ml-3">Mata Kuliah</span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/page/admin/pengampu" className="hover:bg-[#92FFB7] hover:bg-opacity-[32%] rounded-lg  flex items-center p-2 mb-3 text-white group">
                                <svg width="25" height="25" viewBox="0 0 29 29" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path className="" fillRule="evenodd" clipRule="evenodd" d="M2.41675 14.5C2.41675 7.82656 7.82664 2.41666 14.5001 2.41666C21.1735 2.41666 26.5834 7.82656 26.5834 14.5C26.5834 18.2219 24.9007 21.5507 22.2546 23.7672C21.7195 22.2939 20.7737 20.9984 19.5224 20.0382C18.0816 18.9326 16.3162 18.3333 14.5001 18.3333C12.684 18.3333 10.9186 18.9326 9.4778 20.0382C8.22643 20.9984 7.28062 22.2939 6.74558 23.7672C4.09945 21.5507 2.41675 18.2219 2.41675 14.5ZM20.5371 24.9657L20.538 24.969C18.7615 25.9957 16.6994 26.5833 14.5001 26.5833C12.3007 26.5833 10.2386 25.9957 8.46216 24.969L8.46305 24.9657C8.81914 23.6368 9.6038 22.4624 10.6953 21.6249C11.7868 20.7873 13.1242 20.3333 14.5001 20.3333C15.8759 20.3333 17.2133 20.7873 18.3048 21.6249C19.3964 22.4624 20.181 23.6368 20.5371 24.9657ZM11.8751 10.875C11.8751 9.42525 13.0503 8.25 14.5001 8.25C15.9498 8.25 17.1251 9.42525 17.1251 10.875C17.1251 12.3247 15.9498 13.5 14.5001 13.5C13.0503 13.5 11.8751 12.3247 11.8751 10.875ZM14.5001 6.25C11.9458 6.25 9.87508 8.32068 9.87508 10.875C9.87508 13.4293 11.9458 15.5 14.5001 15.5C17.0544 15.5 19.1251 13.4293 19.1251 10.875C19.1251 8.32068 17.0544 6.25 14.5001 6.25Z" fill="white"/>
                                    <rect className="" x="2.91675" y="2.91666" width="23.1667" height="23.1667" rx="11.5833" stroke="white"/>
                                </svg>
                                <span className="ml-3">Pengampu</span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/page/admin/reservasi" className="hover:bg-[#92FFB7] hover:bg-opacity-[32%] rounded-lg  flex items-center p-2 mb-3 text-white group">
                                <svg width="25" height="25" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path className="" fillRule="evenodd" clipRule="evenodd" d="M18.2953 3.78108C17.3978 3.75 16.3244 3.75 15 3.75C11.5054 3.75 9.75816 3.75 8.37987 4.3209C6.54216 5.08211 5.08211 6.54216 4.3209 8.37987C3.75 9.75816 3.75 11.5054 3.75 15V18.75C3.75 22.2855 3.75 24.0533 4.84835 25.1517C5.9467 26.25 7.71447 26.25 11.25 26.25H15C18.4946 26.25 20.2418 26.25 21.6201 25.6791C23.4578 24.9179 24.9179 23.4578 25.6791 21.6201C26.25 20.2418 26.25 18.4946 26.25 15C26.25 13.6756 26.25 12.6022 26.2189 11.7047C25.6775 12.4873 24.7736 13 23.75 13C22.0931 13 20.75 11.6569 20.75 10V9.25H20C18.3431 9.25 17 7.90685 17 6.25C17 5.22636 17.5127 4.32246 18.2953 3.78108ZM11.25 11.4996C10.6977 11.4996 10.25 11.9473 10.25 12.4996C10.25 13.0519 10.6977 13.4996 11.25 13.4996H18.75C19.3023 13.4996 19.75 13.0519 19.75 12.4996C19.75 11.9473 19.3023 11.4996 18.75 11.4996H11.25ZM11.25 16.4996C10.6977 16.4996 10.25 16.9473 10.25 17.4996C10.25 18.0519 10.6977 18.4996 11.25 18.4996H15C15.5523 18.4996 16 18.0519 16 17.4996C16 16.9473 15.5523 16.4996 15 16.4996H11.25Z" fill="white"/>
                                    <path className="" d="M23.75 10L23.75 2.5M20 6.25H27.5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                                <span className="ml-3">Reservasi</span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/page/admin/constraint" className="hover:bg-[#92FFB7] hover:bg-opacity-[32%] rounded-lg  flex items-center p-2 mb-3 text-white group">
                                <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd" clipRule="evenodd" d="M11.595 13.7667C11.3976 13.7556 11.1991 13.75 11 13.75C9.18393 13.75 7.41857 14.2161 5.97776 15.076C4.85902 15.7437 3.9845 16.6198 3.42938 17.6168C3.17758 18.0691 3.47938 18.5993 3.98613 18.7049C6.66097 19.2624 9.38566 19.4975 12.1025 19.4103C10.7989 19.084 9.83339 17.9048 9.83339 16.5C9.83339 15.2847 10.556 14.2382 11.595 13.7667Z" fill="white"/>
                                    <path d="M16.5 12.8333L16.5 20.1666" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
                                    <path d="M20.1665 16.5L12.8332 16.5" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
                                    <circle cx="10.9998" cy="7.33333" r="4.58333" fill="white"/>
                                </svg>
                                <span className="ml-3">Constraint</span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to="/page/admin/proses" className="hover:bg-[#92FFB7] hover:bg-opacity-[32%] rounded-lg  flex items-center p-2 mb-3 text-white group">
                                <svg width="25" height="25" viewBox="0 0 31 31" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path className="" fillRule="evenodd" clipRule="evenodd" d="M11.404 6.0102C7.73444 7.59613 5.1665 11.2482 5.1665 15.5C5.1665 15.9052 5.18983 16.305 5.23521 16.698L13.6627 14.4399L11.404 6.0102ZM14.3022 5.23532L16.6899 14.1464L16.7016 14.1898C16.7516 14.3755 16.8221 14.6374 16.853 14.8776C16.892 15.1803 16.9012 15.6591 16.6195 16.147C16.3378 16.6349 15.9186 16.8664 15.6369 16.9839C15.4135 17.0772 15.1514 17.1471 14.9655 17.1967L14.9221 17.2083L6.0102 19.5962C7.59622 23.2656 11.2482 25.8333 15.4998 25.8333C21.2068 25.8333 25.8332 21.2069 25.8332 15.5C25.8332 9.79305 21.2068 5.16666 15.4998 5.16666C15.0948 5.16666 14.6951 5.18997 14.3022 5.23532Z" fill="white"/>
                                    <path className="" d="M12.6745 4.95531C12.4245 4.02253 12.2996 3.55614 11.8843 3.35749C11.469 3.15885 11.0703 3.33534 10.2727 3.6883C9.33722 4.10229 8.45207 4.6269 7.63675 5.25252C6.29103 6.28513 5.16188 7.57268 4.31376 9.04167C3.46564 10.5107 2.91516 12.1323 2.69376 13.814C2.55961 14.8329 2.54786 15.8618 2.65707 16.8789C2.75018 17.7461 2.79673 18.1797 3.17639 18.44C3.55605 18.7004 4.02244 18.5754 4.95523 18.3254L13.5681 16.0176C14.4788 15.7736 14.9341 15.6516 15.1412 15.2929C15.3483 14.9342 15.2263 14.4788 14.9823 13.5682L12.6745 4.95531Z" fill="white"/>
                                </svg>
                                <span className="ml-3">Proses</span>
                            </NavLink>
                        </li>
                        <div className="line-nav rounded-lg mb-3"></div>
                        <li>
                            <button onClick={confirmHandler} className="hover:bg-[#92FFB7] hover:bg-opacity-[32%] rounded-lg  flex items-center p-2 mb-4 text-white group w-full">
                                <svg width="27" height="27" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd" clipRule="evenodd" d="M15 26.25C21.2132 26.25 26.25 21.2132 26.25 15C26.25 8.7868 21.2132 3.75 15 3.75C8.7868 3.75 3.75 8.7868 3.75 15C3.75 21.2132 8.7868 26.25 15 26.25ZM16.7929 18.2071C17.1834 18.5976 17.8166 18.5976 18.2071 18.2071C18.5976 17.8166 18.5976 17.1834 18.2071 16.7929L16.4142 15L18.2071 13.2071C18.5976 12.8166 18.5976 12.1834 18.2071 11.7929C17.8166 11.4024 17.1834 11.4024 16.7929 11.7929L15 13.5858L13.2071 11.7929C12.8166 11.4024 12.1834 11.4024 11.7929 11.7929C11.4024 12.1834 11.4024 12.8166 11.7929 13.2071L13.5858 15L11.7929 16.7929C11.4024 17.1834 11.4024 17.8166 11.7929 18.2071C12.1834 18.5976 12.8166 18.5976 13.2071 18.2071L15 16.4142L16.7929 18.2071ZM18.2528 7.14702C16.436 6.39447 14.4144 6.29516 12.5326 6.86601C10.6507 7.43686 9.02505 8.64255 7.93251 10.2777C6.83997 11.9128 6.34818 13.8761 6.54093 15.8331C6.73368 17.7902 7.59905 19.6199 8.98959 21.0104C9.38011 21.4009 10.0133 21.4009 10.4038 21.0104C10.7943 20.6199 10.7943 19.9867 10.4038 19.5962C9.34045 18.5328 8.6787 17.1337 8.5313 15.6371C8.3839 14.1405 8.75998 12.6392 9.59545 11.3888C10.4309 10.1384 11.6741 9.21642 13.1132 8.77989C14.5522 8.34336 16.0981 8.4193 17.4874 8.99478C18.8768 9.57027 20.0236 10.6097 20.7325 11.9359C21.4414 13.2622 21.6685 14.7932 21.3751 16.2681C21.0817 17.743 20.286 19.0706 19.1236 20.0246C17.9611 20.9786 16.5038 21.5 15 21.5C14.4477 21.5 14 21.9477 14 22.5C14 23.0523 14.4477 23.5 15 23.5C16.9665 23.5 18.8722 22.8181 20.3923 21.5706C21.9125 20.323 22.953 18.587 23.3367 16.6583C23.7203 14.7295 23.4233 12.7274 22.4963 10.9931C21.5693 9.25881 20.0696 7.89958 18.2528 7.14702Z" fill="white"/>
                                </svg>
                                <span className="ml-3">Reset</span>
                            </button>
                        </li>
                        <li>
                            <NavLink to="/page/admin/account-setting" className="hover:bg-[#92FFB7] hover:bg-opacity-[32%] rounded-lg  flex items-center p-2 mb-3 text-white group">
                            <svg width="22" height="22" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" clipRule="evenodd" d="M12.8564 2.45932C12.9098 2.59182 12.9261 2.75504 12.9588 3.08148C13.0205 3.69871 13.0514 4.00733 13.1555 4.19099C13.3816 4.58975 13.8499 4.78372 14.2917 4.66163C14.4952 4.6054 14.7353 4.409 15.2154 4.0162L15.2154 4.01619C15.4693 3.80846 15.5962 3.70459 15.7277 3.6487C16.0097 3.52886 16.331 3.54488 16.5997 3.69219C16.725 3.76089 16.8409 3.87687 17.0729 4.10885L17.8919 4.92786L17.8919 4.92787C18.1239 5.15984 18.2399 5.27583 18.3086 5.40111C18.4559 5.66975 18.4719 5.99109 18.3521 6.27306C18.2962 6.40455 18.1923 6.53151 17.9846 6.78542C17.5918 7.26553 17.3954 7.50558 17.3391 7.70909C17.217 8.15093 17.411 8.6192 17.8098 8.8453C17.9934 8.94944 18.3021 8.9803 18.9193 9.04203C19.2458 9.07467 19.409 9.091 19.5415 9.14446C19.8256 9.2591 20.0415 9.49765 20.1273 9.79176C20.1673 9.92893 20.1673 10.093 20.1673 10.4211V11.5794C20.1673 11.9074 20.1673 12.0714 20.1273 12.2085C20.0415 12.5027 19.8256 12.7413 19.5414 12.8559C19.409 12.9093 19.2458 12.9257 18.9194 12.9583C18.3024 13.02 17.9939 13.0508 17.8103 13.1549C17.4114 13.381 17.2173 13.8494 17.3395 14.2914C17.3958 14.4948 17.5921 14.7347 17.9847 15.2146C18.1924 15.4684 18.2962 15.5953 18.3521 15.7267C18.472 16.0088 18.456 16.3302 18.3086 16.5989C18.2399 16.7241 18.124 16.8401 17.8921 17.072L17.073 17.8911L17.0729 17.8911C16.841 18.1231 16.725 18.239 16.5997 18.3077C16.3311 18.455 16.0097 18.4711 15.7278 18.3512C15.5963 18.2953 15.4693 18.1915 15.2154 17.9837L15.2154 17.9837C14.7353 17.5909 14.4953 17.3945 14.2918 17.3383C13.8499 17.2162 13.3816 17.4102 13.1555 17.8089C13.0514 17.9926 13.0205 18.3013 12.9588 18.9186C12.9261 19.2452 12.9098 19.4086 12.8563 19.5411C12.7417 19.8251 12.5032 20.041 12.2091 20.1268C12.0719 20.1668 11.9078 20.1668 11.5796 20.1668H10.4215C10.0935 20.1668 9.92942 20.1668 9.79225 20.1268C9.49814 20.041 9.25959 19.8251 9.14495 19.541C9.09149 19.4085 9.07516 19.2453 9.04252 18.9188C8.98079 18.3016 8.94993 17.9929 8.84578 17.8093C8.61968 17.4105 8.15142 17.2166 7.70959 17.3386C7.50607 17.3949 7.26601 17.5913 6.78589 17.9841L6.78587 17.9841C6.53196 18.1919 6.40499 18.2958 6.27349 18.3516C5.99153 18.4715 5.67021 18.4555 5.40157 18.3082C5.27628 18.2395 5.16028 18.1235 4.92829 17.8915L4.10931 17.0725C3.87732 16.8405 3.76133 16.7245 3.69263 16.5992C3.54533 16.3306 3.52931 16.0092 3.64914 15.7273C3.70503 15.5958 3.80891 15.4688 4.01666 15.2149L4.01666 15.2149C4.40948 14.7348 4.60588 14.4947 4.66211 14.2912C4.7842 13.8494 4.59024 13.3811 4.19147 13.155C4.00782 13.0509 3.6992 13.02 3.08196 12.9583C2.75553 12.9256 2.59231 12.9093 2.45981 12.8559C2.17569 12.7412 1.9598 12.5027 1.874 12.2086C1.83398 12.0714 1.83398 11.9074 1.83398 11.5793V10.4211C1.83398 10.093 1.83398 9.92889 1.87402 9.79168C1.95983 9.49764 2.17567 9.25913 2.45972 9.14449C2.59226 9.091 2.75553 9.07467 3.08208 9.04202C3.69951 8.98028 4.00823 8.9494 4.19194 8.84521C4.59058 8.6191 4.7845 8.15094 4.66249 7.70918C4.60627 7.5056 4.40979 7.26546 4.01682 6.78516C3.80896 6.53111 3.70503 6.40409 3.64914 6.27252C3.52937 5.99062 3.54539 5.66939 3.69261 5.40081C3.76132 5.27546 3.87737 5.15942 4.10946 4.92733L4.10946 4.92733L4.92833 4.10845C5.16033 3.87646 5.27632 3.76046 5.40161 3.69176C5.67025 3.54447 5.99158 3.52844 6.27353 3.64828C6.40504 3.70417 6.53203 3.80806 6.786 4.01586C7.26603 4.40862 7.50605 4.605 7.70948 4.66123C8.1514 4.78341 8.6198 4.58939 8.8459 4.19051C8.94998 4.0069 8.98083 3.69839 9.04253 3.08136C9.07517 2.75503 9.09148 2.59187 9.14491 2.45941C9.25955 2.17521 9.49816 1.95927 9.79235 1.87348C9.92947 1.8335 10.0935 1.8335 10.4214 1.8335H11.5798C11.9078 1.8335 12.0719 1.8335 12.209 1.87351C12.5032 1.95931 12.7417 2.1752 12.8564 2.45932ZM11.0007 14.6668C13.0257 14.6668 14.6673 13.0252 14.6673 11.0002C14.6673 8.97512 13.0257 7.3335 11.0007 7.3335C8.97561 7.3335 7.33399 8.97512 7.33399 11.0002C7.33399 13.0252 8.97561 14.6668 11.0007 14.6668Z" fill="white"/>
                            </svg>

                                <span className="ml-4">Pengaturan Akun</span>
                            </NavLink>
                        </li>
                        <li>
                            <button onClick={logoutHandler} className="hover:bg-[#92FFB7] hover:bg-opacity-[32%] rounded-lg  flex items-center p-2 mb-4 text-white group w-full">
                                <svg width="27" height="27" viewBox="0 0 27 27" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd" clipRule="evenodd" d="M13.246 2.26859L11.3064 1.96381C8.08584 1.45772 6.47555 1.20467 5.42527 2.10279C4.375 3.00091 4.375 4.63096 4.375 7.89107V9.49995H9.29438L7.09413 6.74964L8.65587 5.50025L12.1559 9.87525L12.6556 10.4999L12.1559 11.1246L8.65587 15.4996L7.09413 14.2503L9.29438 11.4999H4.375V13.1081C4.375 16.3682 4.375 17.9983 5.42527 18.8964C6.47555 19.7945 8.08584 19.5415 11.3064 19.0354L13.246 18.7306C14.8587 18.4771 15.665 18.3504 16.145 17.7891C16.625 17.2279 16.625 16.4116 16.625 14.7791V6.2201C16.625 4.58758 16.625 3.77132 16.145 3.21003C15.665 2.64874 14.8587 2.52202 13.246 2.26859Z" fill="white"/>
                                </svg>
                                <span className="ml-3">Log Out</span>
                            </button>
                        </li>
                        <div className="line-nav rounded-lg mb-4"></div>
                        <div className="flex justify-center items-center bg-black bg-opacity-[23%] rounded-full px-2 py-1">
                            <div className="w-1/5 flex justify-end">
                                <svg width="37" height="37" viewBox="0 0 37 37" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M30.791 31.3551C31.3806 31.2323 31.7314 30.6171 31.4666 30.0762C30.5548 28.2139 28.9938 26.5769 26.9464 25.3551C24.5233 23.9089 21.5542 23.125 18.4999 23.125C15.4455 23.125 12.4765 23.9089 10.0533 25.3551C8.006 26.5769 6.44498 28.2139 5.53319 30.0762C5.26836 30.6171 5.61918 31.2323 6.2088 31.3551L10.339 32.2159C15.7218 33.3377 21.278 33.3377 26.6607 32.2159L30.791 31.3551Z" fill="white"/>
                                    <circle cx="18.4998" cy="12.3333" r="7.70833" fill="white"/>
                                </svg>
                            </div>
                            <div className="w-4/5 grid grid-rows-2 my-1 items-center h-10">
                                <span className="text-white px-2 font-semibold">
                                    {user.length > 15 ? user.substring(0, 15) + "..." : user}
                                </span>
                                <span className="text-white text-sm px-2 font-thin">{role === "1" ? "Admin" : null}</span>
                            </div>
                        </div>
                    </ul>
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
                    <form onSubmit={resetHandler}>
                        <div className="mb-6 ">
                        <label htmlFor="nama-dosen" className="block mb-2 text-sm font-medium text-gray-900 ">
                            <span className='flex justify-center'>Apakah anda yakin reset semua data?</span>
                            <span className='text-[11px] flex justify-center'>Masukkan kode ini untuk melanjutkan: {randomCode}</span>
                        </label>
                        <input 
                            type="text" 
                            id="nama-dosen" 
                            autoComplete='off'
                            value={confirmReset}
                            onChange={(e) => setConfirmReset(e.target.value)} 
                            className="shadow-sm bg-white border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" required />
                        </div>

                        <div className="flex justify-center gap-3">
                            <div className="">
                                <button type="button" onClick={closeModal} className="w-[158px] h-[36px] hover:text-white hover:bg-[#03965C] rounded-lg text-sm px-4 mb-2 button-positive">
                                    Batal
                                </button>
                            </div>
                            <div className="">
                                <button type="submit" className="w-[158px] h-[36px] text-white bg-red-600 hover:bg-red-800 font-medium rounded-lg text-sm px-4 mb-2">
                                    Hapus
                                </button>
                            </div>
                        </div>
                    </form>
                    </div>
                </div>
                </div>
            </ReactModal>
        </div>
    )
}

export default SideNavbar;