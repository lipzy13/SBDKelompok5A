"use client"

import { Navbar } from "@/components/Navbar"
import Footer from "@/components/Footer"
import axios from "axios"
import { useParams } from "next/navigation"

const page = async () => {
  const router = useParams()
  const {id} = router
  const res  = await (await axios.get(`http://localhost:3000/api/getStruk/${id}`)).data
  const show = await (await axios.get(`http://localhost:3000/api/getKonser/${res.show_id}`)).data
  const hargaRaw =await  (await axios.get(`http://localhost:3000/api/getHarga/${res.show_id}`)).data
  const harga = await hargaRaw[res.category_seat-1].harga
  const qty = res.qty
  const kategoriList = ['VIP', 'CAT A', 'CAT B', 'CAT C']
  const options = { day: '2-digit', month: 'long', year: 'numeric' };
  show.tanggal_show = await new Date(show.tanggal_show).toLocaleDateString('en-GB', options)
  res.waktu_booking = await new Date(res.waktu_booking).toLocaleDateString('en-GB', options)
  console.log(res)
  return (
    <div className='bg-[#D3D0CB]'>
        <Navbar/>

        <div className='bg-white w-[1020px] rounded-2xl mx-auto my-16 shadow-xl'>
            <h1 className='text-center pt-14 font-bold text-2xl text-[#393E41]'>Pembayaran Berhasil</h1>
            <div className='mx-16 py-9'>
            <div className="flex flex-col float-right">
            <h1 className="text-xs "> Booking Id : {res.booking_id}</h1>
            <h1 className='text-xs -mt-1'>{res.waktu_booking}</h1>
              </div>
              <h1 className=' font-semibold text-[#525252] text-lg'>Detail Transaksi</h1>
              <hr className='bg-[#44BBA4] h-1 w-[155px] -ml-1'></hr>
              <hr className='mb-2'></hr>
              <div className='flex flex-row'>
                <div className='flex flex-col text-[#525252]'>
                <h1 className='font-semibold text-base mb-3 mr-20'>Nama Show</h1>        
                <h1 className='font-semibold text-base mb-3 mr-20'>Tanggal Show</h1>
                <h1 className='font-semibold text-base mb-3 mr-20'>Lokasi Show</h1>
                <h1 className='font-semibold text-base mb-3 mr-20'>Kategori Seat</h1>
                <h1 className='font-semibold text-base mb-3 mr-20'>Harga Per Tiket</h1>
                <h1 className='font-semibold text-base mb-3 mr-20'>Kuantitas</h1>
                <h1 className='font-semibold text-base mb-3 mr-20'>Subtotal</h1>        
                <h1 className='font-semibold text-base mb-3 mr-20'>Nama</h1>
                <h1 className='font-semibold text-base mb-3 mr-20'>Email</h1>           
                </div>
                <div className='flex flex-col'>
                <h1 className='font-normal text-base mb-3'>{show.nama_show}</h1>
                <h1 className='font-normal text-base mb-3'>{show.tanggal_show}</h1>
                <h1 className='font-normal text-base mb-3'>{show.lokasi_show}</h1>
                <h1 className='font-normal text-base mb-3'>{kategoriList[res.category_seat-1]}</h1>
                <h1 className='font-normal text-base mb-3'>Rp {harga.toLocaleString('id-ID', {
              style: 'decimal',
              minimumFractionDigits: 0,
              maximumFractionDigits: 0
              })}</h1>
                <h1 className='font-normal text-base mb-3 '>{qty}</h1>
                <h1 className='font-normal text-base mb-3'>Rp {(qty*harga).toLocaleString('id-ID', {
              style: 'decimal',
              minimumFractionDigits: 0,
              maximumFractionDigits: 0
              })}</h1>
                <h1 className='font-normal text-base mb-3'>{res.nama}</h1>
                <h1 className='font-normal text-base mb-3'>{res.email}</h1>
                </div>
                </div>
              </div>
            </div>
        <Footer/>
    </div>
  )
}

export default page