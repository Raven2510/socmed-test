import { PrismaClient } from "@prisma/client"
import { NextResponse } from "next/server"

// Retrieves all users
const getUsers = async () => {
    const prisma = new PrismaClient()
    const data = await prisma.user.findMany()

    return data
}


//HTTP METHODS
export async function GET(){
    const data = await getUsers()

    return NextResponse.json({
        ...data
    })
}