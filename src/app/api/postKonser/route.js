import { PrismaClient } from '@prisma/client'
import { NextResponse } from 'next/server';
const prisma = new PrismaClient();
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]/route';

export async function POST(request){
    const session = await getServerSession(authOptions)
    const usernames = session.user
    const body = await request.json();
    const { nama, email, show_id, category_seat, qty} = body;

    
    const harga = await prisma.table_harga.findMany({
        where: {
            id_show: show_id,
            id_cat_seat: parseInt(parseInt(category_seat)+1),
        }
    });

    const data = await prisma.tabel_pemesanan.create({
        data: {
            waktu_booking: new Date(),
            user_id: 'u0002',
            booking_id: `b${Math.floor(Math.random() * 10000).toString().padStart(4, '0')}`,
            show_id: show_id,
            category_seat: parseInt(category_seat),
            nama: 'jeki',
            email: 'jeki123@gmail.com',
            qty: parseInt(qty),
            harga: harga.harga,
        }
    });

    return NextResponse.json(data.booking_id)
}