import { NextResponse } from "next/server";
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
export async function GET(request){
    const url = request.url
    const query = url.substr(url.length - 5)
    const res = await prisma.tabel_user.findUnique({
        where: {
            user_id: query,
        }
      })
    return NextResponse.json(res)
}