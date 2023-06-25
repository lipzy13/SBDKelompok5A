import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

export default function Poster(props) {
  return (
    <Link href={`/product/${props.id}`} passHref>
    <div className="bg-[#F5F5F5] w-60 h-40 rounded-3xl relative">
      <Image src={`/${props.image}`} alt={props.name} fill={true} className='rounded-3xl' />
    </div>
    </Link>
  )
}
