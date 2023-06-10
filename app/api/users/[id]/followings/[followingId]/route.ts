import { PrismaClient } from "@prisma/client"
import { NextResponse } from "next/server"

const prisma = new PrismaClient()

const unfollow = async (userId: string, followingId: string) => {
    await prisma.user.update({
        where: {
            id: userId
        },
        data: {
            following: {
                disconnect: {
                    id: followingId
                }
            }
        }
    })
}


export async function DELETE(request: Request, {params}:any){
    await unfollow(params.id, params.followingId)

    return NextResponse.json({
        message: "unfollowed"
    })
}
