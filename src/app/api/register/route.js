import { PrismaClient } from '@prisma/client'
import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
const prisma = new PrismaClient();

export async function POST(request){

    const numbRows = await prisma.tabel_user.count() + 1;

    const body = await request.json();
    const { username, password } = body;

    if(!username || !password){
        return new NextResponse('Missing Fields',  { status: 400 })
    }

    const exist = await prisma.tabel_user.findFirst({
        where: {
            username
        }
    });

    if(exist){
        throw new NextResponse('Username already exist')
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.tabel_user.create({
        data: {
            user_id: `u${numbRows.toString().padStart(4, '0')}`,
            username,
            password: hashedPassword
            }
        });
        
        return NextResponse.json(user)
}