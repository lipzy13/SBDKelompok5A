"use client"
import Footer from '@/components/Footer'
import { Navbar } from '@/components/Navbar'
import axios from 'axios'
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

export async function page() {
  const router = useParams()
  const {id, qty, kategori} = router
  const [userData, setUserdata] = useState({
    nama: '',
    email: '',
    show_id: id,
    category_seat: kategori,
    qty: qty,
})      
  const res  = await (await axios.get(`http://localhost:3000/api/getKonser/${id}`)).data
  const kategoriList = ['VIP', 'CAT A', 'CAT B', 'CAT C']
  const hargaRaw = await (await axios.get(`http://localhost:3000/api/getHarga/${id}`)).data
  const harga = await hargaRaw[kategori].harga
  const options = { day: '2-digit', month: 'long', year: 'numeric' };
  res.tanggal_show = await new Date(res.tanggal_show).toLocaleDateString('en-GB', options)

  const postShow = async function(e) {
    e.preventDefault();
    axios.post('http://localhost:3000/api/postKonser', userData)
      .then(function(res) {
        useRouter.push(`/struk/${res.data}`)
      })
      .catch(function(err) {
        console.log(err);
      });
  };
  
  return (
    <div className='bg-[#D3D0CB]'>
        <Navbar/>

        <div className='bg-white w-[1020px] rounded-2xl mx-auto my-16 shadow-xl'>
            <h1 className='text-center pt-14 font-bold text-2xl text-[#393E41]'>Konfirmasi Pesanan</h1>
            
            <div className='mx-16 py-9'>
              <form onSubmit={postShow}>
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
                <h1 className='font-semibold text-base mr-20'>Kuantitas</h1>          
                </div>
                <div className='flex flex-col'>
                <h1 className='font-normal text-base mb-3'>{res.nama_show}</h1>
                <h1 className='font-normal text-base mb-3'>{res.tanggal_show}</h1>
                <h1 className='font-normal text-base mb-3'>{res.lokasi_show}</h1>
                <h1 className='font-normal text-base mb-3'>{kategoriList[kategori]}</h1>
                <h1 className='font-bold text-base mb-3'>Rp {harga.toLocaleString('id-ID', {
              style: 'decimal',
              minimumFractionDigits: 0,
              maximumFractionDigits: 0
              })}</h1>
                <h1 className='font-normal text-base '>{qty}</h1>
                </div>
                </div>
                <hr className='my-2 -ml-1'></hr>
                <div className='flex flex-row'>
                  <div className='flex flex-col'>
                    <h1 className='mr-20 font-bold'>Subtotal</h1>        
                    <h1 className='mt-3 mr-20 font-bold'>Nama</h1>
                    <h1 className='mt-3 mr-20 font-bold'>Email</h1> 
                  </div>
                  <div className='flex flex-col'>
                  <h1 className='font-bold ml-12'>Rp {(qty*harga).toLocaleString('id-ID', {
              style: 'decimal',
              minimumFractionDigits: 0,
              maximumFractionDigits: 0
              })}</h1>
                <input type="text" placeholder="Masukkan Nama" className="input w-[315px] h-[28px] placeholder:italic flex mt-3 bg-[#DDDDDD] ml-12" value={userData.nama} onChange={e => setUserdata({ ...userData, nama: e.target.value })} />
                <input type="text" placeholder="Masukkan Email" className="input w-[315px] h-[28px] placeholder:italic flex mt-3 bg-[#DDDDDD] ml-12" value={userData.email} onChange={e => setUserdata({ ...userData, email: e.target.value })} />
                  </div>
                </div>
            <button className='bg-[#44BBA4] text-white rounded-md py-3 px-28 focus:outline-none flex flex-1 mx-auto mt-9 btn'>Bayar</button>
            </form>
              </div>
            </div>
        <Footer/>
    </div>
  )
}

export default page