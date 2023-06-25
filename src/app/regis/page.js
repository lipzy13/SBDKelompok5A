"use client"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import axios from "axios"
import { toast } from "react-hot-toast"

export default function page() {
    const [data, setData] = useState({
        username: '',
        password: '',
    })

    const registerUser = async (e) => {
        e.preventDefault()
        axios.post('/api/register', data)
        .then(()=> toast.success('Berhasil daftar'))
        .catch(()=> toast.error('Gagal daftar'))
    }

     return (
    <div className="flex items-center justify-center h-screen bg-[#E9E9E9]">
        <div className='flex flex-row align-middle'>
            <div className='flex-col mr-36 pt-[100px] w-auto'>
                <Image src="/register.svg" alt="login logo" width={360} height={240} />
                <div className="text-center">
                <p className='text-base font-bold mt-6 mb-1 whitespace-nowrap'>Tonton acara favoritmu secara langsung</p>
                <p className='text-sm'>lebih mudah beli tiketnya sekarang hanya di Niketcom!</p>
                </div>
            </div>
            <div className='flex-col w-[380px]  bg-[#EFEFEF] shadow-2xl rounded-3xl '>
                    <div className="text-center py-5 ">
                    <p className='text-base font-bold mt-6 mb-1'>Buat akun baru sekarang!</p>
                    <p className='text-sm'>Sudah ada akun? <Link href='/login' className='text-[#44BBA4] font-bold'>Login</Link> </p>
                    </div>
                    <div className="px-5">
                        <form onSubmit={registerUser}>
                        <div className='flex flex-col mt-2'>
                            <label className="label">
                            <label className='label-text'>Username</label>
                            </label>
                            <input type='text' className='border-2 border-gray-300 rounded-md p-2 focus:outline-none focus:border-blue-500' value={data.username} onChange={e => setData({ ...data, username: e.target.value })} />
                        </div>
                        <div className='flex flex-col mt-6'>
                            <label className="label">
                            <span className="label-text">Password</span>
                            </label>
                            <input type='password' className='border-2 border-gray-300 rounded-md p-2 focus:outline-none focus:border-blue-500' value={data.password} onChange={e => setData({ ...data, password: e.target.value })} />
                        </div>
                        <div className='flex flex-col mt-8'>
                            <button className='bg-[#44BBA4] text-white rounded-md p-2 focus:outline-none'>Daftar</button>
                        </div>
                            </form>
                    </div>
            </div>
        </div>
    </div>
  )
}
