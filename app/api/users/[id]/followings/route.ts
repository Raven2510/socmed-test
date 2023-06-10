import { PrismaClient } from "@prisma/client"
import { NextResponse } from "next/server"

const prisma = new PrismaClient()

const getFollowings = async (userId: string) => {
    const followings = await prisma.user.findUnique({
        where: {
            id: userId
        },
        include: {
            following: {
                select: {
                    id: true,
                    username: true,
                    firstname: true,
                    lastname: true
                }
            }
        }
    })

    return followings
}



export async function GET(request: Request, {params}:any){
    const followings = await getFollowings(params.id)

    return NextResponse.json({
        ...followings
    })
}

