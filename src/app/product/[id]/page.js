import Footer from '@/components/Footer'
import { Navbar } from '@/components/Navbar'
import { PrismaClient } from '@prisma/client'
import Image from 'next/image'
import { Prodcard } from '@/components/Prodcard'
const prisma = new PrismaClient()

async function getData(id){
  const res = await prisma.tabel_show.findUnique({
    where: {
      show_id: id,
    },
    include: {
      table_harga: true
    }
  })
  const options = { day: '2-digit', month: 'long', year: 'numeric' };
  res.tanggal_show = res.tanggal_show.toLocaleDateString('en-GB', options)
  res.waktu_mulai = res.waktu_mulai.getUTCHours() + ':' + res.waktu_mulai.toTimeString().slice(3,5)
  res.waktu_selesai = res.waktu_selesai.getUTCHours() + ':' + res.waktu_selesai.toTimeString().slice(3,5)
  return res
}

async function getHarga(id){
  const res = await prisma.table_harga.findMany({
    where: {
      id_show: id,
    }, select: {
      id_cat_seat: true,
      harga: true,
      tabel_cat_seat: {
        select: {
          category_seat: true,
        }
      }
    }
  })
  return res
}




export default async function Page({ params }) {
  const data = await getData(params.id)
  return (
    <div>
      <Navbar />
    <div className='bg-[#E7E5DF] py-20 px-28 flex flex-1'>
      <div className="flex flex-row mx-auto space-x-12">
        <div className=' relative'>
            <Image src={`/${data.show_img}`} alt={data.nama_show} width={728} height={404} className='rounded-[33px] shadow-md object-fill w-[728px] h-[404px]'/>
        </div>
        <Prodcard nama={data.nama_show} tanggal={data.tanggal_show} waktu_mulai={data.waktu_mulai} waktu_selesai={data.waktu_selesai} lokasi={data.lokasi_show} harga={data.table_harga} id = {data.show_id}/>
      </div>
    </div>
    <Footer />
    </div>
    )
  }