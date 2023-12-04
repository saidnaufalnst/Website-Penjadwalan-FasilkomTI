import React, { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { useAuth } from '../../config/auth/Auth';
import { useNavigate } from 'react-router-dom';


const Register = () => {
  const { register } = useAuth();
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm_password, setPasswordConfirmation] = useState("");
  const [passwordMatch, setPasswordMatch] = useState(false)
  const navigate = useNavigate();

  useEffect(() => {
    setPasswordMatch(password === confirm_password);
  }, [confirm_password]);

  const registerHandler = (e) => {
    e.preventDefault();

    if (passwordMatch) {
      const formData = new FormData();
      formData.append('username', username);
      formData.append('name', name);
      formData.append('email', email);
      formData.append('password', password);
      register(formData)
    } else {
      setPasswordConfirmation('');
      alert('Konfirmasi Password tidak cocok');
    }
  };

  return (
    <div className="flex justify-center h-screen items-center">
      <div className="App w-[460px] py-6 px-8 bg-white border border-gray-200 rounded-md shadow dark:bg-gray-800 dark:border-gray-700">
        <span className="text-center">
          <h1 className="text-3xl font-semibold mt-6 mb-8">Daftar</h1>
        </span>

        <form onSubmit={registerHandler}>
          {/* nama */}
          <div className="mb-6 ">
            <label htmlFor="name" className=" block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nama</label>
            <input 
              name="name"
              type="text" 
              onChange={(e) => setName(e.target.value)}
              value={name}
              id="name" 
              autoComplete="off" 
              className="shadow-sm bg-white border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" required />
          </div>

          {/* usernama */}
          <div className="mb-6 ">
            <label htmlFor="username" className=" block mb-2 text-sm font-medium text-gray-900 dark:text-white">Username</label>
            <input 
              name="username"
              type="text" 
              onChange={(e) => setUsername(e.target.value)}
              value={username}
              id="username" 
              autoComplete="off" 
              className="shadow-sm bg-white border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" required />
          </div>

          {/* username */}
          <div className="mb-6 ">
            <label htmlFor="email" className=" block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
            <input 
             name="email"
             type="text" 
             onChange={(e) => setEmail(e.target.value)} 
             value={email}
             id="email" 
             autoComplete="off" 
              className="shadow-sm bg-white border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" required />
          </div>
          
          
          <div className="flex justify-between gap-9">
            {/* password */}
            <div className="mb-6">
              <label htmlFor="password" className=" block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
              <input 
                name="password"
                type="password" 
                onChange={(e) => setPassword(e.target.value)} 
                value={password}
                id="password" 
                autoComplete="off" 
                className="shadow-sm bg-white border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" required />
            </div>

            {/* confirmpassword */}
            <div className=" mb-6">
              <label htmlFor="confirm_password" className=" block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Confirm Password
                <FontAwesomeIcon
                icon={faCheck}
                className={
                  passwordMatch && confirm_password ? "valid" : "hide"
                }
                />
              </label>
              <input 
                name="confirm_password"
                type="password" 
                onChange={(e) => setPasswordConfirmation(e.target.value)} 
                value={confirm_password}
                id="confirm_password" 
                autoComplete="off" 
                className={`shadow-sm bg-white border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light 
                ${ !passwordMatch ? 'border-red-500' : '' }`} required />
            </div>
          </div>

          <div className="flex items-center mb-6">
            <div className="flex items-center h-5">
              <input id="terms" type="checkbox" value="" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800" required />
            </div>
            <label htmlFor="terms" className=" ml-2 text-justify text-sm font-medium text-gray-900 dark:text-gray-300">Saya setuju dengan <a href="#" className="text-blue-600 hover:underline dark:text-blue-500">Syarat & Ketentuan</a> dan <a href="#" className="text-blue-600 hover:underline dark:text-blue-500">Kebijakan Privasi</a></label>
          </div>

          <button 
            type="submit"
            className=" w-full text-white bg-[#03965C] hover:bg-green-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
              Daftar
          </button>
        </form>
      </div>
    </div>
  )
}
export default Register;