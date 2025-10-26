import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Nav from '../Components/Nav'
import { FaArrowLeftLong, FaLock } from 'react-icons/fa6'
import { BsFillPersonFill, BsMailbox2 } from "react-icons/bs";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { IoMdMail } from 'react-icons/io';

function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    Name: "",
    email: "",
    password: "",
    need: ""
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [viewPassword, setViewPassword] = useState(false);
  const [register, setRegister] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChanges = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      const endpoint = register ? `${import.meta.env.VITE_API_URL}/login` : `${import.meta.env.VITE_API_URL}/login/login`;
      const payload = register
        ? formData
        : { email: formData.email, password: formData.password };

      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      const data = await response.json();

      if (response.ok) {
        // Store JWT token and user data
        localStorage.setItem("authToken", data.token);
        localStorage.setItem("userData", JSON.stringify(data.user));
        
        setSuccess(`✅ ${register ? 'Registration' : 'Login'} successful!`);
        setFormData({ Name: "", email: "", password: "", need: "" });
        
        // Redirect to home page after successful login/registration
        setTimeout(() => {
          navigate("/");
        }, 1500);
      } else {
        setError(`❌ ${data.message || data.error || 'Authentication failed'}`);
      }
    }
    catch (err) {
      setError("❌ Network error. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }


  return (
    <>
      <Nav />
      <div className="min-h-screen bg-gradient-to-r from-black from-45% via-white via-10% to-black to-45% py-20 ">
        <Link to='/'> <div className='text-white flex text-lg mt-5 group'><FaArrowLeftLong className='mr-5 ml-2 mt-1 group-hover:text-emerald-500' /><span className='group-hover:text-emerald-500'>Back To Home</span></div></Link>

        <div className="bg-slate-900 border-1 min-h-120 mt-20 rounded-2xl scale-120 border-emerald-700  place-items-center sm:max-w-xs md:max-w-md lg:max-w-sm mx-auto">

          <div className="rounded-full bg-emerald-500 p-2 mt-6"><div className="rounded-full bg-emerald-800 p-5"> <BsFillPersonFill className='text-3xl text-emerald-400' /></div></div>

          <h1 className='text-white font-semibold text-2xl mt-4' >Welcome Back</h1>

          <form onSubmit={handleSubmit} className='w-full flex flex-col items-center ' action="">


            {register &&
              <>
                <BsFillPersonFill className='text-slate-500 -translate-x-29 translate-10 text-sm ' />
                <input
                  onChange={handleChanges}
                  className="p-6 mb-2 mt-2  h-12 w-65   bg-slate-800 rounded-lg placeholder:text-slate-500 text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder='Full Name'
                  type="text"
                  name="Name"
                />
              </>
            }

            <div className="">
              <IoMdMail className='text-slate-500 translate-x-1 translate-8 text-sm ' />





              <input
                onChange={handleChanges}
                className="p-6 mb-2  h-12 w-65   bg-slate-800 rounded-lg placeholder:text-slate-500 text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder='Email Address'
                type="email"
                name="email"

              />
            </div>

            <div className="">
              <FaLock className='text-slate-500 translate-x-1 translate-7.5 text-sm ' />
              <input
                onChange={handleChanges}
                className='p-6  h-12 w-65  bg-slate-800  rounded-lg placeholder:text-slate-500 text-white focus:outline-none focus:ring-2 focus:ring-green-500'
                placeholder='Password'
                type={viewPassword ? "text" : "password"}
                name="password"

              />
              <div
                className="-translate-y-7.5 translate-x-60 text-sm text-slate-400 cursor-pointer"
                onClick={() => setViewPassword(!viewPassword)}
              >
                {viewPassword ? <FaEyeSlash /> : <FaEye />}
              </div></div>

            {register ?
              <div className="flex gap-2 ">
                <input
                  onChange={handleChanges}
                  className=' '
                  type="checkbox" name="need" />
                <label className='text-white' htmlFor="need">{register ? `I agree to the Terms and Conditions` : `Remember me`}</label>

              </div>
              : <div className="flex gap-2 mr-34 ">

                <input
                  onChange={handleChanges}
                  className=' '
                  type="checkbox" name="need" id="need" />
                <label className='text-white' htmlFor="need">{register ? `I agree to the Terms and Conditions` : `Remember me`}</label>

              </div>}

            <button
              type="submit"
              disabled={loading}
              className={`mt-2 h-10 w-60 rounded-3xl font-semibold p-1 text-center transition-all ${
                loading
                  ? 'bg-gray-500 cursor-not-allowed'
                  : 'bg-green-500 hover:bg-emerald-500'
              }`}>
              {loading ? 'Processing...' : (register ? 'Sign Up' : 'Sign In')}
            </button>
          </form>

          {/* Success/Error Messages */}
          {success && (
            <div className="mt-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded-lg">
              {success}
            </div>
          )}
          {error && (
            <div className="mt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg">
              {error}
            </div>
          )}

          <h1 className='text-white mt-5'>Don't have an account? <span
            onClick={() => setRegister(!register)}
            className='text-green-400 cursor-pointer hover:underline'>{register ? `Sign In` : `Sign Up`}</span></h1>

        </div>





      </div>
    </>
  )
}

export default Login