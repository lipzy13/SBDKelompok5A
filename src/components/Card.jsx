import React from 'react'
import Image from 'next/image'
import { MdCalendarMonth } from "react-icons/md";
import Link from 'next/link'

export function Card(props) {
    return (
        <Link href={`/product/${props.id}`} passHref>

        <div className="card w-80 bg-base-100 shadow-xl h-96">
        <div className=' h-96 relative'>
        <Image src={`/${props.image}`} alt={props.name} fill={true} className='rounded-t-2xl'/>
        </div>
        <div className="card-body">
          <h2 className="card-title font-bold text-xl truncate">{props.name}</h2>
          <div className='flex flex-row'>
          <MdCalendarMonth className='mr-1' size={22}/>
          <p className='text-base font-light'>{props.date}</p>
          </div>
          <div className="mt-5">
            <p className=''>Mulai dari</p>
            <p className='font-bold'>IDR {props.harga.toLocaleString('id-ID', {
              style: 'decimal',
              minimumFractionDigits: 0,
              maximumFractionDigits: 0
              })} </p>
          </div>
        </div>
      </div>
      </Link>

)
}
