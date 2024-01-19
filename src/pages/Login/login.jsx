import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../config/auth/Auth';

const Login = () => {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  // remember me
  // useEffect(() => {
  //   const rememberedEmail = Cookies.get('rememberedEmail');
  //   if (rememberedEmail) {
  //     setEmail(rememberedEmail);
  //     setRememberMe(true);
  //   }
  // }, []);

  // handle remember Me
  // const handleRememberMeChange = () => {
  //   setRememberMe(!rememberMe);
  //   if (!rememberMe) {

  //     Cookies.set('rememberedEmail', email, { expires: 7 });
  //   } else {
      
  //     Cookies.remove('rememberedEmail');
  //   }
  // };

  // useEffect(() => {
  //   let activityTimer;

    // handle timer
  //   const handleUserActivity = () => {
      
  //     clearTimeout(activityTimer);

  //     activityTimer = setTimeout(() => {
  //       Cookies.remove('rememberedEmail');
  //     }, 30 * 60 * 1000); 
  //   };

  //   window.addEventListener('click', handleUserActivity);
  //   window.addEventListener('keydown', handleUserActivity);

  //   handleUserActivity();

  //   return () => {
  //     window.removeEventListener('click', handleUserActivity);
  //     window.removeEventListener('keydown', handleUserActivity);
  //     clearTimeout(activityTimer);
  //   };
  // }, []);


  // login auth
  const loginHandler = async (e) => {
    e.preventDefault();
  
    const formData = new FormData();
    formData.append('email', email);
    formData.append('password', password);
  
    try {
      await login(formData);
    } catch (error) {
      console.error(error);
    }
  };
 
  return (
    <div className="flex justify-center h-screen items-center">
      <div className="App w-[450px] py-6 px-8 bg-white border border-gray-200 rounded-md shadow">
        <span className="text-center">
          <h1 className="text-3xl font-semibold mt-6 mb-8">Masuk</h1>
        </span>
      
        <form onSubmit={loginHandler}>
          <div className="mb-6 ">
            <label htmlFor="email" className=" block mb-2 text-sm font-medium text-gray-900">Email</label>
            <input 
              type="text" 
              id="email" 
              value={email} 
              autoComplete="off"
              onChange={(e) => setEmail(e.target.value)} 
              className="shadow-sm bg-white border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " required />
          </div>

          <div className="mb-6">
            <label htmlFor="password" className=" block mb-2 text-sm font-medium text-gray-900">Password</label>
            <input 
              type="password" 
              id="password" 
              value={password} 
              autoComplete="off"
              onChange={(e) => setPassword(e.target.value)} 
              className="shadow-sm bg-white border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " required />
          </div>
        
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="col-start-1 col-end-3 flex">
              <div className="flex items-center h-5">
                <input 
                  id="ingat-saya" 
                  type="checkbox" 
                  checked={rememberMe}
                  // onChange={handleRememberMeChange}
                  className="w-4 h-4 border border-gray-300 rounded bg-white focus:ring-3 focus:ring-blue-300 "/>
              </div>
              <label htmlFor="ingat-saya" className=" ml-2 text-sm font-medium text-gray-900">Ingat saya</label>
            </div>

            <div className="col-end-4 grid justify-items-end">
              <a href="#" className=" text-sm font-medium text-gray-900 hover:underline">Lupa Password?</a>
            </div>
          </div>
          <button type="submit" className=" w-full text-white bg-[#03965C] hover:bg-green-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
            Masuk
          </button>
          
          <div className="text-center mt-6 mb-4">
            <p className="text-sm ">Belum punya akun? <Link to="/register" className="text-blue-600 hover:underline">Daftar di sini</Link></p>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login