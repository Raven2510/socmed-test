import { PrismaClient } from "@prisma/client"
import { NextResponse } from "next/server"

const prisma = new PrismaClient()

//DB Methods
const getUser = async (userId: string) => {

    const user = await prisma.user.findFirst({
        where: {
            id: userId
        },
        include: {
            _count: {
                select: {
                    followedBy: true,
                    following: true
                }
            }
        }
    })

    return user
}

const deleteUser = async (userId: string) => {
    await prisma.user.delete({
        where: {
            id: userId
        }
    })

    return "User Deleted"
}

const updateUser = async (userId: string, body: any) => {
    const data = await prisma.user.update({
        where: {
            id: userId
        },
        data: {
           ...body
        },
    })

    return data
}


// HTTP METHODS
export async function GET(request: Request, {params}: any){
    const user = await getUser(params.id)

    return NextResponse.json({
        ...user
    })
}

export async function DELETE(request: Request, {params}: any) {
    const result = await deleteUser(params.id)

    return NextResponse.json({
        message: result
    })
}

export async function PUT(request: Request, {params}:any){
    const result = await updateUser(params.id, request.body)

    return NextResponse.json({
        ...result
    })
}