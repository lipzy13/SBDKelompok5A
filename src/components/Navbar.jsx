"use client"
import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link'
export function Navbar () {
  const {data: session, status} = useSession()
  return (
    <header className='bg-[#393e41] h-12 flex justify-between px-12 navbar shadow-md'>
      <div id='logo-kiri'>
          <Link className='text-3xl py-7 font-bold text-[#44BBA4]' href='/'>Niketcom</Link>
      </div>
      <div id='logo-kanan' className='space-x-1'>
        { session ? <div className="dropdown">
           <label tabIndex={0} className="btn m-1">...</label>
           <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
           <li><a>Histori</a></li>
          <li><button onClick={()=>signOut()}>Keluar</button></li>
          </ul>
          </div> : <div className="space-x-1">
            <Link className='bg-[#393E41] rounded-md px-5 py-3 border-[#D3D0CB] border-2 text-[#D3D0CB]' href='/regis'>DAFTAR</Link>
            <Link className='bg-[#D3D0CB] rounded-md px-5 py-3 text-[#393E41]' href='/login' >MASUK</Link>
            </div>}
      </div>
    </header>
  )
}
