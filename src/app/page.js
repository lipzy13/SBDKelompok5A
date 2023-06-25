import { Card } from "@/components/Card"
import Footer from "@/components/Footer"
import { Navbar } from "@/components/Navbar"
import Poster from "@/components/Poster"
import { getServerSession } from "next-auth"
import { PrismaClient } from '@prisma/client'
import { authOptions } from "./api/auth/[...nextauth]/route"


const prisma = new PrismaClient()
async function getData () {
  const res = await prisma.tabel_show.findMany({
    where: {
      id_kategori_show: 1,
    }
  })
  const options = { day: '2-digit', month: 'long', year: 'numeric' };
  res.map((item) => {
    item.tanggal_show = item.tanggal_show.toLocaleDateString('en-GB', options)
  })
  return res
}

async function getOlahraga () {
  const res  = await prisma.tabel_show.findMany({
    where: {
      id_kategori_show: 2,
    }
  })
  return res
}

async function getHarga(){
  const res = await prisma.table_harga.findMany({
    orderBy: {
      id_show: 'asc'
    }
  })
  return res
}

function joinData(showsData, pricingData) {
  // Create an object to store the joined data
  const joinedData = [];

  // Iterate over the showsData array
  showsData.forEach((show) => {
    // Find the pricing data for the current show ID
    const pricing = pricingData
      .filter((pricing) => pricing.id_show === show.show_id) // Filter pricing by show ID
      .reduce((cheapest, current) => {
        // Find the cheapest pricing
        if (!cheapest || current.harga < cheapest.harga) {
          return current;
        }
        return cheapest;
      }, null);

    // If pricing data is found, merge the show and pricing information
    if (pricing) {
      const joinedItem = {
        show_id: show.show_id,
        nama_show: show.nama_show,
        lokasi_show: show.lokasi_show,
        waktu_mulai: show.waktu_mulai,
        waktu_selesai: show.waktu_selesai,
        tanggal_show: show.tanggal_show,
        id_kategori_show: show.id_kategori_show,
        show_img: show.show_img,
        id_harga: pricing.id_harga,
        id_cat_seat: pricing.id_cat_seat,
        harga: pricing.harga
      };

      // Add the joined item to the joinedData array
      joinedData.push(joinedItem);
    }
  });

  // Return the joinedData array
  return joinedData;
}


export default async function Home() {
  const data = await getData()
  const olahraga = await getOlahraga()
  const harga = await getHarga()
  const joinedData = joinData(data, harga);
  const session = await getServerSession(authOptions)
  return (
    <main className="bg-[#D3D0CB]">
      <Navbar/>
          <h1 className="font-bold text-2xl my-11 ml-20 ">Konser Pilihan</h1>
          <div className="flex flex-row mx-16 space-x-8 mb-11">
            {joinedData && joinedData.map((item) => (
              <Card key={item.show_id} id={item.show_id} name={item.nama_show} date={item.tanggal_show} image={item.show_img} harga={item.harga}/>
            ))}
          </div>

          <div className="font-bold text-2xl bg-[#44BBA4] py-11 mb-16">
              <h1 className="ml-20">Buat Kamu Yang Suka Olahraga!</h1>
              <div className="flex flex-row mx-16 mt-10 space-x-10">
                {olahraga && olahraga.map((item) => (
                  <Poster key={item.show_id} id={item.show_id} name={item.nama_show} image={item.show_img}/>
                ))}
              </div>
          </div>
          <Footer />
    </main>
  )
}
