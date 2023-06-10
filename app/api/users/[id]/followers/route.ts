import { PrismaClient } from "@prisma/client"
import { NextResponse } from "next/server"

const prisma = new PrismaClient()

const getFollowers = async (userId: string) => {
    const followers = await prisma.user.findUnique({
        where: {
            id: userId
        },
        select: {
            username: true,
            role: true,
            followedBy: {
                select: {
                    id: true,
                    username: true,
                    email: true,
                    role: true
                }
            },
        }
    })

    return followers
}

export async function GET(request: Request, {params}:any){
    const followers = await getFollowers(params.id)
    
    return NextResponse.json({
        ...followers
    })
}