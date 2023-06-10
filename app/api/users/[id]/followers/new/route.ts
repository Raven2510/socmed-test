import { PrismaClient } from "@prisma/client"
import { NextResponse } from "next/server"

const prisma = new PrismaClient()

const createFollower = async (userId: string, followerId: string) => {
    const data = await prisma.user.update({
        where: {
            id: userId
        },
        data: {
            followedBy: {
                connect: {
                    id: followerId
                },
            }
        },
        include: {
            followedBy: true,
            following: true
        }
    })

    await prisma.user.update({
        where: {
            id: followerId
        },
        data: {
            following: { 
                connect: {
                    id: userId
                }
            }
        }
    })

    return data
}

export async function PUT(request: Request, {params}:any){
    const { followerId } = await request.json()
    const followers = createFollower(params.id, followerId)

    return NextResponse.json({
        ...followers
    })
}