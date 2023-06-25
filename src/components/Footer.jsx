import { MdFacebook } from "react-icons/md";
import { FiInstagram } from "react-icons/fi";
import { FaTwitter } from "react-icons/fa";


export default function Footer() {
  return (
    <footer className="footer flex flex-1 bg-[#393E41]">
      <div className='flex-row flex justify-between w-full pt-12 pb-10 mx-32'>
        <div className=''>
          <p className='text-4xl text-[#44BBA4] font-bold'>NiketCom</p>
          <p className='text-xs text-white font-normal'> Pesan tiket acara favoritmu</p>
          <p className='text-xs text-white font-normal'> dengan mudah.</p>
        </div>
        <div className='text-white font-normal space-y-1'>
          <h1 className='text-sm'>CONTACT US</h1>
          <h1 className='text-sm'>PRIVACY POLICY</h1>
          <h1 className='text-sm'>TERM & CONDITIONS</h1>
        </div>
        <div className='text-white font-normal'>
          <h1 className='text-sm mb-1'>NiketCom SUPPORT</h1>
          <h1 className='text-sm mb-1.5'>EMAIL: HELP@NIKET.COM</h1>
          <h1 className='text-sm mb-1'>FOLLOW US</h1>
          <div className='flex-row flex flex-1'>
              <FiInstagram className='mr-1.5' size={20}/>
              <FaTwitter className='mr-1.5' size={20}/>
              <MdFacebook size={20}/>
          </div>
        </div>
      </div>
    </footer>
  )
}
