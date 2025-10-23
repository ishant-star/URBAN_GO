
import { FaFacebookF, } from 'react-icons/fa'
import { FaBookmark, FaCcAmazonPay, FaCcApplePay, FaCcMastercard, FaCcPaypal, FaCcVisa, FaInstagram, FaLink, FaPhone, FaTwitter, FaYoutube } from 'react-icons/fa6'
import { HiOutlinePhone } from 'react-icons/hi2'
import {Link} from 'react-router-dom'
import { CiLocationOn } from "react-icons/ci";
import { LuBookMarked, LuMails } from 'react-icons/lu'
import { GoMail } from 'react-icons/go'
import { RiMailSendLine } from 'react-icons/ri'
import { SiAmericanexpress } from 'react-icons/si'
import { useState } from 'react';


function Footer() {
    const [message, setMessage] = useState("")
  return (
    <>
        
      <div className="w-full h-3 bg-emerald-400 " />
      <div className='bg-gradient-to-r from-emerald-950 via-emerald-900 to-emerald-950 p-3 w-full '>
          
          <div className="mt-10  ">
    <div className="md:mt-10  md:grid md:gap-10 md:grid-cols-4 md:w-full md:items-start ">

{/* ===================================================section 1 start ============================================================= */}
    
      <div className="flex flex-col flex-1 md:w-full pr-10">
            <h2 className='mb-2 text-4xl font-semibold text-white font-serif flex-none'>UBER <span className='text-emerald-400 font-serif italic'>GO</span></h2>
            <h4 className='md:text-lg md:font-semibold text-green-400 mt-5'>Bringing you the freshest organic produce since 2010. Our mission is to deliver farm-fresh</h4>
            <h4 className='md:text-lg md:font-semibold text-green-400 mb-5'>goodness straight to your doorstep.</h4>
          

<div className="flex mb-5">
            
            <div className="text-xl        bg-emerald-400 rounded-full h-9 w-9 hover:scale-150"><FaFacebookF className="m-auto text-white mt-2" /></div>
            <div className="text-xl ml-3.5 bg-emerald-400 rounded-full h-9 w-9 hover:scale-150"><FaTwitter className="m-auto text-white mt-2" /></div>
            <div className="text-xl ml-3.5 bg-emerald-400 rounded-full h-9 w-9 hover:scale-150"><FaInstagram className="m-auto text-white mt-2" /></div>
            <div className="text-xl ml-3.5 bg-emerald-400 rounded-full h-9 w-9 hover:scale-150"><FaYoutube className="m-auto text-white mt-2" /></div>
</div>
   </div>   
{/* ===================================================section 1 end ============================================================= */}
{/* ===================================================section 2 start ============================================================= */}

                <div className="mt-2 md:mt-0  md:w-full text-white">
                    <h3 className='flex font-semibold text-2xl md:text-4xl' ><FaLink className='text-emerald-400 my-auto mr-1'/>Quick Link</h3>
                    <div className="h-0.5 mb-2 md:mt-2 w-36 md:w-55 rounded-full bg-emerald-400" />
                    <ul className=' md:mt-5 md:text-lg'>
                        
                           <Link to="/" >        <li className='md:font-semibold mt-5 md:mt-0 flex '>     <div className=" my-auto mr-2   hover:bg-emerald-400 rounded-full h-2  w-2  bg-white"></div>Home</li></Link>
                           <Link to="/Items" >   <li className='md:font-semibold flex mt-2'><div className=" my-auto mr-2 hover:bg-emerald-400 rounded-full h-2 w-2 bg-white"></div>Items</li></Link>
                           <Link to="/Contact" > <li className='md:font-semibold flex mt-2'><div className=" my-auto mr-2 hover:bg-emerald-400 rounded-full h-2 w-2 bg-white"></div>Contact</li></Link>
                        
                    </ul>
                </div>
{/* ===================================================section 2 end ============================================================= */}
{/* ===================================================section 3 start ============================================================= */}
 <div className="mt-3  md:w-full md:mt-0 ">
                <h3 className=' md:text-4xl text-white flex font-semibold text-2xl' ><HiOutlinePhone className='text-emerald-400 my-auto mr-1'/>Contact Us</h3>
                    <div className="h-0.5 mb-2 w-38 md:w-55 md:mt-2 rounded-full bg-emerald-400" />
   
               <div className="flex md:text-lg font-semibold mt-6 md:hover:text-white ">     <div className="mr-3 h-6 w-6 md:h-8 md:w-8   bg-emerald-700 mb-2 rounded-lg "><CiLocationOn className="m-auto mt-1 text-emerald-500 " /></div>         <h3 className="text-white ">Bareilly,Uttar Pradesh , India</h3> </div>
               <div className="flex md:text-lg font-semibold mt-2 md:hover:text-white">     <div className="mr-3 h-6 w-6 md:h-8 md:w-8   bg-emerald-700 mb-2 rounded-lg "><FaPhone      className="m-auto mt-1 text-emerald-500 " /></div>         <h3 className="text-white ">+91 8449512154                </h3> </div>
               <div className="flex md:text-lg font-semibold mt-2 md:hover:text-white">     <div className="mr-3 h-6 w-6 md:h-8 md:w-8   bg-emerald-700 mb-2 rounded-lg "><LuMails      className="m-auto mt-1 text-emerald-500 " /></div>         <h3 className="text-white ">ishant64raj@gmail.com         </h3> </div>
</div>
{/* ===================================================section 3 end ============================================================= */}
{/* ===================================================section 4 start ============================================================= */}
<div className=" md:w-full">
                   <h3 className='mt-5 text-white flex font-semibold text-2xl md:text-4xl md:mt-0' ><GoMail className='text-emerald-400 my-auto mr-1'/>NewsLetter</h3>
                    <div className="h-0.5 mb-3 w-39 md:w-58 rounded-full bg-emerald-400 md:mt-2" />
                     <h4 className="text-emerald-400 mb-3 md:font-semibold ">Subscribe to our newsletter for fresh updates, exclusive offers, and seasonal recipes!</h4>
                     <form  className='transition-all ease-in-out'  onSubmit={(e) => {
      e.preventDefault();
      setMessage("✅ Thank you for subscribing!");
    }}> 
     {/* Alert Message */}
  {message && (
    <div className="mt-3 text-sm text-green-400 font-semibold">
      {message}
    </div>
  )}
                        <div className=" mb-2 bg-gradient-to-r from-emerald-950 via-emerald-900 to-emerald-800 h-10 w-full border-2 rounded-t-2xl border-emerald-400 text-emerald-400 "><input type="email" placeholder="Your email Address" className="outline-0 p-3 h-8 w-130 placeholder-emerald-400" /> </div>
                         <div className="mt-3 h-10 w-full border-2 rounded-b-2xl border-emerald-400 text-emerald-400 bg-emerald-400 hover:mt-0  hover:bg-emerald-300 transition-all duration-300 ease-in-out" ><button  className="flex m-auto text-white  text-[22px]" type="submit"><RiMailSendLine className='my-auto'/>Subsribe</button></div>
                     </form>
    
                     <h5 className='text-emerald-400 my-5  '>We respect your privacy. Unsubscribe at any time.</h5>

                     <div className="md:hidden mt-5 bg-emerald-800 h-0.5  "/>
                     </div>
</div>
{/* ===================================================section 4 end ============================================================= */}

{/* ============================================================================================================================================================================================================================================================================================= */}
                      <div className=" md:mt-5 md:bg-gradient-to-r from-emerald-950  md:h-0.5  "/>
                      
                       <div className="mx-auto"><h3 className="place-content-center mt-5 flex  text-emerald-400 text-lg font-serif font-bold"><FaBookmark className='mr-3.5 my-auto'/>We Accept All Major Payment Methods</h3>
                        
                         <ul className="flex mt-5 ml-20 md:ml-0">
                            <li className='md:scale-150 md:my-2 ml-auto h-10 w-10 rounded-full bg-emerald-900 hover:scale-130 '><FaCcVisa           className='mt-2 ml-2 text-2xl text-white'/></li>
                            <li className='md:scale-150 md:my-2 ml-5 h-10 w-10 rounded-full bg-emerald-900 hover:scale-130  '><FaCcMastercard    className='mt-2 ml-2 text-2xl text-white'/></li>
                            <li className='md:scale-150 md:my-2 ml-5 h-10 w-10 rounded-full bg-emerald-900 hover:scale-130  '><FaCcPaypal        className='mt-2 ml-2 text-2xl text-white'/></li>
                            <li className='md:scale-150 md:my-2 ml-5 mr-5 h-10 w-10 rounded-full bg-emerald-900 hover:scale-130  '><SiAmericanexpress className='mt-2 ml-2 text-2xl text-white'/></li>
                            <li className='md:scale-150 md:my-2 mr-auto h-10 w-10 rounded-full bg-emerald-900 hover:scale-130  '><FaCcApplePay      className='mt-2 ml-2 text-2xl text-white'/></li>
                         </ul>
                         <div className="mt-5 h-15 w-full rounded-full border-2  bg-gradient-to-r from-emerald-950 via-emerald-900 to-emerald-800 text-emerald-400 text-2xl place-content-center flex justify-center items-center"> Designed by  <a href="https://my-portfolio-eight-indol-51.vercel.app/" className='text-white ml-2 hover:underline hover:font-serif hover:italic '>  Ishant Raj</a></div>
                       </div>













          </div>
    </div>
    
    </>
  )
}

export default Footer