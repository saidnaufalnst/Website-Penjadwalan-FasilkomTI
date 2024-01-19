import React from 'react';
import { NavLink } from 'react-router-dom';
import logo_fasilkom from '../../assets/image/logo_fasilkom.png'
import { useAuth } from '../../config/auth/Auth';

const SideNavbarUser = () => {
    const {logout} = useAuth();
    const user = localStorage.getItem("user");
    const role = localStorage.getItem("role");

    const logoutHandler = () => {
        const isLogOut = window.confirm("Apakah Anda yakin ingin log out?");

        if (isLogOut){
            logout();
        }
    }
    
    return(
        <div className="w-[350px] side-navbar z-50">
            <div className="h-full w-full py-4 overflow-y-auto bg-[#03965C]">
                    <div className="flex justify-center mb-6 sticky top-0 bg-[#03965C]">
                        <img src={logo_fasilkom} alt="" className="w-[51px] h-[51px]"/>
                        <div className="grid grid-rows-2 items-center">
                            <span className="text-white px-2 font-semibold">Ilmu Komputer</span>
                            <span className="text-white text-sm px-2 font-medium">Sistem Penjadwalan</span>
                        </div>
                    </div>
                    <div className="w-full">
                        <ul className="px-4 font-medium">
                            <li>
                                <NavLink to="/page/user/home" className="hover:bg-[#92FFB7] hover:bg-opacity-[32%] rounded-lg  flex items-center p-2 mb-3 text-white group">
                                    <svg width="26" height="26" viewBox="0 0 33 33" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path className="" fillRule="evenodd" clipRule="evenodd" d="M7.0327 13.5016C6.66675 14.2972 6.66675 15.2024 6.66675 17.0127V22.6666C6.66675 25.1807 6.66675 26.4378 7.4478 27.2189C8.19354 27.9646 9.37324 27.9983 11.6667 27.9998V21.3333C11.6667 20.0447 12.7114 19 14.0001 19H18.0001C19.2887 19 20.3334 20.0447 20.3334 21.3333V27.9998C22.6269 27.9983 23.8066 27.9646 24.5524 27.2189C25.3334 26.4378 25.3334 25.1807 25.3334 22.6666V17.0127C25.3334 15.2024 25.3334 14.2972 24.9675 13.5016C24.6015 12.7059 23.9143 12.1168 22.5397 10.9387L21.2064 9.79582C18.722 7.66631 17.4798 6.60156 16.0001 6.60156C14.5204 6.60156 13.2782 7.66632 10.7938 9.79582L9.46042 10.9387C8.0859 12.1168 7.39864 12.7059 7.0327 13.5016ZM18.3334 27.9999V21.3333C18.3334 21.1492 18.1842 21 18.0001 21H14.0001C13.816 21 13.6667 21.1492 13.6667 21.3333V27.9999H18.3334Z" fill="white"/>
                                    </svg>
                                    <span className="ml-3">Beranda</span>
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/page/user/reservasi" className="hover:bg-[#92FFB7] hover:bg-opacity-[32%] rounded-lg  flex items-center p-2 mb-3 text-white group">
                                    <svg width="25" height="25" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path className="" fillRule="evenodd" clipRule="evenodd" d="M18.2953 3.78108C17.3978 3.75 16.3244 3.75 15 3.75C11.5054 3.75 9.75816 3.75 8.37987 4.3209C6.54216 5.08211 5.08211 6.54216 4.3209 8.37987C3.75 9.75816 3.75 11.5054 3.75 15V18.75C3.75 22.2855 3.75 24.0533 4.84835 25.1517C5.9467 26.25 7.71447 26.25 11.25 26.25H15C18.4946 26.25 20.2418 26.25 21.6201 25.6791C23.4578 24.9179 24.9179 23.4578 25.6791 21.6201C26.25 20.2418 26.25 18.4946 26.25 15C26.25 13.6756 26.25 12.6022 26.2189 11.7047C25.6775 12.4873 24.7736 13 23.75 13C22.0931 13 20.75 11.6569 20.75 10V9.25H20C18.3431 9.25 17 7.90685 17 6.25C17 5.22636 17.5127 4.32246 18.2953 3.78108ZM11.25 11.4996C10.6977 11.4996 10.25 11.9473 10.25 12.4996C10.25 13.0519 10.6977 13.4996 11.25 13.4996H18.75C19.3023 13.4996 19.75 13.0519 19.75 12.4996C19.75 11.9473 19.3023 11.4996 18.75 11.4996H11.25ZM11.25 16.4996C10.6977 16.4996 10.25 16.9473 10.25 17.4996C10.25 18.0519 10.6977 18.4996 11.25 18.4996H15C15.5523 18.4996 16 18.0519 16 17.4996C16 16.9473 15.5523 16.4996 15 16.4996H11.25Z" fill="white"/>
                                        <path className="" d="M23.75 10L23.75 2.5M20 6.25H27.5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                    <span className="ml-3">Reservasi</span>
                                </NavLink>
                            </li>
                            <div className="line-nav rounded-lg mb-3"></div>
                            <li>
                                <button onClick={logoutHandler} className="hover:bg-[#92FFB7] hover:bg-opacity-[32%] rounded-lg  flex items-center p-2 mb-4 text-white group w-full">
                                    <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
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
                                <div className="w-4/5 grid grid-rows-2 my-1 items-center h-9">
                                    <span className="text-white px-2 font-semibold">
                                        {user.length > 15 ? user.substring(0, 15) + "..." : user}
                                    </span>
                                    <span className="text-white text-sm px-2 font-thin">{role === "2" ? "Pengguna" : null}</span>
                                </div>
                            </div>
                        </ul>
                    </div>
            </div>
        </div>
    )
}

export default SideNavbarUser;