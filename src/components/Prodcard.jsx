'use client'
import {MdCalendarMonth} from 'react-icons/md'
import { FaClock } from 'react-icons/fa'
import { SiGooglemaps } from 'react-icons/si'
import { useState } from 'react'
import Link from 'next/link'

export function Prodcard(props) {

    const [qty, setQty] = useState(1)
    const [kategori, setKategori] = useState(0)
    const kategoriList = ['VIP', 'CAT A', 'CAT B', 'CAT C']
    const harga = props.harga[kategori].harga
    console.log(harga)
    const id = props.id

  return (
    <div className="card w-96 bg-base-100 shadow-md rounded-[33px]">
          <div className="card-body">
            <h2 className="card-title font-bold text-2xl mb-2">{props.nama}</h2>
            <div className='flex flex-row mb-1'>
              <MdCalendarMonth className='mr-2 text-[#44BBA4]' size={20}/>
              <p className='text-sm text-[#666666]'>{props.tanggal}</p>
            </div>
            <div className='flex flex-row mb-1'>
              <FaClock className='mr-2 text-[#44BBA4]' size={20}/>
              <p className='text-sm text-[#666666]'>{props.waktu_mulai} - {props.waktu_selesai} WIB</p>
            </div>
            <div className='flex flex-row pb-3 border-b-slate-300 border-b-2'>
              <SiGooglemaps className='mr-2 text-[#44BBA4]' size={20}/>
              <p className='text-sm text-[#666666]'>{props.lokasi}</p>
            </div>
            <div className='mt-2 flex flex-row justify-between'>
                <div className='flex flex-col'>
                <p className='font-semibold text-sm'>Kuantitas</p>
                <div className='flex flex-row justify-between'>
                    <div className='flex flex-row pt-3 space-x-2'>
                        <button className='bg-white text-[#44BBA4] btn-outline btn btn-xs btn-circle ' onClick={()=>qty>1?setQty(qty-1):setQty(1)}>-</button>
                        <p className='bg-[#F5F5F5] '>{qty?qty:1}</p>
                        <button className='bg-white text-[#44BBA4] btn-outline btn btn-xs btn-circle ' onClick={()=>setQty(qty+1)}>+</button>
                    </div>
                </div>
                </div>
                <div className='flex flex-col'>
                    <p className='font-semibold text-sm'>Kategori Seat</p>
                    <select className="select-xs  bg-[#44BBA4] text-white rounded select" onChange={(e)=>setKategori(e.target.value)}>
                        {props.harga.length > 1 ? props.harga.map((item, index)=>(
                            <option key={index} value={index}>{kategoriList[index]}</option>
                        )):(  <option value={0} >{kategoriList[0]}</option>) }
                    </select>
                </div>
            </div>
            <div className='mt-2.5'>
                <p className="text-sm font-semibold">Harga</p>
                <p className="text-sm font-bold">IDR {(qty *  harga).toLocaleString('id-ID', {
                style: 'decimal',
                minimumFractionDigits: 0,
                maximumFractionDigits: 0
              })}</p>
            </div>
            <div className='mt-2.5'>
                <Link href={{
                  pathname: `/checkout/${props.id}/${qty}/${kategori}`
                }} className='btn bg-[#44BBA4] w-full text-white font-semibold rounded-3xl'>Beli Tiket</Link>
            </div>
          </div>
        </div>
  )
}
